import Layout from "@/components/layouts/Layout";
import CreateUser from "@/components/Pages/ManageUser/CreateUser";
import paths from "@/constants/paths";
import { getUserDetail } from "@/services/api/user";
import createGetServerSideProps from "@/utils/get-server-side-props";

function DetailUserPage(props) {
    return <CreateUser {...props} />;
}

DetailUserPage.getLayout = function getLayout(page) {
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
                    label: "Cập nhật thông tin người dùng",
                    link: paths.updateUser,
                },
            ]}
        >
            {page}
        </Layout>
    );
};

export default DetailUserPage;

const getData = async ({ context }) => {
    const { id } = context.params;

    if (Number.isNaN(Number(id))) {
        return {
            props: {

            },
            redirect: {
                permanent: false,
                destination: paths.manageUser,
            },
        };
    }

    try {
        const resUser = await getUserDetail({ context, id: Number(id) });
        if (resUser.result) {
            return {
                props: {
                    userData: resUser.data,
                },
            };
        }
    } catch (err) {
        return {
            props: {},
            redirect: {
                permanent: false,
                destination: paths.manageUser,
            },
        };
    }

    return {
        props: {},
    };
};

export const getServerSideProps = createGetServerSideProps(getData);
