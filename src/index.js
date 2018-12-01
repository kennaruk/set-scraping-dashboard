import "./env";

import { scrapingStockDataBySymbol } from "./controllers/set";
import { insertDataToInflux } from "./controllers/influx";
// import fs from "fs";
// const Json2csvParser = require("json2csv").Parser;
// const fields = ["date", "open", "high", "low", "close"];

const scrapingSETBySymbol = async ({ symbol = "" } = {}) => {
	if (!symbol) return;
	const data = await scrapingStockDataBySymbol({ symbol });
	// const json2csvParser = new Json2csvParser({ fields });
	// const csv = json2csvParser.parse(data);
	// fs.writeFile(
	// 	`${__dirname}/${symbol}-${new Date().getTime()}.csv`,
	// 	csv,
	// 	"utf8",
	// 	() => {
	// 		console.log(`write ${symbol}`);
	// 	}
	// );
	await insertDataToInflux({ data, symbol });
};

scrapingSETBySymbol({ symbol: "PTT" });
scrapingSETBySymbol({ symbol: "BBL" });
scrapingSETBySymbol({ symbol: "AOT" });
scrapingSETBySymbol({ symbol: "KBANK" });
