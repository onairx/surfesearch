import React from "react";
interface Profile {
    url?: string;
    img?: string;
    name?: string;
}

interface MetaUrl {
    favicon?: string;
    netloc?: string;
}

interface Video {
    creator?: string;
}

interface Result {
    profile?: Profile;
    url?: string;
    meta_url?: MetaUrl;
    title?: string;
    description: string;
    age?: string;
    video?: Video;
    index: number;
}

interface ResultListProps {
    results: Result;
    index: number;
}

export default function DisplayResults({ results, index }: ResultListProps) {
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
        <div key={index} className="lg:w-[60vw] md:w-[80vw] w-full h-auto border bg-[#111111] md:p-5 p-2 rounded-2xl border-[#202020]
            flex flex-col justify-center items-start gap-2 overflow-clip">
            <a
                href=
                {
                    results.profile?.url?.includes('http')
                        ? results.profile.url
                        : results.url
                }
                target="_blank"
                rel="noopener noreferrer"
            >
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-md bg-[#000000] border border-[#202020] flex justify-center items-center">
                        <img
                            src={
                                results?.profile?.img ?
                                    results?.profile.img :
                                    results?.meta_url?.favicon
                            }
                            alt={
                                results?.profile?.name ?
                                    results?.profile.name :
                                    results?.meta_url?.netloc
                            }
                            className="w-4 h-4 rounded-sm"
                        />
                    </div>
                    <div className="flex flex-col justify-center overflow-clip md:w-[50vw] w-full gap-0">
                        <p className="m-0 text-md font-normal leading-tight text-[#b2b2b2]">
                            {
                                (results?.profile?.name) ?
                                    results?.profile.name :
                                    results?.video?.creator
                            }
                        </p>
                        <p className="text-[#505050] m-0 text-[0.8em] leading-tight">
                            {
                                results.profile?.url?.includes('http')
                                    ? results.profile.url
                                    : results.url
                            }
                        </p>
                    </div>
                </div>
            </a>
            <a
                href={
                    results.profile?.url?.includes('http')
                        ? results.profile.url
                        : results.url
                }
                target="_blank" rel="noopener noreferrer">
                <h1 className="text-[#83aefd] text-lg hover:underline">{results?.title}</h1>
            </a>
            <p className="text-[#b2b2b2] text-sm">
                {results?.age && <span className="font-normal">{results?.age} - </span>}
                {stripHtmlAndDecode(results?.description)}
            </p>
        </div >
    )
}