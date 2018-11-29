import $ from "cheerio";
import request from "request";
import moment from "moment";

/* Request */
const SET_BASE_URL =
	"https://www.set.or.th/set/historicaltrading.do?language=en&country=US&type=trading";

const symbolAndPageToQueryUrl = ({ symbol, page = 0 }) => {
	const symbolAndPageQuery = `symbol=${symbol}&page=${page}`;
	return `${SET_BASE_URL}&${symbolAndPageQuery}`;
};
const requestToHtml = ({ url }) => {
	return new Promise((resolve, reject) => {
		const options = {
			method: "GET",
			url
		};
		request(options, function(error, response, body) {
			if (error) reject(error);
			else resolve(body);
		});
	});
};

/* Cheerio */
const formatSetHtmlToJsons = ({ html }) => {
	html = html.toLowerCase();
	return new Promise(async (resolve, reject) => {
		try {
			const $html = $.load(html);

			const tables = $html("table");
			const tbody = tables.find("tbody");
			const rows = tbody.find("tr");

			let jsons = [];
			rows.each((i, row) => {
				const data = $(row).find("td");
				jsons.push({
					date: moment(
						$(data[0])
							.text()
							.trim(),
						"DD/MM/YYYY"
					).format("x"),
					open: parseFloat(
						$(data[1])
							.text()
							.trim()
					),
					high: parseFloat(
						$(data[2])
							.text()
							.trim()
					),
					low: parseFloat(
						$(data[3])
							.text()
							.trim()
					),
					close: parseFloat(
						$(data[4])
							.text()
							.trim()
					)
				});
			});
			resolve(jsons);
		} catch (error) {
			reject(error);
		}
	});
};

/* Main */
export const scrapingStockDataBySymbol = async ({ symbol }) => {
	try {
		let data = [];
		for (const page of Array(3).keys()) {
			const baseScrapingUrl = symbolAndPageToQueryUrl({ symbol, page });
			const html = await requestToHtml({ url: baseScrapingUrl });
			const jsons = await formatSetHtmlToJsons({ html });
			data.push(...jsons);
		}
		return data;
	} catch (error) {
		console.log(`error: ${error}`);
	}
	// console.log(html);
};
