"use client";
import dynamic from "next/dynamic";
import useCoin from "../../hooks/useCoin";
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import {Currency} from "../../types";

const LineChart = dynamic(() => import("../components/LineChart"), {
    ssr: false,
});

export default function CoinPage() {
    const {coin}: {coin: string} = useParams();
    const [currency, setCurrency] = useState(
        sessionStorage.getItem(("currency" || "usd")) as Currency,
    );

    const {data, status, refetch} = useCoin(currency, coin, 7);
    useEffect(() => {
        function updateCurrency() {
            const currency = sessionStorage.getItem("currency") as Currency;
            setCurrency(currency);
        }
        globalThis.addEventListener("storage", updateCurrency);

//        return () => {
  //          globalThis.removeEventListener("storage", updateCurrency);
   //     };
    }, []);

    console.log(currency);

    //  const status = null;
    if (status === "pending") {
        return <p>Loading...</p>;
    }

    if (status === "error") {
        return <p>Error!</p>;
    }

    const formattedData = data["prices"].map((item: Array<[]>) => {
        return {
            x: item[0], //date
            y: item[1], //price
        };
    });
    return (
        <div>
            {
                <LineChart
                    coinData={formattedData}
                    coin={coin}
                    currency={currency}
                />
            }
        </div>
    );
}
