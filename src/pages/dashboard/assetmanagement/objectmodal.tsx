import React, { useState, useRef, useEffect } from "react";
import styles from '../../../styles/Common.module.css';
import Link from "next/link";
import Image from "next/image";
import Router from 'next/router'
export default function ObjectModal(props: any) {
    const { data } = props;
    const [showObjectModal, setShowObjectModal] = useState(false);
    const [toggleAsset, setToggleAsset] = useState(false);


    // Continue to next page after setting the selected class to redux
    const continueToNext = () => {
        // console.log({
        //     chooseAsset: chooseAsset
        // })
        // dispatch(setSelectedClass(chooseAsset));

        setTimeout(() => {
            Router.push({
                pathname: '/dashboard/assetmanagement/objects',
                query: {
                    assets: "Manufacturing Plants"
                }
            }, 'assetmanagement/objects')
        }, 100)
    }
    return (
        <>
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="relative my-6 w-[720px]">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5">
                            <h3 className="text-lg font-medium">
                                Choose your class and continue
                            </h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black float-right leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => setShowObjectModal(false)}
                            >
                                <Image
                                    src="/img/close.svg"
                                    alt="close"
                                    className="h-6"
                                    height={24}
                                    width={24}
                                />
                            </button>
                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex-auto">
                            <div className="flex justify-start items-center flex-wrap flex-col">
                                <div className="w-[400px]">
                                    <div
                                        className="border rounded-xl border-gray-500 h-[55px] w-[400px] pl-2 pr-5 relative flex items-center justify-start"
                                    // onClick={showChooseAssetList}
                                    >
                                        <label className="absolute text-sm top-[-10px] left-2 pl-2 pr-2 bg-white">Class</label>
                                        <Image
                                            src="/img/arrow-down-black.svg"
                                            alt="arrow-down"
                                            height={20}
                                            width={20}
                                            className="absolute right-3 top-4"
                                        />
                                        <span className="text-lg text-black pl-2">Vehicals</span>
                                    </div>
                                    {toggleAsset ?
                                        <div className={`h-52 border rounded-xl border-gray-500 h-[155px] w-[400px]  relative flex items-start justify-start mt-1 overflow-hidden overflow-y-scroll ${styles.scroll} transition-opacity duration-[100ms] outline-none transform active:scale-75 transition-transform`}>
                                            {data && data.length > 0 ?
                                                <ul className="p-0 m-0 w-full">
                                                    {
                                                        data.map((item: any, index: any) => (
                                                            <li
                                                                className="px-5 py-4 bg-white cursor-pointer hover:bg-yellow-951 w-full font-normal"
                                                                // onClick={() => selectAsset(item.assetName)}
                                                                key={index}
                                                            >
                                                                <span>{item.assetName}</span>
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                                : null}
                                        </div>
                                        : null}
                                </div>
                                <div className="w-[400px] mt-10 flex justify-end items-end">
                                    <button
                                        onClick={continueToNext}
                                        className="rounded-xl bg-black border-[2px] border-black text-white flex h-12 justify-center items-center pl-2 pr-2 hover:bg-yellow-951 hover:text-black hover:border-yellow-951 w-[120px] transition-all duration-[400ms] transition-opacity duration-[100ms] outline-none transform active:scale-75 transition-transform"
                                    >
                                        <span className="font-normal">Continue</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}