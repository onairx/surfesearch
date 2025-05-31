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
                const response = await fetch(`/api/webresults?q=${query}&web`)
                const data = await response.json()
                setWebResults(data.web.results)
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

        <section className="w-screen h-full md:px-32 p-2 pb-10 ">
            <div className="md:p-5 p-2 text-[#e0e0e0]">
                <h1>Results for search <span className="font-bold">{query}</span></h1>
            </div>
            {
                theResults?.length > 0 &&
                <div className="flex flex-col gap-2">
                    {theResults}
                </div>
            }
            {
                theResults?.length === 0 &&
                < div className="w-full h-full flex justify-centert items-start py-20 px-5 text-5xl font-bold text-[#565656]
                flex-col gap-3">
                    Loading...
                </div>
            }

        </section>
    )
}
export default function Page() {
    return (
        <Suspense
            fallback={
                <div className="w-full h-full flex justify-start items-center py-20 px-5 text-5xl font-bold text-[#565656]">
                    Loading..
                </div>
            }
        >
            <Search />
        </Suspense>
    )
}
