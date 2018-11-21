import "./env";

import { scrapingStockDataBySymbol } from "./controllers/set";

const main = async ({ symbol = "" } = {}) => {
	if (!symbol) return;
	const data = await scrapingStockDataBySymbol({ symbol });
	// console.log(data);
};
// main({ symbol: "PTT" });
main();
