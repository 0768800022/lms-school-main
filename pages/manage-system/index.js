import Layout from "@/components/layouts/Layout";
import ManageSystem from "@/components/Pages/ManageSystem";
import createGetServerSideProps from "@/utils/get-server-side-props";

function ManageSystemPage() {
    return <ManageSystem />;
}

ManageSystemPage.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    );
};

export default ManageSystemPage;

export const getServerSideProps = createGetServerSideProps();
