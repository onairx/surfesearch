import React from "react";
import SearchBar from "./SearchBar";
import Footer from "./Footer";
import Link from "next/link";

export default function Main() {
  const [showIcon, setShowIcon] = React.useState<boolean>(false);
  const [showImage, setShowImage] = React.useState<boolean>(false);
  const [imageData, setImageData] = React.useState<string | null>(null);

  React.useEffect(() => {
    const storedImage = localStorage.getItem("backgroundImage");
    if (storedImage) {
      setImageData(storedImage);
      setShowImage(true);
    }
  }, []);

  async function showBackground() {
    setShowImage(true);
    try {
      const response = await fetch(`/api/unsplash`);
      const data = await response.json();
      setImageData(data?.urls?.full || null);
      localStorage.setItem("backgroundImage", data?.urls?.full || "");
    } catch (error) {
      console.log(error);
    }
  }
  function hideBackground() {
    setShowImage(false);
    localStorage.removeItem("backgroundImage");
  }
  function switchIcon() {
    setShowIcon(!showIcon);
  }
  const backgroundNoice = {
    backgroundImage: `url(${showImage ? imageData : "/assets/noice.svg"})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };
  return (
    <section
      className="w-full h-screen overflow-clip flex flex-col justify-between items-center
        bg-gradient-to-b from-[#f8f8f8] via-[#506BCE] to-[#181C6A]"
    >
      <div
        style={backgroundNoice}
        className="w-full h-full flex flex-col justify-between items-center"
      >
        <div className="flex flex-col justify-center items-center w-full h-full gap-5 md:p-5 p-2 mb-20">
          <div className="w-auto h-auto flex flex-col md:gap-10 gap-5 justify-center items-center">
            <div className="flex flex-col justify-center items-center w-full h-auto text-center pointer-events-none">
              <h1
                className={
                  showImage ? `backgroundchangetextcolor` : `defaulttextcolor`
                }
              >
                Surfe
              </h1>
              <p
                className={
                  showImage
                    ? "text-[#ffffff] mix-blend-difference"
                    : "text-[#0a0a0a]"
                }
              >
                Search the web for you
              </p>
            </div>
            <div className="flex justify-center items-center w-full h-auto gap-5">
              <Link href="https://crumbs-seven.vercel.app" target="_blank">
                <div
                  className={`${showImage
                    ? "bg-[#0a0a0a99] border-[#696969] hover:bg-[#0a0a0a55] thetransition"
                    : "bg-[#0d0d0d2a] border-[#C8C8C8] hover:bg-[#5757572a] thetransition"
                    } crumbandcave`}
                >
                  <button
                    className={`${showImage ? "text-white" : "text-white"} flex gap-1 cursor-pointer`}
                  >
                    <span className="sm:block hidden">Search movies by</span>
                    Crumbs
                  </button>
                </div>
              </Link>
              <Link href="./crave">
                <div
                  className={`${showImage
                    ? "bg-[#0a0a0a99] border-[#696969] hover:bg-[#0a0a0a55] thetransition"
                    : "bg-[#0d0d0d2a] border-[#C8C8C8] hover:bg-[#5757572a] thetransition"
                    } crumbandcave`}
                >
                  <button
                    className={`${showImage ? "text-white" : "text-white"} flex gap-1 cursor-pointer`}
                  >
                    <span className="sm:block hidden">Search recipe by</span>
                    Crave
                  </button>
                </div>
              </Link>
            </div>
          </div>
          <div className="w-auto h-fit">
            <SearchBar showIcon={showImage} />
          </div>
        </div>
        <div
          className={`${showImage
            ? "bg-[#0a0a0a99] border-[#a9a9a923] border-t backdrop-blur-2xl "
            : "bg-transparent"
            } w-full`}
        >
          <Footer
            switchIcon={switchIcon}
            showIcon={showIcon}
            showBackground={showBackground}
            hideBackground={hideBackground}
          />
        </div>
      </div>
    </section>
  );
}
