import Layout from "../../components/Layout";
export default function EopsInsight() {
    return (
        <h1>eOps Insight</h1>
    )
}

EopsInsight.getLayout = function getLayout(page:any) {
    return (
        <Layout>{page}</Layout>
    )
}