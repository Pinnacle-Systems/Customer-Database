import { Prisma } from '@prisma/client'

import { get as _get, getOne as _getOne, } from '../services/customerRelations.service.js'

async function get(req, res, next) {
    try {
        res.json(await _get(req));
        console.log(res.statusCode);
    } catch (err) {
        console.error(`Error `, err.message);
    }
}

async function getOne(req, res, next) {
    try {
        res.json(await _getOne(req.params.id));
        console.log(res.statusCode);
    } catch (err) {
        console.error(`Error`, err.message);
    }
}

async function getPermissions(req, res, next) {
    try {
        res.json(await _getPermissions(req));
        console.log(res.statusCode);
    } catch (err) {
        console.error(`Error`, err.message);
    }
}






export {
    get,
    getOne,
    getPermissions,

};
