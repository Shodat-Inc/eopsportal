import React, { useState, useEffect, useRef } from 'react';
import styles from '../../../styles/Common.module.css';
import Image from "next/image";
import Link from 'next/dist/client/link';
import AddNewClass from './addnewclass';
import axios from 'axios';
import Spinner from "@/common/spinner";
import moment from 'moment';
export default function ClassManagement(props: any) {
    const [toggleFilter, setToggleFilter] = useState(false);
    const [toggleArrow, setToggleArrow] = useState(false);
    const [toggleSort, setToggleSort] = useState(false);
    const [actions, setActions] = useState(false);
    const [actionCount, setActionCount] = useState(1);
    const [showModal, setShowModal] = useState(Boolean);
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteID, setDeleteID] = useState(0);
    const [deleteMessage, setDeleteMessage] = useState(false);
    // const [allClass, setAllClass] = useState([] as any);
    let access_token = "" as any;
    if (typeof window !== 'undefined') {
        access_token = localStorage.getItem('authToken')
    }

    // // GET ALL CLASS DATA
    // async function fetchData() {
    //     try {
    //         await axios({
    //             method: 'GET',
    //             url: `http://20.232.178.134:3000/api/getAssets`,
    //             headers: {
    //                 "Authorization": `Bearer ${access_token}`,
    //                 "Content-Type": "application/json"
    //             }
    //         }).then(function (response) {
    //             if (response) {
    //                 setAllClass(response.data?.data)
    //             }
    //         }).catch(function (error) {
    //             console.log({
    //                 "ERROR IN AXIOS CATCH": error
    //             })
    //         })
    //     } catch (err) {
    //         console.log({
    //             "ERROR IN TRY CATCH": err
    //         })
    //     }
    // }
    // useEffect(() => {
    //     fetchData();
    // }, [access_token])

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

    const handleClick = (item: any) => {
        setShowModal(false);
        props.handleaddClassModal(item)
    }

    // SHOW DELETE MODAL
    const deleteModalFunction = (index: any) => {
        setDeleteID(index);
        setDeleteModal(true);
        setActions(false);
    }

    // CLOSE DELETE MODAL
    const closeDeleteModal = () => {
        setDeleteModal(false)
    }

    // CALLLING DELETE ASSET API WHEN CONFIRM 'YES' BUTTON CLICKED!
    const confirmDeleteClass = async (index: any) => {
        setDeleteModal(false);
        try {
            await axios({
                method: 'DELETE',
                url: `http://20.232.178.134:3000/api/deleteClasses?id=${index}`,
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                    "Content-Type": "application/json"
                }
            }).then(function (response) {
                console.log({
                    response: response,
                    message: "Class deleted successful!!"
                })
                setDeleteMessage(true);
                setTimeout(()=>{
                    setDeleteMessage(false)
                },2000)
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

    const takeMeToClassComponent = (item: any) => {
        props.handelsubClass(item)
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

            {/* Success / Error Message */}
            <div className='flex justify-start items-center px-4'>
                {deleteMessage &&
                    <div className={`bg-blue-957 border-blue-958 text-blue-959 mb-1 mt-1 border text-md px-4 py-3 rounded rounded-xl relative flex items-center justify-start`}>
                        <Image
                            src="/img/AlertInfo.svg"
                            alt="Alert Success"
                            height={24}
                            width={24}
                            className='mr-2'
                        />
                        <strong className="font-semibold">Success</strong>
                        <span className="block sm:inline ml-2">Class has been deleted successfully!</span>
                    </div>
                }
            </div>

            {/* Table */}
            <div className='w-full mt-6 min-h-[400px] '>
                {
                    props.classData && props.classData.length > 0 ?
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
                                    props.classData.map((item: any, index: any) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <button
                                                    onClick={() => takeMeToClassComponent(item.className)}
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
                                                            <Link
                                                                href="#"
                                                                className="text-white text-[14px] hover:bg-yellow-951 hover:text-black h-[30px] px-4 border-b border-gray-900 w-full text-left flex items-center justify-start">
                                                                <span>Edit</span>
                                                            </Link>
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
                        <div className='flex justify-center items-center flex-wrap'>
                            <Spinner width="24" height="24" />
                            <div className='text-lg font-semibold mt-2'>Please Wait ...</div>
                        </div>
                }
            </div>


            {/* Add New Class */}
            <AddNewClass
                handleClick={handleClick}
                show={showModal}
                claasses={props.classData}
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
                                                className="border border-black rounded-lg bg-black text-white text-lg w-[70px] h-[47px] mr-5 hover:bg-yellow-951 hover:text-white hover:border-yellow-951 ease-in-out duration-300 disabled:bg-gray-951 disabled:hover:border-gray-951 disabled:border-gray-951"
                                                onClick={() => confirmDeleteClass(deleteID)}
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