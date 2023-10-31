import { useState, useEffect, Fragment } from "react";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import { Transition } from "@headlessui/react";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const [showNav, setShowNav] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const arr = router.pathname.split("/");
  const splitPathName = arr.filter(n => n);

  function handleResize() {
    if (innerWidth <= 640) {
      setShowNav(false);
      setIsMobile(true);
    } else {
      setShowNav(true);
      setIsMobile(false);
    }
  }

  useEffect(() => {
    if (typeof window != undefined) {
      addEventListener("resize", handleResize);
    }

    return () => {
      removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <TopBar showNav={showNav} setShowNav={setShowNav} />
      <Transition
        as={Fragment}
        show={showNav}
        enter="transform transition duration-[400ms]"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transform duration-[400ms] transition ease-in-out"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <SideBar showNav={showNav} setShowNav={setShowNav} />
      </Transition>
      <main
        className={`h-screen h-[100%] ${splitPathName.includes("eopswatch") || splitPathName.includes("assetmanagement") || splitPathName.includes("eopsprosense") || splitPathName.includes("eopstrace") ||  splitPathName.includes("eopsinsight") || splitPathName.includes("myaccount")? 'bg-gray-966' : 'bg-white'} pt-24 transition-all duration-[400ms] ${showNav && !isMobile ? "pl-64" : ""
          }`}
      >
        <div className="pb-5 pr-4">{children}</div>

        <div className="text-sm py-2 text-gray-967 mt-4">Copyright 2023 eOps Fabric <span className="ml-4">Version 1.0</span> </div> 
      </main>
    </>
  );
}
