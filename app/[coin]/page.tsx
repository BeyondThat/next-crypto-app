"use client";
import dynamic from "next/dynamic";
import useCoin from "../../hooks/useCoin";
import {useParams} from "next/navigation";
const LineChart = dynamic(() => import("../components/LineChart"), {
    ssr: false,
});

export default function CoinPage() {
    const {coin}: {coin: string} = useParams();
    const {data, status} = useCoin("eur", coin, 7);

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
    console.log(data);
    return (
        <div>
            {coin}
            <LineChart coinData={formattedData} coin={coin} />
        </div>
    );
}
