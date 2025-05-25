import React from "react";
import Image from "next/image";
import SeachIcon from "@/public/assets/search-icon.svg"
import SearchIconWhite from "@/public/assets/searc-icon-white.svg"
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function SearchBar({ showIcon }: { showIcon: boolean }) {
    const searchParams = useSearchParams()
    const theSearchParam = searchParams.get('q')
    const [settingSearch, setSettingSearch] = React.useState(theSearchParam)

    const router = useRouter()
    const [search, setSearch] = React.useState("")
    const [showSuggetion, setShowSuggetion] = React.useState([])
    React.useEffect(() => {
        async function getSuggetions() {
            try {
                const response = await fetch(`/api/suggestion?q=${search}`)
                const data = await response.json()
                setShowSuggetion(data.results)
            } catch (error) {
                console.log(error)
            }
        }
        getSuggetions()
    }, [search])

    function theData(formData: FormData) {
        const inputData = formData.get('search')
        setSearch(inputData as string)
        if (search) {
            router.push(`/results/web?q=${search}`)
        }
        setSearch("")
    }

    function handleSuggetion(value: string) {
        setSearch(value)
        router.push(`/results/web?q=${value}`)
        setSearch("")
    }

    const showSuggetionList = showSuggetion?.map((item: any, index: number) => {
        return (
            <div key={index} className="cursor-default" onClick={() => handleSuggetion(item.query)}>
                <p className={`${showIcon ? 'hover:bg-[#504f4f8e]' : 'hover:bg-[#e8e8e8]'} rounded-sm p-1 transition-all duration-100 ease-in-out`}>{item.query}</p>
            </div>
        )
    })
    return (
        <div className={`relative rounded-2xl
            ${showIcon ? 'bg-[#0a0a0a99] border-[#696969] text-[#ffffff]' :
                'bg-[#ffffff99] border-[#C9C9C9] text-[#0a0a0a]'}`}>
            <form
                className={`${showIcon ? 'bg-[#0a0a0a99] border-[#696969] text-[#ffffff]' :
                    'bg-[#ffffff99] border-[#C9C9C9] text-[#0a0a0a]'} border shadow-lg md:rounded-2xl 
                     overflow-clip backdrop-blur-2xl rounded-xl
                    lg:w-[50vw] md:w-[75vw] w-[95vw] h-15 focus:outline-none p-1 text-sm flex
                    items-center gap-2 justify-evenly`}
                action={theData}
            >
                <div className="w-5 h-auto pointer-events-auto ml-5 hidden md:block">
                    <Image src={SeachIcon} alt="search-icon" className="w-5 h-auto" />
                </div>
                <input
                    type="text"
                    name="search"
                    className="px-2 md:text-[1.5em] text-lg focus:outline-none w-full h-full 
                    rounded-2xl cursor-text placeholder:text-[#D1D1D1] font-medium"
                    placeholder={"enter your search"}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button className="h-full md:px-7 px-4 md:rounded-xl rounded-lg bg-[#0051C3] text-[1.1em] text-[#f7f7f7] cursor-pointer">
                    <span className="hidden md:block">Search</span>
                    <Image src={SearchIconWhite} alt="search-icon" className="w-5 h-auto md:hidden" />
                </button>

            </form>
            {showSuggetionList && showSuggetionList.length > 0 && <div className={`w-full h-fit md:px-10 px-2 absolute top-16 rounded-2xl
                flex flex-col gap-2 py-2 ${showIcon ? 'bg-[#0a0a0a] border-[#696969] border text-[#ffffff]' :
                    'bg-[#ffffff99] border-[#C9C9C9] border text-[#0a0a0a] backdrop-blur-2xl'} shadow-lg `}>
                {showSuggetionList}
            </div>}
        </div>
    )
}
