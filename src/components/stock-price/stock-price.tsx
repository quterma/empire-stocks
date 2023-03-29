import "./stock-price.css";

export type Props = {
	up: boolean;
	price: string;
	change: string;
	percent: string;
};

export const StockPrice = ({ price, change, percent, up }: Props) => {
	return (
		<div>
			<div className="price-container">
				<div className="triangle-wrapper">
					<div className={`triangle-${up ? "up" : "down"}`}></div>
				</div>
				<div className="price">{price}</div>
			</div>
			<div className="subinfo-container">
				<div className={up ? "up" : "down"}>{change}</div>
				<div className={up ? "up" : "down"}>({percent}%)</div>
			</div>
		</div>
	);
};
