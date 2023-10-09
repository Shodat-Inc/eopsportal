import React, { useState, useRef, useEffect } from "react";
import styles from '../../../styles/Common.module.css';
import Image from "next/image";
import Link from "next/link";

export default function Table(props: any) {
    const { data, classData, assetData } = props;
    const [toggleSort, setToggleSort] = useState(false);

    const sortByID = () => {
        setToggleSort(!toggleSort)
    }

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
                                                    id: item?.tags?.PlantID
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
                                </tr>
                            ))
                            : null
                    }
                </tbody>
            </table>
        </div>
    )
}