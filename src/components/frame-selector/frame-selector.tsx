import { Frames } from "../api/stock-api";
import "./frame-selector.css";

type Props = {
	currentFrame: Frames;
	setFrame: React.Dispatch<React.SetStateAction<Frames>>;
};

const titles = {
	[Frames.one_minute]: "1 Minute",
	[Frames.five_minutes]: "5 Minutes",
	[Frames.one_hour]: "1 Hour",
	[Frames.one_week]: "1 Week",
};

export const FrameSelector = ({ currentFrame, setFrame }: Props) => {
	return (
		<div className="frame-container">
			{Object.entries(titles).map(([key, value]) => {
				return (
					<div
						className={`frame ${key === currentFrame ? "active" : ""}`}
						key={key}
						onClick={() => setFrame(key as Frames)}
					>
						{value}
					</div>
				);
			})}
		</div>
	);
};
