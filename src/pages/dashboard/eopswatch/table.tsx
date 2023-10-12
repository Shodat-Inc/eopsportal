import React, { useState, useRef, useEffect } from "react";
import styles from '../../../styles/Common.module.css';
import Image from "next/image";
import Link from "next/link";

export default function Table(props: any) {
    const { data, classData, assetData, urlParams } = props;
    const [toggleSort, setToggleSort] = useState(false);
    const [actions, setActions] = useState(false);
    const [actionCount, setActionCount] = useState(1);
    console.log({
        urlParams:urlParams
    })

    const sortByID = () => {
        setToggleSort(!toggleSort)
    }

    const toggleActions = (item: any) => {
        setActionCount(item);
        setActions(!actions);
    }

    const selectedAction = (item: any) => {
        setActions(false);
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

    return (
        <div className="flex flex-wrap flex-col justify-start items-start">
            <table className={`table-auto lg:min-w-full sm:w-full small:w-full text-left ${styles.tableV3}`}>
                <thead className="text-sm font-normal">
                    <tr>
                        <th>S.No</th>
                        <th>
                            <button className="flex" onClick={sortByID}>
                                <Image src="/img/arrow-up-gray.svg" alt="sort" height={20} width={20} className={`${toggleSort === true ? 'rotate-180' : 'rotate-0'}`} />
                                <span>ID</span>
                            </button>
                        </th>
                        <th>PlantID</th>
                        <th>Description</th>
                        <th>Floor</th>
                        <th>Room</th>
                        <th>Direction</th>
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
                                                pathname: '/dashboard/eopswatch/models',
                                                query: {
                                                    objectID: classData,
                                                    subObject: assetData,
                                                    key: item?.tags?.ID,
                                                    id: item?.tags?.PlantID,
                                                    industryID: "1122334455",
                                                    VIN:urlParams.VIN
                                                }
                                            }}
                                        >
                                            <span className="font-medium">{item?.tags?.ID}</span>
                                        </Link>
                                    </td>
                                    <td>{item?.tags?.PlantID}</td>
                                    <td>{item?.tags?.Description}</td>
                                    <td>{item?.tags?.Floor}</td>
                                    <td>{item?.tags?.Room}</td>
                                    <td>{item?.tags?.Direction}</td>
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
                                                                objectID: classData,
                                                                subObject: assetData,
                                                                key: item?.tags?.ID,
                                                                id: item?.tags?.PlantID,
                                                                industryID: "1122334455",
                                                                VIN:urlParams.VIN
                                                            }
                                                        }}
                                                        onClick={() => selectedAction(item?.tags?.ID)}
                                                        className="text-white text-[14px] hover:bg-yellow-951 hover:text-black h-[40px] px-4 border-b border-gray-900 w-full text-left flex items-center justify-start">
                                                        <span>AI Model Detection</span>
                                                    </Link>
                                                </div>
                                            }
                                        </div>
                                    </td>
                                </tr>
                            ))
                            : null
                    }
                </tbody>
            </table>
        </div>
    )
}