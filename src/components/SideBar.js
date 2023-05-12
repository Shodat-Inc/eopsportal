import { forwardRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from './Sidebar.module.css';
import Image from "next/image";

const SideBar = forwardRef(({ showNav, setShowNav }, ref) => {
  const router = useRouter();

  return (
    <div ref={ref} className={`fixed w-60 h-full bg-white shadow-sm ${styles.sidebar}`}>
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

      <div className="flex flex-col pt-2">
        <Link href="/dashboard">
          <div
            className={`pl-6 py-3 mx-0 text-center cursor-pointer mb-3 flex items-center transition-colors ${router.pathname == "/"
              ? "bg-gray-500 text-white"
              : "text-white-500 hover:bg-gray-500 hover:text-white"
              }`}
          >
            <div className="mr-2">
              <Image
                src="/img/dashboard.svg"
                alt="company logo"
                className={`w-32 h-auto ${styles.sideicons}`}
                height={25}
                width={25}
              />
            </div>
            <div>
              <p>Dashboard</p>
            </div>
          </div>
        </Link>
        <Link href="/dashboard/assetmanagement">
          <div
            className={`pl-6 py-3 mx-0 text-center cursor-pointer mb-3 flex items-center transition-colors ${router.pathname == "/account"
              ? "bg-orange-100 text-black-500"
              : "text-white-500 hover:bg-gray-500 hover:text-white"
              }`}
          >
            <div className="mr-2">
              <Image
                src="/img/clock.svg"
                alt="company logo"
                className={`w-32 h-auto ${styles.sideicons}`}
                height={25}
                width={25}
              />
            </div>
            <div>
              <p>Asset Management</p>
            </div>
          </div>
        </Link>
        <Link href="/dashboard/eopswatch">
          <div
            className={`pl-6 py-3 mx-0 text-center cursor-pointer mb-3 flex items-center transition-colors ${router.pathname == "/billing"
              ? "bg-orange-100 text-black-500"
              : "text-white-500 hover:bg-gray-500 hover:text-white"
              }`}
          >
            <div className="mr-2">
              <Image
                src="/img/clock.svg"
                alt="company logo"
                className={`w-32 h-auto ${styles.sideicons}`}
                height={25}
                width={25}
              />
            </div>
            <div>
              <p>eOps Watch</p>
            </div>
          </div>
        </Link>
        <Link href="/dashboard/eopstrace">
          <div
            className={`pl-6 py-3 mx-0 text-center cursor-pointer mb-3 flex items-center  transition-colors ${router.pathname == "/billing"
              ? "bg-orange-100 text-black-500"
              : "text-white-500 hover:bg-gray-500 hover:text-white"
              }`}
          >
            <div className="mr-2">
              <Image
                src="/img/airplay.svg"
                alt="company logo"
                className={`w-32 h-auto ${styles.sideicons}`}
                height={25}
                width={25}
              />
            </div>
            <div>
              <p>eOps Trace</p>
            </div>
          </div>
        </Link>
        <Link href="/dashboard/eopsprosense">
          <div
            className={`pl-6 py-3 mx-0 text-center cursor-pointer mb-3 flex items-center transition-colors ${router.pathname == "/billing"
              ? "bg-orange-100 text-black-500"
              : "text-white-500 hover:bg-gray-500 hover:text-white"
              }`}
          >
            <div className="mr-2">
              <Image
                src="/img/maximize.svg"
                alt="company logo"
                className={`w-32 h-auto ${styles.sideicons}`}
                height={25}
                width={25}
              />
            </div>
            <div>
              <p>eOps Prosense</p>
            </div>
          </div>
        </Link>
        <Link href="/dashboard/eopsinsight">
          <div
            className={`pl-6 py-3 mx-0 text-center cursor-pointer mb-3 flex items-center  transition-colors ${router.pathname == "/billing"
              ? "bg-orange-100 text-black-500"
              : "text-white-500 hover:bg-gray-500 hover:text-white"
              }`}
          >
            <div className="mr-2">
              <Image
                src="/img/bar-chart.svg"
                alt="company logo"
                className={`w-32 h-auto ${styles.sideicons}`}
                height={25}
                width={25}
              />
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
