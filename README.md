# Transporter

Transporter web application

## Prerequisite
- Node v8 or upper
- yarn or npm

## How to use
- copy dotenv from `./deploy/env/dev/dotenv` to .env
- first run this command if never do before : `npm install or yarn install`
- then start service : `npm start or yarn start`
- normally service will serve with port 6484 (http://localhost:6484)
- pls run server also for get existing shipping detail. (https://github.com/WarmVissarutRonaldoDude/transporter-backend)

## Health check
http://localhost:6484/ping

## Landing
http://localhost:6484

## Provided ROUTE
- /ping : health check
- / : landing page (currently just get shipping detail)

## TODO LIST
- Page for create shipping form
- UI/UX