import React, { Fragment, useState, useEffect } from "react";
import { useRouter } from 'next/router'
import axios from "axios";
import {
  Bars3CenterLeftIcon,
  PencilIcon,
  ChevronDownIcon,
  CreditCardIcon,
  Cog8ToothIcon,
} from "@heroicons/react/24/solid";
import { BellIcon, CheckIcon } from "@heroicons/react/24/outline";
import { Menu, Transition, Popover } from "@headlessui/react";
import Link from "next/link";
import styles from './TopBar.module.css';
import Image from "next/image";

export default function TopBar({ showNav, setShowNav }) {
  const { push } = useRouter();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    let authenticationUsername = localStorage.getItem('authenticationUsername');
    if (authenticationUsername) {
      axios.get("/api/getUsers")
        .then((response) => {
          const filter = response.data.filter((item) => {
            return item.username === authenticationUsername;
          })
          setUserData(filter[0])
        })
    }
  }, [])

  useEffect(() => {
    let authenticationUsername = localStorage.getItem('authenticationUsername');
    setUsername(authenticationUsername ? authenticationUsername : '')
    if (!localStorage.getItem('authenticationToken')) {
      push("/authentication/signin");
    } else {
      console.log({
        message: "valid auth token found!",
        authToken: localStorage.getItem('authenticationToken')
      })
    }
  }, [])

  const logMeOut = () => {
    sessionStorage.clear();
    localStorage.clear();
    setTimeout(() => {
      push("/authentication/signin");
    }, 200);
  }

  return (
    <div
      className={`h-20 fixed z-[9] w-full h-16 flex justify-between items-center transition-all duration-[400ms] ${showNav ? "pl-48" : ""
        }`}
    >
      <div className="flex justify-between items-center w-full bg-white ">
        <div className="pl-4 h-20 flex justify-start items-start">
          <div className="z-[400] mt-6">
            <Bars3CenterLeftIcon
              className="h-8 w-8 text-gray-700 cursor-pointer"
              onClick={() => setShowNav(!showNav)}
            />
          </div>
          {
            router.pathname === "/dashboard/eopswatch" ||
              router.pathname === "/dashboard/eopstrace" ?
              null :
              <div className="pl-9 relative pt-2">
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

        <div className="flex items-center pr-4 md:pr-16 h-20">
          <Link href="/dashboard/pricing" className="mr-6 text-sm px-2 py-1 bg-yellow-951 rounded rounded-lg relative top-[-4px]">eOps Plans and Pricing</Link>
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
                    <span className="bg-blue-961 text-sm rounded rounded-full flex justify-center items-center text-white font-semiboild h-[26px] w-[26px] relative top-[-4px]">{username.charAt(0).toUpperCase()}</span>
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
                      <span className="bg-blue-961 text-xl rounded rounded-full flex justify-center items-center text-white font-semiboild h-[50px] w-[50px]">{username.charAt(0).toUpperCase()}</span>
                      <button className="bg-white rounded rounded-full h-[21px] w-[21px] absolute right-[-3px] top-[25px] flex justify-center items-center">
                        <Image
                          src="/img/editpencil.svg"
                          alt="profile picture"
                          height={14}
                          width={14}
                        />
                      </button>
                    </div>
                    <div className="text-sm text-black w-full">{userData.firstName} {userData.lastName}</div>
                    <div className="text-gray-968 text-[13px] w-full">{username}</div>
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
                        href="/dashboard/pricing"
                        className="w-full flex text-black mb-4 text-sm group transition-colors items-center"
                      >
                        Manage my plan
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

          <Menu as="div" className="relative inline-block text-left ml-8">
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
