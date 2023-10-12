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


export default function EopsWatch() {

    const [toggleAsset, setToggleAsset] = useState(false);
    const [chooseAsset, setChooseAsset] = useState('Manufacturing Plants');
    const [toggleSort, setToggleSort] = useState(false);

    const sortByID = () => {
        setToggleSort(!toggleSort)
    }
   
    const handleDropDown = (item: any) => {
        setChooseAsset(item)
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
                                        <span>Plant ID</span>
                                    </button>
                                </th>
                                <th>Plant Name</th>
                                <th>Street</th>
                                <th>City</th>
                                <th>State</th>
                                <th>Zip Code</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                {/* <td>1122334455</td> */}
                                <td>
                                    <Link
                                        href={{
                                            pathname: '/dashboard/eopswatch/objects',
                                            query: {
                                                objectID: "Manufacturing Plants",
                                            }
                                        }}
                                    >
                                        <span className="font-medium">1122334455</span>
                                    </Link>
                                </td>
                                <td>SS Industrial Constructions Inc</td>
                                <td>132, My Street</td>
                                <td>Kingston</td>
                                <td>New York</td>
                                <td>12401</td>
                                <td>
                                    <button>
                                        <Image
                                            src="/img/more-vertical.svg"
                                            alt="Upload"
                                            height={24}
                                            width={24}
                                        />
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>1122334455</td>
                                <td>SS Industrial Constructions Inc</td>
                                <td>132, My Street</td>
                                <td>Kingston</td>
                                <td>New York</td>
                                <td>12401</td>
                                <td>
                                    <button>
                                        <Image
                                            src="/img/more-vertical.svg"
                                            alt="Upload"
                                            height={24}
                                            width={24}
                                        />
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>1122334455</td>
                                <td>SS Industrial Constructions Inc</td>
                                <td>132, My Street</td>
                                <td>Kingston</td>
                                <td>New York</td>
                                <td>12401</td>
                                <td>
                                    <button>
                                        <Image
                                            src="/img/more-vertical.svg"
                                            alt="Upload"
                                            height={24}
                                            width={24}
                                        />
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>1122334455</td>
                                <td>SS Industrial Constructions Inc</td>
                                <td>132, My Street</td>
                                <td>Kingston</td>
                                <td>New York</td>
                                <td>12401</td>
                                <td>
                                    <button>
                                        <Image
                                            src="/img/more-vertical.svg"
                                            alt="Upload"
                                            height={24}
                                            width={24}
                                        />
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td>1122334455</td>
                                <td>SS Industrial Constructions Inc</td>
                                <td>132, My Street</td>
                                <td>Kingston</td>
                                <td>New York</td>
                                <td>12401</td>
                                <td>
                                    <button>
                                        <Image
                                            src="/img/more-vertical.svg"
                                            alt="Upload"
                                            height={24}
                                            width={24}
                                        />
                                    </button>
                                </td>
                            </tr>
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