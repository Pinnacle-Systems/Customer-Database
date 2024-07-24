import { PrismaClient, Prisma } from '@prisma/client'
import { NoRecordFound } from '../configs/Responses.js';
import { getDateFromDateTime, getDateTimeRange, getStockProperty } from '../utils/helper.js';

const prisma = new PrismaClient()

const xprisma = prisma.$extends({
    result: {
        stock: {
            gross: {
                needs: { price: true, qty: true },
                compute(stock) {
                    return stock.price * stock.qty
                }
            },
        }
    },
})

export async function getPcsStock(req) {
    const {
        pagination = false, dataPerPage = 5, pageNumber = 1, storeId, prevProcessId, styleId, productionDeliveryId, isPacking, finishedGoodsSalesId
    } = req.query
    let processId;
    if (prevProcessId) {
        let processData = await prisma.process.findUnique({
            where: {
                id: parseInt(prevProcessId)
            }
        })
        processId = prevProcessId;
        if (processData?.isCutting) {
            processId = null
        }
    }
    const storeFilter = Prisma.sql`stockForPcs.storeId = ${storeId}`
    const processFilter = processId ? Prisma.sql`stockForPcs.prevProcessId = ${prevProcessId}` : Prisma.sql`stockForPcs.prevProcessId IS NULL`
    const productionDeliveryIdFilter = Prisma.sql`(productionDelivery.id < ${productionDeliveryId} or productionDelivery.id IS NULL)`
    const isPackingFilter = isPacking ? Prisma.sql`process.isPacking = 1` : Prisma.sql`(process.isPacking = 0 OR process.isPacking IS NULL)`
    let filterConditions = []
    if (styleId) {
        filterConditions.push(Prisma.sql`stockForPcs.styleId = ${styleId}`)
    }
    if (productionDeliveryId) {
        filterConditions.push(productionDeliveryIdFilter)
    }
    if (finishedGoodsSalesId) {
        filterConditions.push(Prisma.sql`(finishedGoodsSales.id < ${finishedGoodsSalesId} or finishedGoodsSales.id IS NULL)`)
    }
    if (!isPacking) {
        filterConditions.push(processFilter)
    }
    filterConditions = [...filterConditions, storeFilter, isPackingFilter]
    const where = Prisma.sql`where ${Prisma.join(filterConditions, ' and ')}`
    let data = await prisma.$queryRaw`
    select style.sku as styleName, stockForPcs.styleId,stockForPcs.portionId,portion.name as portionName, stockForPcs.sizeId,stockForPcs.colorId,color.name as colorName, stockForPcs.uomId, unitOfMeasurement.name as uomName, 
    size.name as sizeName, stockForPcs.prevProcessId, IF(stockForPcs.prevProcessId is null, "Cutting",process.name) as processName, sum(stockforpcs.qty) as qty
    from stockforpcs
    left join productionDeliveryDetails on productionDeliveryDetails.id = stockforpcs.productionDeliveryDetailsId 
    left join productionDelivery on productionDelivery.id = productionDeliveryDetails.productionDeliveryId
    left join finishedGoodsSalesDetails on finishedGoodsSalesDetails.id = stockForPcs.finishedGoodsSalesDetailsId 
    left join finishedGoodsSales on finishedGoodsSales.id = finishedGoodsSalesDetails.finishedGoodsSalesId 
    left join style on style.id = stockForPcs.styleId
    left join size on size.id = stockForPcs.sizeId
    left join color on color.id = stockForPcs.colorId
    left join process on process.id = stockForPcs.prevProcessId 
    left join portion on portion.id = stockForPcs.portionId 
    left join unitOfMeasurement on unitOfMeasurement.id = stockForPcs.uomId 
    ${where}
    group by stockForPcs.styleId,stockForPcs.portionId, stockForPcs.sizeId, stockForPcs.prevProcessId, stockForPcs.colorId, stockForPcs.    
    having sum(stockforpcs.qty) > 0
    `
    let totalCount = data.length
    if (pagination) {
        data = data.slice(((pageNumber - 1) * parseInt(dataPerPage)), pageNumber * dataPerPage)
    }
    return { statusCode: 0, data, totalCount };
}

