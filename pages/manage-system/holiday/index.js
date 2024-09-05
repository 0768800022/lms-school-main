import Layout from "@/components/layouts/Layout";
import ManageHoliday from "@/components/Pages/ManageSystem/Holiday";
import paths from "@/constants/paths";
import createGetServerSideProps from "@/utils/get-server-side-props";

function ManageHolidayPage(props) {
    return <ManageHoliday {...props} />;
}

ManageHolidayPage.getLayout = function getLayout(page) {
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
                    label: "Quản lý ngày nghỉ lễ",
                    link: paths.managerSystemHoliday,
                },
            ]}
        >
            {page}
        </Layout>
    );
};

export default ManageHolidayPage;

export const getServerSideProps = createGetServerSideProps();
