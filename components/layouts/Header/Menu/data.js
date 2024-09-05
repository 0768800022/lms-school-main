import paths, { teacherPaths } from "@/constants/paths";
import ArchiveBookIcon from "@/public/icons/archive-book-outline.svg";
import BoxIcon from "@/public/icons/box.svg";
import CalendarIcon from "@/public/icons/calendar-outline.svg";
import CategoryIcon from "@/public/icons/category.svg";
import DocumentDownloadIcon from "@/public/icons/document-download.svg";
import EmojiHappyIcon from "@/public/icons/emoji-happy.svg";
import EmojiNormalIcon from "@/public/icons/emoji-normal.svg";
import HierarchyIcon from "@/public/icons/hierarchy.svg";
import NotificationStatus from "@/public/icons/notification-status.svg";
import PeopleIcon from "@/public/icons/people.svg";
import SettingIcon from "@/public/icons/setting-2.svg";
import TeacherIcon from "@/public/icons/teacher.svg";

export const menuConfig = [
    {
        label: "Tổng quan",
        icon: <CategoryIcon />,
        exact: true,
        link: paths.home,
    },
    {
        label: "Hệ thống",
        icon: <SettingIcon />,
        link: paths.manageSystem,
    },
    // {
    //     label: "Phân quyền",
    //     icon: <SecurityUserIcon />,
    //     link: "",
    // },
    {
        label: "Người dùng",
        icon: <PeopleIcon />,
        link: paths.manageUser,
    },
    {
        label: "Lớp học",
        icon: <TeacherIcon />,
        link: paths.manageClass,
    },
    {
        label: "Phân bổ",
        icon: <HierarchyIcon />,
        link: paths.assign,
    },
    {
        label: "Tài nguyên",
        icon: <BoxIcon />,
        link: paths.manageResource,
    },
    {
        label: "Hỗ trợ",
        icon: <EmojiHappyIcon />,
        link: "",
    },
    {
        label: "Thông báo",
        icon: <NotificationStatus />,
        link:  paths.notification,
    },
];

export const teacherMenuConfig = [
    {
        label: "Tổng quan",
        icon: <CategoryIcon />,
        exact: true,
        link: paths.home,
    },
    {
        label: "Lịch dạy",
        icon: <CalendarIcon />,
        link: teacherPaths.timetable,
    },
    {
        label: "Bài đã giao",
        icon: <DocumentDownloadIcon />,
        link: teacherPaths.homework,
    },
    {
        label: "Điểm danh",
        icon: <EmojiNormalIcon />,
        link: teacherPaths.attendance,
    },
    {
        label: "Bảng điểm",
        icon: <ArchiveBookIcon />,
        link: teacherPaths.score,
    },
    {
        label: "Học sinh",
        icon: <PeopleIcon />,
        link: teacherPaths.students,
    },
    {
        label: "Kế hoạch",
        icon: <TeacherIcon />,
        link: teacherPaths.teachingPlan,
    },
    {
        label: "Tài nguyên",
        icon: <BoxIcon />,
        link: paths.manageResource,
    },
];
