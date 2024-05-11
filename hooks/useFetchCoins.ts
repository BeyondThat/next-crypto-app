import axios from "axios";
import {useQuery} from "@tanstack/react-query";

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

export default function useFetchCoins() {
    return useQuery({
        queryKey: ["coins"],
        queryFn: () => _fetchCoins(),
        staleTime: 60000,
        refetchOnWindowFocus: false,
    });
}

const _fetchCoins = async (): Promise<ListOfCoins> => {
    const path = `coinlore_coins.json`;
    const url = "https://api.coinlore.net/api/tickers/?start=0&limit=25";
    return axios
        .get(url)
                .then((response) => {
            if (response.status !== 200) {
                console.error("API error. Loading static data.");
                return import(`../public/${path}`, {
                    assert: { type: "json" }
                }).then(data => data.default)

            }
            else {
                return response.data
            }
        })}
