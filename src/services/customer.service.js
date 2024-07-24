import { PrismaClient } from '@prisma/client'
import { NoRecordFound } from '../configs/Responses.js';

const prisma = new PrismaClient()

async function get(req) {
    const { companyId } = req.query


    console.log(companyId, 'id');
    const data = await prisma.customer.findMany(
        {
            where: {
                companyId: parseInt(companyId)
            },
            include: {
                customerRelations: true
            }
        }
    );
    return { statusCode: 0, data };
}
async function getOne(id) {
    const data = await prisma.customer.findUnique({
        where: {
            id: parseInt(id)
        }
    })
    if (!data) return NoRecordFound("Page");
    return { statusCode: 0, data };
}

async function getPermissions(req) {
    const { roleId, pageId } = req.params
    const data = await prisma.roleOnPage.findUnique({
        where: {
            roleId_pageId: {
                roleId: parseInt(roleId),
                pageId: parseInt(pageId)
            }
        },
    })
    if (!data) return NoRecordFound("Page");
    return { statusCode: 0, data };
}


async function getSearch(req) {
    const { searchKey } = req.params
    const data = await prisma.customer.findMany({
        where: {
            OR: [
                {
                    name: {
                        contains: searchKey,
                    },
                },
                {
                    link: {
                        contains: searchKey,
                    },
                },
            ],
        }
    })
    return { statusCode: 0, data: data };
}



async function create(body) {
    const toDate = (dateString) => {
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? null : date; // Return null if date is invalid
    };

    const { customerData, relatives } = body;


    //
    const customer = customerData[0];
    console.log(customer, 'sadasd');
    const data = await prisma.customer.create({
        data: {
            customerDetId: customer.customerId,
            name: customer.name,
            gender: customer.gender,
            email: customer.email,
            phone: customer.phone,
            city: customer.city,
            state: customer.state,
            pin: customer.pin,
            marriedStatus: customer.married,
            weddingDate: toDate(customer.weddingDate),
            members: parseInt(customer.members),
            workingStatus: customer.working,
            age: parseInt(customer.age),
            PurchaseDate: toDate(customer.purchaseDate),
            purchaseAmount: parseFloat(customer.purchaseValue),
            totalValue: parseFloat(customer.totalValue),
            address: customer.address,
            companyId: parseInt(1),
            customerRelations: {
                create: relatives.map(relative => ({
                    gender: relative.type,
                    name: relative.name,
                    dob: toDate(relative.dob),
                })),
            },
        },
    });
    return { statusCode: 0, data };
}


async function update(id, body) {
    const { name, link, active, type, pageGroupId } = await body
    const dataFound = await prisma.customer.findUnique({
        where: {
            id: parseInt(id)
        }
    })
    if (!dataFound) return NoRecordFound("Page");
    const data = await prisma.customer.update({
        where: {
            id: parseInt(id),
        },
        data: {
            name, link, active, type, pageGroupId: parseInt(pageGroupId)
        }
    })
    return { statusCode: 0, data };
};

async function remove(id) {
    const data = await prisma.customer.delete({
        where: {
            id: parseInt(id)
        },
    })
    return { statusCode: 0, data };
}

export {
    get,
    getPermissions,
    getOne,
    getSearch,
    create,
    update,
    remove
}
