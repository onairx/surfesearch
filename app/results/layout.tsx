'use client'
import React from "react";
import NavBar from "./NavBar";
import Category from "./Category";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full h-full flex flex-col items-start justify-center">
            <NavBar />
            <Category />
            {children}
        </div>
    )
}