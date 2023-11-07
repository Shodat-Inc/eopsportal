import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../../styles/Common.module.css';
import Image from "next/image";
import CustomDropSubClass from './customdropsubclass';
import axios from 'axios';
import Link from 'next/dist/client/link';
import AddNewObject from './addnewobject';
export default function SubObjectManagement(props: any) {
    // console.log({
    //     "PROPS IN SUB-OBJECT": props
    // })
    const [toggleFilter, setToggleFilter] = useState(false);
    const [toggleArrow, setToggleArrow] = useState(false);
    const [toggleSort, setToggleSort] = useState(false);
    const [classData, setClassData] = useState([] as any);
    const [chooseAsset, setChooseAsset] = useState('Vehicles');
    const [actions, setActions] = useState(false);
    const [actionCount, setActionCount] = useState(1);
    const [showModal, setShowModal] = useState(false);

    const [subClassData, setSubClassData] = useState([] as any)

    const classSelector = useSelector((state: any) => state.classReducer);
    const toggleFilterFunction = () => {
        setToggleArrow(!toggleArrow);
        setToggleFilter(!toggleFilter);
    }
    const sortByClassName = () => {
        setToggleSort(!toggleSort)
    }

    // Get Sub Classes
    let access_token = "" as any;
    if (typeof window !== 'undefined') {
        access_token = localStorage.getItem('authToken')
    }
    useEffect(() => {
        let tokenStr = access_token;
        (async function () {
            try {
                await axios({
                    method: 'GET',
                    // url: `/api/getChildAssets?id=${props.defaultClass}`,
                    url: `/api/getChildAssets?id=2`,
                    headers: {
                        "Authorization": `Bearer ${tokenStr}`,
                        "Content-Type": "application/json"
                    }
                }).then(function (response) {
                    if (response.status === 200) {
                        // console.log({
                        //     "RESPONSE DATA": response.data
                        // })
                        setSubClassData(response.data.data)
                    } else {

                    }
                }).catch(function (error) {
                    console.log("ERROR IN DELETE AXIOS CATCH:", error)
                })
            } catch (err) {
                console.log("ERROR IN DELETE TRY CATCH:", err)
            }
        })();
    }, [props.defaultClass]);


    useEffect(() => {
        setShowModal(classSelector.toggleAddObject)
    }, [classSelector.toggleAddObject])

    // console.log({
    //     "CLASS SELECTOR": classSelector,
    //     "SUBCLASSDATA":subClassData
    // })



    const handleDropDown = (item: any) => {
        setChooseAsset(item)
    }
    const toggleActions = (item: any) => {
        setActionCount(item);
        setActions(!actions);
    }
    const selectedAction = (item: any) => {
        setActions(false);
    }
    const backToObect = () => {
        props.handleSubObject("Vehicles")
    }
    return (
        <div className='py-3 font-OpenSans'>

            {/* Title, search and filters */}
            <div className='flex justify-between items-center py-2 px-4 '>
                <div className='w-[350px]'>
                    <CustomDropSubClass
                        data={subClassData}
                        handleClick={handleDropDown}
                        defaultClass={subClassData && subClassData.length > 0 ? subClassData[0].S_No : 0}
                    />
                </div>

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

            {/* <button
                onClick={backToObect}
                className='text-sm mt-10 mb-10 px-10'>
                Back To Object Management Component
            </button> */}

            {/* Table */}
            <div className='w-full mt-6 min-h-[400px]'>
                <table className={`table-auto lg:min-w-full sm:w-full small:w-full text-left ${styles.tableV3} ${styles.tableV4}`}>
                    <thead className="text-sm font-normal">
                        <tr>
                            <th>S.No</th>
                            <th>
                                <button className="flex justify-center items-center" onClick={sortByClassName}>
                                    <Image src="/img/arrow-up-gray.svg" alt="sort" height={17} width={17} className={`${toggleSort === true ? 'rotate-180' : 'rotate-0'}`} />
                                    <span>Serial ID</span>
                                </button>
                            </th>
                            <th>VIN</th>
                            <th>Manufacturer</th>
                            <th>Capacity(AH)</th>
                            <th>Voltage(V)</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>1S223</td>
                            <td>5PVBE7AJ8R5T50001</td>
                            <td>Cummins</td>
                            <td>48</td>
                            <td>12</td>
                            <td>
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
                                        <div className="bg-black text-white border overflow-hidden border-black rounded rounded-lg w-[200px] flex flex-col flex-wrap items-start justify-start shadow-sm absolute top-[30px] right-[75px] z-[1]">
                                            <Link
                                                href="#"
                                                className="text-white text-[14px] hover:bg-yellow-951 hover:text-black h-[40px] px-4 border-b border-gray-900 w-full text-left flex items-center justify-start">
                                                <span>Edit</span>
                                            </Link>
                                            <Link
                                                href="#"
                                                className="text-white text-[14px] hover:bg-yellow-951 hover:text-black h-[40px] px-4 border-b border-gray-900 w-full text-left flex items-center justify-start">
                                                <span>Delete</span>
                                            </Link>
                                            <Link
                                                href="#"
                                                className="text-white text-[14px] hover:bg-yellow-951 hover:text-black h-[40px] px-4 border-b border-gray-900 w-full text-left flex items-center justify-start">
                                                <span>eOps Watch</span>
                                            </Link>
                                            <Link
                                                href="#"
                                                className="text-white text-[14px] hover:bg-yellow-951 hover:text-black h-[40px] px-4 border-b border-gray-900 w-full text-left flex items-center justify-start">
                                                <span>eOps Trace</span>
                                            </Link>
                                            <Link
                                                href="#"
                                                className="text-white text-[14px] hover:bg-yellow-951 hover:text-black h-[40px] px-4 border-b border-gray-900 w-full text-left flex items-center justify-start">
                                                <span>eOps Prosense</span>
                                            </Link>
                                            <Link
                                                href="#"
                                                className="text-white text-[14px] hover:bg-yellow-951 hover:text-black h-[40px] px-4 border-b border-gray-900 w-full text-left flex items-center justify-start">
                                                <span>eOps Insights/Reports</span>
                                            </Link>
                                        </div>
                                    }
                                </div>

                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <AddNewObject show={classSelector.toggleAddObject && classSelector.toggleAddObject} />
        </div>
    )
}