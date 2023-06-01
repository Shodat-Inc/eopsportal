import React, { useState } from "react";
import { forwardRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from './Sidebar.module.css';
import Image from "next/image";

const SideBar = forwardRef(({ showNav, setShowNav }, ref) => {
  const router = useRouter();
  const [eopswatch, setEopswatch] = useState(false);
  const [asstMgmt, setAsstMgmt] = useState(false);
  const [dashboard, setDashboard] = useState(false);
  const [eopstrace, setEopstatch] = useState(false);
  const [eopspro, setEopspro] = useState(false);
  const [eopsinsight, setEopinsight] = useState(false);

  return (
    <div ref={ref} className={`fixed w-60 h-full  shadow-sm bg-black ${styles.sidebar}`}>
      <div className="flex items-center justify-left pl-6 pt-6 pb-6 bg-white">
        <picture>
          <Image
            src="/img/logo.svg"
            alt="company logo"
            className={`w-32 h-auto`}
            height={88}
            width={20}
          />
        </picture>
        <div className="pl-24 md:pl-24 mt-0 z-[400]">
          <Image
            src="/img/menu.svg"
            alt="company logo"
            className={`w-12 h-auto pr-1`}
            onClick={() => setShowNav(!showNav)}
            height={29}
            width={29}
          />
        </div>
      </div>

      <div className="flex flex-col pt-2 font-OpenSans">
        <Link href="/dashboard" className="hidden">
          <div
            className={`pl-6 font-normal font-OpenSans font-light py-3 mx-0 text-center cursor-pointer mb-3 flex items-center transition-colors ${router.pathname == "/dashboard"
              ? "bg-white text-black"
              : "text-white hover:bg-yellow-951 hover:text-black"
              }`}
            onMouseOver={() => setDashboard(true)}
            onMouseOut={() => setDashboard(false)}
          >
            <div className="mr-2">
              {
                dashboard ?
                  <Image
                    src={router.pathname == "/dashboard" ? '/img/grid.svg' : '/img/grid.svg'}
                    alt="grid"
                    className={`w-32 h-auto ${styles.sideicons}`}
                    height={25}
                    width={25}
                  />
                  :
                  <Image
                    src={router.pathname == "/dashboard" ? '/img/grid.svg' : '/img/grid-white.svg'}
                    alt="grid"
                    className={`w-32 h-auto ${styles.sideicons}`}
                    height={25}
                    width={25}
                  />
              }
            </div>
            <div>
              <p>Dashboard</p>
            </div>
          </div>
        </Link>

        <Link href="/dashboard/assetmanagement">
          <div
            className={`pl-6 font-OpenSans font-light py-3 mx-0 text-center cursor-pointer mb-3 flex items-center transition-colors ${router.pathname == "/dashboard/assetmanagement"
              ? "bg-white text-black"
              : "text-white hover:bg-yellow-951 hover:text-black"
              }`}
            onMouseOver={() => setAsstMgmt(true)}
            onMouseOut={() => setAsstMgmt(false)}
          >
            <div className="mr-2">
              {
                asstMgmt ?
                  <Image
                    src={router.pathname == "/dashboard/assetmanagement" ? '/img/box-black.svg' : '/img/box-black.svg'}
                    alt="clock"
                    className={`w-32 h-auto ${styles.sideicons}`}
                    height={25}
                    width={25}
                  />
                  :
                  <Image
                    src={router.pathname == "/dashboard/assetmanagement" ? '/img/box-black.svg' : '/img/box.svg'}
                    alt="clock"
                    className={`w-32 h-auto ${styles.sideicons}`}
                    height={25}
                    width={25}
                  />
              }
            </div>
            <div>
              <p>Asset Management</p>
            </div>
          </div>
        </Link>

        <Link href="/dashboard/eopswatch">
          <div
            className={`pl-6 font-OpenSans font-light py-3 mx-0 text-center cursor-pointer mb-3 flex items-center transition-colors ${router.pathname == "/dashboard/eopswatch"
              ? "bg-white text-black"
              : "text-white hover:bg-yellow-951 hover:text-black"
              }`}
            onMouseOver={() => setEopswatch(true)}
            onMouseOut={() => setEopswatch(false)}
          >
            <div className="mr-2">
              {
                eopswatch ?
                  <Image
                    src={
                      router.pathname == "/dashboard/eopswatch"
                        ? '/img/clock.svg'
                        : '/img/clock.svg'
                    }
                    alt="clock"
                    className={`w-32 h-auto ${styles.sideicons}`}
                    height={25}
                    width={25}
                  />
                  :
                  <Image
                    src={
                      router.pathname == "/dashboard/eopswatch"
                        ? '/img/clock.svg'
                        : '/img/clock-white.svg'
                    }
                    alt="clock"
                    className={`w-32 h-auto ${styles.sideicons}`}
                    height={25}
                    width={25}
                  />
              }
            </div>
            <div>
              <p>eOps Watch</p>
            </div>
          </div>
        </Link>

        <Link href="/dashboard/eopstrace">
          <div
            className={`pl-6 font-OpenSans font-light py-3 mx-0 text-center cursor-pointer mb-3 flex items-center  transition-colors ${router.pathname == "/dashboard/eopstrace"
              ? "bg-white text-black"
              : "text-white hover:bg-yellow-951 hover:text-black"
              }`}
            onMouseOver={() => setEopstatch(true)}
            onMouseOut={() => setEopstatch(false)}
          >
            <div className="mr-2">
              {
                eopstrace ?
                  <Image
                    src={router.pathname == "/dashboard/eopstrace" ? '/img/airplay.svg' : '/img/airplay.svg'}
                    alt="company logo"
                    className={`w-32 h-auto ${styles.sideicons}`}
                    height={25}
                    width={25}
                  />
                  :
                  <Image
                    src={router.pathname == "/dashboard/eopstrace" ? '/img/airplay.svg' : '/img/airplay-white.svg'}
                    alt="company logo"
                    className={`w-32 h-auto ${styles.sideicons}`}
                    height={25}
                    width={25}
                  />
              }
            </div>
            <div>
              <p>eOps Trace</p>
            </div>
          </div>
        </Link>

        <Link href="/dashboard/eopsprosense">
          <div
            className={`pl-6 font-OpenSans font-light py-3 mx-0 text-center cursor-pointer mb-3 flex items-center transition-colors ${router.pathname == "/dashboard/eopsprosense"
              ? "bg-white text-black"
              : "text-white hover:bg-yellow-951 hover:text-black"
              }`}
            onMouseOver={() => setEopspro(true)}
            onMouseOut={() => setEopspro(false)}
          >
            <div className="mr-2">
              {
                eopspro ?
                  <Image
                    src={router.pathname == "/dashboard/eopsprosense" ? '/img/maximize.svg' : '/img/maximize.svg'}
                    alt="company logo"
                    className={`w-32 h-auto ${styles.sideicons}`}
                    height={25}
                    width={25}
                  />
                  :
                  <Image
                    src={router.pathname == "/dashboard/eopsprosense" ? '/img/maximize.svg' : '/img/maximize-white.svg'}
                    alt="company logo"
                    className={`w-32 h-auto ${styles.sideicons}`}
                    height={25}
                    width={25}
                  />
              }
            </div>
            <div>
              <p>eOps Prosense</p>
            </div>
          </div>
        </Link>

        <Link href="/dashboard/eopsinsight">
          <div
            className={`pl-6 font-OpenSans font-light py-3 mx-0 text-center cursor-pointer mb-3 flex items-center  transition-colors ${router.pathname == "/dashboard/eopsinsight"
              ? "bg-white text-black"
              : "text-white hover:bg-yellow-951 hover:text-black"
              }`}
            onMouseOver={() => setEopinsight(true)}
            onMouseOut={() => setEopinsight(false)}
          >
            <div className="mr-2">
              {
                eopsinsight ?
                  <Image
                    src={router.pathname == "/dashboard/eopsinsight" ? '/img/bar-chart.svg' : '/img/bar-chart.svg'}
                    alt="company logo"
                    className={`w-32 h-auto ${styles.sideicons}`}
                    height={25}
                    width={25}
                  />
                  :
                  <Image
                    src={router.pathname == "/dashboard/eopsinsight" ? '/img/bar-chart.svg' : '/img/bar-chart-white-2.svg'}
                    alt="company logo"
                    className={`w-32 h-auto ${styles.sideicons}`}
                    height={25}
                    width={25}
                  />
              }
            </div>
            <div>
              <p>eOps Insight/Report</p>
            </div>
          </div>
        </Link>

      </div>
    </div>
  );
});

SideBar.displayName = "SideBar";

export default SideBar;
