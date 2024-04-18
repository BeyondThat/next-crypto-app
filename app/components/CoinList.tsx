import {useState, useEffect} from "react"
import {Currency, Coin} from "../../types"
import styles from "../page.module.css";
import {useRouter} from "next/navigation"

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

export default function CoinList({coinListData, searchValue}:{coinListData:any, searchValue:string}) {

    const [eurRate, setEurRate] = useState<number>();

    const [currency, setCurrency] = useState(sessionStorage.getItem("currency") || "usd");

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

    const filteredCoins: Array<Coin> = coinListData?.data.filter((coin: Coin) =>
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
                        : `€${(parseFloat(coin.price_usd) / (eurRate || 1.1)).toFixed(2)}`}
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
    );
}
