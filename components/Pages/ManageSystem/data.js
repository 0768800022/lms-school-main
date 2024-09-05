import { ROLES_CODE } from "@/constants/constant";
import paths from "@/constants/paths";
import BookIcon from "@/public/icons/book.svg";
import BuildingIcon from "@/public/icons/building.svg";
import CalendarEventIcon from "@/public/icons/calendar-event.svg";
import CalendarHolidayIcon from "@/public/icons/calendar-holiday.svg";
import CalendarYearIcon from "@/public/icons/calendar-year.svg";
import GPAConfigIcon from "@/public/icons/gpa-config.svg";
import ManageGradeIcon from "@/public/icons/manage-grade.svg";
import SettingIcon from "@/public/icons/setting.svg";
import TaskSquareIcon from "@/public/icons/task-square.svg";

export const manageList = [
    {
        icon: <BuildingIcon width={44} height={44} />,
        label: "Quản lý chi nhánh",
        bgColor: "#1B31FF24",
        path: paths.managerSystemBranch,
        roles: [ ROLES_CODE.SUPER_ADMIN ],
    },
    {
        icon: <CalendarYearIcon width={50} height={50} />,
        label: "Quản lý năm học",
        bgColor: "#FCAF1724",
        path: paths.managerSystemSchoolYear,
    },
    {
        icon: <ManageGradeIcon width={44} height={35} />,
        label: "Quản lý khối lớp",
        bgColor: "#17A2B824",
        path: paths.managerSystemGrade,
    },
    {
        icon: <TaskSquareIcon width={40} height={40} />,
        label: "Tiết học",
        bgColor: "#28A74524",
        path: paths.managerSystemPeriod,
    },
    {
        icon: <BookIcon width={52} height={52} />,
        label: "Quản lý môn học",
        bgColor: "#17A2B824",
        path: paths.managerSystemSubject,
    },
    {
        icon: <CalendarHolidayIcon width={50} height={50} />,
        label: "Quản lý ngày nghỉ lễ",
        bgColor: "#DC354524",
        iconColor : "#DC3545",
        path: paths.managerSystemHoliday,
    },
    {
        icon: <CalendarEventIcon width={50} height={50} />,
        label: "Quản lý sự kiện",
        bgColor: "#E83E8C24",
        iconColor : "#E83E8C",
        path: paths.managerSystemEvent,
    },
    {
        icon: <SettingIcon width={42} height={42} />,
        label: "Cấu hình khác",
        bgColor: "#0CA6ED24",
        path: paths.managerSystemConfig,
        roles: [ ROLES_CODE.SUPER_ADMIN ],
    },
    {
        icon: <GPAConfigIcon width={50} height={50} />,
        label: "Cấu hình công thức tính điểm",
        bgColor: "#9E77ED24",
        iconColor : "#9E77ED",
        path: paths.managerSystemGPAConfig,
    },
];
