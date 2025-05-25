import React, { Suspense } from 'react';
import Results from './web/page'

export default function Page() {
    return (
        <Suspense
            fallback={
                <div className="w-full h-full flex justify-start items-center py-20 px-5 text-5xl font-bold text-[#0a0a0a]">
                    Loading..
                </div>
            }
        >
            <Results />
        </Suspense>
    )
}