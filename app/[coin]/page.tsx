"use client";
import useCoin from "../../hooks/useCoin";
import {useParams} from "next/navigation";
export default function CoinPage() {
    const {coin}: {coin: string} = useParams();
    const {data, status} = useCoin("eur", coin, 7);
    console.log(data);
    return <div>{coin}</div>;
}
