import { readRefs } from './dao/collection.mjs';

/**
 * Read ingested references
 * Map each reference to a view format
 * @returns {Array<Object>} JSON array of views
 */
export async function transform(collectionId) {
	const refs_ar = await readRefs(collectionId);
	return refs_ar.map( ref => mapReferenceToView(JSON.parse(ref)) );
}

/**
 * Map a reference in content.references to a format for 'viewing'
 * @param ref 
 */
export function mapReferenceToView(ref) {
	return {
		articleId: ref.id,
		title:     ref.headline.default,
		free:      !(ref.accessType === 'premium'),
		standfirst: ref.standfirst.default,
		authors:    ref.authors.map(auth =>  auth.name),
		date: {
			liveDate: ref.date.live,
			dateUpdated: ref.date.updated
		},
		originalSource: ref.rightsMetadata.originatedSource,
		section: ref.target.sections[0],
		inDt: ref.target.domains.includes('dailytelegraph.com.au'),
	};
}
