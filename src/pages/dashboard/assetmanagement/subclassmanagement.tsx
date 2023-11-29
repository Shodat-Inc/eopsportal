import React, { useState, useEffect, useRef } from 'react';
import styles from '../../../styles/Common.module.css';
import Image from "next/image";
import Link from 'next/dist/client/link';
import AddNewSubClass from './addnewsubclass';
export default function SubClassManagement(props: any) {
    // console.log({
    //     props: props.classData

    // })
    const [toggleFilter, setToggleFilter] = useState(false);
    const [toggleArrow, setToggleArrow] = useState(false);
    const [toggleSort, setToggleSort] = useState(false);
    const [actions, setActions] = useState(false);
    const [actionCount, setActionCount] = useState(1);
    const [showModal, setShowModal] = useState(Boolean);
    const [deleteModal, setDeleteModal] = useState(false);
    const [subClassData, setSubClassData] = useState([] as any)
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
    }
    const selectedAction = (item: any) => {
        setActions(false);
    }

    const handleClick = (item: any) => {
        setShowModal(false);
        props.handleaddSubClassModal(item)
    }

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
                                <th>Date of creation</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan={5}>
                                    No Data Found!
                                </td>
                            </tr>
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
                classData={props.classData}
            />



        </div>
    )
}