export const HM_REFS_KEY = 'hm_refs';
export const LI_COLL_REFS_KEY_PREFIX = 'li_coll:refs:';

/**
 * Generate a key prefix for testing
 * 
 * @param key 
 */
export function testKey(key) {
	return `test:${key}`;
}
