import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../../styles/Common.module.css';
import Image from "next/image";
import axios from 'axios';
import Link from 'next/dist/client/link';
import { setClassBreadcrumb, objDefaultClassSelectorFunction } from '@/store/actions/classAction';
import AddNewClassObject from './addnewclassobject';
import { successMessageAction } from '@/store/actions/classAction';
import { editObjectModalAction } from '@/store/actions/classAction';
import { setDataForeOpsWatchAction } from '@/store/actions/classAction';
import EditObject from './editobject';
import { useRouter } from 'next/router';
import { saveDataFlowObjectManagementAction } from '@/store/actions/assetsAction';

export default function ObjectManagement(props: any) {

    const dispatch = useDispatch<any>();
    const [toggleFilter, setToggleFilter] = useState(false);
    const [toggleArrow, setToggleArrow] = useState(false);
    const [chooseAsset, setChooseAsset] = useState(props.classData[0]?.assetName);
    const [toggleAsset, setToggleAsset] = useState(false);
    const [actions, setActions] = useState(false);
    const [actionCount, setActionCount] = useState(1);
    const [objID, setObjID] = useState("");
    const [deleteModal, setDeleteModal] = useState(false);
    const [objectData, setObjectData] = useState([] as any);
    const [tableHeader, setTableHeader] = useState({} as any);
    const [search, setSearch] = useState('');
    const [selectedObjID, setSelectedObjID] = useState('')
    const [actionsToggle, setActionsToggle] = useState(false);
    const router = useRouter();

    // All class reducer states
    const classSelector = useSelector((state: any) => state.classReducer);
    const assetsReducer = useSelector((state: any) => state.assetsReducer);

    useEffect(()=>{
        if (assetsReducer?.saveDataFlowObjectManagementReducer?.class!==undefined) {
            setChooseAsset(assetsReducer?.saveDataFlowObjectManagementReducer?.class)
        } else {
            setChooseAsset(props.classData[0]?.assetName)
        }
    }, [assetsReducer?.saveDataFlowObjectManagementReducer, props.classData])

    // Close Success message after 5 second if true
    useEffect(() => {
        if (classSelector && classSelector.successMessageReducer === true) {
            setTimeout(() => {
                dispatch(successMessageAction(false))
            }, 5000)
        }

    }, [classSelector])

    // Toggle the filters dropdown
    const toggleFilterFunction = () => {
        setToggleArrow(!toggleArrow);
        setToggleFilter(!toggleFilter);
    }


    // Set the choose asset on page load
    useEffect(() => {
        if (props.classData && props.classData.length > 0) {
            // setChooseAsset(props.classData[0]?.assetName);
            dispatch(objDefaultClassSelectorFunction(props.classData[0]?.assetName))
        }
    }, [props.classData])

    const toggleActions = (item: any) => {
        setActionCount(item);
        setActions(!actions);
        setActionsToggle(true);
        setTimeout(() => {
            setActionsToggle(false);
        }, 1000)
    }
    const takeMeToSubObjectComponent = (item: any) => {
        // console.log({
        //     item:item
        // })
        let classObjKey = chooseAsset === 'Manufacturing Plants' ? 'PlantID' : 'VIN';
        let abc = {
            "flow": "Object Management",
            "class": chooseAsset,
            "classObjKey": classObjKey,
            "classObjValue": item,
            "subClass": "",
            "subClassObjKey": "",
            "subClassObjValue": "",
            "tab":props?.tab ? props?.tab : 0,
            "parentTab":0,
            "model":""
        }
        dispatch(setClassBreadcrumb(abc))
        setObjID(item);
        props.handelObject(item)
        dispatch(saveDataFlowObjectManagementAction(abc))
    }


    const deleteModalFunction = () => {
        setDeleteModal(true);
        setActions(false);
    }

    const closeDeleteModal = () => {
        setDeleteModal(false)
    }


    function useOutsideAlerter(ref: any) {
        useEffect(() => {
            function handleClickOutside(event: any) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setToggleAsset(false);
                    setActions(false)
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

    const toggleDropdownFunction = () => {
        setToggleAsset(!toggleAsset)
    }

    const selectItemFunction = (item: any) => {
        setChooseAsset(item);
        setToggleAsset(false);
        dispatch(objDefaultClassSelectorFunction(item))
    }


    // Get objected based on selected class
    async function fetchData() {
        try {
            await axios({
                method: 'GET',
                url: `/api/getObjects`,

            }).then(function (response) {
                if (response) {
                    let filtered = response.data.filter((item: any) => {
                        return item.parentAssetName === chooseAsset
                    })
                    if (filtered && filtered.length >= 0) {
                        let headArray = filtered[0]?.subObjects;
                        setTableHeader(headArray)
                        setObjectData(filtered);
                    }
                }
            }).catch(function (error) {
                console.log({
                    "ERROR IN AXIOS CATCH": error
                })
            })
        } catch (err) {
            console.log({
                "ERROR IN TRY CATCH": err
            })
        }
    }
    useEffect(() => {
        fetchData();
        if (fetchData.length) return;
    }, [chooseAsset])


    // function for searching
    const handleSearchFUnction = (e: any) => {
        setSearch(e.target.value);
        if (e.target.value === "" || e.target.value.length <= 0) {
            fetchData();
            setSearch('');
            return;
        }
        let classObjKey = chooseAsset === 'Manufacturing Plants' ? 'PlantID' : 'VIN';
        console.log({
            SearchString: e.target.value,
            objectData: objectData
        })
        if (objectData && objectData.length > 0) {
            const filtered = objectData.filter((item: any) => {
                if (item.hasOwnProperty("subObjectName")) {
                    if (item.subObjectName.toString().toLowerCase().includes(e.target.value.toString().toLowerCase())) {
                        return item;
                    }
                }
            })
            setObjectData(filtered)
        } else {
            fetchData();
        }
    }


    // Edit Object Show/Hide
    const editObjectFunction = (item: any) => {
        dispatch(editObjectModalAction(true));
        setActions(false);
        setSelectedObjID(item);
    }

    // Save data for eopswatch section
    const eOpsWatchFunction = (item: any) => {
        let obj = '';
        if (chooseAsset === "Manufacturing Plants") {
            obj = item.ID
        } else {
            obj = item.VIN
        }
        const eopsData = {
            "class": chooseAsset,
            "subClass": "",
            "classObject": item,
            "object": "",
            "datafor": "eopwatch"
        }
        dispatch(setDataForeOpsWatchAction(eopsData));
        setTimeout(() => {
            router.push('/dashboard/aimodaldetection');
        }, 1000)
    }
    // Save data for eopswatch section
    const eOpsTraceFunction = (item: any) => {
        let obj = '';
        if (chooseAsset === "Manufacturing Plants") {
            obj = item.ID
        } else {
            obj = item.VIN
        }
        const eopsData = {
            "class": chooseAsset,
            "subClass": "",
            "classObject": item,
            "object": "",
            "datafor": "eoptrace"
        }
        dispatch(setDataForeOpsWatchAction(eopsData));
        setTimeout(() => {
            router.push('/dashboard/aimodaldetection');
        }, 1000)
    }

    return (
        <div className='py-3 font-OpenSans'>
            {/* Title, search and filters */}
            <div className='flex justify-between items-center py-2 px-4 '>
                <div className='w-[350px]'>
                    <div ref={wrapperRef}>
                        <div
                            className="border rounded-xl border-gray-969 h-[55px] pl-2 pr-5 relative flex items-center justify-start bg-white w-[80%] cursor-pointer"
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
                            <span className="text-lg text-black pl-2">{chooseAsset}</span>
                        </div>

                        {toggleAsset ?
                            <div className={`h-52 border rounded-xl border-gray-969 max-h-[250px] w-[400px]  absolute flex items-start justify-start mt-1 overflow-hidden overflow-y-auto bg-white ${styles.scroll} z-10`}>
                                <ul className="p-0 m-0 w-full">
                                    {
                                        props.classData.map((item: any, index: any) => (
                                            <li
                                                className="px-5 py-2 bg-white cursor-pointer hover:bg-yellow-951 w-full font-normal"
                                                onClick={() => selectItemFunction(item.assetName)}
                                                key={index}
                                            >
                                                <span>{item.assetName}</span>
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
                            placeholder={`Search by Name or Assembly Plant`}
                            id="searchobjects"
                            name="searchobjects"
                            className="border border-gray-969 rounded-lg h-[44px] w-[310px] pl-10 pr-2"
                            autoComplete="off"
                            value={search}
                            onChange={handleSearchFUnction}
                        />
                    </div>
                    <div className="relative ml-3">
                        <button
                            className={`bg-white border transition-all duration-[400ms] h-[44px] rounded-lg px-2 py-2 flex items-center justify-start ${toggleFilter === true ? 'border-black' : 'border-gray-969'}`}
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


            {/* Response Messages */}
            {
                classSelector.successMessageReducer === true &&

                <div className={`bg-green-957 border-green-958 text-green-959 mb-1 mt-1 border text-md px-4 py-3 rounded-xl relative flex items-center justify-start`}>
                    <Image
                        src="/img/AlertSuccess.svg"
                        alt="Alert Success"
                        height={24}
                        width={24}
                        className='mr-2'
                    />
                    <strong className="font-semibold">Success</strong>
                    <span className="block sm:inline ml-2">Object stored successfully!</span>
                </div>
            }

            {/* Table */}
            <div className='w-full mt-6 min-h-[400px]'>
                {objectData && objectData.length > 0 ?
                    <table className={`table-auto lg:min-w-full sm:w-full small:w-full text-left ${styles.tableV3} ${styles.tableV4}`}>
                        <thead className="text-sm font-normal">
                            <tr>
                                <th>S.No</th>
                                {
                                    tableHeader && Object.keys(`tableHeader`).length != 0 ?
                                        Object.keys(tableHeader).map((item: any, i: any) => (
                                            <th className="capitalize" key={i}>
                                                {
                                                    item.split(/(?=[A-Z])/).join(" ")
                                                }
                                            </th>
                                        ))
                                        : null
                                }
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                objectData && objectData.length > 0 ?
                                    objectData.map((items: any, index: any) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            {
                                                Object.values(items?.subObjects).map((item: any, i: any) => (
                                                    <td key={i} className={items.subObjectID}>
                                                        <button
                                                            onClick={() => takeMeToSubObjectComponent(items.subObjectID)}
                                                        >
                                                            <span>{item ? item : '-'}</span>
                                                        </button>
                                                    </td>
                                                ))
                                            }
                                            <td>
                                                <div className="flex justify-start items-center relative">
                                                    {
                                                        !actionsToggle ?
                                                            <button
                                                                className='flex justify-start items-center h-[35px] w-[35px]'
                                                                onClick={() => toggleActions(index + 1)}>
                                                                <Image
                                                                    src="/img/more-vertical.svg"
                                                                    alt="more-vertical"
                                                                    height={24}
                                                                    width={24}
                                                                />
                                                            </button>
                                                            :
                                                            <button className='flex justify-start items-center h-[35px] w-[35px]'>
                                                                <Image
                                                                    src="/img/more-vertical.svg"
                                                                    alt="more-vertical"
                                                                    height={24}
                                                                    width={24}
                                                                />
                                                            </button>
                                                    }
                                                    {(actions && actionCount === index + 1) &&
                                                        <div ref={wrapperRef} className="bg-black text-white border overflow-hidden border-black rounded-lg w-[200px] flex flex-col flex-wrap items-start justify-start shadow-sm absolute top-[100%] right-[calc(100%-15px)] z-[1]">
                                                            <button
                                                                onClick={() => editObjectFunction(items.subObjectID)}
                                                                className="text-white text-[14px] hover:bg-yellow-951 hover:text-black h-[40px] px-4 border-b border-gray-900 w-full text-left flex items-center justify-start">
                                                                <span>Edit</span>
                                                            </button>
                                                            <button
                                                                onClick={deleteModalFunction}
                                                                className="text-white text-[14px] hover:bg-yellow-951 hover:text-black h-[40px] px-4 border-b border-gray-900 w-full text-left flex items-center justify-start">
                                                                <span>Delete</span>
                                                            </button>
                                                            <button
                                                                onClick={() => eOpsWatchFunction(items.subObjectID)}
                                                                className="text-white text-[14px] hover:bg-yellow-951 hover:text-black h-[40px] px-4 border-b border-gray-900 w-full text-left flex items-center justify-start">
                                                                <span>eOps Watch</span>
                                                            </button>
                                                            <button
                                                                onClick={() => eOpsTraceFunction(items?.subObjectID)}
                                                                className="text-white text-[14px] hover:bg-yellow-951 hover:text-black h-[40px] px-4 border-b border-gray-900 w-full text-left flex items-center justify-start">
                                                                <span>eOps Trace</span>
                                                            </button>
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
                                    ))
                                    : null
                            }

                        </tbody>
                    </table>
                    :
                    <div className="flex justify-center items-center flex-wrap flex-col font-OpenSans mt-20">
                        <div className="no-data-image">
                            <Image
                                src="/img/not-found.svg"
                                alt="no data found!"
                                className="inline-block"
                                height={72}
                                width={72}
                            />
                        </div>
                        <p className="text-black text-xl mt-8 font-semibold">No data found!!</p>
                        <p className="text-black text-lg mt-3 font-normal">
                            Please create the object by clicking on the  <span className="text-black font-semibold text-lg]">&#34;Add Class Object&#34;</span> button.
                        </p>
                    </div>
                }
            </div>


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
                                                className="border border-black rounded-lg bg-black text-white text-lg w-[70px] h-[47px] mr-5 hover:bg-yellow-951 hover:text-white hover:border-yellow-951 ease-in-out duration-[100ms] disabled:bg-gray-951 disabled:hover:border-gray-951 disabled:border-gray-951"
                                                onClick={closeDeleteModal}
                                            >
                                                Yes
                                            </button>
                                            <button
                                                className="border border-black rounded-lg bg-white text-black text-lg w-[70px] h-[47px] hover:text-white hover:bg-yellow-951 hover:border-yellow-951 ease-in-out duration-[100ms]"
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
            {/* Add New Class Object */}
            <AddNewClassObject
                show={classSelector.toggleAddClassObject && classSelector.toggleAddClassObject}
                objectData={objectData}
                selectedParentClass={chooseAsset}
                classData={props.classData}
                objID={objID}
            />

            <EditObject
                show={classSelector?.editObjectModalReducer}
                selectedObject={selectedObjID}
                selectedParentClass={chooseAsset}
                objectData={objectData}
            />

        </div>
    )
}