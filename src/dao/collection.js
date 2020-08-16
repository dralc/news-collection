/*
	Redis keys
	HashMap  hm_refs (referenceId) -> Json (reference)
	List     li_coll:refs:(collectionId) -> Strings (referenceIds)
*/

import fs from 'fs';
import { resolve } from 'path';
import { promisify } from 'util';
import Redis from 'ioredis';
import {
	HM_REFS_KEY,
	LI_COLL_REFS_KEY_PREFIX } from './keygen.js';

const redis = new Redis(process.env.REDIS_PORT, process.env.REDIS_HOST);

/**
 * Ingests the references from a collection
 * @returns {Array<String>} The keys ingested
 */
export async function ingest(referencesKey = HM_REFS_KEY, collectionKeyPrefix = LI_COLL_REFS_KEY_PREFIX) {
	try {
		const file_st = await promisify(fs.readFile)( resolve('raw', 'content.json') );
		const collection_o = JSON.parse(file_st);
		const references_o = collection_o.content.references;
		
		const payload = new Map();
		for (let id of Object.keys(references_o) ) {
			payload.set(id, JSON.stringify(references_o[id]));
		}

		const collectionKey = `${collectionKeyPrefix}${collection_o.content.id}`;
		const pl = redis.pipeline();

		pl.hset(referencesKey, payload);
		pl.unlink(collectionKey);
		pl.rpush(collectionKey, [...payload.keys()]);
		await pl.exec();

		return [referencesKey, collectionKey];

	} catch (er) {
		console.error(`Handling error...`, er);
	}
}

/**
 * Rollsback ingested data. Suited for e2e tests
 * 
 * @param {Array<String>} ingestedKeys
 */
export async function rollbackIngest(ingestedKeys) {
	try {
		const pl = redis.pipeline();
		ingestedKeys.forEach(key => pl.unlink(key));
		await pl.exec();
	} catch (er) {
		console.error(`Handling error...`, er);
	}
}

/**
 * Retrieves the stored references for the {collectionId}
 * 
 * @param {String} collectionId
 * @returns {Array<String>} An array of references in JSON
 */
export async function readRefs(collectionId) {
	const refs_ar = await redis.lrange(`${LI_COLL_REFS_KEY_PREFIX}${collectionId}`, 0, -1);
	const pipeline = redis.pipeline();

	for (let refId of refs_ar) {
		pipeline.hget(HM_REFS_KEY, refId);
	}

	const res = await pipeline.exec();
	return res.map(it => it[1]);
}