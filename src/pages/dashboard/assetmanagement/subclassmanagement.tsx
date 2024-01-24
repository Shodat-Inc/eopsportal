import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../../styles/Common.module.css';
import Image from "next/image";
import Link from 'next/dist/client/link';
import AddNewSubClass from './addnewsubclass';
import axios from 'axios';
import moment from 'moment';
import EditSubClass from './editsubclass';
import { editSubClassModalAction, successMessageAction } from '@/store/actions/classAction';

export default function SubClassManagement(props: any) {
    const dispatch = useDispatch<any>();
    const [toggleFilter, setToggleFilter] = useState(false);
    const [toggleArrow, setToggleArrow] = useState(false);
    const [toggleSort, setToggleSort] = useState(false);
    const [actions, setActions] = useState(false);
    const [actionCount, setActionCount] = useState(1);
    const [showModal, setShowModal] = useState(Boolean);
    const [deleteModal, setDeleteModal] = useState(false);
    const [subClassData, setSubClassData] = useState([] as any);
    const [search, setSearch] = useState('');
    const [selectedSubClass, setSelectedSubClass] = useState("");
    const [deleteID, setDeleteID] = useState(0);
    const [deleteMessage, setDeleteMessage] = useState(false);
    const [actionsToggle, setActionsToggle] = useState(false);

    let access_token = "" as any;
    if (typeof window !== 'undefined') {
        access_token = localStorage.getItem('authToken')
    }

    // All class reducer states
    const allClassSelector = useSelector((state: any) => state.classReducer);

    useEffect(() => {
        if (allClassSelector && allClassSelector.successMessageReducer === true) {
            setTimeout(() => {
                dispatch(successMessageAction(false))
            }, 5000)
        }

    }, [allClassSelector?.successMessageReducer])

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
    const selectedAction = (item: any) => {
        setActions(false);
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

    // const takeMeToClassComponent = (item: any) => {
    //     props.handelsubClass(item)
    // }


    // set default choose asset
    async function fetchData() {
        try {
            await axios({
                method: 'GET',
                url: `/api/getChildAssets?id=${props.selectedParentClass}`,
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                    "Content-Type": "application/json"
                }

            }).then(function (response: any) {
                if (response) {
                    setSubClassData(response?.data?.data);
                }
            }).catch(function (error: any) {
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
        fetchData()
    }, [props.selectedParentClass, allClassSelector?.successMessageReducer === true])

    // function for searching
    const handleSearchFUnction = (e: any) => {
        setSearch(e.target.value);
        if (e.target.value === "" || e.target.value.length <= 0) {
            fetchData();
            setSearch('');
            return;
        }
        if (subClassData && subClassData.length > 0) {
            const filtered = subClassData.filter((item: any) => {
                if (item.hasOwnProperty("assetName")) {
                    if (item.assetName.toString().toLowerCase().includes(e.target.value.toString().toLowerCase())) {
                        return item;
                    }
                }
            })
            setSubClassData(filtered)
        } else {
            fetchData();
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
                dispatch(successMessageAction(true))
                setDeleteMessage(true);
                setTimeout(() => {
                    setDeleteMessage(false)
                }, 2000)
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
                            placeholder={`Search`}
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


            {/* Response Messages */}
            {
                allClassSelector?.successMessageReducer === true &&

                <div className={`bg-green-957 border-green-958 text-green-959 mb-1 mt-1 border text-md px-4 py-3 rounded rounded-xl relative flex items-center justify-start mx-4`}>
                    <Image
                        src="/img/AlertSuccess.svg"
                        alt="Alert Success"
                        height={24}
                        width={24}
                        className='mr-2'
                    />
                    <strong className="font-semibold">Success</strong>
                    <span className="block sm:inline ml-2">Sub Class stored successfully!</span>
                </div>
            }
            
            {/* Success / Error Message */}
            <div className='flex justify-start items-center px-4 w-full'>
                {deleteMessage &&
                    <div className={`bg-blue-957 border-blue-958 text-blue-959 mb-1 mt-1 border text-md px-4 py-3 rounded rounded-xl relative flex items-center justify-start  w-full`}>
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
                                <th>Parent Join Keys</th>
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
                                        <td>
                                            {
                                                item?.ClassTags.map((it: any, indx: any) => (
                                                    <span key={indx}>
                                                        {it.tagName}<em>, </em>
                                                    </span>
                                                ))
                                            }
                                        </td>
                                        <td>
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
                                                    <div ref={wrapperRef} className="bg-black text-white border overflow-hidden border-black rounded rounded-xl w-[100px] flex flex-col flex-wrap items-start justify-start shadow-sm absolute  top-[100%] right-[calc(100%-15px)] z-[1]">
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
                selectedParentClass={props.selectedParentClass}
                classData={props.classData}
            />


            {/* Edit Sub Class Component */}
            <EditSubClass
                show={allClassSelector?.editSubClassModalReducer}
                selectedParentClass={props.selectedParentClass ? props.selectedParentClass : ''}
                classData={props.classData ? props.classData : []}
                subClassData={subClassData ? subClassData : []}
                selectedSubClass={selectedSubClass}
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