"use client";
import Head from "next/head";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useCoins, { Coin } from "../hooks/useCoins";
import axios from "axios";

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

export default function Home() {
	const [searchValue, setSearchValue] = useState("");
	const { data: coinList, status } = useCoins();
	const router = useRouter();

	if (status === "pending") {
		return <p>Loading...</p>;
	}

	if (status === "error") {
		return <p>Error!</p>;
	}

	const filteredCoins: Array<Coin> = coinList?.data.filter((coin: Coin) => coin.name.toLowerCase().includes(searchValue.toLowerCase()));

	const coins = filteredCoins.map((coin: Coin) => {
		return (
			<tr onClick={() => router.push(`coin/${coin.name.toLowerCase().replace(" ", "-")}`)} className={styles.tr} key={coin.id}>
				<td className={styles.td}>{coin.name}</td>
				<td className={styles.td}>${coin.price_usd}</td>

				<td className={styles.td} style={{ color: color(parseFloat(coin.percent_change_1h)) }}>
					{coin.percent_change_1h ? `${parseFloat(coin.percent_change_1h).toFixed(1)}%` : "-"}
				</td>
				<td className={styles.td} style={{ color: color(parseFloat(coin.percent_change_24h)) }}>
					{coin.percent_change_24h ? `${parseFloat(coin.percent_change_24h).toFixed(1)}%` : "-"}
				</td>

				<td className={styles.td} style={{ color: color(parseFloat(coin.percent_change_7d)) }}>
					{coin.percent_change_7d ? `${parseFloat(coin.percent_change_7d).toFixed(1)}%` : "-"}
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
			</main>
		</div>
	);
}
