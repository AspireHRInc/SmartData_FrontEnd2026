## Mock Server

Mock server uses json-server to serve up REST API endpoints from a JSON file. These endpoints are then consumed by GraphQL to provide mock data to the app via GraphQL endpoint.

Navigate to mock server directory
`cd /mock-server`

For first run, make sure 3rd party components are installed with `npm install` then...

Start json-server.json
`npm run json:server`

Start graphQL server
`npm run dev:server`

For JSON-server front end, in a browser navigate to:
`http://localhost:3000/`

For GraphiQL (graphQL explorer), in a browser navigate to:
`http://localhost:4000/graphq`
