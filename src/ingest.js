import { ingest } from './dao/collection.js';

ingest()
	.then(() => process.exit(0));