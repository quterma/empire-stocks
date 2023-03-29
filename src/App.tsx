import "./App.css";
import { Tabs } from "./components/tabs";
import { Overview } from "./components/overview";
import { History } from "./components/history";
import { StockInfo } from "./components/stock-info";

const App = () => {
	const tabConfig = {
		overview: {
			title: "Overview",
			component: <Overview />,
		},
		history: {
			title: "History",
			component: <History />,
		},
	};

	return (
		<div className="App">
			<StockInfo />
			<Tabs config={tabConfig} />
		</div>
	);
};

export default App;
