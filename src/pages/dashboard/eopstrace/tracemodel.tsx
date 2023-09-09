import React, { useState, useRef, useEffect } from "react";
import styles from '../../../styles/Common.module.css';
import Layout from "../../../components/Layout";
import Template from "../template";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router';
import axios from 'axios';
import { getObjectsData } from "../../../lib/getobjects";

export async function getServerSideProps() {
    const localData = await getObjectsData()
    return {
        props: {
            localData,
        },
    }
}

const ManufacturingPlantsClass = [
    "Crack Detection",
    "Parts Detection",
    "Workplace Safety Detection"
]
const VehicleClass = [
    "Battery Life Prediction",
    "Crack Detection",
    "Tire Wear Detection",
    "Crystallization Detection",
    "Parts Detection"
]

export default function TraceModel(localData: any) {

    const router = useRouter();
    const parentAsset = router.query;

    const [chooseAsset, setChooseAsset] = useState(parentAsset.model ? parentAsset.model : parentAsset.objectID === "Manufacturing Plants" ? ManufacturingPlantsClass[0] : VehicleClass[0]);
    const [toggleAsset, setToggleAsset] = useState(false);

    const [subObj, setSubObj] = useState({} as any);
    const [subClassData, setSubClassData] = useState<any[]>([]);
    const [joinKey, setJoinKey] = useState([] as any);

    // Show Choose Asset List
    const showChooseAssetList = () => {
        setToggleAsset(!toggleAsset)
    }
    const selectAsset = (item: any) => {
        setChooseAsset(item);
        setToggleAsset(false)
    }


    // Fetch the JSON data of sub Asset
    const fetchClassData = () => {
        axios.get("/api/getSubAssets").then((response) => {
            if (response.data) {
                const filtered = response.data.filter((item: any) => {
                    return item.parentAssetName === parentAsset.parentAsset;
                });
                if (filtered && filtered.length > 0) {
                    setSubClassData(filtered);
                }

            }
        });
    };
    useEffect(() => {
        fetchClassData();
        if (fetchClassData.length) return;
    }, [parentAsset])

    const fetchData = () => {
        axios.get("/api/getChildObject").then((response) => {
            if (response.data) {
                const filtered = response.data.filter((item: any) => {
                    if (parentAsset.objectID === "Manufacturing Plants") {
                        return item.tags.ID === parentAsset.id
                    } else if (parentAsset.objectID === "Vehicles") {
                        return item.tags.SerialID === parentAsset.id || item.tags.SerialNo === parentAsset.key
                    } else {
                        return item.tags.VIN === parentAsset.id
                    }
                });
                if (filtered && filtered.length > 0) {
                    setSubObj(filtered[0]);
                }
            }
        });
    };
    useEffect(() => {
        fetchData();
        if (fetchData.length) return;
    }, [])

<<<<<<< HEAD
=======
    // Hook that alerts clicks outside of the passed ref
    function useOutsideAlerter(ref: any) {
        useEffect(() => {
            function handleClickOutside(event: any) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setToggleAsset(false)
                }
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

>>>>>>> b0579d24bbe05fbed9660d886b2fc1aeecd70b1d
    return (
        <div className="flex font-OpenSans">

            <div className="w-[100%]">
                <div className="columns-2 flex justify-between items-center">
                    <p className="text-black text-lg mb-0 font-semibold">eOps Trace</p>
                </div>

                <div className="border min-h-full rounded-xl mt-3 px-4 py-4">
                    <div className="flex justify-start items-start">
                        <nav className="flex" aria-label="Breadcrumb">
                            <ol className="inline-flex items-center space-x-1 md:space-x-1">
                                <li className="inline-flex items-center">
                                    <Link href="/dashboard/assetmanagement"
                                        className="inline-flex items-center text-sm font-medium text-black hover:text-yellow-950">
                                        <Image
                                            src="/img/home.svg"
                                            alt="home"
                                            className="h-6"
                                            height={24}
                                            width={24}
                                        />
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={{
                                            pathname: "/dashboard/assetmanagement/subchildobject",
                                            query: {
                                                class: parentAsset.objectID,
                                                object: parentAsset.id,
                                                id: parentAsset.key,
                                                subObject: parentAsset.subObject,
                                            }
                                        }}
                                        className="flex items-center">
                                        <Image
                                            src="/img/arrow-right.svg"
                                            alt="arrow-right"
                                            className="h-6"
                                            height={24}
                                            width={24}
                                        />
                                        <span className="ml-1 text-sm font-medium text-black hover:text-yellow-950 md:ml-1">{parentAsset.key}</span>
                                    </Link>
                                </li>
                                {
                                    chooseAsset ?
                                        <li>
                                            <div className="flex items-center">
                                                <Image
                                                    src="/img/arrow-right.svg"
                                                    alt="arrow-right"
                                                    className="h-6"
                                                    height={24}
                                                    width={24}
                                                />
                                                <span className="ml-1 text-sm font-medium text-black hover:text-yellow-950 md:ml-1">{chooseAsset}</span>
                                            </div>
                                        </li>
                                        : null
                                }
                            </ol>
                        </nav>
                    </div>


                    <div className="flex items-end justify-end mt-[-32px]">
                        <Link
                            className="flex justify-center items-center text-black bg-yellow-951 rounded rounded-xl h-12 px-4 transition-opacity duration-300 mr-5"
<<<<<<< HEAD
                            // href="/dashboard/eopstrace/modelperformance"
=======
>>>>>>> b0579d24bbe05fbed9660d886b2fc1aeecd70b1d
                            href={{
                                pathname: "/dashboard/eopstrace/modelperformance",
                                query: {
                                    objectID: parentAsset.objectID,
                                    key: parentAsset.key,
                                    model: chooseAsset,
                                    id: parentAsset.id,
                                    subObject: parentAsset.subObject,
                                }
                            }}
                        >
                            <Image
                                src="/img/activity.svg"
                                alt="activity"
                                height={19}
                                width={19}
                                className="mr-2"
                            />
                            <span>Model Performance</span>
                        </Link>

<<<<<<< HEAD
                        <Link
                            // href="/dashboard/eopstrace/eopstracealerts"
                            href={{
                                pathname: "/dashboard/eopstrace/eopstracealerts",
                                query: {
                                    objectID: parentAsset.objectID,
                                    key: parentAsset.key,
                                    model: chooseAsset,
                                    id: parentAsset.id,
                                    subObject: parentAsset.subObject,
                                }
                            }}
                            className="flex justify-center items-center text-black bg-yellow-951 rounded rounded-xl h-12 px-4 transition-opacity duration-300"
                        >
                            <Image
                                src="/img/message-square.svg"
                                alt="activity"
                                height={19}
                                width={19}
                                className="mr-2"
                            />
                            <span>Alerts</span>
                        </Link>

=======
>>>>>>> b0579d24bbe05fbed9660d886b2fc1aeecd70b1d
                    </div>

                    <div className="flex items-center justify-center flex-wrap mt-10">
                        {/* Table */}
                        <div className="relative w-full mb-10">
                            <div className="overflow-hidden border rounded-xl w-full">

                                <table className={`table-auto min-w-full w-full text-left ${styles.table} ${styles.tableObject}`}>
                                    <thead className="bg-black text-white rounded-xl h-10 text-sm font-light">
                                        <tr>
                                            {
                                                subObj && Object.keys(subObj).length != 0 ?
                                                    Object.keys(subObj?.tags).map((item: any, i: any) => (
                                                        <th className="capitalize" key={i}>
                                                            {
                                                                item.split(/(?=[A-Z])/).join(" ")
                                                            }
                                                        </th>
                                                    ))
                                                    : null
                                            }
                                        </tr>
                                    </thead>
                                    <tbody className="cursor-pointer">
                                        <tr className={`text-sm`}>
                                            {
                                                subObj && Object.keys(subObj).length != 0 ?
                                                    Object.values(subObj?.tags).map((item: any, i: any) => (

                                                        <td key={i}>
                                                            {item}
                                                        </td>

                                                    ))
                                                    : null
                                            }
                                        </tr>
                                    </tbody>
                                </table>

                                <table className={`table-auto min-w-full text-left hidden ${styles.table}`}>
                                    <thead className="bg-black text-white rounded-xl h-10 text-sm font-light">
                                        <tr>
                                            <th>Capacity</th>
                                            <th>VoltageMeasured</th>
                                            <th>CurrentMeasured</th>
                                            <th>TemperatureMeasured</th>
                                            <th>CurrentLoad</th>
                                            <th>VoltageLoad</th>
                                            <th>DateTime</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm cursor-pointer">
                                        <tr className="hover:bg-yellow-950">
                                            <td>1.856</td>
                                            <td>3.97</td>
                                            <td>2.012528</td>
                                            <td>24.39</td>
                                            <td>1.99</td>
                                            <td>3.06</td>
                                            <td>2022-07-02 15:25:4</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Model */}
                        <div className="relative w-full items-center justify-start flex">
                            <div className="w-[400px] relative">
                                <div
                                    className="border rounded-xl border-gray-500 h-[55px] w-[400px] pl-2 pr-5 relative flex items-center justify-start"
                                    onClick={showChooseAssetList}
                                >
                                    <label className="absolute text-sm top-[-10px] left-2 pl-2 pr-2 bg-white">Model</label>
                                    <Image
                                        src="/img/arrow-down-black.svg"
                                        alt="arrow-down"
                                        height={20}
                                        width={20}
                                        className="absolute right-3 top-4"
                                    />
                                    <span className="text-md text-black pl-2">{chooseAsset}</span>
                                </div>
                                {toggleAsset ?
<<<<<<< HEAD
                                    <div className={`h-52 border rounded-xl border-gray-500 h-[250px] w-[400px]  flex items-start justify-start mt-1 overflow-hidden overflow-y-scroll absolute top-[100%] left-0 z-10 ${styles.scroll}`}>
=======
                                    <div ref={wrapperRef} className={`h-52 border rounded-xl border-gray-500 h-[250px] w-[400px]  flex items-start justify-start mt-1 overflow-hidden overflow-y-scroll absolute top-[100%] left-0 z-10 ${styles.scroll}`}>
>>>>>>> b0579d24bbe05fbed9660d886b2fc1aeecd70b1d
                                        <ul className="p-0 m-0 w-full z-5">
                                            {
                                                parentAsset.objectID === 'Manufacturing Plants' ?
                                                    ManufacturingPlantsClass.map((item: any, i: any) => (
                                                        <li
                                                            className="px-5 py-4 bg-white cursor-pointer hover:bg-yellow-951 w-full font-normal"
                                                            onClick={() => selectAsset(item)}
                                                            key={i}
                                                        >
                                                            <span>{item}</span>
                                                        </li>
                                                    ))
                                                    :
                                                    VehicleClass.map((item: any, i: any) => (
                                                        <li
                                                            className="px-5 py-4 bg-white cursor-pointer hover:bg-yellow-951 w-full font-normal"
                                                            onClick={() => selectAsset(item)}
                                                            key={i}
                                                        >
                                                            <span>{item}</span>
                                                        </li>
                                                    ))

                                            }

                                        </ul>
                                    </div>
                                    : null}
                            </div>

                            <div className="flex ml-20">
                                <Link
                                    href={{
                                        pathname: "/dashboard/eopstrace/testmodel",
                                        query: {
                                            objectID: parentAsset.objectID,
                                            key: parentAsset.key,
                                            model: chooseAsset,
                                            id: parentAsset.id,
                                            subObject: parentAsset.subObject,
                                        }
                                    }}
                                    className="relative mr-16"
                                >
                                    <Image
                                        src="/img/folder.svg"
                                        alt="folder"
                                        height={130}
                                        width={130}
                                    />
                                    <span className="absolute top-[65px] left-[45px] text-lg font-semibold">Test</span>
                                </Link>

                                <Link
                                    href={{
                                        pathname: "/dashboard/eopstrace/productionmodel",
                                        query: {
                                            objectID: parentAsset.objectID,
                                            key: parentAsset.key,
                                            model: chooseAsset,
                                            id: parentAsset.id,
                                            subObject: parentAsset.subObject,
                                        }
                                    }}
                                    className="relative mr-16"
                                >
                                    <Image
                                        src="/img/folder.svg"
                                        alt="folder"
                                        height={130}
                                        width={130}
                                    />
                                    <span className="absolute top-[50%] left-[15%] text-lg font-semibold">Production</span>
                                </Link>
                            </div>
                        </div>

                    </div>



                </div>
            </div>

            <div className="w-[16%] pl-5 hidden">
                <Template />
            </div>

        </div>
    )
}

TraceModel.getLayout = function getLayout(page: any) {
    return (
        <Layout>{page}</Layout>
    )
}