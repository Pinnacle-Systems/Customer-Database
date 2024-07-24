import { PrismaClient } from '@prisma/client'
import { NoRecordFound } from '../configs/Responses.js';

const prisma = new PrismaClient()

async function get(req) {
    const { companyId, active } = req.query
    const data = await prisma.customer.findMany({
        orderBy: {
            id: 'desc'
        },
        where: {
            companyId: companyId ? parseInt(companyId) : undefined,
            active: active ? Boolean(active) : undefined,
        }
    });
    return { statusCode: 0, data };
}
async function createCustomer(body) {
    const { companyId, active } = await body
    const data = await prisma.customer.create({
        data: {
            companyId: companyId ? parseInt(companyId) : null,
            from: new Date(from), to: new Date(to),
            active
        },
    });
    return { statusCode: 0, data };
}
export {
    get,
    createCustomer,
}