import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../../styles/Common.module.css';
import Image from "next/image";
import AddNewSubClass from './addnewsubclass';
import axios from 'axios';
import moment from 'moment';
import EditSubClass from './editsubclass';
import {
    editSubClassModalAction,
    successMessageAction,
    successMessagAdvancedAction
} from '@/store/actions/classAction';

import { getSubClassDataAction } from '@/store/actions/apiAction';

export default function SubClassManagement(props: any) {

    // console.log({
    //     "__PROPS_IN_SUB_CLASS_MANAGEMENT":props
    // })
    
    const dispatch = useDispatch<any>();
    const [toggleFilter, setToggleFilter] = useState(false);
    const [toggleArrow, setToggleArrow] = useState(false);
    const [toggleSort, setToggleSort] = useState(false);
    const [actions, setActions] = useState(false);
    const [actionCount, setActionCount] = useState(1);
    const [showModal, setShowModal] = useState(Boolean);
    const [deleteModal, setDeleteModal] = useState(false);
    const [subClassData, setSubClassData] = useState([] as any);
    const [selectedSubClass, setSelectedSubClass] = useState("");
    const [deleteID, setDeleteID] = useState(0);
    const [actionsToggle, setActionsToggle] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [editMessage, setEditMessage] = useState(false);
    const [allClassData, setAllClassData] = useState([] as any);
    const [searchClass, setSearchClass] = useState('');

    let access_token = "" as any;
    if (typeof window !== 'undefined') {
        access_token = localStorage.getItem('authToken')
    }

    // All class reducer states
    const allClassSelector = useSelector((state: any) => state.classReducer);
    const apiSelector = useSelector((state: any) => state.apiReducer);

    // console.log({
    //     "ALL DATA": apiSelector?.selectedClassReducer
    // })

    useEffect(() => {
        setShowModal(props.addSubClassModal)
    }, [props.addSubClassModal])

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

        setActionsToggle(true);
        setTimeout(() => {
            setActionsToggle(false);
        }, 1000)
    }


    const handleClick = (item: any) => {
        setShowModal(false);
        props.handleaddSubClassModal(item)
    }

    const deleteModalFunction = (id: any) => {
        setDeleteID(id)
        setDeleteModal(true);
        setActions(false);
    }

    const closeDeleteModal = () => {
        setDeleteModal(false)
    }


    // Dispatch sub class action
    useEffect(() => {
        dispatch(getSubClassDataAction(apiSelector?.selectedClassReducer))
    }, [access_token])

    // get sub class data
    useEffect(() => {
        setSubClassData(apiSelector?.subClassDataReducer);
        setAllClassData(apiSelector?.subClassDataReducer);
    }, [apiSelector?.subClassDataReducer])

    // function for searching
    const handleSearchFunction = (e: any) => {
        setSearchClass(e.target.value)
        if (e.target.value === "" || e.target.value.length <= 0) {
            setSubClassData(allClassData)
            return;
        }
        if (subClassData && subClassData.length > 0) {
            const filtered = subClassData.filter((item: any) => {
                if (item.className.toString().toLowerCase().includes(e.target.value.toString().toLowerCase())) {
                    return item;
                }
            })
            setSubClassData(filtered)
        }
    }


    // Open Edit class modal
    const openEditSubClassModal = (item: any) => {
        setSelectedSubClass(item)
        dispatch(editSubClassModalAction(true));
        setActions(false);
    }


    // CALLLING DELETE ASSET API WHEN CONFIRM 'YES' BUTTON CLICKED!
    const confirmDeleteClass = async (index: any) => {
        setDeleteModal(false);
        try {
            await axios({
                method: 'DELETE',
                url: `/api/deleteClasses?id=${index}`,
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                    "Content-Type": "application/json"
                }
            }).then(function (response) {
                dispatch(getSubClassDataAction(apiSelector?.selectedClassReducer));
                setDeleteMessage(true);
                setTimeout(()=>{
                    setDeleteMessage(false);
                }, 4000)
            }).catch(function (error) {
                console.log({
                    "ERROR IN AXIOS CATCH (DELETE)": error
                })
            })
        } catch (err) {
            console.log({
                "ERROR IN TRY CATCH (DELETE)": err
            })
        }

    }


    // Function to hide modals clicking outside
    function useOutsideAlerter(ref: any) {
        useEffect(() => {
            function handleClickOutside(event: any) {
                if (ref.current && !ref.current.contains(event.target)) {
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


    const handleAddSuccessMessage = (msg:any) => {
        setSuccessMessage(msg);
        setTimeout(()=>{
            setSuccessMessage(false);
        }, 4000)
    }

    const handleEditSuccessMessage = (msg:any) => {
        setEditMessage(msg);
        setTimeout(()=>{
            setEditMessage(false);
        }, 4000)
    }

    // convert selected id to classname
    const showClassNameFromID = (id: any) => {
        if (props.classData && props.classData.length > 0) {
            let filter = props.classData.filter((item: any) => {
                return item.id === id
            })
            if (filter) {
                return filter[0]?.className
            }
        }
    }

    // console.log({
    //     "__subClassData":subClassData,
    //     "__CLASS":showClassNameFromID(allClassSelector?.selectedClassReducer)
    // })
    return (
        <div className='px-0 py-3 font-OpenSans'>
            {/* Title, search and filters */}
            <div className='flex justify-between items-center px-4'>
                <h2 className='font-semibold text-2xl'>Sub Classes</h2>
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
                            placeholder="Search by class name"
                            id="searchClass"
                            name="searchClass"
                            className="border border-gray-969 rounded-lg h-[44px] w-[310px] pl-10 pr-2"
                            autoComplete="off"
                            value={searchClass}
                            onChange={handleSearchFunction}
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


            {/* Messages for Add Class */}
            {
                (successMessage) &&
                <div className={`bg-green-957 border-green-958 text-green-959 mb-1 mt-1 border text-md px-4 py-3 rounded-xl relative flex items-center justify-start mx-4`}>
                    <Image
                        src="/img/AlertSuccess.svg"
                        alt="Alert Success"
                        height={24}
                        width={24}
                        className='mr-2'
                    />
                    <strong className="font-semibold">Success</strong>
                    <span className="block sm:inline ml-2">Sub Class added successfully!</span>
                </div>
            }

            {/* Message for DeleteClass */}
            <div className='flex justify-start items-center px-4 w-full'>
                {
                    (deleteMessage) &&
                    <div className={`bg-blue-957 border-blue-958 text-blue-959 mb-1 mt-1 border text-md px-4 py-3  rounded-xl relative flex items-center justify-start w-full`}>
                        <Image
                            src="/img/AlertInfo.svg"
                            alt="Alert Success"
                            height={24}
                            width={24}
                            className='mr-2'
                        />
                        <strong className="font-semibold">Success</strong>
                        <span className="block sm:inline ml-2">Sub Class deleted successfully!</span>
                    </div>
                }
            </div>

            {/* Message for Edit Class */}
            <div className='flex justify-start items-center px-4 w-full'>
                {
                    editMessage &&
                    <div className={`bg-blue-957 border-blue-958 text-blue-959 mb-1 mt-1 border text-md px-4 py-3  rounded-xl relative flex items-center justify-start w-full`}>
                        <Image
                            src="/img/AlertInfo.svg"
                            alt="Alert Success"
                            height={24}
                            width={24}
                            className='mr-2'
                        />
                        <strong className="font-semibold">Success</strong>
                        <span className="block sm:inline ml-2">Sub Class updated successfully!</span>
                    </div>
                }
            </div>


            {/* Table */}
            <div className='w-full mt-6 min-h-[400px]'>
                {subClassData && subClassData.length > 0 ?
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
                                <th>
                                    {subClassData[0]?.ParentJoinKeys[0]?.tagname} ({showClassNameFromID(props?.selectedParentClass)})</th>
                                <th>Date of creation</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                subClassData.map((item: any, index: any) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <button>
                                                <span>{item.className}</span>
                                            </button>
                                        </td>
                                        <td className={`${styles.lastChildComma}`}>
                                            {
                                                item?.ClassTags.map((it: any, indx: any) => (
                                                    <span key={indx}>
                                                        {it.tagName}<em>, </em>
                                                    </span>
                                                ))
                                            }
                                        </td>
                                        <td className={`${styles.lastChildComma}`}>
                                            {
                                                item?.ParentJoinKeys.map((it: any, indx: any) => (
                                                    <span key={indx}>
                                                        {it.tagname}<em>, </em>
                                                    </span>
                                                ))
                                            }
                                        </td>
                                        <td>{moment(item.createdAt).format('DD-MM-YYYY')}</td>
                                        <td className='relative'>
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
                                                    <div ref={wrapperRef} className="bg-black text-white border overflow-hidden border-black rounded-xl w-[100px] flex flex-col flex-wrap items-start justify-start shadow-sm absolute  top-[100%] right-[calc(100%-15px)] z-[1]">
                                                        <button
                                                            onClick={() => openEditSubClassModal(item.id)}
                                                            className="text-white text-[14px] hover:bg-yellow-951 hover:text-black h-[30px] px-4 border-b border-gray-900 w-full text-left flex items-center justify-start">
                                                            <span>Edit</span>
                                                        </button>
                                                        <button
                                                            onClick={() => deleteModalFunction(item.id)}
                                                            className="text-white text-[14px] hover:bg-yellow-951 hover:text-black h-[30px] px-4 border-b border-gray-900 w-full text-left flex items-center justify-start">
                                                            <span>Delete</span>
                                                        </button>
                                                    </div>
                                                }
                                            </div>

                                        </td>
                                    </tr>
                                ))

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
                            Please create the sub class by clicking on the  <span className="text-black font-semibold text-lg]">&#34;Add Sub Class&#34;</span> button.</p>
                    </div>
                }
            </div>


            {/* Add New Class */}
            <AddNewSubClass
                handleClick={handleClick}
                show={showModal}
                selectedParentClass={allClassSelector?.selectedClassReducer}
                classData={props.classData}
                message={handleAddSuccessMessage}
            />


            {/* Edit Sub Class Component */}
            <EditSubClass
                show={allClassSelector?.editSubClassModalReducer}
                selectedParentClass={allClassSelector?.selectedClassReducer}
                classData={props.classData ? props.classData : []}
                subClassData={subClassData ? subClassData : []}
                selectedSubClass={selectedSubClass}
                message={handleEditSuccessMessage}
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
                                        <p className="flex justify-center items-center text-lg">Are you sure want to <span className="text-[#EF0000] mx-1 font-semibold">Delete</span> this sub-class?</p>
                                        <div className="mt-10 relative flex justify-center items-center w-full">
                                            <button
                                                className="border border-black rounded-lg bg-black text-white text-lg w-[70px] h-[47px] mr-5 hover:bg-yellow-951 hover:text-white hover:border-yellow-951 ease-in-out duration-[100ms] disabled:bg-gray-951 disabled:hover:border-gray-951 disabled:border-gray-951"
                                                onClick={() => confirmDeleteClass(deleteID)}
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



        </div>
    )
}