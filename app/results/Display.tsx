import React from "react";

export default function DisplayResults({ results, index }: { results: any, index: number }) {
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
    return (
        <div key={index} className="lg:w-[60vw] md:w-[80vw] w-full h-auto border bg-[#f7f7f7] md:p-5 p-2 rounded-2xl border-[#c9c9c9]
            flex flex-col justify-center items-start gap-2 overflow-clip">
            <a
                href=
                {
                    ((results as any).profile.url).includes('http') ?
                        (results as any).profile.url :
                        (results as any).url
                }
                target="_blank"
                rel="noopener noreferrer"
            >
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-md bg-[#eaeaea] flex justify-center items-center">
                        <img
                            src={(results as any).profile.img}
                            alt={(results as any).profile.name}
                            className="w-4 h-4 rounded-sm"
                        />
                    </div>
                    <div className="flex flex-col justify-center overflow-clip md:w-[50vw] w-full gap-0">
                        <p className="m-0 text-md font-normal leading-tight">{((results as any).profile.name)}</p>
                        <p className="text-[#7b7b7b] m-0 text-[0.8em] leading-tight">
                            {
                                ((results as any).profile.url).includes('http') ?
                                    (results as any).profile.url :
                                    (results as any).url
                            }
                        </p>
                    </div>
                </div>
            </a>
            <a
                href={
                    ((results as any).profile.url).includes('http') ?
                        (results as any).profile.url :
                        (results as any).url
                }
                target="_blank" rel="noopener noreferrer">
                <h1 className="text-[#0044c3] text-lg hover:underline">{(results as any).title}</h1>
            </a>
            <p className="text-[#222222] text-sm">
                {(results as any).age && <span className="font-normal">{(results as any).age} - </span>}
                {stripHtmlAndDecode((results as any).description)}
            </p>
        </div >
    )
}