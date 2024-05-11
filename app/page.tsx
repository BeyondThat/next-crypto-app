"use client";
import Head from "next/head";
import dynamic from "next/dynamic";
import LoadingState from "./components/LoadingState";
import useFetchCoins from "../hooks/useFetchCoins";

const CoinList = dynamic(() => import("./components/List"), {
    ssr: false,
});

export default function Home() {
    const {data: coinListData, status: coinsStatus} = useFetchCoins();

    if (coinsStatus === "pending" || coinListData === undefined) {
        return <LoadingState/>
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
                 <CoinList listData={coinListData.data} dataType="coins"/> 
            </main>
        </div>
    );
}
