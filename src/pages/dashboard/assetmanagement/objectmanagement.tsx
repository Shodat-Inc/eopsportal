import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../../styles/Common.module.css';
import Image from "next/image";
import CustomDrop from '@/common/customdrop';
import axios from 'axios';
import Link from 'next/dist/client/link';
import { setSelectedClass, getSingleUser, setClassBreadcrumb  } from '@/store/actions/classAction';

export default function ObjectManagement(props: any) {
    const dispatch = useDispatch<any>();
    const [toggleFilter, setToggleFilter] = useState(false);
    const [toggleArrow, setToggleArrow] = useState(false);
    const [toggleSort, setToggleSort] = useState(false);
    const [classData, setClassData] = useState([] as any);
    const [chooseAsset, setChooseAsset] = useState('');
    const [actions, setActions] = useState(false);
    const [actionCount, setActionCount] = useState(1);
    const [objID, setObjID] = useState("");
    // const getSelClass = useSelector((state:any) => state.classReducer)
    // console.log({
    //     getSelClass:getSelClass.selectedClass
    // })
 
    const toggleFilterFunction = () => {
        setToggleArrow(!toggleArrow);
        setToggleFilter(!toggleFilter);
    }
    const sortByClassName = () => {
        setToggleSort(!toggleSort)
    }
    const fetchClassData = () => {
        axios.get("/api/getAssets").then((response: any) => {
            if (response.data) {
                const filtered = response.data.filter((item: any) => {
                    return item.assetName
                });
                if (filtered && filtered.length > 0) {
                    setClassData(filtered);
                }
            }
        });
    };
    useEffect(() => {
        fetchClassData();
        if (fetchClassData.length) return;
    }, [])

    useEffect(()=> {
        setChooseAsset(classData[0]?.assetName);
        dispatch(setSelectedClass(classData[0]?.assetName))
    }, [classData,dispatch])

    const handleDropDown = (item: any) => {  
        console.log({
            "AMIT":item
        })     
        dispatch(setSelectedClass(item))
        setChooseAsset(item);
    }
    const toggleActions = (item: any) => {
        setActionCount(item);
        setActions(!actions);
    }
    const selectedAction = (item: any) => {
        setActions(false);
    }
    const takeMeToSubObjectComponent = (item: any) => {
        console.log({
            "CHOOSEASSET":chooseAsset
        })  
        let abc = {
            "flow":"Object Management",
            "class":chooseAsset,
            "classObjKey": "VIN",
            "classObjValue":"5PVBE7AJ8R5T50001",
            "subClass":"Batteries",
            "subClassObjKey":"",
            "subClassObjValue":""
        }
        dispatch(setClassBreadcrumb(abc))
        setObjID(item);
        props.handelObject(item)
    }
    return (
        <div className='py-3 font-OpenSans'>
            {/* Title, search and filters */}
            <div className='flex justify-between items-center py-2 px-4 '>
                <div className='w-[350px]'>
                    <CustomDrop
                        data={classData}
                        handleClick={handleDropDown}
                        defaultClass={classData && classData.length > 0 ? classData[0].assetName : ""}
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

            {/* Table */}
            <div className='w-full mt-6 min-h-[400px]'>
                <table className={`table-auto lg:min-w-full sm:w-full small:w-full text-left ${styles.tableV3} ${styles.tableV4}`}>
                    <thead className="text-sm font-normal">
                        <tr>
                            <th>S.No</th>
                            <th>
                                <button className="flex justify-center items-center" onClick={sortByClassName}>
                                    <Image src="/img/arrow-up-gray.svg" alt="sort" height={17} width={17} className={`${toggleSort === true ? 'rotate-180' : 'rotate-0'}`} />
                                    <span>VIN No</span>
                                </button>
                            </th>
                            <th>Mfd Date</th>
                            <th>Model</th>
                            <th>Assembly Plant</th>
                            <th>Lot No</th>
                            <th>Model Year</th>
                            <th>Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>
                                <button
                                    onClick={() => takeMeToSubObjectComponent('5PVBE7AJ8R5T50001')}
                                >
                                    <span>5PVBE7AJ8R5T50001</span>
                                </button>
                            </td>
                            <td>06/03/2022</td>
                            <td>Mineral Wells</td>
                            <td>ES350</td>
                            <td>104CY5209</td>
                            <td>2022</td>
                            <td>ICE</td>
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
                        <tr>
                            <td>2</td>
                            <td>5PVBE7AJ8R5T50007</td>
                            <td>06/03/2022</td>
                            <td>Mineral Wells</td>
                            <td>GS450</td>
                            <td>104CY5209</td>
                            <td>2022</td>
                            <td>ICE</td>
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
                                </div>

                            </td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>5PVBN3TK3R6Y67222</td>
                            <td>06/03/2022</td>
                            <td>Virginia</td>
                            <td>EX-F</td>
                            <td>104FG2001</td>
                            <td>2023</td>
                            <td>EV</td>
                            <td>
                                <div className="flex justify-start items-center relative">
                                    <button onClick={() => toggleActions(3)}>
                                        <Image
                                            src="/img/more-vertical.svg"
                                            alt="more-vertical"
                                            height={24}
                                            width={24}
                                        />
                                    </button>
                                </div>

                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}