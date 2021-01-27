#### Serve files from `/data`

#### API requests by `/api`

#### Docker

Build docker
```
docker build -t file-server .
```

Run docker
```
docker run -p 8080:8080 -v $(pwd)/data:/home/node/app/data -d -e FILE_SERVER_API_KEY="FILE_SERVER_API_KEY" kengurukleo/file-server
```

#### Post file
```
curl --location --request POST 'https://file-server.itismy.space/api/file' \
--header 'X-FILE-SERVER-API-KEY: <YOUR_API_KEY>' \
--form 'data=@"/Users/konstantinyemelianov/Downloads/small-web-square-214-Konstantin Yemelianov.jpg"'
```
You've got created filename like: `file_1611755342142.jpg`

#### Get file
```
curl 'https://file-server.itismy.space/data/file_1611755342142.jpg'
```