async function get(req) {

    const {
        branchId,
        fromDate,
        productId,
        searchProduct,
        pagination = false, dataPerPage = 5, pageNumber = 1,
        stockData,
        stockReport,
    } = req.query;

    let data;

    if (stockData) {
        data = await prisma.$queryRaw`
        SELECT
    stock.productId,
    stock.uomId,
    product.name,
    sum(qty) as sum,
    uom.name as uom
FROM 
    stock
LEFT JOIN
    product ON product.Id = stock.productId
LEFT JOIN 
    uom ON uom.Id = stock.uomId 
WHERE 
    stock.branchId = ${branchId}
GROUP BY
    stock.productId,
    stock.uomId;
        `;
        let totalCount = data.length;
        if (pagination) {
            data = data.slice(((pageNumber - 1) * parseInt(dataPerPage)), pageNumber * dataPerPage);
        }
        return { statusCode: 0, data, totalCount };
    }

    if (stockReport) {
        data = await prisma.$queryRaw`
 SELECT product.name AS Product,
             SUM(qty)as Stock ,saleprice as "SaleRate", uom.name as Uom,  (saleprice * SUM(qty)) AS "SaleValue"
            FROM
                Stock sub
                LEFT JOIN
                product ON product.id = sub.productId
                LEFT JOIN uom
                on uom.id = sub.uomId
                WHERE
           product.id = sub.productId
            GROUP BY sub.saleprice,sub.productId , product.name, sub.uomId, uom.name
            having Stock > 0
            order by product.name`;
        let totalCount = data.length;
        if (pagination) {
            data = data.slice(((pageNumber - 1) * parseInt(dataPerPage)), pageNumber * dataPerPage);
        }
        return { statusCode: 0, data, totalCount };
    }

    data = await xprisma.stock.groupBy({
        where: {
            productId: productId ? parseInt(productId) : undefined,
            Product: searchProduct ? {
                name: {
                    contains: searchProduct,
                },
            } : undefined,
        },
        by: ["productId", 'uomId'],
        _sum: {
            qty: true,
        },
    });
    data = data.filter(item => !(item._sum.qty === 0));
    let totalCount = data.length;

    if (pagination) {
        data = data.slice(((pageNumber - 1) * parseInt(dataPerPage)), pageNumber * dataPerPage);
    }

    return { statusCode: 0, data, totalCount };
}



async function getOne(id, query) {
    const { productId, uomId, salePrice } = query;
    let data;

    if (salePrice) {
        data = await prisma.$queryRaw`
            SELECT
                SUM(qty) AS stockQty,
                salePrice,
                productId
            FROM
                stock
            WHERE 
                stock.productId = ${productId}
                AND stock.uomId = ${uomId}
                AND stock.salePrice = ${salePrice}
            GROUP BY
                productId,
                salePrice;
        `;
    } else {
        data = await prisma.$queryRaw`
            SELECT
                SUM(qty) AS stockQty,
                salePrice,
                productId
            FROM
                stock
            WHERE 
                stock.productId = ${productId}
                AND stock.uomId = ${uomId}
            GROUP BY
                productId,
                salePrice;
        `;
    }

    if (!data || data.length === 0) {
        return NoRecordFound("stock");
    }

    return { statusCode: 0, data };
}



async function getSearch(req) {
    const { companyId, active } = req.query
    const { searchKey } = req.params
    const data = await prisma.stock.findMany({
        where: {
            country: {
                companyId: companyId ? parseInt(companyId) : undefined,
            },
            active: active ? Boolean(active) : undefined,
            OR: [
                {
                    aliasName: {
                        contains: searchKey,
                    },
                }
            ],
        }
    })
    return { statusCode: 0, data: data };
}

async function create(body) {
    const { aliasName, accessoryItemId, hsn, accessoryCategory, active, companyId } = await body
    const data = await prisma.stock.create({
        data: {
            aliasName, accessoryItemId: parseInt(accessoryItemId), hsn, accessoryCategory,
            active, companyId: parseInt(companyId)
        },
    });
    return { statusCode: 0, data };
}

async function update(id, body) {
    const { aliasName, accessoryItemId, hsn, accessoryCategory, active, companyId } = await body
    const dataFound = await prisma.stock.findUnique({
        where: {
            id: parseInt(id)
        }
    })
    if (!dataFound) return NoRecordFound("stock");
    const data = await prisma.stock.update({
        where: {
            id: parseInt(id),
        },
        data: {
            aliasName, accessoryItemId: parseInt(accessoryItemId), hsn, accessoryCategory,
            active, companyId: parseInt(companyId)
        },
    })
    return { statusCode: 0, data };
};

async function remove(id) {
    const data = await prisma.stock.delete({
        where: {
            id: parseInt(id)
        },
    })
    return { statusCode: 0, data };
}

export {
    get,
    getOne,
    getSearch,
    create,
    update,
    remove,
}
