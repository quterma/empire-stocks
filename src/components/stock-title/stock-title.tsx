import "./stock-title.css";

export type Props = {
	title: string;
	date: string;
};

export const StockTitle = ({ title, date }: Props) => {
	return (
		<div>
			<div>Apple Inc</div>
			<div>{date}</div>
		</div>
	);
};
