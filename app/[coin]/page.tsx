"use client";
import dynamic from "next/dynamic";
import useCoin from "../../hooks/useCoin";
import {useParams} from "next/navigation";
const Linechart = dynamic(() => import("../components/LineChart"), {
    ssr: false,
});

export default function CoinPage() {
    const {coin}: {coin: string} = useParams();
    const {data, status} = useCoin("eur", coin, 7);
    console.log(data)
    return (
        <div>
            {coin}
            <Linechart />
        </div>
    );
}
