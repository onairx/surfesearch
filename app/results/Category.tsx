import React, { Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";

function TheCategory() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const category = searchParams.get('q')
    return (
        <div className="w-full h-auto  flex items-center md:px-34 px-2 pb-3 gap-5 border-b border-[#202020] bg-[#111111]">
            <Link
                href={`../results/web?q=${category}`}
                className={pathname.includes('web') ? 'webcat' : 'nonwebcat'}>
                <button className="cursor-pointer">Web results</button>
            </Link>
            <Link
                href={`../results/news?q=${category}`}
                className={pathname.includes('news') ? 'webcat' : 'nonwebcat'}>
                <button className="cursor-pointer">News</button>

            </Link>
            <Link
                href={`../results/videos?q=${category}`}
                className={pathname.includes('videos') ? 'webcat' : 'nonwebcat'}
            >
                <button className="cursor-pointer">Videos</button>
            </Link>
        </div>
    )
}
export default function Category() {
    return (
        <Suspense
            fallback={
                <div className="w-full h-full flex justify-start items-center py-20 px-5 text-5xl font-bold text-[#0a0a0a]">
                    Loading..
                </div>
            }
        >
            <TheCategory />
        </Suspense>
    )
}