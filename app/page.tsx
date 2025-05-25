'use client'
import React from "react"
import Main from "./components/Hero"
import Lenis from "lenis"


export default function Home() {
  React.useEffect(() => {
    const lenis = new Lenis()
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, [])
  return (
    <>
      <Main />
    </>
  );
}
