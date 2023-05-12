import Layout from "../../components/Layout";
export default function EopsWatch() {
    return (
        <h1>eOps Watch</h1>
    )
}

EopsWatch.getLayout = function getLayout(page:any) {
    return (
        <Layout>{page}</Layout>
    )
}