import Layout from "../../components/Layout";

export default function Home() {
    return (
        <>
            <p className="text-gray-700 text-lg mb-16 font-bold">Admin Dashboard</p>
        </>
    );
}

Home.getLayout = function getLayout(page:any) {
    return (
        <Layout>{page}</Layout>
    )
}