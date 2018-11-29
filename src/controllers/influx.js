const Influx = require("influx");

const measurement = "SET_DATA";

const influx = new Influx.InfluxDB({
	host: "localhost",
	port: 1112,
	database: "SET_database",
	schema: [
		{
			measurement,
			fields: {
				open: Influx.FieldType.FLOAT,
				high: Influx.FieldType.FLOAT,
				low: Influx.FieldType.FLOAT,
				close: Influx.FieldType.FLOAT,
				symbol: Influx.FieldType.STRING
			},
			tags: ["symbol"]
		}
	]
});

const formatJsonsToInfluxPoints = ({ jsons, symbol }) => {
	return jsons.map(({ date, open, high, low, close }) => {
		return {
			measurement,
			tags: {
				symbol
			},
			fields: {
				open,
				high,
				low,
				close,
				symbol
			},
			timestamp: parseInt(date)
		};
	});
};
export const insertDataToInflux = async ({ data, symbol }) => {
	const jsons = formatJsonsToInfluxPoints({ jsons: data, symbol });
	try {
		await influx.writePoints(jsons, {
			database: "SET_database",
			precision: "ms"
		});
		console.log(`insert ${symbol} points`);
	} catch (error) {
		console.log(`error: ${error}`);
	}
};
