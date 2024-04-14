"use client";
import Head from "next/head";
import styles from "./page.module.css";
import {useRouter} from "next/navigation";
import {useState, useEffect} from "react";
import useFetchCoins, {Coin} from "../hooks/useFetchCoins";
import {Currency} from "../types";

function color(priceChange: number): string {
    if (priceChange === null) {
        return "undefined";
    } else {
        priceChange = parseFloat(priceChange.toFixed(1));

        if (priceChange > 0) {
            return "rgb(50,200,0)";
        } else if (priceChange < 0) {
            return "red";
        } else {
            return "black";
        }
    }
}
//error_code: 429, error_message: "You've exceeded the Rate Limit.
export default function Home() {
    const [searchValue, setSearchValue] = useState("");
    const [currency, setCurrency] = useState("usd");
    const [eurRate, setEurRate] = useState<number>(1.1);
    const {data: coinList, status: coinsStatus} = useFetchCoins();
    const router = useRouter();

    useEffect(() => {
        globalThis.addEventListener("storage", () => {
            const currency = sessionStorage.getItem("currency") as Currency;
            setCurrency(currency);
        });

        async function fetchEur() {
            try {
                const res = await fetch(
                    "https://data-api.ecb.europa.eu/service/data/EXR/D.USD.EUR.SP00.A?format=csvdata&startPeriod=2024-04-10",
                );

                const dateAndPrice = /202[4-9].+?,.+?,/g;
                const text = await res.text();
                const result = text.match(dateAndPrice);
                const data = result![result!.length - 1].split(",");
                setEurRate(Number(data[1]));
            } catch {
                setEurRate(1.1);
            }
        }

        fetchEur();
    }, []);

    if (coinsStatus === "pending") {
        return <p>Loading...</p>;
    }

    if (coinsStatus === "error") {
        return <p>Error!</p>;
    }

    const filteredCoins: Array<Coin> = coinList?.data.filter((coin: Coin) =>
        coin.name.toLowerCase().includes(searchValue.toLowerCase()),
    );
    const coins = filteredCoins.map((coin: Coin) => {
        return (
            <tr
                onClick={() =>
                    router.push(`${coin.name.toLowerCase().replace(" ", "-")}`)
                }
                className={`${styles.tr} ${styles.trBody}`}
                key={coin.id}
            >
                <td className={styles.td}>{coin.name}</td>
                <td className={styles.td}>
                    {currency === "usd"
                        ? `$${parseFloat(coin.price_usd).toFixed(2)}`
                        : `€${(parseFloat(coin.price_usd) / eurRate).toFixed(2)}`}
                </td>

                <td
                    className={styles.td}
                    style={{color: color(parseFloat(coin.percent_change_1h))}}
                >
                    {coin.percent_change_1h
                        ? `${parseFloat(coin.percent_change_1h).toFixed(1)}%`
                        : "-"}
                </td>
                <td
                    className={styles.td}
                    style={{color: color(parseFloat(coin.percent_change_24h))}}
                >
                    {coin.percent_change_24h
                        ? `${parseFloat(coin.percent_change_24h).toFixed(1)}%`
                        : "-"}
                </td>

                <td
                    className={styles.td}
                    style={{color: color(parseFloat(coin.percent_change_7d))}}
                >
                    {coin.percent_change_7d
                        ? `${parseFloat(coin.percent_change_7d).toFixed(1)}%`
                        : "-"}
                </td>
            </tr>
        );
    });

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
                <div className={styles.align}>
                    <table className={styles.table}>
                        <thead>
                            <tr className={styles.tr}>
                                <th className={styles.th}>Name</th>
                                <th className={styles.th}>Price</th>
                                <th className={styles.th}>1H</th>
                                <th className={styles.th}>24H</th>
                                <th className={styles.th}>7D</th>
                            </tr>
                        </thead>
                        <tbody>{coins}</tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}
