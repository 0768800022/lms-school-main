import Layout from "@/components/layouts/Layout";
import CreateUser from "@/components/Pages/ManageUser/CreateUser";
import paths from "@/constants/paths";
import createGetServerSideProps from "@/utils/get-server-side-props";

function CreateUserPage(props) {
    return <CreateUser {...props} />;
}

CreateUserPage.getLayout = function getLayout(page) {
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
                {
                    label: "Thêm mới người dùng",
                    link: paths.createUser,
                },
            ]}
        >
            {page}
        </Layout>
    );
};

export default CreateUserPage;

const getData = async () => {

    return {
        props: {},
    };
};

export const getServerSideProps = createGetServerSideProps(getData);
