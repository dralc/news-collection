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