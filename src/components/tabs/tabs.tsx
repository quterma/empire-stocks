import "./tabs.css";
import { useState, ReactNode } from "react";

type Tab = { component: ReactNode; title: string };
export type Props = {
	config: Record<string, Tab>;
};

export const Tabs = ({ config }: Props) => {
	const [activeTab, setActiveTab] = useState<string>();

	return (
		<>
			<div className="header">
				{Object.entries(config).map(([key, tab]) => {
					return (
						<div className={`tab ${key === activeTab ? "active" : ""}`} key={key} onClick={() => setActiveTab(key)}>
							{tab.title}
						</div>
					);
				})}
			</div>
			{activeTab ? <div>{config[activeTab].component}</div> : null}
		</>
	);
};
