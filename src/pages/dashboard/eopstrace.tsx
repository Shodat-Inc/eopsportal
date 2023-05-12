import Layout from "../../components/Layout";
export default function EopsTrace() {
    return (
        <h1>eOps Trace</h1>
    )
}

EopsTrace.getLayout = function getLayout(page:any) {
    return (
        <Layout>{page}</Layout>
    )
}