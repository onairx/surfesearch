import React from "react";
import { IBM_Plex_Mono } from "next/font/google";
const ibmPlexMono = IBM_Plex_Mono({
    subsets: ['latin'],
    weight: ['400', '700'],
});

export default function Navigation() {
    return (
        <nav className="w-full h-auto flex justify-end text-md p-5">
            <div className={`${ibmPlexMono.className} flex flex-col justify-end text-end mix-blend-difference text-white`}>
                <a href="#">About</a>
            </div>
        </nav>
    )
}