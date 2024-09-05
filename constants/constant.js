export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const CDN_DOMAIN = process.env.NEXT_PUBLIC_IMAGE_URL;
export const ITEST4U_URL = process.env.NEXT_PUBLIC_ITEST4U_URL;

export const DATE_TIME_DISPLAY_FORMAT = "DD/MM/YYYY HH:mm";
export const DATE_VALUE_FORMAT = "YYYY-MM-DD HH:mm:ss";
export const DATE_MONTH_FORMAT = "MM/DD";
export const DATE_YEAR_FORMAT = "DD/MM/YYYY";
export const YEAR_DATE_FORMAT = "YYYY-MM-DD";
export const TIME_FORMAT = "HH:mm";
export const WEEKDAYS_DATE_FORMAT = "dddd ngày DD/MM/YYYY";
export const DATE_TIME_LOCAL_FORMAT = "YYYY-MM-DDTHH:mm:ss";
export const DEFAULT_LOCALE = "vi";
export const DEFAULT_TABLE_SIZE = 10;
export const DEFAULT_MAX_SCORE = 10;

export const storageKeys = {
    appLocale: "APP_LOCALE",
    redirectPath: "REDIRECT_PATH",
    accessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY,
    refreshToken: process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY,
    branchId: process.env.NEXT_PUBLIC_BRANCH_KEY,
    role: process.env.NEXT_PUBLIC_ROLE_KEY,
    redirectUrl: process.env.NEXT_PUBLIC_REDIRECT_URL_KEY,
    teacherDefaultClass: process.env.NEXT_PUBLIC_TEACHER_DEFAULT_CLASS_KEY,
};

export const gender = {
    MALE: "MALE",
    FEMALE: "FEMALE",
};

export const genderName = {
    MALE: "Nam",
    FEMALE: "Nữ",
};

export const ROLES_CODE = {
    SUPER_ADMIN: "SUPER_ADMIN",
    ADMIN: "ADMIN",
    TEACHER: "TEACHER",
    STUDENT: "STUDENT",
    PARENT: "PARENT",
};

export const ROLES_WEIGHT = {
    [ROLES_CODE.SUPER_ADMIN]: 0,
    [ROLES_CODE.ADMIN]: 1,
    [ROLES_CODE.TEACHER]: 2,
    [ROLES_CODE.PARENT]: 3,
    [ROLES_CODE.STUDENT]: 4,
};

export const roleName = {
    SUPER_ADMIN: "Super Admin",
    ADMIN: "Adminitrator",
    TEACHER: "Giáo viên",
    STUDENT: "Học viên",
    PARENT: "Phụ Huynh",
};

export const commonStatus = {
    ACTIVE: "ACTIVE",
    LOCK: "LOCK",
    UNAVAILABLE: "UNAVAILABLE",
    TRANSFERRED: "TRANSFERRED",
    INCOMING: "INCOMING",
};

export const CODE_PASSWORD_MESSAGE = {
    DUPLICATE_PASSWORD: "DUPLICATE_PASSWORD",
    WRONG_OLD_PASSWORD: "WRONG_OLD_PASSWORD",
    SAME_OLD_PASSWORD: "SAME_OLD_PASSWORD",
    OLD_PASS_INCORRECT: "OLD_PASS_INCORRECT",
};

export const FieldTypes = {
    STRING: "STRING_TYPE",
    NUMBER: "NUMBER_TYPE",
    SELECT: "SELECT",
    AUTOCOMPLETE: "AUTOCOMPLETE",
    DATE: "DATE",
    DATE_RANGE: "DATE_RANGE",
};

export const timeOfDays = {
    MORNING: "MORNING",
    AFTERNOON: "AFTERNOON",
    EVENING: "EVENING",
};

export const timeOfDaysOptions = [
    { value: timeOfDays.MORNING, label: "Buổi sáng" },
    { value: timeOfDays.AFTERNOON, label: "Buổi chiều" },
    { value: timeOfDays.EVENING, label: "Buổi tối" },
];

