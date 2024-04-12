"use client";

import React, {useEffect, useState} from "react";
import Link from "next/link";
import "../globals.css";
import {Currency} from "../../types";

export default function Navbar() {
    const [currency, setCurrency] = useState<Currency>("usd");
    useEffect(() => {
        sessionStorage.setItem("currency", currency);
        window.dispatchEvent(new Event("storage"));
    }, [currency]);

    return (
        <nav>
            <Link href={"/"}>Main Page</Link>

            <form onChange={(e) => setCurrency((e.target as HTMLFormElement).value)}>
                <select>
                    <option value="usd">Usd</option>
                    <option value="eur">Euro</option>
                </select>
            </form>
        </nav>
    );
}
