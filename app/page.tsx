"use client";
import Head from "next/head";
import dynamic from "next/dynamic";
import styles from "./page.module.css";
import {
    useState,
    DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_REACT_NODES,
} from "react";
import useFetchCoins from "../hooks/useFetchCoins";

const CoinList = dynamic(() => import("./components/CoinList"), {
    ssr: false,
});

export default function Home() {
    const [searchValue, setSearchValue] = useState("");
    const {data: coinListData, status: coinsStatus} = useFetchCoins();

    if (coinsStatus === "pending") {
        return <p>Loading...</p>;
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

            <main className={styles.main}>
                <input
                    className={styles.input}
                    type="text"
                    placeholder="search"
                    onChange={(e) => {
                        setSearchValue(e.target.value);
                    }}
                />
                <CoinList coinListData={coinListData} searchValue={searchValue} />
            </main>
        </div>
    );
}
