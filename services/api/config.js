export const METHOD = {
    GET: "GET",
    POST: "POST",
    DELETE: "DELETE",
    PUT: "PUT",
    PATCH: "PATCH",
};

export const HEADERS = {
    JSON: {
        "Content-Type": "application/json",
    },
    MULTIPART: {
        "Content-Type": "multipart/form-data",
    },
    FORM_URLENCODED: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
};

const apiConfig = {
    account: {
        login: {
            url: "/auth/login",
            method: METHOD.POST,
            headers: HEADERS.JSON,
        },
        refreshToken: {
            url: "/auth/refresh-token",
            method: METHOD.POST,
            headers: HEADERS.JSON,
        },
        profile: {
            url: "/account/profile",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
        updateProfile: {
            url: "/account/update-profile",
            method: METHOD.PUT,
            headers: HEADERS.JSON,
        },
        changePassword: {
            url: "/account/change-password",
            method: METHOD.PUT,
            headers: HEADERS.JSON,
        },
        updateAvatar: {
            url: "/account/update-avatar",
            method: METHOD.POST,
            headers: HEADERS.MULTIPART,
        },
        updateLogo: {
            url: "/schools/update-logo",
            method: METHOD.POST,
            headers: HEADERS.MULTIPART,
        },
        getSchoolInfo: {
            url: "/common/school-info",
            method: METHOD.GET,
            headers: HEADERS.MULTIPART,
        },
        getBranchRoles: {
            url: "/account/branches",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
    },
    role: {
        getList: {
            url: "/roles",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
    },
    branch: {
        getList: {
            url: "/branches",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
        autocomplete: {
            url: "/branches/auto-complete",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
        getDetail: {
            url: "/branches/:id",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
        create: {
            url: "/branches",
            method: METHOD.POST,
            headers: HEADERS.JSON,
        },
        update: {
            url: "/branches",
            method: METHOD.PUT,
            headers: HEADERS.JSON,
        },
        delete: {
            url: "/branches/:id",
            method: METHOD.DELETE,
            headers: HEADERS.JSON,
        },
        updateStatus: {
            url: "/branches/update-status",
            method: METHOD.PUT,
            headers: HEADERS.JSON,
        },
    },
    user: {
        getList: {
            url: "/users",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
        getDetail: {
            url: "/users/:id",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
        updateStatus: {
            url: "/users/update-status",
            method: METHOD.PUT,
            headers: HEADERS.JSON,
        },
        createUser: {
            url: "/users",
            method: METHOD.POST,
            headers: HEADERS.JSON,
        },
        updateUser: {
            url: "/users",
            method: METHOD.PUT,
            headers: HEADERS.JSON,
        },
        assignBranchRole: {
            url: "/users/assign-branch-role",
            method: METHOD.POST,
            headers: HEADERS.JSON,
        },
        unAssignBranchRole: {
            url: "/users/unassign-branch-role",
            method: METHOD.POST,
            headers: HEADERS.JSON,
        },
        autocomplete: {
            url: "/users/auto-complete",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
    },
    grade: {
        getList: {
            url: "/grades",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
        getResourceGrade: {
            url: "/resources/grades/auto-complete",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
        getDetail: {
            url: "/grades/:branchId/:id",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
        updateStatus: {
            url: "/grades/update-status",
            method: METHOD.PUT,
            headers: HEADERS.JSON,
        },
        create: {
            url: "/grades",
            method: METHOD.POST,
            headers: HEADERS.JSON,
        },
        delete: {
            url: "/grades/:id",
            method: METHOD.DELETE,
            headers: HEADERS.JSON,
        },
        update: {
            url: "/grades",
            method: METHOD.PUT,
            headers: HEADERS.JSON,
        },
        autocomplete: {
            url: "/grades/auto-complete",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
    },
    gradeSystem: {
        getList: {
            url: "/grade-systems",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
        autocomplete: {
            url: "/grade-systems/auto-complete",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
    },
    subject: {
        getList: {
            url: "/subjects",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
        getResourceSubject: {
            url: "/resources/subjects/auto-complete",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
        getDetail: {
            url: "/subjects/:branchId/:id",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
        updateStatus: {
            url: "/subjects/update-status",
            method: METHOD.PUT,
            headers: HEADERS.JSON,
        },
        create: {
            url: "/subjects",
            method: METHOD.POST,
            headers: HEADERS.JSON,
        },
        delete: {
            url: "/subjects/:id",
            method: METHOD.DELETE,
            headers: HEADERS.JSON,
        },
        update: {
            url: "/subjects",
            method: METHOD.PUT,
            headers: HEADERS.JSON,
        },
        autocomplete: {
            url: "/subjects/auto-complete",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
    },
    subjectSystem: {
        getList: {
            url: "/subject-systems",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
        autocomplete: {
            url: "/subject-systems/auto-complete",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
    },
    schoolYear: {
        getList: {
            url: "/school-years",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
        create: {
            url: "/school-years",
            method: METHOD.POST,
            headers: HEADERS.JSON,
        },
        autocomplete: {
            url: "/school-years/auto-complete",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
        getDetail: {
            url: "/school-years/:id",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
        update: {
            url: "/school-years",
            method: METHOD.PUT,
            headers: HEADERS.JSON,
        },
    },
    holidays: {
        getList: {
            url: "/holidays",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
        getDetail: {
            url: "/holidays/:id",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
        updateStatus: {
            url: "/holidays/update-status",
            method: METHOD.PUT,
            headers: HEADERS.JSON,
        },
        create: {
            url: "/holidays",
            method: METHOD.POST,
            headers: HEADERS.JSON,
        },
        delete: {
            url: "/holidays/:id",
            method: METHOD.DELETE,
            headers: HEADERS.JSON,
        },
        update: {
            url: "/holidays",
            method: METHOD.PUT,
            headers: HEADERS.JSON,
        },
        autocomplete: {
            url: "/holidays/auto-complete",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
    },
    period: {
        getList: {
            url: "/periods",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
        autocomplete: {
            url: "/periods/auto-complete",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
        getDetail: {
            url: "/periods/:id",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
        create: {
            url: "/periods",
            method: METHOD.POST,
            headers: HEADERS.JSON,
        },
        update: {
            url: "/periods",
            method: METHOD.PUT,
            headers: HEADERS.JSON,
        },
        delete: {
            url: "/periods/:id",
            method: METHOD.DELETE,
            headers: HEADERS.JSON,
        },
        updateStatus: {
            url: "/periods/update-status",
            method: METHOD.PUT,
            headers: HEADERS.JSON,
        },
    },
    classrooms: {
        getList: {
            url: "/classrooms",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
        getListTeachingPlan: {
            url: "/classrooms/teaching-plans/:id",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
        getDetail: {
            url: "/classrooms/:id",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
        updateStatus: {
            url: "/classrooms/update-status",
            method: METHOD.PUT,
            headers: HEADERS.JSON,
        },
        create: {
            url: "/classrooms",
            method: METHOD.POST,
            headers: HEADERS.JSON,
        },
        delete: {
            url: "/classrooms/:id",
            method: METHOD.DELETE,
            headers: HEADERS.JSON,
        },
        update: {
            url: "/classrooms",
            method: METHOD.PUT,
            headers: HEADERS.JSON,
        },
        autocomplete: {
            url: "/classrooms/auto-complete",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
    },
    classExam: {
        getList: {
            url: "/class-exam",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
        getListAll: {
            url: "/class-exam/all",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
        create: {
            url: "/class-exam",
            method: METHOD.POST,
            headers: HEADERS.JSON,
        },
        getDetail: {
            url: "/class-exam/:id",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
        update: {
            url: "/class-exam/:id",
            method: METHOD.PUT,
            headers: HEADERS.JSON,
        },
        delete: {
            url: "/class-exam/:id",
            method: METHOD.DELETE,
            headers: HEADERS.JSON,
        },
    },
    classroomExamResult: {
        getByExam: {
            url: "/classroom-exam-result/:id",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
        getDetail: {
            url: "/classroom-exam-result/:id/detail",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
        getStudentGrade: {
            url: "/classroom-exam-result/:id/student-point",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
    },
    resource: {
        getCategoryList: {
            url: "/resource-categories",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
        getSeriesAll: {
            url: "/resources/series/auto-complete",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
        getSeriesDetail: {
            url: "/resources/series/:id",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
        getList: {
            url: "/resources",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
        getResourcesAutoComplete: {
            url: "/resources/auto-complete",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
        ItestResource: {
            url: "/resources/i-test-resources",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
        getITestSeriesAll: {
            url: "/resources/i-test-series/auto-complete",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
        countAmountOfResource: {
            url: "/resources/count-resource",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
        resourceSeries: {
            url: "/resources/series/auto-complete",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
        getResourceCategory: {
            url: "/resources/resource-categories",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
        branchAllocation: {
            url: "/resources/branch/allocation",
            method: METHOD.POST,
            headers: HEADERS.JSON,
        },
        getBranchAllocation: {
            url: "/resources/branch/allocation",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
        getClassroomAllocation: {
            url: "/resources/classroom/allocation",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
        getClassroomAllocationDetail: {
            url: "/resources/classroom/allocation/:id",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
        getClassroomListResource: {
            url: "/resources/classroom/allocation/list-resource",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
        createClassRoomAllocation: {
            url: "/resources/classroom/allocation",
            method: METHOD.POST,
            headers: HEADERS.JSON,
        },
        updateClassRoomAllocation: {
            url: "/resources/classroom/allocation",
            method: METHOD.PUT,
            headers: HEADERS.JSON,
        },
        getClassroomAvailListResource: {
            url: "/resources/classroom/allocation/available-classrooms",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
        getResourceDetail: {
            url: "/resources/:id",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
    },
    myResource: {
        getList: {
            url: "/my-resources",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
        delete: {
            url: "/my-resources/:id",
            method: METHOD.DELETE,
            headers: HEADERS.JSON,
        },
        uploadFile: {
            url: "/my-resources/upload-file",
            method: METHOD.POST,
            headers: HEADERS.MULTIPART,
        },
        addLink: {
            url: "/my-resources/add-link",
            method: METHOD.POST,
            headers: HEADERS.JSON,
        },
    },
    resourceFolder: {
        getList: {
            url: "/resource-folders",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
        create: {
            url: "/resource-folders",
            method: METHOD.POST,
            headers: HEADERS.JSON,
        },
        delete: {
            url: "/resource-folders/:id",
            method: METHOD.DELETE,
            headers: HEADERS.JSON,
        },
        update: {
            url: "/resource-folders",
            method: METHOD.PUT,
            headers: HEADERS.JSON,
        },
        getListBreadcrumb: {
            url: "/resource-folders/:folderId/parents",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
    },
    classroomStudents: {
        getList: {
            url: "/classroom-students",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
        getAutoComplete: {
            url: "/classroom-students/auto-complete",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
        addByPhone: {
            url: "/classroom-students/add-by-phone",
            method: METHOD.POST,
            headers: HEADERS.JSON,
        },
        updateStatus: {
            url: "/classroom-students/update-status",
            method: METHOD.PUT,
            headers: HEADERS.JSON,
        },
        addNewStudent: {
            url: "/classroom-students/add-new-student",
            method: METHOD.POST,
            headers: HEADERS.JSON,
        },
        deleteClassroomStudent: {
            url: "/classroom-students/:id",
            method: METHOD.DELETE,
            headers: HEADERS.JSON,
        },
        transferClassroomStudent: {
            url: "/classroom-students/transfer-class",
            method: METHOD.POST,
            headers: HEADERS.JSON,
        },
        addListStudent: {
            url: "/classroom-students/add-by-list-student",
            method: METHOD.POST,
            headers: HEADERS.JSON,
        },
    },
    teachingPlan: {
        getList: {
            url: "/teaching-plans",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
        getDetail: {
            url: "/teaching-plans/:id",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
        updateStatus: {
            url: "/teaching-plans/update-state",
            method: METHOD.PUT,
            headers: HEADERS.JSON,
        },
        create: {
            url: "/teaching-plans",
            method: METHOD.POST,
            headers: HEADERS.JSON,
        },
        delete: {
            url: "/teaching-plans/:id",
            method: METHOD.DELETE,
            headers: HEADERS.JSON,
        },
        update: {
            url: "/teaching-plans",
            method: METHOD.PUT,
            headers: HEADERS.JSON,
        },
        autocomplete: {
            url: "/teaching-plans/auto-complete",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
    },
    teachingPlanItem: {
        getList: {
            url: "/teaching-plan-items",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
        getDetail: {
            url: "/teaching-plan-items/:id",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
        updateStatus: {
            url: "/teaching-plan-items/update-state",
            method: METHOD.PUT,
            headers: HEADERS.JSON,
        },
        create: {
            url: "/teaching-plan-items",
            method: METHOD.POST,
            headers: HEADERS.JSON,
        },
        delete: {
            url: "/teaching-plan-items/:id",
            method: METHOD.DELETE,
            headers: HEADERS.JSON,
        },
        update: {
            url: "/teaching-plan-items",
            method: METHOD.PUT,
            headers: HEADERS.JSON,
        },
        updateSort: {
            url: "/teaching-plan-items/update-sort",
            method: METHOD.PUT,
            headers: HEADERS.JSON,
        },
        updatePublish: {
            url: "/teaching-plan-items/update-publish",
            method: METHOD.PUT,
            headers: HEADERS.JSON,
        },
        updateState: {
            url: "/teaching-plan-items/update-state",
            method: METHOD.PUT,
            headers: HEADERS.JSON,
        },
    },
    teachingPlanResource: {
        getList: {
            url: "/teaching-plan-item-resources",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
        addResource: {
            url: "/teaching-plan-item-resources",
            method: METHOD.POST,
            headers: HEADERS.JSON,
        },
        updateSort: {
            url: "/teaching-plan-item-resources/update-sort",
            method: METHOD.PUT,
            headers: HEADERS.JSON,
        },
        delete: {
            url: "/teaching-plan-item-resources/:id",
            method: METHOD.DELETE,
            headers: HEADERS.JSON,
        },
        deleteSeries: {
            url: "/teaching-plan-item-resources",
            method: METHOD.DELETE,
            headers: HEADERS.JSON,
        },
    },
    allocate: {
        getListTeacher: {
            url: "/teacher-allocations",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
        allocateHeadTeacher: {
            url: "/teacher-allocations/head-teacher",
            method: METHOD.POST,
            headers: HEADERS.JSON,
        },
        allocateSubjectTeacher: {
            url: "/teacher-allocations/subject-teacher",
            method: METHOD.POST,
            headers: HEADERS.JSON,
        },
        allocatePeriod: {
            url: "/teacher-allocations/period-amount",
            method: METHOD.POST,
            headers: HEADERS.JSON,
        },
    },
    weeks: {
        autoComplete: {
            url: "/weeks/auto-complete",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
        getDetail: {
            url: "/weeks/:id",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
    },
    timetableValueWeeks: {
        list: {
            url: "/timetable-value-weeks",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },

        getDetail: {
            url: "/timetable-value-weeks/:timetableValueId/:weekId",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
    },
    timetableValues: {
        create: {
            url: "/timetable-values",
            method: METHOD.POST,
            headers: HEADERS.JSON,
        },
        applyFullYear: {
            url: "/timetable-values/apply-full-year",
            method: METHOD.POST,
            headers: HEADERS.JSON,
        },
    },
    timetableValueWeekNote: {
        create: {
            url: "/timetable-value-week-notes",
            method: METHOD.POST,
            headers: HEADERS.JSON,
        },
        update: {
            url: "/timetable-value-week-notes",
            method: METHOD.PUT,
            headers: HEADERS.JSON,
        },
        getDetail: {
            url: "/timetable-value-week-notes/:id",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
    },

    timetable: {
        getByClassroomId: {
            url: "/timetables/get-by-classroom/:id",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
    },
    event: {
        getList: {
            url: "/events",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
        getDetail: {
            url: "/events/:id",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
        create: {
            url: "/events",
            method: METHOD.POST,
            headers: HEADERS.JSON,
        },
        delete: {
            url: "/events/:id",
            method: METHOD.DELETE,
            headers: HEADERS.JSON,
        },
        update: {
            url: "/events",
            method: METHOD.PUT,
            headers: HEADERS.JSON,
        },
        autocomplete: {
            url: "/events/auto-complete",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
    },
    teachers: {
        getMyClasses: {
            url: "/teachers/my-classes",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
        getMySubjects: {
            url: "/teachers/my-subjects",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
    },
    periodAmountAllocation: {
        getList: {
            url: "/period-amount-allocations",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
        allocatePeriod: {
            url: "/period-amount-allocations",
            method: METHOD.POST,
            headers: HEADERS.JSON,
        },
    },
    settingPoint: {
        getList: {
            url: "/setting-point",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
        getDetail: {
            url: "/setting-point/:id",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
        create: {
            url: "/setting-point",
            method: METHOD.POST,
            headers: HEADERS.JSON,
        },
        delete: {
            url: "/setting-point/:id",
            method: METHOD.DELETE,
            headers: HEADERS.JSON,
        },
        update: {
            url: "/setting-point",
            method: METHOD.PUT,
            headers: HEADERS.JSON,
        },
        getDisableSubject: {
            url: "/setting-point/disabled-subject/:id",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
    },
    notification: {
        getList: {
            url: "/notification",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
        create: {
            url: "/notification",
            method: METHOD.POST,
            headers: HEADERS.JSON,
        },
        update: {
            url: "/notification",
            method: METHOD.PUT,
            headers: HEADERS.JSON,
        },
    },
    rollCall: {
        getList: {
            url: "/roll-calls",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },

        update: {
            url: "/roll-calls",
            method: METHOD.PUT,
            headers: HEADERS.JSON,
        },
    },
};

export default apiConfig;
