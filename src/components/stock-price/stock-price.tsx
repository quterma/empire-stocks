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
			<div>
				{up ? <span>up</span> : <span>down</span>}
				<span>{price}</span>
			</div>
			<div>
				<span>{change}</span>
				<span>{percent}</span>
			</div>
		</div>
	);
};