export const GRADE_PERIOD_FILTER = "grade";
export const CLASS_PERIOD_FILTER = "class";

export const periodOptionsFilter = [
    { value: "all", label: "Toàn trường" },
    { value: GRADE_PERIOD_FILTER, label: "Toàn khối" },
    { value: CLASS_PERIOD_FILTER, label: "Lớp học cụ thể" },
];

export const HOMEWORK_DAILY = "HOMEWORK_DAILY";
export const HOMEWORK_ASSIGNMENT = "HOMEWORK_ASSIGNMENT";
export const HOMEWORK_EXAM = "HOMEWORK_EXAM";

export const homeworkOptions = [
    { value: HOMEWORK_DAILY, label: "Kiểm tra thường xuyên" },
    { value: HOMEWORK_ASSIGNMENT, label: "Bài giao" },
    { value: HOMEWORK_EXAM, label: "Thi giữa kỳ" },
];

export const skillTypes = {
    PR: "PR",
    VO: "VO",
    GR: "GR",
    RE: "RE",
    WR: "WR",
    LI: "LI",
    SP: "SP",
};
export const unitType = {
    PRACTICE: "PRACTICE",
    TEST: "TEST",
};
export const unitTypeValue = [
    { value: unitType.PRACTICE, label: "Thực hành" },
    { value: unitType.TEST, label: "Kiểm tra" },
];

export const resourceType = {
    ASSIGNMENT: "ASSIGNMENT",
    DOCUMENT: "DOCUMENT",
};

export const lessonPlanDisplayKind = {
    NOT_VISIBLE: "NOT_VISIBLE",
    VISIBLE_ALL: "VISIBLE_ALL",
    VISIBLE_NEXT_WEEK: "VISIBLE_NEXT_WEEK",
};
export const skillDDL = [
    { value: skillTypes.PR, label: "Pronunciation" },
    { value: skillTypes.VO, label: "Vocab" },
    { value: skillTypes.GR, label: "Grammar" },
    { value: skillTypes.RE, label: "Reading" },
    { value: skillTypes.WR, label: "Writing" },
    { value: skillTypes.LI, label: "Listening" },
    { value: skillTypes.SP, label: "Speaking" },
];
// export const HOMEWORD_TYPE_SCORE = ""
export const commonStatusSchoolyear = {
    GOING_ON: "GOING_ON",
    NEXT: "NEXT",
    ARCHIVED: "ARCHIVED",
};

export const ALLOCATE_TYPES = {
    HEAD: "HEAD",
    SUBJECT: "SUBJECT",
    ASSISTANT: "ASSISTANT",
    PERIOD_AMOUNT: "PERIOD_AMOUNT",
};
export const PRACTICE_VALUE = {
    PRACTICE_UNIT_TEST: 1,
    PRACTICE_TOPIC: 2,
    PRACTICE_SKILL: 3,
};

export const EXAM_VALUE = {
    EXAM_15: 4,
    EXAM_MID_TERM: 6,
    EXAM_END_OF_TERM: 7,
};

export const LOCAL_EXAM_VALUE = {
    RECRUITMENT_10: 8,
    GRADUATE: 10,
    ASSESSMENT: 9,
    APPLY_JOB: 51,
    STUDY_ABROAD: 52,
    OTHER: 53,
};

export const APTIS_GENERAL_VALUE = {
    A1: 20,
    A12: 21,
    A2: 600,
    B1: 41,
    B2: 42,
    C1: 43,
    C2: 44,
};

export const IELTS_VALUE = {
    PRE: 18,
    LOW: 19,
    MEDIUM: 28,
    HIGH: 46,
    SUPER: 47,
};

export const TOEIC_VALUE = {
    PRE: 48,
    LOW: 49,
    MEDIUM: 26,
    HIGH: 27,
    SUPER: 50,
};

