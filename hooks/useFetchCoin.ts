import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {Currency} from "../types";

export default function useFetchCoin(
    currency: Currency,
    coin: string,
    numberOfDays: number,
) {
    return useQuery({
        queryKey: [currency],
        queryFn: () => _fetchCoin(currency, coin, numberOfDays),
    });
}

const _fetchCoin = async (currency: Currency,
    coin: string,
    numberOfDays: number): Promise<{
    prices: Array<[]>;
    market_caps: Array<[]>;
    total_volumes: Array<[]>;
}>  => {
    const path = `bitcoin.json`;
    const url = `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${currency}&days=${numberOfDays}`;
    return axios
        .get(url)
                .then((response) => {
            if (response.status !== 200) {
                console.error("API error. Loading static data.");
                return import(`../public/${path}`, {
                    assert: { type: "json" }
                }).then(data => data.default)

            }
            else if(coin === "bitcoin") {
                return response.data
            }
        })}
