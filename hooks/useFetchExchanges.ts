import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Exchange } from "../types"

interface ListOfExchanges {
    data: Array<Exchange>;
}

export default function useFetchExchanges() {
    return useQuery({
        queryKey: ["exchanges"],
        queryFn: () => _fetchExchanges(),
        staleTime: 60000,
        refetchOnWindowFocus: false,
    });
}

const _fetchExchanges = async (): Promise<ListOfExchanges> => {
    const path = `coinlore_exchanges.json`;
    const url = "https://api.coinlore.net/api/exchanges/";

    return axios
        .get(url)
        .then((response) => {
            if (response.status !== 200) {
                console.error("API error. Loading static data.");
                return import(`../public/${path}`, {
                    assert: { type: "json" }
                }).then(data => data.default)

            }
            else {
                return response.data
            }
        })
}


