import { ROLES_CODE } from "./constant";

const paths = {
    profile: "/account/profile",
    home: "/",
    manageUser: "/manage-user",
    createUser: "/manage-user/create",
    userDetail: "/manage-user/[id]",
    manageSystem: "/manage-system",
    managerSystemBranch: "/manage-system/branch",
    managerSystemGrade: "/manage-system/grade",
    managerSystemHoliday: "/manage-system/holiday",
    managerSystemPeriod: "/manage-system/period",
    managerSystemSubject: "/manage-system/subject",
    managerSystemSchoolYear: "/manage-system/school-year",
    managerSystemEvent: "/manage-system/event",
    managerSystemConfig: "/manage-system/config",
    managerSystemGPAConfig: "/manage-system/gpa-config",
    forbidden: "/403",
    assign: "/assign",
    assignHeadTeacher: "/assign/head-teacher",
    assignSubjectTeacher: "/assign/subject-teacher",
    assignPeriod: "/assign/period",
    assignTimetable: "/assign/time-table",
    manageClass: "/manage-class",
    classDetailTimeTable: "/manage-class/[id]/time-table",
    classDetailTeachingPlan: "/manage-class/[id]/teaching-plan",
    classDetailTeachingPlanDetail: "/manage-class/[id]/teaching-plan/[planId]",
    classDetailStudents: "/manage-class/[id]/students",
    classDetailHomework: "/manage-class/[id]/homework",
    classDetailExam: "/manage-class/[id]/homework/[idDetail]",
    classDetailExamResult: "/manage-class/[id]/homework/[idDetail]/result/[idResult]",
    classDetailAttendace: "/manage-class/[id]/attendance",
    classDetailScore: "/manage-class/[id]/score",
    manageResource: "/manage-resource",
    manageResourceDetail: "/manage-resource/[id]/series-detail/[categoryId]",
    manageResourceRoleDetail: "/manage-resource/[id]/series-detail/list/[classroomId]",
    manageResourceUnitest: "/manage-resource/[id]/series-detail",
    assignPlanLesson: "/assign/teaching-plan",
    assignPlanLessonDetail: "/assign/teaching-plan/[id]",
    previewResource: "/preview-resource/[id]",
    notification:"/notification",
    notificationDetail:"/notification/[id]",
    notFound: "/404",
    createNotification: "/notification/create",
    dashboard: "/dashboard",
};

export const publicPaths = [ paths.forbidden ];
export const unauthenticatedPaths = [];

export const routesRoles = {
    [paths.home]: [],
    [paths.profile]: [],
    [paths.manageUser]: [ ROLES_CODE.SUPER_ADMIN, ROLES_CODE.ADMIN ],
    [paths.createUser]: [ ROLES_CODE.SUPER_ADMIN, ROLES_CODE.ADMIN ],
    [paths.userDetail]: [ ROLES_CODE.SUPER_ADMIN, ROLES_CODE.ADMIN ],
    [paths.manageSystem]: [ ROLES_CODE.SUPER_ADMIN, ROLES_CODE.ADMIN ],
    [paths.managerSystemBranch]: [ ROLES_CODE.SUPER_ADMIN ],
    [paths.managerSystemGrade]: [ ROLES_CODE.SUPER_ADMIN, ROLES_CODE.ADMIN ],
    [paths.managerSystemHoliday]: [ ROLES_CODE.SUPER_ADMIN, ROLES_CODE.ADMIN ],
    [paths.managerSystemPeriod]: [ ROLES_CODE.SUPER_ADMIN, ROLES_CODE.ADMIN ],
    [paths.managerSystemSubject]: [ ROLES_CODE.SUPER_ADMIN, ROLES_CODE.ADMIN ],
    [paths.managerSystemSchoolYear]: [ ROLES_CODE.SUPER_ADMIN, ROLES_CODE.ADMIN ],
    [paths.forbidden]: [],
    [paths.assign]: [ ROLES_CODE.SUPER_ADMIN, ROLES_CODE.ADMIN ],
    [paths.assignHeadTeacher]: [ ROLES_CODE.SUPER_ADMIN, ROLES_CODE.ADMIN ],
    [paths.assignSubjectTeacher]: [ ROLES_CODE.SUPER_ADMIN, ROLES_CODE.ADMIN ],
    [paths.assignPeriod]: [ ROLES_CODE.SUPER_ADMIN, ROLES_CODE.ADMIN ],
    [paths.manageClass]: [ ROLES_CODE.SUPER_ADMIN, ROLES_CODE.ADMIN ],
    [paths.classDetailTimeTable]: [],
    [paths.classDetailStudents]: [],
    [paths.classDetailHomework]: [],
    [paths.classDetailAttendace]: [],
    [paths.classDetailExam]: [],
    [paths.manageResource]: [],
    [paths.manageResourceDetail]: [],
    [paths.manageResourceUnitest]: [],
    [paths.managerSystemConfig]: [ ROLES_CODE.SUPER_ADMIN ],
    [paths.dashboard]: [ ROLES_CODE.SUPER_ADMIN ],
};

export const teacherPaths = {
    home: "/",
    homework: "/homework",
    homeworkDetail: "/homework/[idDetail]",
    attendance: "/attendance",
    students: "/students",
    teachingPlan: "/teaching-plan",
    teachingPlanDetail: "/teaching-plan/[planId]",
    timetable: "/timetable",
    score: "/score",
};

export const teacherRewritePaths = {
    [teacherPaths.home]: {
        defaultParamKey: "[id]",
        rewriteUrl: paths.profile,
    },
    [teacherPaths.homework]: {
        defaultParamKey: "[id]",
        rewriteUrl: paths.classDetailHomework,
    },
    [teacherPaths.homeworkDetail]: {
        defaultParamKey: "[id]",
        rewriteUrl: paths.classDetailExam,
    },
    [teacherPaths.attendance]: {
        defaultParamKey: "[id]",
        rewriteUrl: paths.classDetailAttendace,
    },
    [teacherPaths.students]: {
        defaultParamKey: "[id]",
        rewriteUrl: paths.classDetailStudents,
    },
    [teacherPaths.teachingPlan]: {
        defaultParamKey: "[id]",
        rewriteUrl: paths.classDetailTeachingPlan,
    },
    [teacherPaths.teachingPlanDetail]: {
        defaultParamKey: "[id]",
        rewriteUrl: paths.classDetailTeachingPlanDetail,
    },
    [teacherPaths.timetable]: {
        defaultParamKey: "[id]",
        rewriteUrl: paths.classDetailTimeTable,
    },
    [teacherPaths.score]: {
        defaultParamKey: "[id]",
        rewriteUrl: paths.classDetailScore,
    },
};

export default paths;
