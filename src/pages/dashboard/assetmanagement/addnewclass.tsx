import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import styles from "../../../styles/Common.module.css";
import Image from "next/image";
import {
  openCloseNewClassModalAction,
  successMessageAction,
  successMessagAdvancedAction
} from "@/store/actions/classAction";
import axios from "axios";

export default function AddNewClass(props: any) {
  const dispatch = useDispatch<any>();
  const assetname = useRef("");
  const [allTags, setAllTags] = useState<any[]>([]);
  const [newTag, setNewTag] = useState<string>("");
  const [showInput, setShowInput] = useState(false);
  const [showHideAddTagButton, setShowHideAddTagButton] = useState(false);
  const [toggleDT, setToggleDT] = useState(false);
  const [dataType, setDataType] = useState("");
  const [assetDataType, setAssetDataType] = useState<any[]>([]);
  const [dtObject, setDtObject] = useState<any[]>([]);
  const [allDataTypes, setAllDataTypes] = useState([] as any);
  // const [success, setSuccess] = useState(false);
  let access_token = "" as any;
  if (typeof window !== "undefined") {
    access_token = localStorage.getItem("authToken");
  }

  // GET ALL DATATYPES
  async function fetchData() {
    try {
      await axios({
        method: "GET",
        url: `/api/getDataType`,
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      })
        .then(function (response) {
          if (response) {
            setAllDataTypes(response.data?.data);
          }
        })
        .catch(function (error) {
          console.log({
            "ERROR IN AXIOS CATCH (GET DT)": error,
          });
        });
    } catch (err) {
      console.log({
        "ERROR IN TRY CATCH (GET DT)": err,
      });
    }
  }
  useEffect(() => {
    fetchData();
  }, [access_token]);

  const closeModal = () => {
    // props.handleClick(false);
    dispatch(openCloseNewClassModalAction(false));
    setShowInput(false);
    setShowHideAddTagButton(false);
    setToggleDT(false);
    setDataType("");
    setAllTags([]);
    setNewTag("");
  };
  const cancelModal = () => {
    // props.handleClick(false);
    dispatch(openCloseNewClassModalAction(false));
    setAllTags([]);
  };

  // Adding New Tags
  const addTags = () => {
    setShowInput(true);
    setShowHideAddTagButton(true);
    setToggleDT(true);
  };
  const closeAddTags = () => {
    setShowInput(!showInput);
    setShowHideAddTagButton(!showHideAddTagButton);
    setToggleDT(!toggleDT);
  };

  // Get Radio Button Value
  const radioChange = (value: any) => {
    setDataType(value);
  };

  // Creating a JSON Object
  function CreateJSON(tag: any, datatype: any) {
    var myObject = {
      tagName: tag,
      dataTypeId: datatype,
    };
    return myObject;
  }

  // Save New Tag
  const saveNewTag = () => {
    if (newTag.trim().length !== 0) {
      // Creating the array of all tags
      let updatedList = allTags.slice();
      updatedList.push(newTag);
      setAllTags(updatedList);
      setShowInput(false);
      setNewTag("");
      setShowHideAddTagButton(false);
      setToggleDT(false);

      // Creating the array of data type
      let typeList = assetDataType;
      typeList.push(dataType);
      setAssetDataType(typeList);
      setDataType("");

      // Creating json object for tag and datatype together
      let json: any = CreateJSON(newTag, dataType);
      let jsonList = dtObject.slice();
      jsonList.push(json);
      setDtObject(jsonList);
    } else {
      console.log("Input must not be empty");
    }
  };

  // Remove Element from all Tag Array
  const removeElement = (item: any) => {
    // removing the item form all tags array
    let updatedList = allTags.slice();
    var filteredArray = updatedList.filter(function (e) {
      return e !== item;
    });
    setAllTags(filteredArray);

    // removing the datatype from datatype array
    let updatedListType = assetDataType;
    var popped = updatedListType.splice(-1);
    setAssetDataType(updatedListType);

    // remove the json item from json item array
    let updatedJSON = dtObject.slice();
    var filteredJSON = updatedJSON.filter(function (e) {
      return e.tagName !== item;
    });
    setDtObject(filteredJSON);
  };

  // Cancel Adding new tags
  const cancelAddingTag = () => {
    setShowInput(false);
    setShowHideAddTagButton(false);
    setToggleDT(false);
    setDataType("");
    setNewTag("");
  };

  // Store Data into API
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    var formData = new FormData(e.target);
    const form_values = Object.fromEntries(formData);
    const dataToSave = {
      className: form_values.assetname,
      tags: dtObject,
    };
    let tokenStr = access_token;
    try {
      await axios({
        method: "POST",
        url: `/api/createClasses`,
        data: dataToSave,
        headers: {
          Authorization: `Bearer ${tokenStr}`,
          "Content-Type": "application/json",
        },
      })
        .then(function (response) {
          if (response) {
            // setSuccess(true);
            setAllTags([]);
            dispatch(successMessageAction(true));
            let data={
              "type":"newClass",
              "action":true
            };
            dispatch(successMessagAdvancedAction(data))
            setTimeout(() => {
              // setSuccess(false);
              dispatch(openCloseNewClassModalAction(false));
            }, 100);
          }
        })
        .catch(function (error) {
          console.log("ERROR IN AXIOS CATCH (CREATE CLASS):", error);
        });
    } catch (err) {
      console.log("ERROR IN TRY CATCH (CREATE CLASS):", err);
    }
  };

  return (
    <>
      <div
        className={`bg-white h-full z-[11] fixed top-0 right-0 p-5 shadow ${
          props.show === true
            ? `${styles.objectContainer} ${styles.sliderShow}`
            : `${styles.objectContainer}`
        }`}
      >
        <div className="flex justify-between items-center w-full mb-3">
          <h2 className="font-semibold text-lg">Add New Class</h2>
          <button
            onClick={closeModal}
            className="duration-100 outline-none transform active:scale-75 transition-transform"
          >
            <Image src="/img/x.svg" alt="close" height={27} width={27} />
          </button>
        </div>

        {/* {success && (
          <div
            className={`bg-green-957 border-green-958 text-green-959 mb-1 mt-1 border text-md px-4 py-3 rounded-xl relative flex items-center justify-start`}
          >
            <Image
              src="/img/AlertSuccess.svg"
              alt="Alert Success"
              height={24}
              width={24}
              className="mr-2"
            />
            <strong className="font-semibold">Success</strong>
            <span className="block sm:inline ml-2">
              Class has been added successfully!
            </span>
          </div>
        )} */}

        <div
          className={`flex justify-start items-start w-full overflow-auto h-full pb-10 ${styles.scroll} pr-3`}
        >
          <form
            className="flex justify-center items-center flex-wrap flex-col lg:w-full"
            method="post"
            onSubmit={handleSubmit}
          >
            <div className="mb-1 relative flex justify-center items-center flex-wrap flex-col sm:w-full small:w-full lg:w-full">
              <div className="mb-6 relative column-2 flex justify-start items-center sm:w-full small:w-full">
                <div className="lg:w-full small:w-full sm:w-full">
                  <input
                    type="hidden"
                    name="assetid"
                    placeholder="Enter asset ID"
                    value={1}
                  />

                  <div
                    className={`mb-5 lg:w-full small:w-full ${styles.form__wrap}`}
                  >
                    <div
                      className={`relative ${styles.form__group} font-OpenSans`}
                    >
                      <input
                        type="text"
                        id="assetname"
                        name="assetname"
                        className={`border border-gray-961 ${styles.form__field}`}
                        placeholder="Enter class name"
                        required
                        onChange={(e) => (assetname.current = e.target.value)}
                      />
                      <label
                        htmlFor="assetname"
                        className={`${styles.form__label}`}
                      >
                        Enter class name
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-7 relative column-2 flex justify-start items-center sm:w-full small:w-full">
                <div className="lg:w-full small:w-full sm:w-full relative">
                  <span className="text-[13px] bg-white px-[2px] absolute top-[-10px] left-[10px]">
                    Class Tags
                  </span>
                  <div
                    className={`rounded-lg border border-gray-961  pl-2 pr-2 lg:w-full small:w-full sm:w-full pt-3 pb-2 flex flex-wrap flex-col justify-start items-start min-h-[64px]`}
                  >
                    <div
                      className={`flex flex-wrap flex-row justify-start w-full ${
                        allTags && allTags.length > 0 ? "min-h-[150px]" : "ok"
                      }`}
                    >
                      {allTags && allTags.length > 0
                        ? allTags.map((items: any, index: any) => (
                            <span
                              key={index}
                              className="rounded-lg inline-flex justify-center items-center h-8 pl-2 pr-2 bg-[#F2F1F1] text-black text-[14px] mr-2 mb-2"
                            >
                              {items}
                              <button
                                className="rounded-full border-2 border-white h-[24px] w-[24px] inline-flex justify-center items-center ml-3  duration-100 outline-none transform active:scale-75 transition-transform"
                                onClick={() => removeElement(items)}
                              >
                                <Image
                                  src="/img/x-circle.svg"
                                  alt="close"
                                  height={24}
                                  width={24}
                                />
                              </button>
                            </span>
                          ))
                        : null}
                    </div>

                    <input
                      type="hidden"
                      value={allTags}
                      name="alltags"
                      id="alltags"
                    />

                    <button
                      className={`duration-100 outline-none transform active:scale-75 transition-transform text-black inline-flex justify-center items-center text-sm h-8 mb-2 px-2 mt-0 rounded-lg  font-semibold ${
                        showHideAddTagButton ? "bg-gray-951" : "bg-yellow-951"
                      }`}
                      onClick={addTags}
                      disabled={showHideAddTagButton}
                    >
                      <Image
                        src="/img/plusblack.svg"
                        alt="close"
                        height={20}
                        width={20}
                      />
                      <span>Add Tag</span>
                    </button>

                    <div
                      className={`duration-100 outline-none transform active:scale-75 transition-transform absolute right-1 top-4 ${
                        toggleDT ? "rotate-180" : "rotate-0"
                      } cursor-pointer`}
                      onClick={closeAddTags}
                    >
                      <Image
                        src="/img/arrow-down-black.svg"
                        alt="arrow-down"
                        height={29}
                        width={29}
                      />
                    </div>
                  </div>

                  {toggleDT ? (
                    <div className="rounded border border-gray-500 min-h-[150px] mt-[1px] pl-2 pr-2 w-full pt-2 pb-2 bg-white absolute top-[100%] right-0 z-10">
                      <span className="flex justify-center items-center mb-3">
                        <input
                          type="text"
                          placeholder="Enter tag name"
                          className="border border-gray-951 rounded py-[5px] px-[5px] w-full mr-2 h-12 text-sm"
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                        />
                      </span>

                      <div className="text-sm font-bold color-black mb-2 flex items-center justify-between">
                        <span>Select Data Type</span>
                      </div>

                      {allDataTypes && allDataTypes.length >= 0
                        ? allDataTypes.map((item: any, index: any) => (
                            <div key={index}>
                              <div className="flex pt-1 pb-1">
                                <div className={`${styles.customRadio} mr-2`}>
                                  <input
                                    id={item.type}
                                    type="radio"
                                    name="datatype"
                                    className="scale-150"
                                    value={item.type}
                                    checked={dataType === item.id}
                                    onChange={() => radioChange(item.id)}
                                  />
                                  <span></span>
                                </div>
                                <label
                                  htmlFor={item.type}
                                  className="text-black font-semibold"
                                >
                                  {item.name}
                                  <span className="text-gray-500 font-normal text-[14px] ml-2">
                                    {item.description}
                                  </span>
                                </label>
                              </div>
                            </div>
                          ))
                        : null}

                      <div className="flex justify-end items-center w-full">
                        <button
                          className={`border border-black rounded-lg bg-black text-white text-md w-20 h-10 mr-5 hover:bg-yellow-951 hover:text-white hover:border-yellow-951 ease-in-out duration-300 disabled:bg-gray-951 disabled:hover:border-gray-951 disabled:border-gray-951 ${
                            dataType && (dataType != null || dataType != "")
                              ? "okay"
                              : "disabled disabled:bg-gray-300"
                          } `}
                          onClick={saveNewTag}
                          disabled={
                            dataType && (dataType != null || dataType != "")
                              ? false
                              : true
                          }
                        >
                          <span>Save</span>
                        </button>
                        <button
                          className="border border-black rounded-lg bg-white text-black text-md w-20 h-10 hover:text-white hover:bg-yellow-951 hover:border-yellow-951 ease-in-out duration-300"
                          onClick={cancelAddingTag}
                        >
                          <span>Cancel</span>
                        </button>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="mb-0 relative flex justify-end items-center w-full">
                <button
                  className="border border-black rounded-lg bg-black text-white text-lg w-20 h-12 mr-5 hover:bg-yellow-951 hover:text-white hover:border-yellow-951 ease-in-out disabled:bg-gray-951 disabled:hover:border-gray-951 disabled:border-gray-951 duration-100 outline-none transform active:scale-75 transition-transform"
                  disabled={allTags && allTags.length > 0 ? false : true}
                >
                  Save
                </button>
                <button
                  className="border border-black rounded-lg bg-white text-black text-lg w-24 h-12 hover:text-white hover:bg-yellow-951 hover:border-yellow-951 ease-in-out  duration-100 outline-none transform active:scale-75 transition-transform"
                  onClick={cancelModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {props.show === true && <div className={styles.backdrop}></div>}
    </>
  );
}
