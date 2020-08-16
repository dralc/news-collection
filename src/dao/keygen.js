// During tests, key names should be different
const key_prefix = process.env.NODE_ENV === 'test' ? 'test:' : '';

export const HM_REFS_KEY = `${key_prefix}hm_refs`;
export const LI_COLL_REFS_KEY_PREFIX = `${key_prefix}li_coll:refs:`;
