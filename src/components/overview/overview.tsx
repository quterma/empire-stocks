import "./overview.css";
import { useRef } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

// @ts-ignore
// @ts-ignore
const options: Highcharts.Options = {
	title: {
		text: "My chart",
	},
	series: [
		{
			title: "AAPL stock price",
			type: "area",
			rangeSelector: {
				buttons: [
					{
						type: "hour",
						count: 1,
						text: "1h",
					},
					{
						type: "day",
						count: 1,
						text: "1D",
					},
					{
						type: "all",
						count: 1,
						text: "All",
					},
				],
				selected: 1,
				inputEnabled: false,
			},
			fillColor: {
				linearGradient: {
					x1: 0,
					y1: 0,
					x2: 0,
					y2: 1,
				},
				stops: [
					// @ts-ignore
					[0, Highcharts.getOptions().colors[0]],
					// @ts-ignore
					[1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get("rgba")],
				],
			},
			threshold: null,
			data: [1, 2, 3],
		},
	],
};

export const Overview = () => {
	const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

	return (
		<HighchartsReact highcharts={Highcharts} options={options} constructorType={"stockChart"} ref={chartComponentRef} />
	);
};
