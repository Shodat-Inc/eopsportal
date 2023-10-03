import React, { useState, useEffect, useRef } from "react";
export default function Drop(props: any) {

    console.log({
        props: props
    })
    function useOutsideAlerter(ref: any) {
        useEffect(() => {
            function handleClickOutside(event: any) {
                if (ref.current && !ref.current.contains(event.target)) {
                    // setToggleDrop(false);
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    const toggleAsset = (item:any) => {
        props.handleClick(item)
    }
    return (
        <div ref={wrapperRef} className="bg-black text-white border overflow-hidden border-black rounded rounded-xl w-52 flex flex-col flex-wrap items-start justify-start shadow-sm absolute top-[30px] left-[80%] z-[1]">
            {
                props.subAssets && props.subAssets.length > 0 ?
                    props.subAssets.map((item: any, index: any) => (
                        <button
                            // onClick={() => props.handleClick(false)}
                            onClick={() => toggleAsset(item.assetName)}
                            key={index}
                            className="text-white text-sm hover:bg-white hover:text-black h-[40px] px-4 border-b border-gray-900 w-full text-left">
                            {item.assetName}
                        </button>
                    ))
                    : null
            }
            {/* <button
                // onClick={() => setToggleDrop(false)}
                className="text-white text-sm hover:bg-white hover:text-black h-[40px] px-4 border-b border-gray-900 w-full text-left">Pipes</button>
            <button
                // onClick={() => setToggleDrop(false)}
                className="text-white text-sm hover:bg-white hover:text-black h-[40px] px-4 border-b border-gray-900 w-full text-left">Windows</button>
            <button
                // onClick={() => setToggleDrop(false)}
                className="text-white text-sm hover:bg-white hover:text-black h-[40px] px-4 border-b border-gray-900 w-full text-left">Floor material</button>
            <button
                // onClick={() => setToggleDrop(false)}
                className="text-white text-sm hover:bg-white hover:text-black h-[40px] px-4 w-full text-left">Light</button> */}
        </div>
    )
}