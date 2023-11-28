import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router'
import { PencilIcon } from "@heroicons/react/24/solid";
import { CheckIcon } from "@heroicons/react/24/outline";
import { Menu, Transition, Popover } from "@headlessui/react";
import Link from "next/link";
import styles from './TopBar.module.css';
import Image from "next/image";
import axios from "axios";

export default function TopBar({ showNav, setShowNav }) {
  const { push } = useRouter();
  const dispatch = useDispatch();
  const router = useRouter();
  const [username, setUsername] = useState("Amit");
  const [user, setUser] = useState({
    firstName: "Amit",
    lastName: "Pandey"
  })
  const [userToken, setUserToken] = useState('');
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    let access_token = localStorage.getItem('authToken');
    if (!access_token) {
      push("/authentication/signin");
    } else {
      setUserToken(access_token)
    }
  }, [])

  const logMeOut = () => {
    sessionStorage.clear();
    localStorage.clear();
    setTimeout(() => {
      push("/authentication/signin");
    }, 200);
  }

  const arr = router.pathname.split("/");
  const splitPathName = arr.filter(n => n);
  useEffect(() => {
    if (router.pathname == "dashboard/pricing" || splitPathName.includes("pricing")) {
      setShowNav(false)
    }
  }, [])

  // Get Logged In User Info
  async function fetchData() {
    let access_token = localStorage.getItem('authToken');
    try {
      await axios({
        method: 'GET',
        url: `http://20.232.178.134:3000/api/getUsers`,
        headers: {
          "Authorization": `Bearer ${access_token}`,
          "Content-Type": "application/json"
        }
      }).then(function (response) {
        if(response) {
          setUserData(response.data?.data);
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
    let access_token = localStorage.getItem('authToken');
    fetchData();
  }, [])


  return (
    <div
      className={`font-OpenSans h-20 fixed z-[9] w-full h-16 flex justify-between items-center transition-all duration-[400ms] ${showNav ? "pl-48" : ""
        }`}
    >
      <div className="flex justify-between items-center w-full bg-white">
        <div className="pl-4 h-20 flex justify-start items-start">
          <div className="z-[400] mt-6">
            <Image
              src="/img/menunew.svg"
              alt="menunew"
              height={24}
              width={24}
              onClick={() => setShowNav(!showNav)}
              className="relative top-1 cursor-pointer"
            />
          </div>
          {
            router.pathname === "/dashboard/eopswatch" ||
              router.pathname === "/dashboard/eopstrace" ?
              null :
              <div className="pl-9 relative pt-2 hidden">
                <Image
                  src="/img/search.svg"
                  alt="company logo"
                  className={`absolute left-12 top-[32px]`}
                  width={24}
                  height={24}
                />
                <input
                  type="text"
                  className={`block w-full mt-2 pl-12 w-96 ${styles.searchbox}`}
                  placeholder="Search..."
                  name="globalsearch"
                />
              </div>}
        </div>

        <div className="flex items-center pr-4 md:pr-10 h-20">
          <Link href="/dashboard/pricing" className="mr-6 text-sm px-3 py-2 bg-yellow-951 rounded rounded-lg relative top-[-4px] font-semibold">Plans and pricing</Link>

          <Link href="/dashboard/pricing" className="mr-6 text-sm px-3 py-2 bg-white rounded rounded-lg relative top-[-4px] font-semibold">Help</Link>

          <Popover className="relative">
            <Popover.Button className="relative outline-none mr-5 md:mr-8 cursor-pointer text-gray-700">
              <Image
                src="/img/bell.svg"
                alt="company logo"
                height={25}
                width={25}
              />
              <span>
                <span className="animate-ping bg-red-400 w-[19px] h-[19px] absolute top-[-8px] right-[-6px] rounded-full"></span>
                <span className="bg-red-500 text-white text-sm rounded-full flex items-center justify-center w-[19px] h-[19px] absolute top-[-8px] right-[-6px]">5</span>
              </span>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform scale-95"
              enterTo="transform scale-100"
              leave="transition ease-in duration=75"
              leaveFrom="transform scale-100"
              leaveTo="transform scale-95"
            >
              <Popover.Panel className="absolute -right-16 sm:right-4 z-50 mt-2 bg-white shadow-sm rounded max-w-xs sm:max-w-sm w-screen">
                <div className="relative p-3">
                  <div className="flex justify-between items-center w-full">
                    <p className="text-gray-700 font-medium">Notifications</p>
                    <a className="text-sm text-orange-500" href="#">
                      Mark all as read
                    </a>
                  </div>
                  <div className="mt-4 grid gap-4 grid-cols-1 overflow-hidden">
                    <div className="flex">
                      <div className="rounded-full shrink-0 bg-green-200 h-8 w-8 flex items-center justify-center">
                        <CheckIcon className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="ml-4">
                        <p className="font-medium text-gray-700">
                          Notification Title
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          Test Notification text for design
                        </p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="rounded-full shrink-0 bg-green-200 h-8 w-8 flex items-center justify-center">
                        <CheckIcon className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="ml-4">
                        <p className="font-medium text-gray-700">
                          Notification Title
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          Test Notification text for design
                        </p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="rounded-full shrink-0 bg-green-200 h-8 w-8 flex items-center justify-center">
                        <CheckIcon className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="ml-4">
                        <p className="font-medium text-gray-700">
                          Notification Title
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          Test Notification text for design
                        </p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="rounded-full shrink-0 bg-green-200 h-8 w-8 flex items-center justify-center">
                        <CheckIcon className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="ml-4">
                        <p className="font-medium text-gray-700">
                          Notification Title
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          Test Notification text for design
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>

          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex w-full justify-center items-center">
                {
                  username ?
                    <div className="flex justify-start items-start">
                      <span className="bg-[#5B5A59] rounded rounded-full flex justify-center items-center text-white text-lg font-semiboild h-[40px] w-[40px] relative">{user.firstName.charAt(0).toUpperCase()}{user.lastName.charAt(0).toUpperCase()}</span>
                      <div className="flex justify-start items-start flex-wrap flex-col ml-3">
                        <span className="text-sm font-semibold mb-1">Amit Pandey</span>
                        <span className="bg-[#E7E6E2] text-[#666666] text-[11px] rounded rounded-md flex justify-center items-center py-[2px] w-[60px]">Admin</span>
                      </div>
                    </div>
                    :

                    <picture>
                      <Image
                        src="/img/user.svg"
                        alt="profile picture"
                        height={25}
                        width={25}
                      />
                    </picture>
                }
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform scale-95"
              enterTo="transform scale-100"
              leave="transition ease-in duration=75"
              leaveFrom="transform scale-100"
              leaveTo="transform scale-95"
            >
              <Menu.Items className="absolute right-0 w-60 rounded rounded-xl z-150 mt-2 origin-top-right bg-white rounded shadow-xl border">
                <div className="p-6">
                  <div className="flex justify-center items-center flex-wrap flex-row text-center">
                    <div className="relative w-[55px] mb-4">
                      <span className="bg-blue-961 text-xl rounded rounded-full flex justify-center items-center text-white font-semiboild h-[50px] w-[50px]">{user.firstName.charAt(0).toUpperCase()}{user.lastName.charAt(0).toUpperCase()}</span>
                      <button className="bg-white rounded rounded-full h-[21px] w-[21px] absolute right-[-3px] top-[25px] flex justify-center items-center">
                        <Image
                          src="/img/editpencil.svg"
                          alt="profile picture"
                          height={14}
                          width={14}
                        />
                      </button>
                    </div>
                    <div className="text-sm text-black w-full">
                      {userData && userData.firstName ? userData.firstName : ''} {userData && userData.lastName ? userData.lastName : ''}
                    </div>
                    <div className="text-gray-968 text-[13px] w-full">
                      {userData && userData.email ? userData.email : ''}
                    </div>
                  </div>

                  <div className="relative mt-5">
                    <Menu.Item>
                      <Link
                        href="/dashboard/myaccount"
                        className="w-full flex text-black mb-4 text-sm group transition-colors items-center"
                      >
                        Manage my account
                      </Link>
                    </Menu.Item>
                    <Menu.Item>
                      <Link
                        href="/dashboard/manageproducts"
                        className="w-full flex text-black mb-4 text-sm group transition-colors items-center"
                      >
                        Manage Products
                      </Link>
                    </Menu.Item>
                    <Menu.Item>
                      <Link
                        href="/dashboard/myaccount"
                        className="w-full flex text-black mb-4 text-sm group transition-colors items-center"
                      >
                        Change password
                      </Link>
                    </Menu.Item>
                    <Menu.Item>
                      <button
                        onClick={logMeOut}
                        className="w-full flex text-black text-sm group transition-colors items-center"
                      >
                        Logout
                      </button>
                    </Menu.Item>
                  </div>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>

          <Menu as="div" className="relative inline-block text-left ml-8 hidden">
            <div>
              <Menu.Button className="inline-flex w-full justify-center items-center">
                <picture>
                  <Image
                    src="/img/settings.svg"
                    alt="profile picture"
                    height={25}
                    width={25}
                  />
                </picture>
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform scale-95"
              enterTo="transform scale-100"
              leave="transition ease-in duration=75"
              leaveFrom="transform scale-100"
              leaveTo="transform scale-95"
            >
              <Menu.Items className="absolute right-0 w-56 z-50 mt-2 origin-top-right bg-white rounded border shadow-lg">
                <div className="p-1">
                  <Menu.Item>
                    <Link
                      href="#"
                      className="flex hover:bg-yellow-950 hover:text-white text-gray-700 rounded p-2 text-sm group transition-colors items-center"
                    >
                      <PencilIcon className="h-4 w-4 mr-2" />
                      Settings
                    </Link>
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>

        </div>
      </div>

    </div>
  );
}
