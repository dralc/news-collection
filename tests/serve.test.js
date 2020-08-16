import test from 'ava';
import testListen from 'test-listen';
import * as http from 'http';
import app from '../src/app.js';
import { ingest, rollbackIngest } from '../src/dao/collection.js';
import nodeFetch from "node-fetch";

test.beforeEach(async (t) => {
	// Start new app server
	t.context.server = http.createServer(app);
	t.context.serverUrl = await testListen(t.context.server);

	// Ingest test data into DB
	t.context.ingestedKeys = await ingest();
});

test.afterEach.always(async (t) => {
	// Remove test data
	rollbackIngest(t.context.ingestedKeys);

	// Close app server
	t.context.server.close();
})

test.serial('Get valid collection ID references', async (t) => {
	const res = await nodeFetch(`${t.context.serverUrl}/collection/c788e3caadf6e496d240aac7ca8a432c`);
	const refs = await res.json();

	t.is(refs.length, 25);
	t.snapshot(refs);
});

test('Get invalid collection ID', async (t) => {
	const res = await nodeFetch(`${t.context.serverUrl}/collection/bad123!!-<>`);
	const dat = await res.json();

	t.is(res.status, 403);
	t.is(dat.message, 'Invalid collection id');
});

test('Get invalid route', async (t) => {
	const res = await nodeFetch(`${t.context.serverUrl}/95/bad/0n3`);
	const dat = await res.json();

	t.is(res.status, 404);
	t.is(dat.message, 'Invalid route');
});
