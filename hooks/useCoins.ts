import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export interface Coin {
	id: string;
	name: string;
	market_cap_usd: string;
	percent_change_1h: string;
	percent_change_7d: string;
	percent_change_24h: string;
	price_btc: string;
	price_usd: string;
}

interface ListOfCoins {
	data: Array<Coin>;
}

export default function useCoins() {
	return useQuery({ queryKey: ["coins"], queryFn: () => fetchCoins(), staleTime: 60000, refetchOnWindowFocus: false });
}

const fetchCoins = (): Promise<ListOfCoins> =>
	axios.get(`https://api.coinlore.net/api/tickers/?start=0&limit=25`).then((response) => response.data);
