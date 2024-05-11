"use client"
import dynamic from "next/dynamic";
import LoadingState from "../components/LoadingState"
import useFetchExchanges from "../../hooks/useFetchExchanges"
const ExchangeList = dynamic(() => import("../components/List"), {
    ssr: false,

});

export default function ExchangesPage() {

    const { data: exchangesListData, status: exchangesStatus } = useFetchExchanges();
    if (exchangesStatus === "pending" || exchangesListData === undefined) {
        return <LoadingState />
    }

    if (exchangesStatus === "error") {
        return <p>Error!</p>
    }

    return (
        <div>
            <main>
                <ExchangeList listData={exchangesListData} dataType="exchanges" />
            </main>
        </div>
    );
}
