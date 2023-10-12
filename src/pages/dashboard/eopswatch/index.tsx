import React, { useState, useRef, useEffect } from "react";
import Layout from "../../../components/Layout";
import styles from '../../../styles/Common.module.css';
import Image from "next/image";
import Link from "next/dist/client/link";
import Table from "./table";
import Filter from "./filters";
import axios from "axios";
import Drop from "./drop";
import CustomDrop from "@/common/customdrop";

const classData = [
    "Vehicles",
    "Manufacturing Plants",
    "Automotive",
    "Oil, Gas & Energy",
    "Transportation & Logistics"
]
const data = [
    {
        "VIN": "5PVBN3TK3R6Y67222",
        "mfdDate": "06/03/2022",
        "model": "GS450",
        "assemblyPlant": "Mineral Wells",
        "lotNo": "104CY2231",
        "year": "2022",
        "type": "ICE"
    },
    {
        "VIN": "5PVBN3TK3R6Y67223",
        "mfdDate": "01/15/2023",
        "model": "EX-F",
        "assemblyPlant": "Virginia",
        "lotNo": "104FG2001",
        "year": "2023",
        "type": "EV"
    }
]


export default function EopsWatch(props: any) {

    const [toggleAsset, setToggleAsset] = useState(false);
    const [chooseAsset, setChooseAsset] = useState('Manufacturing Plants');
    const [toggleSort, setToggleSort] = useState(false);
    const [actions, setActions] = useState(false);
    const [actionCount, setActionCount] = useState(1);

    const sortByID = () => {
        setToggleSort(!toggleSort)
    }

    const handleDropDown = (item: any) => {
        setChooseAsset(item)
    }

    const toggleActions = (item: any) => {
        setActionCount(item);
        setActions(!actions);
    }

    // Hook that alerts clicks outside of the passed ref
    function useOutsideAlerter(ref: any) {
        useEffect(() => {
            function handleClickOutside(event: any) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setActions(false);
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

    const selectedAction = (item: any) => {
        setActions(false);
    }

    return (
        <div className="w-full h-full font-OpenSans">
            <p className="text-black text-lg mb-4 font-semibold text-xl">eOps Watch</p>

            {/* Top Information */}
            <div className="bg-white rounded rounded-xl min-h-[120px] px-3 py-4 flex justify-between items-center mb-4">
                <div className="w-[34%] border border-[#EEEEEE] border-l-0 border-t-0 border-b-0 border-r-1">
                    <CustomDrop
                        data={classData}
                        handleClick={handleDropDown}
                    />
                </div>
                <div className="w-[34%] border border-[#EEEEEE] border-l-0 border-t-0 border-b-0 border-r-1">
                    <div className="text-center flex justify-center items-center w-full flex-wrap flex-col">
                        <p className="mb-2">Total Manufacturing Plants</p>
                        <p className="text-2xl font-semibold">5</p>
                    </div>
                </div>
                <div className="w-[34%]">
                    <div className="text-center flex justify-center items-center w-full flex-wrap flex-col">
                        <p className="mb-2">Total Objects</p>
                        <p className="text-2xl font-semibold">-</p>
                    </div>
                </div>
            </div>

            {/* Table Information */}
            <p className="text-black text-md mb-4 font-semibold">Manufacturing Plants</p>
            <div className="bg-white rounded rounded-xl min-h-[220px] px-3 py-4 flex justify-between items-center w-full">
                <div className="flex flex-wrap flex-col justify-start items-start w-full">
                    <table className={`table-auto lg:min-w-full sm:w-full small:w-full text-left ${styles.tableV3}`}>
                        <thead className="text-sm font-normal">
                            <tr>
                                <th>S.No</th>
                                <th>
                                    <button className="flex" onClick={sortByID}>
                                        <Image src="/img/arrow-up-gray.svg" alt="sort" height={20} width={20} className={`${toggleSort === true ? 'rotate-180' : 'rotate-0'}`} />
                                        <span>VIN</span>
                                    </button>
                                </th>
                                <th>Mfd Date</th>
                                <th>Model</th>
                                <th>Assembly Plant</th>
                                <th>Lot No</th>
                                <th>Year</th>
                                <th>Type</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data && data.length > 0 ?
                                    data.map((item: any, index: any) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <Link
                                                    href={{
                                                        pathname: '/dashboard/eopswatch/objects',
                                                        query: {
                                                            objectID: chooseAsset,
                                                            VIN: item.VIN
                                                        }
                                                    }}
                                                >
                                                    <span className="font-medium">{item.VIN}</span>
                                                </Link>
                                            </td>
                                            <td>{item.mfdDate}</td>
                                            <td>{item.model}</td>
                                            <td>{item.assemblyPlant}</td>
                                            <td>{item.lotNo}</td>
                                            <td>{item.year}</td>
                                            <td>{item.type}</td>
                                            <td>
                                                <div className="flex justify-start items-center relative">
                                                    <button onClick={() => toggleActions(index + 1)}>
                                                        <Image
                                                            src="/img/more-vertical.svg"
                                                            alt="more-vertical"
                                                            height={24}
                                                            width={24}
                                                        />
                                                    </button>
                                                    {(actions && actionCount === index + 1) &&
                                                        <div ref={wrapperRef} className="bg-black text-white border overflow-hidden border-black rounded rounded-xl w-[160px] flex flex-col flex-wrap items-start justify-start shadow-sm absolute top-[30px] right-[40px] z-[1] ">
                                                            <Link
                                                                href={{
                                                                    pathname: '/dashboard/eopswatch/models',
                                                                    query: {
                                                                        objectID: chooseAsset,
                                                                        VIN: item.VIN
                                                                    }
                                                                }}
                                                                onClick={() => selectedAction(item.VIN)}
                                                                className="text-white text-[14px] hover:bg-yellow-951 hover:text-black h-[40px] px-4 border-b border-gray-900 w-full text-left flex items-center justify-start">
                                                                <span>AI Model Detection</span>
                                                            </Link>
                                                        </div>
                                                    }
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                    :
                                    <tr>
                                        <td colSpan={8}>No data found!</td>
                                    </tr>}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

EopsWatch.getLayout = function getLayout(page: any) {
    return (
        <Layout>{page}</Layout>
    )
}