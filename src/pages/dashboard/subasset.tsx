import React, { useState, useRef, useEffect } from "react";
import Layout from "../../components/Layout";
import NoDataFound from "../../common/nodatafound";
import styles from '../../styles/Common.module.css';
import { getSubAssetsData } from "../../lib/getsubassets";
import { useRouter } from 'next/router'
import Link from "next/link";
import Image from "next/image";
import Template from "./template";
import axios from 'axios';
import moment from "moment";
import AlertMessage from "@/common/alertMessage";

export async function getServerSideProps() {
    const localData = await getSubAssetsData()
    return {
        props: {
            localData,
        },
    }
}

export default function SubAsset(localData: any) {
    const router = useRouter();
    const parentAsset = router.query;
    const [showModal, setShowModal] = useState(false);
    const [success, setSuccess] = useState(false);
    const assetid = useRef("");
    const [data, setData] = useState<any[]>([]);
    const [allTags, setAllTags] = useState<any[]>([]);
    const [parentJoinKey, setParentJoinKey] = useState<any[]>([]);
    const [newTag, setNewTag] = useState("");
    const [showInput, setShowInput] = useState(false);
    const [hide, setHide] = useState(false);
    const [showHideAddTagButton, setShowHideAddTagButton] = useState(false);
    const [selParentTags, setSelParentTags] = useState<any[]>([]);
    const filtered = localData.localData.filter((item: any) => {
        return item.parentAssetName === parentAsset.assets;
    });
    const [filteredList, setFilteredList] = useState(filtered);
    const [checkIcon, setCheckIcon] = useState("/img/blank_check_box_icon_white.svg");
    const [tag, setTag] = useState<any[]>([]);

    const [dataType, setDataType] = useState("");
    const [toggleDT, setToggleDT] = useState(false);
    const [assetDataType, setAssetDataType] = useState<any[]>([]);


    // Get JSON data on page load
    const fetchDataForParent = () => {
        axios.get("/api/getAssets").then((response) => {
            if (response.data) {
                const filtered = response.data.filter((item: any) => {
                    return item.assetName === parentAsset.assets;
                });
                if (filtered && filtered.length > 0) {
                    setParentJoinKey(filtered[0].assetkey);
                }
            }
        });
    };
    useEffect(() => {
        fetchDataForParent();
        if (fetchDataForParent.length) return;
    }, [])


    // Remove duplicate element from array
    function removeDuplicates(arr: any) {
        let unique = [];
        for (let i = 0; i < arr.length; i++) {
            if (unique.indexOf(arr[i]) === -1) {
                unique.push(arr[i]);
            }
        }
        return unique;
    }

    // Get JSON data on page load
    const fetchData = () => {
        axios.get("/api/getSubAssets").then((response) => {
            if (response.data) {
                const filtered = localData.localData.filter((item: any) => {
                    return item.parentAssetName === parentAsset.assets;
                });
                if (filtered && filtered.length > 0) {
                    setData(filtered);
                }

                let arr: any = [];
                response.data.map((item: any, key: any) => {
                    arr.push(...item.tags);
                    setTag(removeDuplicates(arr))
                })

            }
        });
    };


    useEffect(() => {
        let arr = parentJoinKey.concat(tag);        
        setParentJoinKey(removeDuplicates(arr))
    }, [tag])

    useEffect(() => {
        fetchData();
        if (fetchData.length) return;
    }, [localData.localData])

    // Adding New Tags
    const addTags = () => {
        setShowInput(true);
        setHide(true)
        setShowHideAddTagButton(true);
        setToggleDT(true);
    }

    // Cancel Adding new tags
    const cancelAddingTag = () => {
        setShowInput(false);
        setShowHideAddTagButton(false);
        setToggleDT(false);
        setDataType("");
    }

    // Remove Elemnet from all Tag Array
    const removeElement = (item: any) => {
        let updatedList = allTags.slice();
        var filteredArray = updatedList.filter(function (e) { return e !== item })
        setAllTags(removeDuplicates(filteredArray));

        let updatedListType = assetDataType;
        var popped = updatedListType.splice(-1);
        setAssetDataType(popped);
    }

    // Get Radio Button Value
    const radioChange = (value: any) => {
        setDataType(value);
    }

    // Save New Tag
    const saveNewTag = () => {
        if (newTag.trim().length !== 0) {
            let updatedList = allTags.slice();
            updatedList.push(newTag)
            setAllTags(updatedList)
            setShowInput(false);
            setNewTag("");
            setShowHideAddTagButton(false);
            setToggleDT(false);
            
            let typeList = assetDataType;
            typeList.push(dataType)
            setAssetDataType(typeList);
            setDataType("");
        } else {
            console.log("Input must not be empty")
        }
    }


    // Selected parent join key
    const selectedParentKey = (item: any) => {
        let updatedList = selParentTags;
        updatedList.push(item)
        setSelParentTags(removeDuplicates(updatedList))
        setCheckIcon("/img/box_check_icon_white.svg")
    }

    // Un Select Parent Join Key
    const unSelectParentKey = (item: any) => {
        var arr = selParentTags;
        var index = arr.indexOf(item);
        if (index >= 0) {
            arr.splice(index, 1);
        }
        setSelParentTags(removeDuplicates(arr));
        setCheckIcon("/img/blank_check_box_icon_white.svg");
    }


    // Get Last Asset ID
    const getLastID = (data && data.length > 0) ? data.slice(-1)[0].assetID : '2000000001';

    // Storing data in json for sub class
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        var formData = new FormData(e.target);
        const form_values = Object.fromEntries(formData);
        const response = await fetch('/api/createSubAssets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    assetID: getLastID + 1,
                    assetName: `${form_values.assetname}`,
                    slug: `${form_values.assetname}`,
                    parentAssetID: parentAsset.assets,
                    parentAssetName: parentAsset.assets,
                    tags: allTags,
                    parentJoinKey: selParentTags,
                    dateCreated: new Date().toLocaleString() + "",
                    dateModified: new Date().toLocaleString() + "",
                    geoScopeLink: "",
                    tagsKeys: "",
                    assetTypes: assetDataType,
                }
            )
        });
        const resdata = await response.json();
        if (resdata) {
            router.replace(router.asPath);
            setShowModal(false);
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
            }, 5000);
        } else {
            console.log("FAILED")
        }
    }

    const isInArray = (value: any, array: any) => {
        return array.indexOf(value) > -1;
    }


    return (
        <>
            <div className="flex font-OpenSans">

                <div className="w-[84%]">
                    <div className="columns-2 flex justify-between items-center">
                        <p className="text-black text-lg mb-0 font-semibold">Class Management</p>
                        <div className="flex justify-end items-right">
                            <button
                                className="rounded-xl bg-yellow-951 border-[2px] border-yellow-951 text-black flex h-12 justify-center items-center pl-2 pr-2 hover:bg-white hover:text-black hover:border-black transition-all duration-[400ms]"
                                onClick={() => setShowModal(true)}
                            >
                                <Image
                                    src="/img/plus-black.svg"
                                    alt="Create New Class"
                                    className="mr-2"
                                    height={24}
                                    width={24}
                                />
                                Create Sub Class
                            </button>
                        </div>
                    </div>

                    <div className="border min-h-full rounded-xl mt-3 px-4 py-4">
                        <div className="flex justify-start items-start">
                            <nav className="flex" aria-label="Breadcrumb">
                                <ol className="inline-flex items-center space-x-1 md:space-x-1">
                                    <li className="inline-flex items-center">
                                        <Link href="/dashboard/assetmanagement"
                                            className="inline-flex items-center text-sm font-medium text-black hover:text-yellow-950">
                                            <Image
                                                src="/img/home.svg"
                                                alt="home"
                                                className="h-6"
                                                height={24}
                                                width={24}
                                            />
                                            <Image
                                                src="/img/arrow-right.svg"
                                                alt="arrow-right"
                                                className="h-6"
                                                height={24}
                                                width={24}
                                            />
                                        </Link>
                                    </li>
                                    <li>
                                        <div className="flex items-center">
                                            <span className="ml-1 text-sm font-semibold text-black hover:text-yellow-950 md:ml-1">{parentAsset.assets}</span>
                                        </div>
                                    </li>
                                </ol>
                            </nav>
                        </div>

                        {/* --- Alerts Start--- */}
                        {success ? <AlertMessage /> : null}
                        {/* --- Alerts End--- */}


                        {data.length > 0 ?
                            <div className="h-96 flex justify-start items-start flex-wrap flex-col mt-4">
                                <h4 className="font-bold text-md color-black mb-4 font-semibold">Sub Class</h4>
                                <div className="overflow-hidden border rounded-xl w-full">
                                    <table className={`table-auto min-w-full text-left ${styles.table}`}>
                                        <thead className="bg-black text-white rounded-xl h-10 text-sm font-light">
                                            <tr>
                                                <th>S.No</th>
                                                <th>Name</th>
                                                <th>Tags</th>
                                                <th>Parent Join Key</th>
                                                <th>Date Created</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-sm">
                                            {data.map((item: any, index: any) => (
                                                <tr className="hover:bg-yellow-950" key={index}>
                                                    <td className="w-[50px]">{index + 1}</td>
                                                    <td className="w-[180px]">
                                                        {/* <Link
                                                            href={{
                                                                pathname: '/dashboard/childasset',
                                                                query: {
                                                                    asset: parentAsset.assets,
                                                                    subassets: item.assetName
                                                                }
                                                            }}
                                                        >
                                                            <span className="font-medium">{item.assetName}</span>
                                                        </Link> */}
                                                        <span className="font-medium">{item.assetName}</span>
                                                    </td>
                                                    <td><span>{item.tags.toString().split(",").join(", ")}</span></td>
                                                    <td><span>{item.parentJoinKey.toString().split(",").join(", ")}</span></td>
                                                    <td><span>{moment(item.dateCreated).format('DD-MM-YYYY')}</span></td>
                                                    <td>
                                                        <button className="mr-4">
                                                            <Image
                                                                src="/img/edit.svg"
                                                                alt="Edit"
                                                                height={18}
                                                                width={18}
                                                            />
                                                        </button>
                                                        <button>
                                                            <Image
                                                                src="/img/trash.svg"
                                                                alt="Trash"
                                                                height={18}
                                                                width={18}
                                                            />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            :
                            <div className="h-72 flex justify-center items-center flex-wrap flex-col mt-8">
                                <NoDataFound createText="Create Sub Asset" />
                            </div>
                        }

                    </div>
                </div>

                <div className="w-[16%] pl-5">
                    <Template />
                </div>


                {/* --- Modal Start --- */}
                {showModal ? (
                    <>
                        <div
                            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                        >
                            <div className="relative my-6 w-[720px]">

                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                    {/*header*/}
                                    <div className="flex items-start justify-between p-5">
                                        <h3 className="text-lg font-medium">
                                            Add Sub Class
                                        </h3>
                                        <button
                                            className="p-1 ml-auto bg-transparent border-0 text-black float-right leading-none font-semibold outline-none focus:outline-none"
                                            onClick={() => setShowModal(false)}
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
                                    <div className="relative p-6 flex-auto h-[500px] overflow-y-auto">
                                        <form
                                            className="flex justify-center items-center flex-wrap flex-col w-full"
                                            method='post'
                                            onSubmit={handleSubmit}
                                        >
                                            <div className="mb-5 relative flex justify-center items-center flex-wrap flex-col">
                                                <div className="mb-7 relative column-2 flex justify-center items-center">
                                                    <div className="w-[160px]">
                                                        <label className="font-semibold text-black">Name <span className="text-red-500">*</span></label>
                                                    </div>
                                                    <div className="w-3/4">
                                                        <input
                                                            type="text"
                                                            name="assetname"
                                                            placeholder="Enter class Name"
                                                            className="rounded-lg border border-black h-[44px] pl-5 pr-5 w-[320px]"
                                                            onChange={(e) => (assetid.current = e.target.value)}
                                                        />
                                                    </div>
                                                </div>


                                                <div className="mb-10 relative column-2 flex justify-start items-center">
                                                    <div className="w-[160px]">
                                                        <label className="font-semibold text-black">Class Tags <span className="text-red-500">*</span></label>
                                                    </div>
                                                    <div className="w-3/4">
                                                        <div className="rounded-lg border border-gray-500 min-h-[64px] pl-2 pr-2 w-[320px] pt-2 pb-2 flex flex-wrap justify-start items-center">
                                                            {
                                                                allTags && allTags.length > 0 ?
                                                                    allTags.map((items: any, index: any) => (
                                                                        <span
                                                                            key={index}
                                                                            className="rounded-lg inline-flex justify-center items-center h-8 pl-2 pr-2 bg-black text-white text-[14px] mr-2 mb-2">
                                                                            {items}
                                                                            <button
                                                                                className="rounded-full border-2 border-white h-[18px] w-[18px] inline-flex justify-center items-center ml-3"
                                                                                onClick={() => removeElement(items)}
                                                                            >
                                                                                <Image
                                                                                    src="/img/closewhite.svg"
                                                                                    alt="close"
                                                                                    height={14}
                                                                                    width={14}
                                                                                />
                                                                            </button>
                                                                        </span>
                                                                    )) : null
                                                            }

                                                            {
                                                                showInput ?
                                                                    <span className="flex justify-center items-center mb-2">
                                                                        <input
                                                                            type="text"
                                                                            placeholder="Tag"
                                                                            className="border border-gray-951 rounded py-[3px] px-[3px] w-[100px] mr-2 h-8 text-sm"
                                                                            value={newTag}
                                                                            onChange={(e) => setNewTag(e.target.value)}
                                                                            required
                                                                        />
                                                                        <button
                                                                            className={`text-black border border-transparent rounded inline-flex justify-center items-center text-sm h-8 px-2 ml-1 bg-yellow-951 ${dataType && (dataType != null || dataType != "") ? 'okay' : 'disabled disabled:bg-gray-300'}`}
                                                                            onClick={saveNewTag}
                                                                            disabled={dataType && (dataType != null || dataType != "") ? false : true}
                                                                        >
                                                                            Add
                                                                        </button>
                                                                        <button
                                                                            className="text-white border border-transparent rounded inline-flex justify-center items-center text-sm h-8 px-2 ml-1 bg-red-600"
                                                                            onClick={cancelAddingTag}
                                                                        >
                                                                            Cancel
                                                                        </button>
                                                                    </span>
                                                                    : null
                                                            }
                                                            <input type="hidden" value={allTags} name="alltags" id="alltags" />

                                                            {!showHideAddTagButton ?
                                                                <button
                                                                    className="text-gray-952 inline-flex justify-center items-center text-lg h-8 mb-2"
                                                                    onClick={addTags}
                                                                >
                                                                    <Image
                                                                        src="/img/pluswhite.svg"
                                                                        alt="close"
                                                                        height={20}
                                                                        width={20}
                                                                    />
                                                                    <span>Add Tag</span>
                                                                </button>
                                                                : null}
                                                        </div>


                                                        {toggleDT ?
                                                            <div className="rounded rounded-lg border border-gray-500 min-h-[150px] mt-[1px] pl-2 pr-2 w-[320px] pt-2 pb-2">
                                                                <div className="text-sm font-bold color-black mb-2 flex items-center justify-between">
                                                                    <span>Select Data Type</span>
                                                                    <span className="bg-black h-8 w-8 p-1 inline-flex rounded-full justify-center items-center">
                                                                        <Image
                                                                            src="/img/tick-white.svg"
                                                                            alt="check"
                                                                            height={20}
                                                                            width={20}
                                                                            className="inline-block"
                                                                        />
                                                                    </span>
                                                                </div>
                                                                <div className="flex pt-1 pb-1">
                                                                    <div className={`${styles.customRadio} mr-2`}>
                                                                        <input
                                                                            type="radio"
                                                                            name="datatype"
                                                                            className="scale-150"
                                                                            value="int"
                                                                            checked={dataType === "int"}
                                                                            onChange={() => radioChange("int")}
                                                                        />
                                                                        <span></span>
                                                                    </div>
                                                                    <label className="text-black font-semibold">int <span className="text-gray-500 font-normal text-[14px]">(myNum=5)</span></label>
                                                                </div>
                                                                <div className="flex pt-1 pb-1">
                                                                    <div className={`${styles.customRadio} mr-2`}>
                                                                        <input
                                                                            type="radio"
                                                                            name="datatype"
                                                                            className="scale-150"
                                                                            value="float"
                                                                            checked={dataType === "float"}
                                                                            onChange={() => radioChange("float")}
                                                                        />
                                                                        <span></span>
                                                                    </div>
                                                                    <label className="text-black font-semibold">float <span className="text-gray-500 font-normal text-[14px]">(myFloatNum=5.99f)</span></label>
                                                                </div>
                                                                <div className="flex pt-1 pb-1">
                                                                    <div className={`${styles.customRadio} mr-2`}>
                                                                        <input
                                                                            type="radio"
                                                                            name="datatype"
                                                                            className="scale-150"
                                                                            value="char"
                                                                            checked={dataType === "char"}
                                                                            onChange={() => radioChange("char")}
                                                                        />
                                                                        <span></span>
                                                                    </div>
                                                                    <label className="text-black font-semibold">char <span className="text-gray-500 font-normal text-[14px]">(myLetter='D')</span></label>
                                                                </div>
                                                                <div className="flex pt-1 pb-1">
                                                                    <div className={`${styles.customRadio} mr-2`}>
                                                                        <input
                                                                            type="radio"
                                                                            name="datatype"
                                                                            className="scale-150"
                                                                            value="boolean"
                                                                            checked={dataType === "boolean"}
                                                                            onChange={() => radioChange("boolean")}
                                                                        />
                                                                        <span></span>
                                                                    </div>
                                                                    <label className="text-black font-semibold">boolean <span className="text-gray-500 font-normal text-[14px]">(myBool=true/false)</span></label>
                                                                </div>
                                                                <div className="flex pt-1 pb-1">
                                                                    <div className={`${styles.customRadio} mr-2`}>
                                                                        <input
                                                                            type="radio"
                                                                            name="datatype"
                                                                            className="scale-150"
                                                                            value="string"
                                                                            checked={dataType === "string"}
                                                                            onChange={() => radioChange("string")}
                                                                        />
                                                                        <span></span>
                                                                    </div>
                                                                    <label className="text-black font-semibold">string <span className="text-gray-500 font-normal text-[14px]">(myText="Hello")</span></label>
                                                                </div>

                                                            </div>
                                                            : null
                                                        }

                                                    </div>
                                                </div>


                                                <div className="mb-10 relative column-2 flex justify-start items-center">
                                                    <div className="w-[160px]">
                                                        <label className="font-semibold text-black">Parent Join Key <span className="text-red-500">*</span></label>
                                                    </div>
                                                    <div className="w-3/4">
                                                        <div className="rounded-lg border border-gray-500 min-h-[64px] pl-2 pr-2 w-[320px] pt-2 pb-2 flex flex-wrap justify-start items-center">
                                                            {
                                                                parentJoinKey && parentJoinKey.length > 0 ?
                                                                    parentJoinKey.map((item: any, index: any) => (

                                                                        <span
                                                                            key={index}
                                                                            className="rounded-lg inline-flex justify-center items-center h-8 pl-2 pr-2 bg-black text-white text-[14px] mr-2 mb-2">
                                                                            {item}

                                                                            {
                                                                                isInArray(item, selParentTags) ?

                                                                                    <div
                                                                                        className="h-[18px] w-[18px] inline-flex justify-center items-center ml-3 cursor-pointer"
                                                                                        onClick={() => unSelectParentKey(item)}
                                                                                    >
                                                                                        <Image
                                                                                            src="/img/box_check_icon_white.svg"
                                                                                            alt="close"
                                                                                            height={14}
                                                                                            width={14}
                                                                                        />
                                                                                    </div>

                                                                                    :

                                                                                    <div
                                                                                        className="h-[18px] w-[18px] inline-flex justify-center items-center ml-3 cursor-pointer"
                                                                                        onClick={() => selectedParentKey(item)}
                                                                                    >
                                                                                        <Image
                                                                                            src="/img/blank_check_box_icon_white.svg"
                                                                                            alt="close"
                                                                                            height={14}
                                                                                            width={14}
                                                                                        />
                                                                                    </div>
                                                                            }

                                                                        </span>
                                                                    ))
                                                                    :
                                                                    null
                                                            }
                                                            <input type="hidden" value={parentJoinKey} name="parentJoinKey" id="parentJoinKey" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mb-5 relative flex justify-end items-center w-full pr-4">
                                                    <button
                                                        className="border border-black rounded-lg bg-black text-white font-lg w-20 h-12 mr-5 font-semibold hover:bg-yellow-951 hover:text-white hover:border-yellow-951 ease-in-out duration-300 disabled:bg-gray-951 disabled:hover:border-gray-951 disabled:border-gray-951"
                                                        disabled={(allTags && allTags.length > 0) ? false : true}
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        className="border border-black rounded-lg bg-white font-semibold text-black font-lg w-24 h-12 hover:text-white hover:bg-yellow-951 hover:border-yellow-951 ease-in-out duration-300"
                                                        onClick={() => setShowModal(false)}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>

                                            </div>
                                        </form>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) : null}
                {/* --- Modal Ends --- */}


            </div>
        </>
    )
}

SubAsset.getLayout = function getLayout(page: any) {
    return (
        <Layout>{page}</Layout>
    )
}