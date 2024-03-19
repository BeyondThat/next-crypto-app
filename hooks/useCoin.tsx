import {useQuery} from "@tanstack/react-query";
import axios from "axios";

type Currency = "usd" | "eur";

const fetchCoin = (
    currency: Currency,
    coin: string | undefined,
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

export default function useCoin(
    currency: Currency,
    coin: string | undefined,
    numberOfDays: number,
) {
    return useQuery({
        queryKey: ["coin"],
        queryFn: () => fetchCoin(currency, coin, numberOfDays),
    });
}
