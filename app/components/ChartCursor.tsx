import {format} from "date-fns";
import React from "react";
import {
    Flyout,
    LineSegment,
    VictoryLabel,
    VictoryTooltip,
    VictoryVoronoiContainerProps,
} from "victory";

export default function ChartCursor<VictoryVoronoiContainerProps>(props:any) {
    function formatDate(date: number) {
        return format(date, "ccc kk:mm");
    }

    const {x, scale, y} = props;
    const range = scale.y.range();

    return (
        <g>
            <LineSegment
                style={{stroke: "black", strokeWidth: 1}}
                x1={x}
                x2={x}
                y1={range[0]}
                y2={range[1]}
            />
            <VictoryTooltip
                flyoutComponent={<Flyout style={{fill: "rgb(70,70,70)"}} />}
                cornerRadius={0}
                dx={0}
                flyoutHeight={20}
                flyoutWidth={32}
                centerOffset={{x: 22, y: 20}}
                orientation="left"
                labelComponent={
                    <VictoryLabel
                        style={{fontSize: 5, fill: "white", letterSpacing: 0.5}}
                    />
                }
                {...props}
            />
        </g>
    );
}
