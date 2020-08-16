/**
 * Validates IDs like collection and reference IDs
 * 
 * @param {String} id A domain ID
 * @returns {Boolean}
 */
export function isValidId(id) {
	if ( !id ||	id.length !== 32 || !/[a-z0-9]/i.test(id) ) {
		return false;
	}

	return true;
}

import { mkdir, writeFile } from 'fs/promises';
import { dirname } from 'path';

/**
 * Write {dat} to {filePath}, and making any parent directories if required
 * @param filePath
 * @param dat
 */
export async function writeFileMkDir(filePath, dat) {
	let dir = dirname(filePath);
	try {
		await mkdir(dir , { recursive: true } );
	}
	catch (er) {
		console.info(`"${dir}" already exists`);
	}
	finally {
		return writeFile( filePath, dat)
			.catch(er => {
				console.error(er);
			});
	}
}