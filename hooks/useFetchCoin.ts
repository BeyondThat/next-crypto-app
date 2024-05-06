import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {Currency} from "../types";

const _fetchCoin = (
    currency: Currency,
    coin: string,
    numberOfDays: number,
): Promise<{
    prices: Array<[]>;
    market_caps: Array<[]>;
    total_volumes: Array<[]>;
}> =>
    axios
        .get(
            `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${currency}&days=${numberOfDays}`,
        )
        .then((response) => response.data);

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