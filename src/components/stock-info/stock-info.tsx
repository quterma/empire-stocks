import "./stock-info.css";

import { StockPrice } from "../stock-price";
import { StockTitle } from "../stock-title";

import { StocksData, useWebSocket } from "./api/stock";
import { useState } from "react";
import { stockInfoMapper, StockUI } from "./stock-info.mapper";

export const StockInfo = () => {
	const [stockInfo, setStockInfo] = useState<StockUI>();

	const onMessage = (stocksData: StocksData) => {
		const stock = stocksData["s-aapl"];

		const stockInfo = stockInfoMapper(stock);

		setStockInfo(stockInfo);
	};

	useWebSocket("wss://wstest.fxempire.com?token=btctothemoon", {
		onMessage,
	});

	return (
		<div className="StockInfo">
			{stockInfo && (
				<>
					<StockTitle title={"Apple INC"} date={stockInfo.date} />
					<StockPrice up={stockInfo.up} price={stockInfo.price} change={stockInfo.change} percent={stockInfo.percent} />
				</>
			)}
		</div>
	);
};
