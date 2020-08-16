# news-collection

- A microservice that takes in remote data for a collection at {INGEST_URL} and returns a different view of a collection's references.

[Postman usage examples](https://documenter.getpostman.com/view/1592722/T1LPDmyz?version=latest)

## Environment variables
- Specify these in your .env file

var             | default   | valid values
--------------- | -------   | ------------
DEBUG           |  -        | news-collection:*
REDIS_PORT      | 6378      | 
REDIS_HOST      | localhost |
INGEST_URL      |           |

## Start the service
- Ensure you've ingested some data into Redis by running
	- `npm run ingest`
- `npm start`

### Development and Testing
- `npm run dev`
- `npm test`

## VSCode configs
See [vscode configs]('vscodeconfigs.md') for examples of configs for launch.json
