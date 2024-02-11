import Head from "next/head";
import styles from "./page.module.css";

const coins = (
	<tr className={styles.tr}>
		<td className={styles.td}>btc</td>
		<td className={styles.td}>1</td>
	</tr>
);

export default function Home() {
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
