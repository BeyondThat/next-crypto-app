import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {Exchange} from "../types"



interface ListOfExchanges {
    data: Array<Exchange>;
}

export default function useFetchExchanges() {
    return useQuery({
        queryKey: ["coins"],
        queryFn: () => _fetchExchanges(),
        staleTime: 60000,
        refetchOnWindowFocus: false,
    });
}

const _fetchExchanges = (): Promise<ListOfExchanges> =>
    axios
        .get("https://api.coinlore.net/api/exchanges/")
        .then((response) => response.data);
