import React from "react";
import Link from "next/link";
import waitingCat from "@/public/assets/waiting-cat.svg";
import Image from "next/image";

export default function Crave() {
    return (
        <section className="w-[100vw] h-[100vh] p-5 flex flex-col items-center justify-center text-center gap-5 bg-[#f4f1de] text-[#0a0a0a]">
            <div className="w-full h-[30vh] flex justify-center items-center">
                <Image src={waitingCat} alt="waiting cat" width={300} height={300} />
            </div>
            <div>
                <Link href="/" className="flex flex-col items-center justify-center gap-5">
                    <h1 className="md:text-3xl text-xl">Crave is currently under development 😅</h1>
                    <button className="font-bold md:text-3xl text-xl border
                    w-auto h-20 cursor-pointer bg-[#ffffff] border-[#c9c9c9] px-10 py-1 rounded-2xl">Go to Surfe home</button>
                </Link>
            </div>
        </section >
    )
}