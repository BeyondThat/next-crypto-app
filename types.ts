export interface ListOfCoins {
    data: Array<Coin>;
}

export type FilteredCoins = Array<Coin>;

export interface Coin {
    [key:string]:any;
    id: string;
    name: string;
    market_cap_usd: string;
    percent_change_1h: string;
    percent_change_7d: string;
    percent_change_24h: string;
    price_btc: string;
    price_usd: string;
}

export interface PriceDifference {
    price: number;
    volume24H: number;
    priceDifference: {
        "1H": number;
        "24H": number;
        "7D": number;
    };
}

export type Currency = "usd" | "eur";

export type DataType = "coins" | "exchanges";

export interface Exchange {
    [key: string]:any;
    id: string;
    name: string;
    volume_usd: number;
    active_pairs: number;
    url: string;
    time: string;
}

