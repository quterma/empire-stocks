import { Stock } from "./api/stock";

export type StockUI = {
	date: string;
	price: string;
	change: string;
	percent: string;
	up: boolean;
};

export const stockInfoMapper = (stock: Stock) => {
	const sign = stock.change > 0 ? "+" : "-";
	return {
		date: formatStockDate(stock.lastUpdate, stock.utcOffset),
		price: `${stock.last}`,
		change: `${sign}${stock.change}`,
		percent: `${sign}${stock.percentChange}`,
		up: stock.change > 0,
	};
};

const formatStockDate = (dateString: string, utcOffset: number) => {
	const timeOptions = {
		timeStyle: "medium",
		dateStyle: "medium",
		hour12: false,
		timeZone: "UTC",
	} as const;
	const date = new Date(dateString).toLocaleString("en-US", timeOptions);

	return `${date} UTC ${utcOffset}`;
};
