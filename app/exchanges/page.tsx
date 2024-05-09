"use client"
import dynamic from "next/dynamic";
import LoadingState from "../components/LoadingState"
import { Exchange } from "../../types"
import useFetchExchanges from "../../hooks/useFetchExchanges"
const ExchangeList = dynamic(() => import("../components/List"), {
    ssr: false,

});

export default function ExchangesPage() {



    const exchangesStatus = null;
    //    const {data: ExchangesListData, status: exchangesStatus} = useFetchExchanges();
    if (exchangesStatus === "pending") {
        <LoadingState />
    }

    if (exchangesStatus === "error") {
        return <p>Error!</p>;
    }


    //console.log(ExchangesListData);
    const TestExchangesListData = {
        "5": {
            "id": "5",
            "name": "Binance",
            "name_id": "binance",
            "volume_usd": 100,
            "active_pairs": 1,
            "url": "https://www.binance.com",
            "country": "Japan"
        },
        "9": {
            "id": "9",
            "name": "Bitfinex",
            "name_id": "bitfinex2",
            "volume_usd": 10,
            "active_pairs": 2,
            "url": "https://www.bitfinex.com",
            "country": "Hong Kong"
        },
        "10": {
            "id": "10",
            "name": "bitFlyer",
            "name_id": "bitflyer",
            "volume_usd": 0,
            "active_pairs": 0,
            "url": "https://bitflyer.com/",
            "country": "Japan"
        },
        "11": {
            "id": "11",
            "name": "Bithumb",
            "name_id": "bithumb",
            "volume_usd": 1,
            "active_pairs": 76,
            "url": "https://www.bithumb.com",
            "country": "South Korea"
        },
        "14": {
            "id": "14",
            "name": "BitMEX",
            "name_id": "bitmex",
            "volume_usd": 0,
            "active_pairs": 0,
            "url": "https://www.bitmex.com/",
            "country": "Seychelles"
        }

    }

    return (
        <div>
            <main>
                <ExchangeList listData={TestExchangesListData} dataType="exchanges" />
            </main>
        </div>
    );
}
