import React, { useState, useEffect, useRef } from 'react';
import styles from '../../../styles/Common.module.css';
import Image from "next/image";
import Link from 'next/dist/client/link';
import AddNewClass from './addnewclass';
import Spinner from "@/common/spinner";
import axios from 'axios';
export default function ClassManagement(props: any) {
    const [toggleFilter, setToggleFilter] = useState(false);
    const [toggleArrow, setToggleArrow] = useState(false);
    const [toggleSort, setToggleSort] = useState(false);
    const [actions, setActions] = useState(false);
    const [actionCount, setActionCount] = useState(1);
    const [showModal, setShowModal] = useState(Boolean);
    const [dataTypes, setDataTypes] = useState();
    let access_token = "" as any;
    if (typeof window !== 'undefined') {
        access_token = localStorage.getItem('authToken')
    }

    useEffect(() => {
        setShowModal(props.addClassModal)
    }, [props.addClassModal])

    const toggleFilterFunction = () => {
        setToggleArrow(!toggleArrow);
        setToggleFilter(!toggleFilter);
    }
    const sortByClassName = () => {
        setToggleSort(!toggleSort)
    }
    const toggleActions = (item: any) => {
        setActionCount(item);
        setActions(!actions);
    }
    const selectedAction = (item: any) => {
        setActions(false);
    }

    const handleClick = (item: any) => {
        setShowModal(false);
        props.handleaddClassModal(item)
    }

    // Get All DataTypes
    useEffect(() => {
        let tokenStr = access_token;
        (async function () {
            try {
                await axios({
                    method: 'GET',
                    url: `/api/getDataType`,
                    headers: {
                        "Authorization": `Bearer ${tokenStr}`,
                        "Content-Type": "application/json"
                    }
                }).then(function (response) {
                    if (response.data) {
                        setDataTypes(response.data.data)
                    }
                }).catch(function (error) {
                    console.log(error)
                })
            } catch (err) {
                console.log("err in action:", err)
            }
        })();
    }, []);
    return (
        <div className='px-0 py-3 font-OpenSans'>
            {/* Title, search and filters */}
            <div className='flex justify-between items-center px-4'>
                <h2 className='font-semibold text-2xl'>Classes</h2>
                <div className='flex justify-start items-center'>
                    <div className="flex relative">
                        <Image
                            src="/img/search-icon-gray.svg"
                            alt="search"
                            height={22}
                            width={22}
                            className="absolute top-[11px] left-3"
                        />
                        <input
                            type="text"
                            placeholder={`Search`}
                            id="searchobjects"
                            name="searchobjects"
                            className="border border-gray-969 rounded-lg h-[44px] w-[310px] pl-10 pr-2"
                            autoComplete="off"
                        />
                    </div>
                    <div className="relative ml-3">
                        <button
                            className={`bg-white border  rounded-xl h-[44px] transition-all duration-[400ms] h-[44px] rounded rounded-lg px-2 py-2 flex items-center justify-start ${toggleFilter === true ? 'border-black' : 'border-gray-969'}`}
                            onClick={toggleFilterFunction}
                        >
                            <Image
                                src="/img/filter-icon.svg"
                                alt="calendar"
                                height={22}
                                width={22}
                            />
                            <span className="mr-2 ml-1">Filters</span>
                            <Image
                                src="/img/arrow-down-black.svg"
                                alt="Arrow Down"
                                height={24}
                                width={24}
                                className={`${toggleArrow === true ? 'rotate-180' : 'rotate-0'}`}
                            />
                        </button>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className='w-full mt-6 min-h-[400px] '>
                <table className={`table-auto lg:min-w-full sm:w-full small:w-full text-left ${styles.tableV3} ${styles.tableV4}`}>
                    <thead className="text-sm font-normal">
                        <tr>
                            <th>S.No</th>
                            <th>
                                <button className="flex justify-center items-center" onClick={sortByClassName}>
                                    <Image src="/img/arrow-up-gray.svg" alt="sort" height={17} width={17} className={`${toggleSort === true ? 'rotate-180' : 'rotate-0'}`} />
                                    <span>Class name</span>
                                </button>
                            </th>
                            <th>Tags</th>
                            <th>Date of creation</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.classData && props.classData.length >= 0 ?
                                props.classData.map((item: any, index: any) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.className}</td>
                                        <td>
                                            {
                                                item.ClassTags.map((itms: any, i: any) => (
                                                    <span key={i} className='mr-[10px]'>{itms.tagName}<i>,</i></span>
                                                ))
                                            }
                                        </td>
                                        <td>12-10-2023</td>
                                        <td className='relative'>
                                            <div className="flex justify-start items-center relative">
                                                <button onClick={() => toggleActions(index+1)}>
                                                    <Image
                                                        src="/img/more-vertical.svg"
                                                        alt="more-vertical"
                                                        height={24}
                                                        width={24}
                                                    />
                                                </button>
                                                {(actions && actionCount === index+1) &&
                                                    <div className="bg-black text-white border overflow-hidden border-black rounded rounded-xl w-[100px] flex flex-col flex-wrap items-start justify-start shadow-sm absolute top-[30px] right-[75px] z-[1]">
                                                        <Link
                                                            href="#"
                                                            className="text-white text-[14px] hover:bg-yellow-951 hover:text-black h-[30px] px-4 border-b border-gray-900 w-full text-left flex items-center justify-start">
                                                            <span>Edit</span>
                                                        </Link>
                                                        <Link
                                                            href="#"
                                                            className="text-white text-[14px] hover:bg-yellow-951 hover:text-black h-[30px] px-4 border-b border-gray-900 w-full text-left flex items-center justify-start">
                                                            <span>Delete</span>
                                                        </Link>
                                                    </div>
                                                }
                                            </div>

                                        </td>
                                    </tr>
                                ))
                                :
                                <tr>
                                    <td colSpan={5}>
                                        <>
                                            <Spinner height={16} width={16} />
                                            <p className="text-xl text-center w-full">No Matched data found!!</p>
                                        </>
                                    </td>
                                </tr>
                        }
                    </tbody>
                    <tbody className='hidden'>
                        <tr>
                            <td>1</td>
                            <td>Manufacturing Plant</td>
                            <td>Plant ID,  Street, City, Zip, Country</td>
                            <td>12-10-2023</td>
                            <td className='relative'>
                                <div className="flex justify-start items-center relative">
                                    <button onClick={() => toggleActions(1)}>
                                        <Image
                                            src="/img/more-vertical.svg"
                                            alt="more-vertical"
                                            height={24}
                                            width={24}
                                        />
                                    </button>
                                    {(actions && actionCount === 1) &&
                                        <div className="bg-black text-white border overflow-hidden border-black rounded rounded-xl w-[100px] flex flex-col flex-wrap items-start justify-start shadow-sm absolute top-[30px] right-[75px] z-[1]">
                                            <Link
                                                href="#"
                                                className="text-white text-[14px] hover:bg-yellow-951 hover:text-black h-[30px] px-4 border-b border-gray-900 w-full text-left flex items-center justify-start">
                                                <span>Edit</span>
                                            </Link>
                                            <Link
                                                href="#"
                                                className="text-white text-[14px] hover:bg-yellow-951 hover:text-black h-[30px] px-4 border-b border-gray-900 w-full text-left flex items-center justify-start">
                                                <span>Delete</span>
                                            </Link>
                                        </div>
                                    }
                                </div>

                            </td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Vehicles</td>
                            <td>VIN, MfdDate, Model, Assembly Plant</td>
                            <td>12-10-2023</td>
                            <td>
                                <div className="flex justify-start items-center relative">
                                    <button onClick={() => toggleActions(2)}>
                                        <Image
                                            src="/img/more-vertical.svg"
                                            alt="more-vertical"
                                            height={24}
                                            width={24}
                                        />
                                    </button>
                                    {(actions && actionCount === 2) &&
                                        <div className="bg-black text-white border overflow-hidden border-black rounded rounded-xl w-[100px] flex flex-col flex-wrap items-start justify-start shadow-sm absolute top-[30px] right-[75px] z-[1]">
                                            <Link
                                                href="#"
                                                className="text-white text-[14px] hover:bg-yellow-951 hover:text-black h-[30px] px-4 border-b border-gray-900 w-full text-left flex items-center justify-start">
                                                <span>Edit</span>
                                            </Link>
                                            <Link
                                                href="#"
                                                className="text-white text-[14px] hover:bg-yellow-951 hover:text-black h-[30px] px-4 border-b border-gray-900 w-full text-left flex items-center justify-start">
                                                <span>Delete</span>
                                            </Link>
                                        </div>
                                    }
                                </div>

                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>


            {/* Add New Class */}
            <AddNewClass handleClick={handleClick} show={showModal} dataTypes={dataTypes} />

        </div>
    )
}