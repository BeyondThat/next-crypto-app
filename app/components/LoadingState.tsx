import { Watch } from "react-loader-spinner";

export default function LoadingState() {
    return (
        <Watch
            visible={true}
            height="80"
            width="80"
            radius="48"
            color="#5267fe"
            ariaLabel="watch-loading"
            wrapperStyle={{
                "paddingTop": "10em",
            }}
            wrapperClass=""
        />
    );
}