export const TOEFL_VALUE = {
    PRE: 22,
    LOW: 23,
    MEDIUM: 24,
    HIGH: 25,
    SUPER: 57,
};

export const LANGUAGECERT_VALUE = {
    FOX: 33,
    OWL: 34,
    A1: 35,
    A2: 36,
    B1: 37,
    B2: 38,
    C1: 39,
    C2: 40,
};

export const CAMBRIDGE_VALUE = {
    STARTERS: 11,
    MOVERS: 12,
    FLYERS: 13,
    KEY: 14,
    KEY2: 15,
    PRELIMINARY: 16,
    PRELIMINARY2: 17,
    FIRST: 54,
    ADVANCED: 55,
    PROFICIENCY: 56,
};

export const VSTEP_VALUE = {
    A1: 45,
    A2: 29,
    B1: 30,
    B2: 31,
    C1: 32,
};

export const PLACEMENT_TEST_VALUE = {
    PRIMARY: 60,
    GENERAL: 61,
    KEYQUERY: 60,
};

export const TEST_INIT = "TEST_INIT";
export const TEST_UNUSUAL = "TEST_UNUSUAL";
export const TEST_REGULAR = "TEST_REGULAR";
export const TEST_DAILY = "TEST_DAILY";
export const TEST_TERM = "TEST_TERM";
export const TEST_END_STUDENT = "TEST_END_STUDENT";
export const TEST_GRADUATION = "TEST_GRADUATION";
export const TEST_OTHER = "TEST_OTHER";

export const TEST_TYPE = {
    TEST_INIT: 1,
    TEST_UNUSUAL: 1,
    TEST_REGULAR: 1,
    TEST_DAILY: 2,
    TEST_TERM: 3,
    TEST_END_STUDENT: 1,
    TEST_GRADUATION: 1,
    TEST_OTHER: 1,
};

export const EExamState = Object.freeze({
    ENDED: "ENDED",
    ONGOING: "ONGOING",
    UPCOMING: "UPCOMING",
});

export const EXAM_STATE_LIST = [
    {
        id: 1,
        value: EExamState.ENDED,
        label: "Đã kết thúc",
    },
    {
        id: 2,
        value: EExamState.ONGOING,
        label: "Đang diễn ra",
    },
    {
        id: 3,
        value: EExamState.UPCOMING,
        label: "Chưa diễn ra",
    },
];

export const EExamTypes = Object.freeze({
    ENTRANCE_EXAM: 'ENTRANCE_EXAM',
    UNSCHEDULED_EXAM: 'UNSCHEDULED_EXAM',
    REGULAR_EXAM: 'REGULAR_EXAM',
    PERIODIC_EXAM: 'PERIODIC_EXAM',
    SEMESTER_EXAM: 'SEMESTER_EXAM',
    FINAL_EXAM: 'FINAL_EXAM',
    GRADUATION_EXAM: 'GRADUATION_EXAM',
    OTHER_EXAM: 'OTHER_EXAM',
    PRACTICE_EXAM: 'PRACTICE_EXAM',
    GENERAL_EXAM: 'GENERIC_EXAM',
    DOCUMENT_EXAM: 'DOCUMENT_EXAM',
});

export const EXAM_TYPE_INDEX = {
    ENTRANCE_EXAM: 1,
    UNSCHEDULED_EXAM: 2,
    REGULAR_EXAM: 3,
    PERIODIC_EXAM: 4,
    SEMESTER_EXAM: 5,
    FINAL_EXAM: 6,
    GRADUATION_EXAM: 7,
    OTHER_EXAM: 8,
};

export const EXAM_NAME_INDEX = {
    1: "Kiểm tra đầu vào",
    2: "Kiểm tra bất thường",
    3: "Kiểm tra thường xuyên",
    4: "Kiểm tra định kỳ",
    5: "Kiểm tra học kỳ",
    6: "Thi cuối cấp",
    7: "Thi tốt nghiệp",
    8: "Bài giao khác",
};

