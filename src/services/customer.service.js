import { PrismaClient } from '@prisma/client'
import { NoRecordFound } from '../configs/Responses.js';
import { getFinYearStartTimeEndTime } from '../utils/finYearHelper.js';
import { getTableRecordWithId, getYearShortCodeForFinYear } from '../utils/helper.js';

const prisma = new PrismaClient()
async function getNextDocId(companyId, shortCode, startTime, endTime) {
    let lastObject = await prisma.customer.findFirst({
        where: {
            companyId: parseInt(companyId),
            AND: [
                {
                    createdAt: {
                        gte: startTime

                    }
                },
                {
                    createdAt: {
                        lte: endTime
                    }
                }
            ],
        },
        orderBy: {
            id: 'desc'
        }
    });
    let code = 'JEWEL'

    const compObj = await getTableRecordWithId(companyId, "company")
    let newDocId = `${compObj.code}/${shortCode}/${code}/1`;
    if (lastObject) {
        newDocId = `${compObj.code}/${shortCode}/${code}/${parseInt(lastObject.docId.split("/").at(-1)) + 1}`
    }
    return newDocId
}


async function get(req) {
    const { companyId, isGetNextDocId, finYearId } = req.query
    if (isGetNextDocId) {
        let finYearDate = await getFinYearStartTimeEndTime(finYearId);
        const shortCode = finYearDate ? getYearShortCodeForFinYear(finYearDate?.startTime, finYearDate?.endTime) : "";
        let docId = finYearDate ? (await getNextDocId(companyId, shortCode, finYearDate?.startTime, finYearDate?.endTime)) : "";
        return { statusCode: 0, data: { docId } }
    }

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
    const { roleId, pageId } = req.companyId
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
    const { searchKey } = req.companyId
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



async function create(req) {
    const toDate = (dateString) => {
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? null : date; // Return null if date is invalid
    };
    const image = req.file
    const { relatives, companyId, finYearId, name, gender, email, phone, city,
        state, pin, married, weddingDate, working, age, address, dob, panNo, isImageDeleted, whatsNum,
    } = await req.body;
    console.log(req.body, 'req');
    console.log(companyId, 'companyId')
    let finYearDate = await getFinYearStartTimeEndTime(finYearId);
    const shortCode = finYearDate ? getYearShortCodeForFinYear(finYearDate?.startTime, finYearDate?.endTime) : "";
    let docId = finYearDate ? (await getNextDocId(companyId, shortCode, finYearDate?.startTime, finYearDate?.endTime)) : "";

    const data = await prisma.customer.create({
        data: {
            docId,
            name: name,
            gender: gender,
            email: email,
            phone: phone,
            whatsNum: whatsNum,
            city: city,
            state: state,
            pin: pin,
            marriedStatus: married,
            weddingDate: toDate(weddingDate),
            workingStatus: working,
            age: parseInt(age),
            address: address,
            companyId: parseInt(companyId),
            dob: toDate(dob),
            panNo: panNo,
            image: (isImageDeleted && JSON.parse(isImageDeleted)) ? null : (image ? image.filename : undefined),
            customerRelations: {
                create: (relatives ? JSON.parse(relatives) : []).map(relative => ({
                    type: relative.type,
                    name: relative.name,
                    dob: toDate(relative.dob),
                    phoneNumber: relative.phoneNumber,
                    weddingDate: toDate(relative.weddingDate)
                })),
            },
        },
    });
    return { statusCode: 0, data };
}


async function update(id, req) {
    const image = req.file
    const { relatives, companyId, finYearId, name, gender, email, phone, city,
        state, pin, married, weddingDate, working, age, address, dob, panNo, isImageDeleted, whatsNum, } = await req.body;
    const toDate = (dateString) => {
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? null : date;
    };

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
            name: name,
            gender: gender,
            email: email,
            phone: phone,
            whatsNum: whatsNum,
            city: city,
            state: state,
            pin: pin,
            marriedStatus: married,
            weddingDate: toDate(weddingDate),
            workingStatus: working,
            age: parseInt(age),
            address: address,
            companyId: parseInt(companyId),
            dob: toDate(dob),
            panNo: panNo,
            image: (isImageDeleted && JSON.parse(isImageDeleted)) ? null : (image ? image.filename : undefined),
            customerRelations: {
                deleteMany: {},
                create: (relatives ? JSON.parse(relatives) : []).map(relative => ({
                    type: relative.type,
                    name: relative.name,
                    dob: toDate(relative.dob),
                    phoneNumber: relative.phoneNumber,
                    weddingDate: toDate(relative.weddingDate)
                })),
            },
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
