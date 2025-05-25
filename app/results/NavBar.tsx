import React from "react";
import SearchBar from "../components/SearchBar";
import Link from "next/link";


export default function NavBar() {
    return (
        <section className="w-full h-auto md:flex md:justify-start md:flex-row justify-center items-center md:gap-10 md:py-3 md:px-5 p-2
            flex flex-col gap-2">
            <Link href="/">
                <div className="flex flex-col justify-start items-start w-fit h-auto text-start pointer-events-none">
                    <h1 className='text-3xl font-bold text-transparent bg-gradient-to-r from-[#FF7E9F] to-[#0051C3] bg-clip-text'
                    >
                        Surfe
                    </h1>
                </div>
            </Link>
            <div className="w-fit">
                <SearchBar showIcon={false} />
            </div>
        </section>
    )
}