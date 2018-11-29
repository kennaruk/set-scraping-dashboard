import "./env";

import { scrapingStockDataBySymbol } from "./controllers/set";
import { insertDataToInflux } from "./controllers/influx";

const scrapingSETBySymbol = async ({ symbol = "" } = {}) => {
	if (!symbol) return;
	const data = await scrapingStockDataBySymbol({ symbol });
	await insertDataToInflux({ data, symbol });
};

scrapingSETBySymbol({ symbol: "PTT" });
scrapingSETBySymbol({ symbol: "BBL" });
scrapingSETBySymbol({ symbol: "AOT" });
scrapingSETBySymbol({ symbol: "KBANK" });
