"use client";
import { useState, useEffect } from "react";
import { Currency, Coin, DataType, Exchange } from "../../types";
import "../globals.css";
import styles from "../page.module.css";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

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



function formatCurrency(value: number) {
    let a = new Intl.NumberFormat("en-IN", {
        maximumSignificantDigits: 7,
    }).format(value);
    let b = value.toLocaleString("de-DE");
    //console.log(b);
    return b;
}

export default function List({
    listData,
    dataType,
}: {
    listData: any;
    dataType: DataType;
}) {
    const [data, setData] = useState(listData);
    const [eurRate, setEurRate] = useState<number>();

    //console.log(data);

    const [currency, setCurrency] = useState(
        sessionStorage.getItem("currency") || "usd",
    );

    const [searchValue, setSearchValue] = useState("");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    const router = useRouter();

    function sortData(sortBy: keyof Exchange) {
        //const sortedCoinsData: Array<Coin> = listData?.data.sort((a: number, b: number) => a - b);
        //const sortedExchangesData = (Object.values(data) as Array<Exchange>);

        let sortedExchangesData = (Object.values(data) as Array<Exchange>);
        if (typeof (sortedExchangesData[0][sortBy]) === "string") {
            sortedExchangesData = sortedExchangesData.sort((a, b) => (a[sortBy] as string).localeCompare(b[sortBy] as string));
            console.log(5);
        }
        //if (!isNaN(Number(sortedExchangesData[0][sortBy]))) {
        else {
            sortedExchangesData = sortedExchangesData.sort((a, b) => (a[sortBy] as number) - (b[sortBy] as number));
        }

        if (sortOrder === "asc") {
            setSortOrder("desc");
            setData(sortedExchangesData.reverse())
        }
        else {
            setSortOrder("asc");
            setData(sortedExchangesData);
        }
        //console.log(sortedExchangesData[2]);
        //setData(sortedExchangesData);
    }

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

    let list;
    let tableHead;

    if (dataType === "coins") {
        const filteredCoinsData: Array<Coin> = listData?.data.filter(
            (value: Coin) =>
                value.name.toLowerCase().includes(searchValue.toLowerCase()),
        );

        list = filteredCoinsData.map((coin: Coin) => {
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
                            : `€${(parseFloat(coin.price_usd) / (eurRate || 1.1)).toFixed(2)}`}
                    </td>

                    <td
                        className={styles.td}
                        style={{ color: color(parseFloat(coin.percent_change_1h)) }}
                    >
                        {coin.percent_change_1h
                            ? `${parseFloat(coin.percent_change_1h).toFixed(1)}%`
                            : "-"}
                    </td>
                    <td
                        className={styles.td}
                        style={{ color: color(parseFloat(coin.percent_change_24h)) }}
                    >
                        {coin.percent_change_24h
                            ? `${parseFloat(coin.percent_change_24h).toFixed(1)}%`
                            : "-"}
                    </td>

                    <td
                        className={styles.td}
                        style={{ color: color(parseFloat(coin.percent_change_7d)) }}
                    >
                        {coin.percent_change_7d
                            ? `${parseFloat(coin.percent_change_7d).toFixed(1)}%`
                            : "-"}
                    </td>
                </tr>
            );
        });

        tableHead = (
            <>
                <th className={styles.th}>Name</th>
                <th className={styles.th}>Price</th>
                <th className={styles.th}>1H</th>
                <th className={styles.th}>24H</th>
                <th className={styles.th}>7D</th>
            </>
        );
    } else {
        const filteredExchangesData = (
            Object.values(data) as Array<Exchange>
        ).filter(
            (exchange: Exchange) =>
                exchange.name.toLowerCase().includes(searchValue.toLowerCase()) &&
                exchange.volume_usd !== 0,
        );

        list = filteredExchangesData.map((exchange: Exchange) => {
            return (
                <tr
                    onClick={() =>
                        router.push(`${exchange.name.toLowerCase().replace(" ", "-")}`)
                    }
                    className={`${styles.tr} ${styles.trBody}`}
                    key={exchange.id}
                >
                    <td className={styles.td}>{exchange.name}</td>
                    <td className={styles.td}>
                        {currency === "usd"
                            ? `$${formatCurrency(exchange.volume_usd)}`
                            : `€${(exchange.volume_usd / (eurRate || 1.1)).toFixed(2)}`}
                    </td>
                    <td className={styles.td}>{exchange.active_pairs}</td>
                </tr>
            );
        });

        tableHead = (
            <>
                <th className={styles.th} onClick={() => sortData("name")}>Name</th>
                <th className={styles.th} onClick={() => sortData("volume_usd")}>Total Volume</th>
                <th className={styles.th} onClick={() => sortData("active_pairs")}>Markets</th>
            </>
        );
    }

    return (
        <div className="card columns">
            <input
                className={styles.input}
                type="text"
                placeholder={`Search ${dataType === "coins" ? "Coins" : "Exchanges"}`}
                onChange={(e) => {
                    setSearchValue(e.target.value);
                }}
            />
            <table className={styles.table}>
                <thead>
                    <tr className={styles.tr}>{tableHead}</tr>
                </thead>
                <tbody>{list}</tbody>
            </table>
        </div>
    );
}
