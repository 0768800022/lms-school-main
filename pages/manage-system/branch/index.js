import Layout from "@/components/layouts/Layout";
import ManageBranch from "@/components/Pages/ManageSystem/Branch";
import paths from "@/constants/paths";
import createGetServerSideProps from "@/utils/get-server-side-props";

function ManageBranchPage(props) {
    return <ManageBranch {...props} />;
}

ManageBranchPage.getLayout = function getLayout(page) {
    return (
        <Layout
            breadcrumb={[
                {
                    label: "Trang chủ",
                    link: paths.home,
                },
                {
                    label: "Hệ thống",
                    link: paths.manageSystem,
                },
                {
                    label: "Quản lý chi nhánh",
                    link: paths.managerSystemBranch,
                },
            ]}
        >
            {page}
        </Layout>
    );
};

export default ManageBranchPage;

export const getServerSideProps = createGetServerSideProps();
