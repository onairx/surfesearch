'use client'
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import DisplayResults from "../Display";

function Search() {
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

    const theResults = webResults?.map((results, index) => {
        return (
            <section key={index}>
                <DisplayResults results={results} index={index} />
            </section>
        )
    })

    return (
        <section className="w-screen h-full md:px-32 px-2 pb-10">
            <div className="md:p-5 p-2">
                <h1>Results for search <span className="font-bold">{query}</span></h1>
            </div>
            {
                theResults &&
                <div className="flex flex-col gap-2">
                    {theResults}
                </div>
            }
            {
                theResults?.length === 0 &&
                < div className="w-full h-full flex justify-centert items-start py-20 px-5 text-5xl font-bold text-[#0a0a0a]
                flex-col gap-3">
                    Loading...

                    <span className="text-sm font-normal text-[#727272]">Or Videos not available currently 😅</span>
                </div>
            }
        </section >
    )
}
export default function Page() {
    return (
        <Suspense
            fallback={
                < div className="w-full h-full flex justify-centert items-start py-20 px-5 text-5xl font-bold text-[#0a0a0a]
                flex-col gap-3">
                    Loading...
                    <span className="text-sm font-normal text-[#727272]">Or Videos not available currently 😅</span>
                </div>
            }
        >
            <Search />
        </Suspense>
    )
}