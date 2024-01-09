import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { forwardRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from './Sidebar.module.css';
import Image from "next/image";
import { setDataForeOpsWatchAction, setDataForeOpsTraceAction } from '@/store/actions/classAction';

const SideBar = forwardRef(({ showNav, setShowNav }, ref) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [eopswatch, setEopswatch] = useState(false);
  const [asstMgmt, setAsstMgmt] = useState(false);
  const [dashboard, setDashboard] = useState(false);
  const [eopstrace, setEopstatch] = useState(false);
  const [eopspro, setEopspro] = useState(false);
  const [eopsinsight, setEopinsight] = useState(false);
  const [modelCatalog, setModelCatalog] = useState(false);
  const [aiModelDetection, setAiModelDetection] = useState(false);

  const arr = router.pathname.split("/");
  const splitPathName = arr.filter(n => n);

  const aimodaldetection = () => {
    const eopsData = {
      "class": "",
      "subClass": "",
      "classObject": "",
      "object": "",
      "datafor": ""
    }
    dispatch(setDataForeOpsWatchAction(eopsData));
  }

  return (
    <div ref={ref} className={`font-OpenSans fixed w-60 h-full shadow-sm bg-black ${styles.sidebar}`}>
      <div className="flex items-center justify-left pl-6 pt-6 pb-6 bg-white h-20">
        <picture>
          <Image
            src="/img/logo-new.svg"
            alt="company logo"
            className={`w-36 h-auto`}
            height={88}
            width={20}
          />
        </picture>
        <div className="pl-24 md:pl-24 mt-0 z-[400]">
        </div>
      </div>

      <div className="flex flex-col pt-1 font-OpenSans">
        <Link href="/dashboard" className="hidden1 px-3">
          <div
            className={`pl-3 text-sm font-OpenSans font-light py-3 px-3 rounded rounded-lg text-center cursor-pointer mb-3 flex items-center transition-colors ${router.pathname == "/dashboard"
              ? "bg-[#2B2B2B] text-white"
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
                    className={`w-28 h-auto ${styles.sideicons}`}
                    height={22}
                    width={22}
                  />
                  :
                  <Image
                    src={router.pathname == "/dashboard" ? '/img/grid.svg' : '/img/grid-white.svg'}
                    alt="grid"
                    className={`w-28 h-auto ${styles.sideicons}`}
                    height={22}
                    width={22}
                  />
              }
            </div>
            <div className="ml-3">
              <p>Dashboard</p>
            </div>
          </div>
        </Link>

        <Link href="/dashboard/assetmanagement" className="px-3">
          <div
            className={`pl-3 text-sm font-OpenSans font-light py-3 px-3 rounded rounded-lg text-center cursor-pointer mb-3 flex items-center transition-colors ${router.pathname == "/dashboard/assetmanagement" || splitPathName.includes("assetmanagement")
              ? "bg-[#2B2B2B] text-white"
              : "text-white hover:bg-yellow-951 hover:text-black"
              }`}
            onMouseOver={() => setAsstMgmt(true)}
            onMouseOut={() => setAsstMgmt(false)}
          >
            <div className="mr-2">
              {
                asstMgmt ?
                  <Image
                    src={router.pathname == "/dashboard/assetmanagement" || splitPathName.includes("assetmanagement") ? '/img/box-black.svg' : '/img/box-black.svg'}
                    alt="clock"
                    className={`w-32 h-auto ${styles.sideicons}`}
                    height={25}
                    width={25}
                  />
                  :
                  <Image
                    src={router.pathname == "/dashboard/assetmanagement" || splitPathName.includes("assetmanagement") ? '/img/box-black.svg' : '/img/box.svg'}
                    alt="clock"
                    className={`w-32 h-auto ${styles.sideicons}`}
                    height={25}
                    width={25}
                  />
              }
            </div>
            <div className="ml-3">
              <p>Asset Management</p>
            </div>
          </div>
        </Link>

        <Link href="/dashboard/aimodaldetection" className="px-3" onClick={aimodaldetection}>
          <div
            className={`pl-3 text-sm font-OpenSans font-light py-3 px-3 rounded rounded-lg text-center cursor-pointer mb-3 flex items-center transition-colors ${router.pathname == "/dashboard/eopswatch" || splitPathName.includes("aimodaldetection")
              ? "bg-[#2B2B2B] text-white"
              : "text-white hover:bg-yellow-951 hover:text-black"
              }`}
            onMouseOver={() => setAiModelDetection(true)}
            onMouseOut={() => setAiModelDetection(false)}
          >
            <div className="mr-2">
              {
                aiModelDetection ?
                  <Image
                    src={
                      router.pathname == "/dashboard/aimodaldetection" || splitPathName.includes("aimodaldetection")
                        ? '/img/eops-watch-black-3.svg'
                        : '/img/eops-watch-black-3.svg'
                    }
                    alt="clock"
                    className={`w-32 h-auto ${styles.sideicons}`}
                    height={25}
                    width={25}
                  />
                  :
                  <Image
                    src={
                      router.pathname == "/dashboard/aimodaldetection" || splitPathName.includes("aimodaldetection")
                        ? '/img/eops-watch-black-3.svg'
                        : '/img/eops-watch-white-3.svg'
                    }
                    alt="clock"
                    className={`w-32 h-auto ${styles.sideicons}`}
                    height={25}
                    width={25}
                  />
              }
            </div>
            <div className="ml-3">
              <p>AI Model Detection</p>
            </div>
          </div>
        </Link>

        <Link href="/dashboard/eopswatch" className="px-3 hidden">
          <div
            className={`pl-3 text-sm font-OpenSans font-light py-3 px-3 rounded rounded-lg text-center cursor-pointer mb-3 flex items-center transition-colors ${router.pathname == "/dashboard/eopswatch" || splitPathName.includes("eopswatch")
              ? "bg-[#2B2B2B] text-white"
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
                      router.pathname == "/dashboard/eopswatch" || splitPathName.includes("eopswatch")
                        ? '/img/eops-watch-black-3.svg'
                        : '/img/eops-watch-black-3.svg'
                    }
                    alt="clock"
                    className={`w-32 h-auto ${styles.sideicons}`}
                    height={25}
                    width={25}
                  />
                  :
                  <Image
                    src={
                      router.pathname == "/dashboard/eopswatch" || splitPathName.includes("eopswatch")
                        ? '/img/eops-watch-black-3.svg'
                        : '/img/eops-watch-white-3.svg'
                    }
                    alt="clock"
                    className={`w-32 h-auto ${styles.sideicons}`}
                    height={25}
                    width={25}
                  />
              }
            </div>
            <div className="ml-3">
              <p>eOps Watch</p>
            </div>
          </div>
        </Link>

        <Link href="/dashboard/eopstrace" className="px-3 hidden">
          <div
            className={`pl-3 text-sm font-OpenSans font-light py-3 px-3 rounded rounded-lg text-center cursor-pointer mb-3 flex items-center transition-colors ${router.pathname == "/dashboard/eopstrace" || splitPathName.includes("eopstrace")
              ? "bg-[#2B2B2B] text-white"
              : "text-white hover:bg-yellow-951 hover:text-black"
              }`}
            onMouseOver={() => setEopstatch(true)}
            onMouseOut={() => setEopstatch(false)}
          >
            <div className="mr-2">
              {
                eopstrace ?
                  <Image
                    src={router.pathname == "/dashboard/eopstrace" || splitPathName.includes("eopstrace") ? '/img/eops-trace-black-2.svg' : '/img/airplay.svg'}
                    alt="company logo"
                    className={`w-32 h-auto ${styles.sideicons}`}
                    height={25}
                    width={25}
                  />
                  :
                  <Image
                    src={router.pathname == "/dashboard/eopstrace" || splitPathName.includes("eopstrace") ? '/img/eops-trace-black-2.svg' : '/img/eops-trace-white-2.svg'}
                    alt="company logo"
                    className={`w-32 h-auto ${styles.sideicons}`}
                    height={25}
                    width={25}
                  />
              }
            </div>
            <div className="ml-3">
              <p>eOps Trace</p>
            </div>
          </div>
        </Link>

        <Link href="/dashboard/eopsprosense" className="px-3">
          <div
            className={`pl-3 text-sm font-OpenSans font-light py-3 px-3 rounded rounded-lg text-center cursor-pointer mb-3 flex items-center transition-colors ${router.pathname == "/dashboard/eopsprosense" || splitPathName.includes("eopsprosense")
              ? "bg-[#2B2B2B] text-white"
              : "text-white hover:bg-yellow-951 hover:text-black"
              }`}
            onMouseOver={() => setEopspro(true)}
            onMouseOut={() => setEopspro(false)}
          >
            <div className="mr-2">
              {
                eopspro ?
                  <Image
                    src={router.pathname == "/dashboard/eopsprosense" || splitPathName.includes("eopsprosense") ? '/img/eops-prosense-black.svg' : '/img/eops-prosense-black.svg'}
                    alt="company logo"
                    className={`w-32 h-auto ${styles.sideicons}`}
                    height={25}
                    width={25}
                  />
                  :
                  <Image
                    src={router.pathname == "/dashboard/eopsprosense" || splitPathName.includes("eopsprosense") ? '/img/eops-prosense-black.svg' : '/img/eops-prosense-white.svg'}
                    alt="company logo"
                    className={`w-32 h-auto ${styles.sideicons}`}
                    height={25}
                    width={25}
                  />
              }
            </div>
            <div className="ml-3">
              <p>eOps Prosense</p>
            </div>
          </div>
        </Link>

        <Link href="/dashboard/eopsinsight" className="px-3">
          <div
            className={`pl-3 text-sm font-OpenSans font-light py-3 px-3 rounded rounded-lg text-center cursor-pointer mb-3 flex items-center transition-colors ${router.pathname == "/dashboard/eopsinsight" || splitPathName.includes("eopsinsight")
              ? "bg-[#2B2B2B] text-white"
              : "text-white hover:bg-yellow-951 hover:text-black"
              }`}
            onMouseOver={() => setEopinsight(true)}
            onMouseOut={() => setEopinsight(false)}
          >
            <div className="mr-2">
              {
                eopsinsight ?
                  <Image
                    src={router.pathname == "/dashboard/eopsinsight" || splitPathName.includes("eopsinsight") ? '/img/eops-insights-black.svg' : '/img/eops-insights-black.svg'}
                    alt="company logo"
                    className={`w-32 h-auto ${styles.sideicons}`}
                    height={25}
                    width={25}
                  />
                  :
                  <Image
                    src={router.pathname == "/dashboard/eopsinsight" || splitPathName.includes("eopsinsight") ? '/img/eops-insights-black.svg' : '/img/eops-insights-white.svg'}
                    alt="company logo"
                    className={`w-32 h-auto ${styles.sideicons}`}
                    height={25}
                    width={25}
                  />
              }
            </div>
            <div className="ml-3">
              <p>eOps Insight/Report</p>
            </div>
          </div>
        </Link>


        <Link href="/dashboard/modelcatalog" className="px-3">
          <div
            className={`pl-3 text-sm font-OpenSans font-light py-3 px-3 rounded rounded-lg text-center cursor-pointer mb-3 flex items-center transition-colors ${router.pathname == "/dashboard/modelcatalog" || splitPathName.includes("modelcatalog")
              ? "bg-[#2B2B2B] text-white"
              : "text-white hover:bg-yellow-951 hover:text-black"
              }`}
            onMouseOver={() => setModelCatalog(true)}
            onMouseOut={() => setModelCatalog(false)}
          >
            <div className="mr-2">
              {
                modelCatalog ?
                  <Image
                    src={router.pathname == "/dashboard/modelcatalog" || splitPathName.includes("modelcatalog") ? '/img/model-catalog-active.svg' : '/img/model-catalog-active.svg'}
                    alt="company logo"
                    className={`w-32 h-auto ${styles.sideicons}`}
                    height={25}
                    width={25}
                  />
                  :
                  <Image
                    src={router.pathname == "/dashboard/modelcatalog" || splitPathName.includes("modelcatalog") ? '/img/model-catalog-active.svg' : '/img/model-catalog-incative.svg'}
                    alt="company logo"
                    className={`w-32 h-auto ${styles.sideicons}`}
                    height={25}
                    width={25}
                  />
              }
            </div>
            <div className="ml-3">
              <p>Models Catalog</p>
            </div>
          </div>
        </Link>

      </div>
    </div>
  );
});

SideBar.displayName = "SideBar";

export default SideBar;
