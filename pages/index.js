import Layout from "@/components/layouts/Layout";
import ManageSystem from "@/components/Pages/ManageSystem";
import createGetServerSideProps from "@/utils/get-server-side-props";

function Homepage() {
    return <ManageSystem />;
}

Homepage.getLayout = function getLayout(page) {
    return (
        <Layout
        // breadcrumb={[
        //     {
        //         label: "Trang chủ",
        //         link: "/",
        //     },
        //     {
        //         label: "Quản lý người dùng",
        //         link: "/manage-user",
        //     },
        // ]}
        >
            {page}
        </Layout>
    );
};

export default Homepage;

export const getServerSideProps = createGetServerSideProps();