export const EXAM_TYPE_LIST = [
    { label: "Kiểm tra đầu vào", value: EExamTypes.ENTRANCE_EXAM },
    { label: "Kiểm tra bất thường", value: EExamTypes.UNSCHEDULED_EXAM },
    { label: "Kiểm tra thường xuyên", value: EExamTypes.REGULAR_EXAM },
    { label: "Kiểm tra định kỳ", value: EExamTypes.PERIODIC_EXAM },
    { label: "Kiểm tra học kỳ", value: EExamTypes.SEMESTER_EXAM },
    { label: "Thi cuối cấp", value: EExamTypes.FINAL_EXAM },
    { label: "Thi tốt nghiệp", value: EExamTypes.GRADUATION_EXAM },
    { label: "Bài học chung", value: EExamTypes.GENERAL_EXAM },
    { label: "Bài giao khác", value: EExamTypes.OTHER_EXAM },
    { label: "Luyện tập", value: EExamTypes.PRACTICE_EXAM },
    { label: "Tài liệu", value: EExamTypes.DOCUMENT_EXAM },
];

export const SCORE_COUNT = 1;

export const USE_SCORE_VALUE = {
    SCORE: true,
    NO_SCORE: false,
};

export const USE_SCORE_OPTIONS = [
    { label: "Không tính điểm", value: USE_SCORE_VALUE.NO_SCORE },
    { label: "Có tính điểm", value: USE_SCORE_VALUE.SCORE },
];

export const ASSIGN_CLASSROOM = "CLASSROOM";

export const ASSIGN_STUDENT = "STUDENT";

export const ASSIGN_OBJECT_OPTIONS = [
    { label: "Cả lớp", value: ASSIGN_CLASSROOM },
    { label: "Nhóm học tập", value: "" },
    { label: "Học sinh cụ thể", value: ASSIGN_STUDENT },
];

export const TARGET_HOMEWORK_ALL = "all";
export const TARGET_HOMEWORK_GROUP = "GROUP";
export const TARGET_HOMEWORK_STUDENT = "STUDENT";

export const targetHomeworkOptions = [
    {
        label: "Tất cả",
        value: TARGET_HOMEWORK_ALL,
    },
    {
        label: "Nhóm học tập",
        value: TARGET_HOMEWORK_GROUP,
    },
    {
        label: "Học sinh",
        value: TARGET_HOMEWORK_STUDENT,
    },
];

export const AUTO_PUBLISH_SCORE = [
    { label: "Công bố điểm tự động", value: true },
    { label: "Không công bố điểm tự động", value: false },
];

export const ASSIGN_STATUS = {
    ENDED: { label: "Đã kết thúc", value: "ENDED" },
    ONGOING: { label: "Đang diễn ra", value: "ONGOING" },
    UPCOMING: { label: "Chưa diễn ra", value: "UPCOMING" },
};

export const SUBMIT_STATUS = [
    { label: "Đã nộp bài", value: true },
    { label: "Chưa nộp bài", value: false },
];

export const RESOURCE_TYPE = [
    { label: "DTP", value: "DTP" },
    { label: "MOET", value: "MOET" },
];

export const typeResourceData = {
    ASSIGNMENT: "Bài giao",
    DOCUMENT: "Tài liệu",
};

export const typeResource = [
    {
        value: "ASSIGNMENT",
        label: typeResourceData.ASSIGNMENT,
    },
    {
        value: "DOCUMENT",
        label: typeResourceData.DOCUMENT,
    },
];
export const typeResourceUser = [
    { label: "Giáo viên", value: "TEACHER" },
    { label: "Học sinh", value: "STUDENT" },
];

export const TEACHER_TYPES = {
    HEAD: "HEAD",
    SUBJECT: "SUBJECT",
};

export const resourceUploadTypes = {
    FILE: "FILE",
    EXTERNAL_LINK: "EXTERNAL_LINK",
};
