import "./App.css";
import { Tabs } from "./components/tabs";
import { Overview } from "./components/overview";
import { History } from "./components/history";
import { StockInfo } from "./components/stock-info";
import { useEffect, useState } from "react";
import { Candle, Frames, getStocks } from "./components/api/stock-api";
import { FrameSelector } from "./components/frame-selector";
import { Loader } from "./components/loader";

const App = () => {
	const [activeTab, setActiveTab] = useState<string>("overview");
	const [frame, setFrame] = useState<Frames>(Frames.one_minute);
	const [stockData, setStockData] = useState<Candle[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isError, setIsError] = useState<boolean>(false);

	useEffect(() => {
		setIsLoading(true);
		getStocks(frame)
			.then(setStockData)
			.catch(err => setIsError(true))
			.finally(() => setIsLoading(false));
	}, [activeTab, frame]);

	const tabConfig = {
		overview: {
			title: "Overview",
			component: isError ? (
				<div className="error">Something went wrong!</div>
			) : isLoading ? (
				<Loader />
			) : (
				<Overview stockData={stockData} />
			),
		},
		history: {
			title: "History",
			component: isError ? (
				<div>Something went wrong!</div>
			) : isLoading ? (
				<Loader />
			) : (
				<History stockData={stockData} />
			),
		},
	};

	return (
		<div className="App">
			<StockInfo />
			<Tabs activeTab={activeTab} setActiveTab={setActiveTab} config={tabConfig}>
				<FrameSelector currentFrame={frame} setFrame={setFrame} />
			</Tabs>
		</div>
	);
};

export default App;
