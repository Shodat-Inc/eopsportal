import React, { useState, useRef, useEffect } from "react";
import styles from '../../../styles/Common.module.css';
import Image from "next/image";
export default function CustomDropSubClass(props: any) {
    const [toggleAsset, setToggleAsset] = useState(false);
    const [chooseAsset, setChooseAsset] = useState("");
    useEffect(() => {
        setChooseAsset(props.defaultClass);
    }, [props.defaultClass])

    const toggleDropdownFunction = () => {
        setToggleAsset(!toggleAsset)
    }

    const selectItemFunction = (item: any) => {
        setChooseAsset(item);
        setToggleAsset(false);
        props.handleClick(item)
    }

    function useOutsideAlerter(ref: any) {
        useEffect(() => {
            function handleClickOutside(event: any) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setToggleAsset(false)
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
    return (
        <div ref={wrapperRef}>
            <div
                className="border rounded-xl border-gray-969 h-[55px] pl-2 pr-5 relative flex items-center justify-start bg-white w-[80%] cursor-pointer"
                onClick={toggleDropdownFunction}
            >
                <label className="absolute text-sm top-[-10px] left-2 pl-2 pr-2 bg-white">Choose Sub Class</label>
                <Image
                    src="/img/arrow-down-black.svg"
                    alt="arrow-down"
                    height={24}
                    width={24}
                    className={`absolute right-3 top-4 ${toggleAsset ? 'rotate-180' : 'rotate-0'}`}
                />
                <span className="text-lg text-black pl-2">{chooseAsset}</span>
            </div>

            {toggleAsset ?
                <div className={`h-52 border rounded-xl border-gray-969 h-auto max-h-[250px] w-[400px]  absolute flex items-start justify-start flex-wrap flex-col mt-1 overflow-hidden overflow-y-auto bg-white ${styles.scroll} z-10`}>
                    <div className="flex relative w-full mt-3 mb-3 pl-3 pr-3">
                        <Image
                            src="/img/search-icon-gray.svg"
                            alt="search"
                            height={22}
                            width={22}
                            className="absolute top-[11px] left-5"
                        />
                        <input
                            type="text"
                            placeholder={`Search`}
                            id="searchobjects"
                            name="searchobjects"
                            className="border border-gray-969 rounded-lg h-[44px] w-full pl-10 pr-2"
                            autoComplete="off"
                        />
                    </div>
                    <ul className="p-0 m-0 w-full">
                        {
                            props.data.map((item: any, index: any) => (
                                <li
                                    className="px-5 py-2 bg-white cursor-pointer hover:bg-yellow-951 w-full font-normal"
                                    onClick={() => selectItemFunction(item.assetName)}
                                    key={index}
                                >
                                    <span>{item.assetName}</span>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                :
                null
            }
        </div>
    )
}