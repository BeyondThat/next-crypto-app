import {VictoryChart, VictoryLine, VictoryAxis} from "victory";

const sharedAxisStyles = {
    tickLabels: {fontSize: 4, padding: 5},
    grid: {stroke: "rgb(200,200,200)"},
};

export default function Linechart({
    coin,
    coinData,
}: {
    coin: string;
    coinData: any;
}) {
    return (
        <VictoryChart
            padding={{top: 40, bottom: 50, left: 100, right: 100}}
            domainPadding={{y: 5}}
            height={140}
        >
            <VictoryAxis
                dependentAxis={true}
                style={{
                    ...sharedAxisStyles,
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
            />
        </VictoryChart>
    );
}
