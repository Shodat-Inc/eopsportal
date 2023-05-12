import Layout from "../../components/Layout";
export default function EopsProsense() {
    return (
        <h1>eOps Prosense</h1>
    )
}

EopsProsense.getLayout = function getLayout(page:any) {
    return (
        <Layout>{page}</Layout>
    )
}