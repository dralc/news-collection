# news-collection

- A microservice that takes in raw/content.json and returns a different view of a collection's references.

[Postman usage examples](https://documenter.getpostman.com/view/1592722/T1LPDmyz?version=latest)

## Environment variables
- Specify these in your .env file

var             | default   | valid values
--------------- | -------   | ------------
DEBUG           |  -        | news-collection:*
REDIS_PORT      | 6378      | 
REDIS_HOST      | localhost |

## Start the service
- Ensure you've ingested some data into Redis by running
	- `npm run ingest`
- `npm start`

### Development
- `npm run dev`
- `npm test`

