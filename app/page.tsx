"use client";
import Head from "next/head";
import dynamic from "next/dynamic";
import styles from "./page.module.css";

import LoadingState from "./components/LoadingState";

import {useState} from "react";
import useFetchCoins from "../hooks/useFetchCoins";

const CoinList = dynamic(() => import("./components/List"), {
    ssr: false,
});

export default function Home() {
    //const {data: coinListData, status: coinsStatus} = useFetchCoins();
    const coinListData = {
        data: [
            {
                id: "string",
                name: "string",
                market_cap_usd: "1.4",
                percent_change_1h: "1.4",
                percent_change_7d: "1.4",
                percent_change_24h: "1.4",
                price_btc: "1.4",
                price_usd: "1.4",
            },
        ],
    };
    const coinsStatus = null;
    if (coinsStatus === "pending") {
        <LoadingState/>
    }

    if (coinsStatus === "error") {
        return <p>Error!</p>;
    }

    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <CoinList listData={coinListData} dataType="coins"/>
            </main>
        </div>
    );
}
