import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import styles from '../../../styles/Common.module.css';
import Image from "next/image";
import axios from 'axios';
import Link from 'next/dist/client/link';
import { setSelectedClass, setClassBreadcrumb, selectedClassDataAction } from '@/store/actions/classAction';
import AddNewClassObject from './addnewclassobject';

export default function ObjectManagement(props: any) {
    console.log({
        "OBJECT MANAGEMENT": props
    })
    const dispatch = useDispatch<any>();
    const [chooseAsset, setChooseAsset] = useState(0);
    const classSelector = useSelector((state: any) => state.classReducer);

    const [toggleFilter, setToggleFilter] = useState(false);
    const [toggleArrow, setToggleArrow] = useState(false);
    const [toggleSort, setToggleSort] = useState(false);
    const [actions, setActions] = useState(false);
    const [actionCount, setActionCount] = useState(1);
    const [toggleAsset, setToggleAsset] = useState(false);

    // Use Effect to set default dropdown selector
    useEffect(() => {
        if (props.classData && props.classData.length >= 0) {
            setChooseAsset(props.classData[0].id);
        }
    }, [props.classData])

    // Function to get className based on ID
    function getClassNameFunction(id: any) {
        let data = [] as any;
        if (props.classData && props.classData.length >= 0) {
            data = props.classData.filter(function(item:any){
                return item.id === id;
             })
        }
        return data;
    }

    // Toggle filters
    const [objID, setObjID] = useState("");
    const [deleteModal, setDeleteModal] = useState(false);
 
    const toggleFilterFunction = () => {
        setToggleArrow(!toggleArrow);
        setToggleFilter(!toggleFilter);
    }
    const sortByClassName = () => {
        setToggleSort(!toggleSort)
    }

    // UseEffect to dispatch an action
    useEffect(() => {
        dispatch(setSelectedClass(props.classData[0]?.id))
        dispatch(selectedClassDataAction(props.classData[0]))
    }, [props.classData, dispatch])


    // Toggle dropdown options to open in table
    const toggleActions = (item: any) => {
        setActionCount(item);
        setActions(!actions);
    }

    // function to create breadcrumb
    const takeMeToSubObjectComponent = (item: any) => {
        let abc = {
            "flow": "Object Management",
            "class": getClassNameFunction(chooseAsset)[0]?.className,
            "classObjKey": getClassNameFunction(chooseAsset)[0]?.className === "Vehicles" ? "VIN" : "PlantID",
            "classObjValue": item,
            "subClass": "Battery",
            "subClassObjKey": "",
            "subClassObjValue": ""
        }
        dispatch(setClassBreadcrumb(abc))
        props.handelObject(item)
    }

    // Function to toggle the class dropdown
    const toggleDropdownFunction = () => {
        setToggleAsset(!toggleAsset)
    }
    const selectItemFunction = (item: any) => {
        setChooseAsset(item);
        setToggleAsset(false);
        // dispatch(setSelectedClass(item))
    }

    useEffect(()=>{
        dispatch(setSelectedClass(chooseAsset))
    }, [chooseAsset, dispatch])

    const deleteModalFunction = () => {
        setDeleteModal(true);
        setActions(false);
    }

    const closeDeleteModal = () => {
        setDeleteModal(false)
    }

    return (
        <div className='py-3 font-OpenSans'>
            {/* Title, search and filters */}
            <div className='flex justify-between items-center py-2 px-4 '>
                <div className='w-[350px]'>

                    {/* Class dropdown */}
                    <div>
                        <div
                            className="border rounded-xl border-gray-500 h-[55px] pl-2 pr-5 relative flex items-center justify-start bg-white w-[80%] cursor-pointer"
                            onClick={toggleDropdownFunction}
                        >
                            <label className="absolute text-sm top-[-10px] left-2 pl-2 pr-2 bg-white">Choose Industry type</label>
                            <Image
                                src="/img/arrow-down-black.svg"
                                alt="arrow-down"
                                height={20}
                                width={20}
                                className={`absolute right-3 top-4 ${toggleAsset ? 'rotate-180' : 'rotate-0'}`}
                            />
                            <span className="text-lg text-black pl-2">
                                {getClassNameFunction(chooseAsset)[0]?.className}
                            </span>
                        </div>

                        {toggleAsset ?
                            <div className={`h-52 border rounded-xl border-gray-500 h-auto max-h-[250px] w-[400px]  absolute flex items-start justify-start mt-1 overflow-hidden overflow-y-auto bg-white ${styles.scroll} z-10`}>
                                    <ul className="p-0 m-0 w-full">
                                        {
                                            props.classData && props.classData.length >= 0 && props.classData.map((item: any, index: any) => (
                                                <li
                                                    className="px-5 py-2 bg-white cursor-pointer hover:bg-yellow-951 w-full font-normal"
                                                    onClick={() => selectItemFunction(item.id)}
                                                    key={index}
                                                >
                                                    <span>{item.className}</span>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                
                            </div>
                            :
                            null
                        }
                    </div>

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
                                            <button
                                                onClick={deleteModalFunction}
                                                className="text-white text-[14px] hover:bg-yellow-951 hover:text-black h-[40px] px-4 border-b border-gray-900 w-full text-left flex items-center justify-start">
                                                <span>Delete</span>
                                            </button>
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

                                    {/* Add New Class Object */}
            <AddNewClassObject
                show={classSelector.toggleAddClassObject && classSelector.toggleAddClassObject}
                // parentClassID={getClassStates.selectedClass}
                // subClassID={chooseAsset}
                // subClassData={subClassData}
            />

            {/* Delete Modal */}
            {deleteModal &&
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative my-6 w-[580px]">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-2">
                                    <h3 className="text-lg font-medium"></h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black float-right leading-none font-semibold outline-none focus:outline-none"
                                        onClick={closeDeleteModal}
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
                                <div className="relative pt-2 pb-8 flex-auto">
                                    <div className="flex justify-start items-center flex-wrap flex-col">
                                        <p className="flex justify-center items-center text-lg">Are you sure want to <span className="text-[#EF0000] mx-1 font-semibold">Delete</span> this object?</p>
                                        <div className="mt-10 relative flex justify-center items-center w-full">
                                            <button
                                                className="border border-black rounded-lg bg-black text-white text-lg w-[70px] h-[47px] mr-5 hover:bg-yellow-951 hover:text-white hover:border-yellow-951 ease-in-out duration-300 disabled:bg-gray-951 disabled:hover:border-gray-951 disabled:border-gray-951"
                                                onClick={closeDeleteModal}
                                            >
                                                Yes
                                            </button>
                                            <button
                                                className="border border-black rounded-lg bg-white text-black text-lg w-[70px] h-[47px] hover:text-white hover:bg-yellow-951 hover:border-yellow-951 ease-in-out duration-300"
                                                onClick={closeDeleteModal}
                                            >
                                                No
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
                </>
            }



        </div>
    )
}