import Layout from "@/components/layouts/Layout";
import ManageUser from "@/components/Pages/ManageUser";
import paths from "@/constants/paths";
import createGetServerSideProps from "@/utils/get-server-side-props";

function ManageUserPage(props) {
    return <ManageUser {...props} />;
}

ManageUserPage.getLayout = function getLayout(page) {
    return (
        <Layout
            breadcrumb={[
                {
                    label: "Trang chủ",
                    link: paths.home,
                },
                {
                    label: "Người dùng",
                    link: paths.manageUser,
                },
            ]}
        >
            {page}
        </Layout>
    );
};

const getData = async ({ context }) => {
    const query = context.query;

    return {
        props: {
            ...query,
        },
    };
};

export const getServerSideProps = createGetServerSideProps(getData);

export default ManageUserPage;
