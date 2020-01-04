#### Serve files from `/data`

#### API requests by `/api`

#### Docker

Run docker

`docker run -p 8080:8080 -v $(pwd)/data:/home/node/app/data -d -e FILE_SERVER_API_KEY="FILE_SERVER_API_KEY" kengurukleo/file-server`
