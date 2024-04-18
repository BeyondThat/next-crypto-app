import {
    VictoryChart,
    VictoryLine,
    VictoryAxis,
    VictoryVoronoiContainer,
} from "victory";
import {format} from "date-fns";
import {Currency} from "../../types";
import ChartCursor from "./ChartCursor";

const sharedAxisStyles = {
    tickLabels: {fontSize: 4, padding: 5},
    grid: {stroke: "rgb(200,200,200)"},
};

function formatDate(date: number) {
    return format(date, "HH:mm");
}

function formatCurrency(value: number, currency: Currency) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: currency,

        minimumFractionDigits: 2,
    }).format(value);
}

export default function Linechart({
    coin,
    coinData,
    currency,
}: {
    coin: string;
    coinData: any;
    currency: Currency;
}) {
    return (
        <VictoryChart
            padding={{top: 40, bottom: 50, left: 100, right: 100}}
            domainPadding={{y: 5}}
            height={140}
            containerComponent={
                <VictoryVoronoiContainer
                    title={coin}
                    labels={(point: any) => `${formatCurrency(point.datum.y, currency)}`}
                    radius={50}
                    voronoiDimension={"x"}
                    labelComponent={<ChartCursor />}
                />
            }
        >
            <VictoryAxis
                dependentAxis={true}
                style={{
                    ...sharedAxisStyles,
                }}
                tickFormat={(tick) => {
                    return formatCurrency(tick, currency);
                }}
            />
            <VictoryLine
                data={coinData}
                style={{
                    data: {strokeWidth: 1, stroke: "rgb(40,140,255)"},
                }}
            />
            <VictoryAxis
                name="testAxis"
                style={{...sharedAxisStyles}}
                tickCount={7}
                width={100}
                tickFormat={(tick: number) => formatDate(tick)}
            />
        </VictoryChart>
    );
}
