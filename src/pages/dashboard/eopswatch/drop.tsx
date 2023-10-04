import React, { useState, useEffect, useRef } from "react";
export default function Drop(props: any) {

    const toggleAsset = (item: any) => {
        props.handleClick(item)
    }
    return (
        <div className="bg-black text-white border overflow-hidden border-black rounded rounded-xl w-52 flex flex-col flex-wrap items-start justify-start shadow-sm absolute top-[30px] left-[80%] z-[1]">
            {
                props.subAssets && props.subAssets.length > 0 ?
                    props.subAssets.map((item: any, index: any) => (
                        <button
                            onClick={() => toggleAsset(item)}
                            key={index}
                            className="text-white text-sm hover:bg-white hover:text-black h-[40px] px-4 border-b border-gray-900 w-full text-left">
                            {item}
                        </button>
                    ))
                    : null
            }
        </div>
    )
}