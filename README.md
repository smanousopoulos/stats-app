# Stats frontend app

A frontend SPA to display trivia questions and gather/display statistics. Random trivia questions 
are fetched from [Open trivia database](https://opentdb.com) and stats are updated and fetched from 
[Stats service](https://github.com/smanousopoulos/stats-service).

## Architecture

This project uses React for rendering components and Redux for managing application state. 
A node express server is used for serving static content.


## Run locally

- `npm install` 
- `npm run start`

#### Notes
- The node application by default runs on port `3000`. You can change it by providing the environment variable `PORT`.
 
- The default dependent hosts are configured in `hosts.js`. By default the Stats service 
is expected to be running on `http://localhost:8081`. 
 
## Run unit tests

```
npm test
```

## TODOs

- Implement error handling when requests fail
- Caching course aggregate responses by implementing clean/dirty state property