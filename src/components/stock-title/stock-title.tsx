import "./stock-title.css";

export type Props = {
	title: string;
	date: string;
};

export const StockTitle = ({ title, date }: Props) => {
	return (
		<div className="container">
			<div className="title">{title}</div>
			<div className="date">As of: {date}</div>
		</div>
	);
};
