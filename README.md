# Database System 2 - Term project

### Set scraping dashboard

### Requirements

- Node.js
- NPM or Yarn
- Docker
- Docker-compose

### How to run

1. Clone this project by

`git clone https://github.com/kennaruk/set-scraping-dashboard.git`

2. Install dependencies by NPM or Yarn

with NPM run `npm install` or Yarn run `yarn`

3. Run database(InfluxDB) and dashboard(Grafana) container by

`docker-compose up -d`

4. Start scraping by NPM or Yarn

with NPM run `npm run dev`

or Yarn run `yarn dev`

5. Visit dashboard on localhost:1111

6. Configure your first time visit Grafana username/password

7. Create dashboard with this query pattern and replace each \${SET_SYMBOL} eg. BBL, AOT, KBANK, PTT

`SELECT "close" FROM "${SET_SYMBOL}" WHERE $timeFilter GROUP BY time($__interval)`
