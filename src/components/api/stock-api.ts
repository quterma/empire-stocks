export type Candle = {
	StartDate: string;
	StartTime: string;
	Open: number;
	High: number;
	Low: number;
	Close: number;
	Volume: number;
	Date: string;
	Change?: number;
};

const url = "https://test.fxempire.com/api/v1/en/stocks/chart/candles";

const fields = [
	"ChartBars.StartDate",
	"ChartBars.High",
	"ChartBars.Low",
	"ChartBars.StartTime",
	"ChartBars.Open",
	"ChartBars.Close",
	"ChartBars.Volume",
];

const urlConfig = {
	Identifier: "AAPL.XNAS",
	IdentifierType: "Symbol",
	AdjustmentMethod: "All",
	IncludeExtended: "False",
	_fields: fields.join(","),
};

const getCurrentDay = () => new Date().toLocaleDateString("en-US", { timeZone: "UTC" });
const getCurrentTime = () =>
	new Date().toLocaleTimeString("en-US", { timeStyle: "short", hour12: false, timeZone: "UTC" });
const getYesterday = () =>
	new Date(new Date().getTime() - 24 * 60 * 60 * 1000).toLocaleDateString("en-US", { timeZone: "UTC" });
const getYearAgo = () =>
	new Date(new Date().getTime() - 365 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
		timeZone: "UTC",
	});

export enum Frames {
	one_minute = "one_minute",
	five_minutes = "five_minutes",
	one_hour = "one_hour",
	one_week = "one_week",
}

const frames = {
	[Frames.one_minute]: {
		settings: {
			period: "1",
			Precision: "Minutes",
		},
		getTimeFrame: () => ({
			StartTime: getCurrentDay(),
			EndTime: `${getCurrentDay()} 23:59`,
		}),
	},
	[Frames.five_minutes]: {
		settings: {
			period: "5",
			Precision: "Minutes",
		},
		getTimeFrame: () => ({
			StartTime: getCurrentDay(),
			EndTime: `${getCurrentDay()} 23:59`,
		}),
	},
	[Frames.one_hour]: {
		settings: {
			period: "1",
			Precision: "Hours",
		},
		getTimeFrame: () => ({
			StartTime: `${getYesterday()} ${getCurrentTime()}`,
			EndTime: `${getCurrentDay()} ${getCurrentTime()}`,
		}),
	},
	[Frames.one_week]: {
		settings: {
			period: "168",
			Precision: "Hours",
		},
		getTimeFrame: () => ({
			StartTime: getYearAgo(),
			EndTime: `${getCurrentDay()} ${getCurrentTime()}`,
		}),
	},
};

export const getStocks = async (frame: Frames): Promise<Candle[]> => {
	const params = new URLSearchParams({ ...urlConfig, ...frames[frame].settings, ...frames[frame].getTimeFrame() });

	const urlToFetch = url + "?" + params.toString();
	const res = await fetch(urlToFetch);
	return res.json();
};
