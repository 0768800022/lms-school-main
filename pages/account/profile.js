import Layout from "@/components/layouts/Layout";
import Profile from "@/components/Pages/Profile";
import createGetServerSideProps from "@/utils/get-server-side-props";

function ProfilePage() {
    return <Profile />;
}

ProfilePage.getLayout = function getLayout(page) {
    return (
        <Layout
            // breadcrumb={[
            //     {
            //         label: "Trang chủ",
            //         link: paths.home,
            //     },
            //     {
            //         label: "Thông tin cá nhân",
            //         link: paths.accountProfile,
            //     },
            // ]}
        >
            {page}
        </Layout>
    );
};

export default ProfilePage;

export const getServerSideProps = createGetServerSideProps();
