import { useCallback, useEffect, useRef } from "react";

export type Config = {
	onOpen?: (event: any) => void;
	onMessage?: (event: StocksData) => void;
	onClose?: (event: any) => void;
	onError?: (event: any) => void;
};

export type Stock = {
	low52Weeks: number;
	high52Weeks: number;
	percentChange: number;
	change: number;
	previousClose: number;
	volume: number;
	last: number;
	low: number;
	high: number;
	close: number;
	open: number;
	utcOffset: number;
	time: string;
	date: string;
	lastUpdate: string;
	tickTime: string;
	marketCapFormatted: string;
	marketCap: number;
	marketOpen: boolean;
	historicalClose: {
		ytd: number;
		"1month": number;
		"1week": number;
		"3month": number;
		"5year": number;
		"1year": number;
	};
	enterpriseValue: string;
	enterpriseValueEbitda: string;
	timeExtended: string;
	dateExtended: string;
	lastUpdateExtended: string;
	extendedHoursType: string;
	percentChangeExtended: number;
	changeExtended: number;
	lastExtended: number;
};

export type StocksData = {
	[key: string]: Stock;
};

export const Status = {
	OPEN: "OPEN",
	CLOSED: "CLOSED",
};

export const useWebSocket = (url: string, config: Config) => {
	const subscriptionMessage = JSON.stringify({ type: "SUBSCRIBE", instruments: ["s-aapl"] });

	const wsRef = useRef<WebSocket>();
	const statusRef = useRef<typeof Status[keyof typeof Status]>();

	const connect = useCallback(() => {
		if (wsRef.current) return;

		const ws = new WebSocket(url);

		ws.onopen = ev => {
			ws.send(subscriptionMessage);
			config.onOpen && config.onOpen(ev);
			statusRef.current = Status.OPEN;
		};

		ws.onmessage = (ev: MessageEvent<string>) => {
			console.log("message");
			config.onMessage && config.onMessage(JSON.parse(ev.data) as StocksData);
		};

		ws.onerror = ev => {
			console.log("error");
			ws.close();
		};

		ws.onclose = ev => {
			console.log("close");
			config.onClose && config.onClose(ev);
		};

		wsRef.current = ws;
	}, [config, subscriptionMessage, url]);

	useEffect(() => {
		connect();
		return () => {
			if (statusRef.current === Status.OPEN) {
				wsRef.current?.close();
			}
		};
	}, [connect]);
};
