import "./history.css";
import { Candle } from "../api/stock-api";
import { useState } from "react";

type Props = {
	stockData: Candle[];
};

type Columns = keyof Pick<Candle, "Date" | "High" | "Low" | "Open" | "Close" | "Change">;
export const History = ({ stockData }: Props) => {
	const columns: Array<Columns> = ["Date", "High", "Low", "Open", "Close", "Change"];

	const [sortColumn, setSortColumn] = useState<Columns>("Date");
	const [isUp, setIsUp] = useState<boolean>(false);

	console.log("stockData", stockData);

	const handleSort = (col: Columns) => {
		if (col === sortColumn) {
			setIsUp(isUp => !isUp);
		} else {
			setSortColumn(col);
		}
	};

	const toFixed = (num: any, places = 2) => Number(num).toFixed(places);
	const formatters = {
		Date: (date: any) =>
			new Date(date).toLocaleDateString("en-US", { dateStyle: "medium", hour12: false, timeZone: "UTC" }),
		High: toFixed,
		Low: toFixed,
		Open: toFixed,
		Close: toFixed,
		Change: (diff: any) => {
			return diff === undefined ? (
				"no data"
			) : (
				<div className={diff >= 0 ? "history-green" : "history-red"}>{toFixed(diff)}%</div>
			);
		},
	};

	const dataSort = (candle1: Candle, candle2: Candle) => {
		if (candle1[sortColumn]! > candle2[sortColumn]!) return isUp ? 1 : -1;
		if (candle1[sortColumn]! < candle2[sortColumn]!) return isUp ? -1 : 1;
		return 0;
	};

	return (
		<table className="history-table">
			<thead className="history-thead">
				<tr>
					{columns.map(col => {
						return (
							<th key={col}>
								<div className="history-th" onClick={() => handleSort(col)}>
									<div className="history-title">{`${col === "Change" ? "% " : ""}${col}`}</div>
									<div className="history-button">
										<div className={`history-up ${col === sortColumn && isUp ? "history-active" : ""}`}></div>
										<div className={`history-down ${col === sortColumn && !isUp ? "history-active" : ""}`}></div>
									</div>
								</div>
							</th>
						);
					})}
				</tr>
			</thead>
			<tbody className="history-tbody">
				{stockData.sort(dataSort).map(candle => {
					return (
						<tr key={candle.Date}>
							{columns.map(col => {
								return (
									<td key={col}>
										<div className="history-td">{formatters[col](candle[col])}</div>
									</td>
								);
							})}
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};
