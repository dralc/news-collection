import express from 'express';
import createError from 'http-errors'
import { transform } from '../transform.mjs';
import { isValidId } from '../utils.mjs';

var router = express.Router();

// Validate route params
router.param('collectionId', (req, res, next, id) => {
  if ( !isValidId(id) ) {
    next(createError(403, 'Invalid collection id'));
  } else {
    next();
  }
})

router.get('/:collectionId', async function(req, res, next) {
  const collectionId = req.params.collectionId;
  const data = await transform(collectionId);

  res.send(data);
});
  
export default router;