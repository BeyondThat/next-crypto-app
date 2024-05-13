"use client";
import dynamic from "next/dynamic";
import useFetchCoin from "../../../hooks/useFetchCoin";
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import {Currency} from "../../../types";

const LineChart = dynamic(() => import("../../components/LineChart"), {
    ssr: false,
});

export default function CoinPage() {
    const params = useParams();
     const [currency, setCurrency] = useState(
      () => params.currency || "usd"
     );

    const {data, status, refetch} = useFetchCoin(currency as Currency, params.coin as string, 7);

    useEffect(() => {
        function updateCurrency() {
            const currency = sessionStorage.getItem("currency") as Currency;
            setCurrency(currency);

        }
        globalThis.addEventListener("storage", updateCurrency);

    }, []);

    if (status === "pending") {
        return <p>Loading...</p>;
    }

    if (status === "error") {
        return <p>Error!</p>;
    }

    const formattedData = data["prices"].map((item: Array<number>) => {
        return {
            x: item[0], //date
            y: currency === "usd" ? item[1] : (item[1] / 1.1), //price
        };
    });
    return (
        <div>
            {
                <LineChart
                    coinData={formattedData}
                    coin={params.coin as string}
                    currency={currency as Currency}
                />
            }
        </div>
    );
}
