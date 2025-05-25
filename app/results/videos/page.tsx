'use client'
import React from "react";
import { useSearchParams } from "next/navigation";

export default function Videos() {
    const [webResults, setWebResults] = React.useState([])
    const searchParams = useSearchParams();
    const query = searchParams.get("q");
    React.useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`/api/webresults?q=${query}`)
                const data = await response.json()
                setWebResults(data?.videos.results)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [query])
    function decodeHtmlEntities(str: string): string {
        return str.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec))
            .replace(/&#x([\da-fA-F]+);/g, (match, hex) => String.fromCharCode(parseInt(hex, 16)))
            .replace(/&quot;/g, '"')
            .replace(/&apos;/g, "'")
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>');
    }

    function stripHtmlAndDecode(html: string): string {
        const text = html.replace(/<[^>]+>/g, "");
        return decodeHtmlEntities(text);
    }

    const theResults = webResults?.map((results, index) => {
        return (
            <section key={index}>
                <div key={index} className="md:w-[60vw] w-full h-auto border bg-[#f7f7f7] p-5 rounded-2xl border-[#c9c9c9]
                flex flex-col justify-center items-start gap-2 overflow-clip">
                    <a href={(results as any).url} target="_blank" rel="noopener noreferrer">
                        <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-md bg-[#eaeaea] flex justify-center items-center">
                                <img
                                    src={(results as any).meta_url.favicon}
                                    alt={(results as any).meta_url.netloc}
                                    className="w-4 h-4 rounded-sm"
                                />
                            </div>
                            <div className="flex flex-col justify-center overflow-clip md:w-[50vw] w-full gap-0">
                                <p className="m-0 text-md font-normal leading-tight">{((results as any).video.creator)}</p>
                                <p className="text-[#7b7b7b] m-0 text-[0.8em] leading-tight">{(results as any).url}</p>
                            </div>
                        </div>
                    </a>
                    <a href={(results as any).url} target="_blank" rel="noopener noreferrer">
                        <h1 className="text-[#0044c3] text-lg hover:underline">{(results as any).title}</h1>
                    </a>
                    <p className="text-[#222222] text-sm">
                        {(results as any).age && <span className="font-normal">{(results as any).age} - </span>}
                        {stripHtmlAndDecode((results as any).description)}
                    </p>
                </div >
            </section>
        )
    })

    return (
        <section className="w-screen h-full md:px-32 px-2 pb-10">
            <div className="md:p-5 p-2">
                <h1>Results for search "{query}"</h1>
            </div>
            {
                theResults &&
                <div className="flex flex-col gap-2">
                    {theResults}
                </div>
            }

            {
                theResults?.length < 0 &&
                < div className="w-full h-full flex justify-centert items-start py-20 px-5 text-5xl font-bold text-[#0a0a0a]
                flex-col gap-3">
                    Loading...

                    <span className="text-sm font-normal text-[#727272]">Or Videos not available currently 😅</span>
                </div>
            }
        </section >
    )
}