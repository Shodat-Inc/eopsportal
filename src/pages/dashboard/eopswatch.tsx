import Layout from "../../components/Layout";
import Template from "./template";
export default function EopsWatch() {
    return (
        <div className="flex font-OpenSans">
            
            <div className="w-[84%]">
                <div className="columns-2 flex justify-between items-center">
                    <p className="text-black text-lg mb-0 font-semibold">eOPS Watch</p>
                </div>
            </div>

            <div className="w-[16%] pl-5">
                <Template />
            </div>

        </div>
    )
}

EopsWatch.getLayout = function getLayout(page:any) {
    return (
        <Layout>{page}</Layout>
    )
}