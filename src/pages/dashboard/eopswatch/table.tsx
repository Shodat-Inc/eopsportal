import React, { useState, useRef, useEffect } from "react";
import styles from '../../../styles/Common.module.css';
import Image from "next/image";
import Link from "next/link";

export default function Table(props: any) {
    const { data } = props;
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
                                    <td>{index+1}</td>
                                    <td>
                                        <Link href="/dashboard/eopswatch/models" className="font-semibold">{item?.tags?.ID}</Link>
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
                    {/* <tr>
                        <td>1</td>
                        <td>
                            <Link href="/dashboard/eopswatch/models" className="font-semibold">TPC71810-01-001</Link>
                        </td>
                        <td>TPC71810-01</td>
                        <td>Power Generator Engine</td>
                        <td>1</td>
                        <td>PGER</td>
                        <td>North</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>TPC71810-01-001</td>
                        <td>TPC71810-01</td>
                        <td>Power Generator Engine</td>
                        <td>3</td>
                        <td>PGER</td>
                        <td>North</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>TPC71810-01-001</td>
                        <td>TPC71810-01</td>
                        <td>Power Generator Engine</td>
                        <td>3</td>
                        <td>PGER</td>
                        <td>North</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>TPC71810-01-001</td>
                        <td>TPC71810-01</td>
                        <td>Power Generator Engine</td>
                        <td>2</td>
                        <td>PGER</td>
                        <td>North</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>TPC71810-01-001</td>
                        <td>TPC71810-01</td>
                        <td>Power Generator Engine</td>
                        <td>1</td>
                        <td>PGER</td>
                        <td>North</td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td>TPC71810-01-001</td>
                        <td>TPC71810-01</td>
                        <td>Power Generator Engine</td>
                        <td>4</td>
                        <td>PGER</td>
                        <td>North</td>
                    </tr>
                    <tr>
                        <td>7</td>
                        <td>TPC71810-01-001</td>
                        <td>TPC71810-01</td>
                        <td>Power Generator Engine</td>
                        <td>4</td>
                        <td>PGER</td>
                        <td>North</td>
                    </tr>
                    <tr>
                        <td>8</td>
                        <td>TPC71810-01-001</td>
                        <td>TPC71810-01</td>
                        <td>Power Generator Engine</td>
                        <td>1</td>
                        <td>PGER</td>
                        <td>North</td>
                    </tr>
                    <tr>
                        <td>9</td>
                        <td>TPC71810-01-001</td>
                        <td>TPC71810-01</td>
                        <td>Power Generator Engine</td>
                        <td>1</td>
                        <td>PGER</td>
                        <td>North</td>
                    </tr>
                    <tr>
                        <td>10</td>
                        <td>TPC71810-01-001</td>
                        <td>TPC71810-01</td>
                        <td>Power Generator Engine</td>
                        <td>2</td>
                        <td>PGER</td>
                        <td>North</td>
                    </tr>
                    <tr>
                        <td>11</td>
                        <td>TPC71810-01-001</td>
                        <td>TPC71810-01</td>
                        <td>Power Generator Engine</td>
                        <td>3</td>
                        <td>PGER</td>
                        <td>North</td>
                    </tr>
                    <tr>
                        <td>12</td>
                        <td>TPC71810-01-001</td>
                        <td>TPC71810-01</td>
                        <td>Power Generator Engine</td>
                        <td>3</td>
                        <td>PGER</td>
                        <td>North</td>
                    </tr> */}
                </tbody>
            </table>
        </div>
    )
}