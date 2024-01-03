import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../../styles/Common.module.css';
import Image from "next/image";
import moment from 'moment';
import AddNewClass from './addnewclass';
import { successMessageAction } from '@/store/actions/classAction';
import EditClass from './editclass';
import { editClassModalAction } from '@/store/actions/classAction';

export default function ClassManagement(props: any) {
    const dispatch = useDispatch<any>();
    const [toggleFilter, setToggleFilter] = useState(false);
    const [toggleArrow, setToggleArrow] = useState(false);
    const [toggleSort, setToggleSort] = useState(false);
    const [actions, setActions] = useState(false);
    const [actionCount, setActionCount] = useState(1);
    const [showModal, setShowModal] = useState(Boolean);
    // const [showEditClassModal, setShowEditClassModal] = useState(Boolean);
    const [deleteModal, setDeleteModal] = useState(false);
    const [searchClass, setSearchClass] = useState('');
    const [allData, setAllData] = useState(props.classData);
    const [selectedClass, setSelectedClass] = useState("")

    // All class reducer states
    const allClassSelector = useSelector((state: any) => state.classReducer);
    // console.log({
    //     allClassSelector:allClassSelector?.editClassModalReducer
    // })

    // Close Success message after 5 second if true
    useEffect(() => {
        if (allClassSelector && allClassSelector.successMessageReducer === true) {
            setTimeout(() => {
                dispatch(successMessageAction(false))
            }, 5000)
        }

    }, [allClassSelector.successMessageReducer])

    useEffect(() => {
        setShowModal(props.addClassModal)
    }, [props.addClassModal])

    // Set class data on page load
    useEffect(() => {
        setAllData(props.classData)
    }, [props, props.classData])

    // Toggle Filters
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
    const handleClick = (item: any) => {
        setShowModal(false);
        props.handleaddClassModal(item);
    }

    // const handleClickForEditClass = (item: any) => {
    //     setShowEditClassModal(false)
    // }

    const deleteModalFunction = () => {
        setDeleteModal(true);
        setActions(false);
    }

    const closeDeleteModal = () => {
        setDeleteModal(false)
    }

    const takeMeToClassComponent = (item: any) => {
        props.handelsubClass(item)
    }

    // function for searching
    const handleSearchFUnction = (e: any) => {
        setSearchClass(e.target.value);
        if (e.target.value === "" || e.target.value.length <= 0) {
            setSearchClass('');
            setAllData(props.classData)
            return;
        }
        if (props.classData && props.classData.length > 0) {
            const filtered = props.classData.filter((item: any) => {
                if (item.hasOwnProperty("assetName")) {
                    if (item.assetName.toString().toLowerCase().includes(e.target.value.toString().toLowerCase())) {
                        return item;
                    }
                }
            })
            setAllData(filtered)
        } else {
            setAllData(props.classData)
        }
    }


    // Open Edit class modal
    const openEditClassModal = (item:any) => {
        setSelectedClass(item)
        dispatch(editClassModalAction(true));
        setActions(false);
    }

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
                            placeholder="Search"
                            id="searchClass"
                            name="searchClass"
                            className="border border-gray-969 rounded-lg h-[44px] w-[310px] pl-10 pr-2"
                            autoComplete="off"
                            value={searchClass}
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
                allClassSelector.successMessageReducer === true &&

                <div className={`bg-green-957 border-green-958 text-green-959 mb-1 mt-1 border text-md px-4 py-3 rounded rounded-xl relative flex items-center justify-start`}>
                    <Image
                        src="/img/AlertSuccess.svg"
                        alt="Alert Success"
                        height={24}
                        width={24}
                        className='mr-2'
                    />
                    <strong className="font-semibold">Success</strong>
                    <span className="block sm:inline ml-2">Class stored successfully!</span>
                </div>
            }



            {/* Table */}
            <div className='w-full mt-6 min-h-[400px]'>
                {
                    allData && allData.length > 0 ?
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
                                    allData.map((item: any, index: any) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <button
                                                    onClick={() => takeMeToClassComponent(item.assetName)}
                                                >
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
                                            {/* <td>{item.createdAt}</td> */}
                                            <td>{moment(item.createdAt).format('DD-MM-YYYY')}</td>
                                            <td className='relative'>
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
                                                        <div className="bg-black text-white border overflow-hidden border-black rounded rounded-xl w-[100px] flex flex-col flex-wrap items-start justify-start shadow-sm absolute top-[30px] right-[75px] z-[1]">
                                                            <button
                                                                onClick={()=>openEditClassModal(item.assetName)}
                                                                className="text-white text-[14px] hover:bg-yellow-951 hover:text-black h-[30px] px-4 border-b border-gray-900 w-full text-left flex items-center justify-start">
                                                                <span>Edit</span>
                                                            </button>
                                                            <button
                                                                onClick={deleteModalFunction}
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
                        <div className='flex justify-center items-center w-full flex-wrap flex-col py-3 h-[250px]'>
                            <Image
                                src="/img/not-found.svg"
                                alt='not-found'
                                height={72}
                                width={72}
                                className='mb-6'
                            />
                            <p className="text-black text-2xl font-semibold">No data found!!</p>
                            <p className="text-black text-lg mt-3 font-normal">Please create the class by clicking on the  <span className="text-black font-semibold text-lg]">"Add Class"</span> button.</p>
                        </div>
                }
            </div>


            {/* Add New Class */}
            <AddNewClass
                handleClick={handleClick}
                show={showModal}
            />


            {/* Add Edit Class */}
            <EditClass
                selectedClass={selectedClass}
                allClassData={allData}
                show={allClassSelector?.editClassModalReducer}
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
                                        <p className="flex justify-center items-center text-lg">Are you sure want to <span className="text-[#EF0000] mx-1 font-semibold">Delete</span> this class?</p>
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

        </div>
    )
}