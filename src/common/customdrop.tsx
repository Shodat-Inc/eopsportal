import React, { useState, useRef, useEffect } from "react";
import styles from '../styles/Common.module.css';
import Link from "next/link";
import Image from "next/image";
export default function CustomDrop(props: any) {
    const [toggleAsset, setToggleAsset] = useState(false);
    const [chooseAsset, setChooseAsset] = useState(props.defaultClass ? props.defaultClass : 'Manufacturing Plants');

    const toggleDropdownFunction = () => {
        setToggleAsset(!toggleAsset)
    }

    const selectItemFunction = (item: any) => {
        setChooseAsset(item);
        setToggleAsset(false);
        props.handleClick(item)
    }

    // Hook that alerts clicks outside of the passed ref
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
                className="border rounded-xl border-gray-500 h-[55px] pl-2 pr-5 relative flex items-center justify-start bg-white w-[80%] cursor-pointer"
                onClick={toggleDropdownFunction}
            >
                <label className="absolute text-sm top-[-10px] left-2 pl-2 pr-2 bg-white">Choose Industry type</label>
                <Image
                    src="/img/arrow-down-black.svg"
                    alt="arrow-down"
                    height={20}
                    width={20}
                    className="absolute right-3 top-4"
                />
                <span className="text-lg text-black pl-2">{chooseAsset}</span>
            </div>

            {toggleAsset ?
                <div className={`h-52 border rounded-xl border-gray-500 h-auto max-h-[250px] w-[400px]  absolute flex items-start justify-start mt-1 overflow-hidden overflow-y-auto bg-white ${styles.scroll} z-10`}>
                    <ul className="p-0 m-0 w-full">
                        {
                            props.data.map((item: any, index: any) => (
                                <li
                                    className="px-5 py-2 bg-white cursor-pointer hover:bg-yellow-951 w-full font-normal"
                                    onClick={() => selectItemFunction(item)}
                                    key={index}
                                >
                                    <span>{item}</span>
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