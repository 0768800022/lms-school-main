import { useState } from "react";
import { useRouter } from "next/router";

import { UnstyledButton } from "@/components/Common/Button";
import Container from "@/components/Common/Container";
import Flex from "@/components/Common/Flex";
import { RoleBasedRenderer } from "@/components/Common/Permission";
import Tab from "@/components/Common/Tab";
import { ROLES_CODE } from "@/constants/constant";
import paths from "@/constants/paths";
import IconPencil from "@/public/icons/pencil.svg";

import styles from "./ClassDetailLayout.module.scss";

const dataTabs = [
    {
        label: "Thời khóa biểu",
        key: "schedule",
        pathname: paths.classDetailTimeTable,
    },
    {
        label: "Kế hoạch giảng dạy",
        key: "teaching-plan",
        pathname: paths.classDetailTeachingPlan,
        extendPaths: [ paths.classDetailTeachingPlanDetail ],
    },
    {
        label: "Bài đã giao",
        key: "homework",
        pathname: paths.classDetailHomework,
    },
    {
        label: "Điểm danh và nhận xét",
        key: "attendance",
        pathname: paths.classDetailAttendace,
    },
    {
        label: "Danh sách học sinh",
        key: "students",
        pathname: paths.classDetailStudents,
    },
    {
        label: "Bảng điểm",
        key: "grade",
        pathname: paths.classDetailScore,
    },
];

function ClassDetailLayout({ children, title = "Classroom Name", className }) {
    const { push, pathname, query } = useRouter();
    const [ activeTab, setActiveTab ] = useState(
        dataTabs.find((tab) => {
            const paths = [ ...(tab.extendPaths || []), tab?.pathname ];
            return paths.some((path) => path === pathname);
        })?.key ?? dataTabs[0].key,
    );

    return (
        <Container className={styles.schedule}>
            <Flex align="center" columnGap="1rem">
                <>
                    <h5 className={styles.title}>{title}</h5>
                    {/* <UnstyledButton className={styles.btnEdit}>
                        <IconPencil />
                    </UnstyledButton> */}
                </>
            </Flex>
            <RoleBasedRenderer
                components={[
                    {
                        roles: [ ROLES_CODE.ADMIN, ROLES_CODE.SUPER_ADMIN ],
                        component: (
                            <Tab
                                className={styles.tab}
                                active={activeTab}
                                onTabClick={(active) => {
                                    setActiveTab(active.key);
                                    push({
                                        pathname: active.pathname,
                                        query: { id: query.id },
                                    });
                                }}
                                items={dataTabs}
                            />
                        ),
                    },
                ]}
            />
            <div className={className}>{children}</div>
        </Container>
    );
}

export default ClassDetailLayout;
