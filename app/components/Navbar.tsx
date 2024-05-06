"use client";

import React, {useEffect, useState} from "react";
import Link from "next/link";
import "../globals.css";
import {Currency} from "../../types";
import {usePathname} from "next/navigation";

export default function Navbar() {
    const [currency, setCurrency] = useState<Currency>("usd");
    useEffect(() => {
        sessionStorage.setItem("currency", currency);
        window.dispatchEvent(new Event("storage"));
    }, [currency]);

    const path = usePathname();
    return (
        <nav>
            <ul>
                <li>
                    <Link href={"/"} className={path == "/" ? "active" : ""}>
                        Cryptocurrencies
                    </Link>
                </li>
                <li>
                    <Link
                        href={"/exchanges"}
                        className={path == "/exchanges" ? "active" : ""}
                    >
                        Exchanges
                    </Link>
                </li>
            </ul>
            <form onChange={(e) => setCurrency((e.target as HTMLFormElement).value)}>
                <select>
                    <option value="usd">Usd</option>
                    <option value="eur">Euro</option>
                </select>
            </form>
        </nav>
    );
}
