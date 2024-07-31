import { PrismaClient } from '@prisma/client'
import { NoRecordFound } from '../configs/Responses.js';
import { getFinYearStartTimeEndTime } from '../utils/finYearHelper.js';
import { getTableRecordWithId, getYearShortCodeForFinYear } from '../utils/helper.js';

const prisma = new PrismaClient()
async function getNextDocId(companyId, shortCode, startTime, endTime) {
    let lastObject = await prisma.customerRelations.findFirst({
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

    const data = await prisma.customerRelations.findMany(
    );
    console.log(data, 'data');
    return { statusCode: 0, data };

}
async function getOne(id) {
    const data = await prisma.customerRelations.findUnique({
        where: {
            id: parseInt(id)
        }
    })
    if (!data) return NoRecordFound("Page");
    return { statusCode: 0, data };
}







export {
    get,

    getOne,

}
