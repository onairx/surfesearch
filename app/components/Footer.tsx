import React from "react";
import { IoMdSettings } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";


interface FooterProps {
    switchIcon: () => void;
    showIcon: boolean;
    showBackground: () => void;
    hideBackground: () => void;
}

export default function Footer({ switchIcon, showIcon, showBackground, hideBackground }: FooterProps) {
    function theSwitch() {
        hideBackground()
        switchIcon()
    }

    return (
        <footer className="text-start w-full h-auto text-sm flex justify-between items-center gap-2 select-none md:p-5 p-2">
            <div className="w-[90%] h-auto">
                <p className="text-[#A3A3A3]">
                    <a href="https://search.brave.com">
                        <span className="hidden md:block">This website uses Brave Search and the  Brave Search APIs but is not endorsed,
                            certified, or otherwise approved by  Brave Search.</span>

                        <span className="block md:hidden text-[0.9em]">Powered by Brave Search, but not endorsed or certified by Brave Search.</span>
                    </a>
                </p>
                <p className="text-[#ffffff] md:text-[1em] text-[0.9em]">
                    <a href="https://vishalonairx.vercel.app">Designed and developed by onairx</a>
                </p>
            </div>
            <div className={`${showIcon ? 'bg-[#0a0a0a36] border-[#c9c9c96d]' : 'bg-[#0a0a0a34] border-[#a9a9a923]'} border 
                rounded-lg backdrop-blur-2xl cursor-pointer w-10 h-10 relative`}>
                {showIcon && <div className="absolute right-0 bottom-16 h-auto w-50 flex flex-col justify-end gap-1 backdrop-blur-2xl 
                    z-20">

                    <button className={`${showIcon ? 'bg-[#0a0a0a] border-[#202020] text-white' : 'bg-[#ffffff99] border-[#C9C9C9]'} 
                        hoverbutton select-none`}
                        onClick={showBackground}
                    >
                        Change Background
                    </button>
                    <button className={`${showIcon ? 'bg-[#0a0a0a] border-[#202020] text-white' : 'bg-[#ffffff99] border-[#C9C9C9]'}
                        hoverbutton select-none`}
                        onClick={theSwitch}
                    >
                        Orginal Background
                    </button>
                </div>}
                <button className={`${showIcon ? 'text-[#f7f7f7]' : 'text-[#ffffffb6]'} 
                    text-2xl flex justify-center items-center w-full h-full cursor-pointer`}
                    onClick={switchIcon}>
                    {showIcon ? <RxCross2 /> : <IoMdSettings />}
                </button>
            </div>

        </footer>
    )
}