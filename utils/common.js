import queryString from "query-string";
import { toast } from "sonner";

import {
    APTIS_GENERAL_VALUE,
    CAMBRIDGE_VALUE,
    DATE_YEAR_FORMAT,
    EXAM_VALUE,
    IELTS_VALUE,
    LANGUAGECERT_VALUE,
    LOCAL_EXAM_VALUE,
    PLACEMENT_TEST_VALUE,
    PRACTICE_VALUE,
    TOEFL_VALUE,
    TOEIC_VALUE,
    VSTEP_VALUE,
} from "@/constants/constant";
import { errorCodes } from "@/constants/errorCode";

import canUseDom from "./can-use-dom";
import { generateAsPath } from "./path";
import { cleanObject } from ".";

export const toggleArrayValue = (array, value) => {
    if (Array.isArray(value)) return value;
    if (array.includes(value)) {
        array.splice(array.indexOf(value), 1);
    } else {
        array.push(value);
    }

    return array;
};

export const combineName = (data) => {
    return [ data?.lastName, data?.firstName ].filter((item) => item).join(" ");
};
export const combineTeacherName = (data) => {
    return [ data?.teacherLastName, data?.teacherFirstName ].filter(Boolean).join(" ");
};
export const removeAccents = (str) => {
    if (str) {
        return str
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d")
            .replace(/Đ/g, "D")
            .trim();
    }

    return str;
};

export const includesIgnoreAccents = (data, search) => {
    return removeAccents(data.toLowerCase()).includes(removeAccents(search.toLowerCase()));
};

function unsecuredCopyToClipboard(text) {
    const textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
    toast.success("Sao chép thành công");
}
export function copyToClipboard(text) {
    if (navigator.clipboard) {
        // If normal copy method available, use it
        navigator.clipboard
            ?.writeText(text)
            .then(() => {
                toast.success("Sao chép thành công");
            })
            .catch(() => {
                toast.error("Sao chép thất bại");
            });
    } else {
        unsecuredCopyToClipboard(text);
    }
}

export const pushQuery = (router, newQuery) => {
    const { replace, asPath, pathname, query, isReady } = router;

    if (!canUseDom() || !isReady) return;

    const constructedQuery = cleanObject(
        {
            ...query,
            ...newQuery,
        },
        { clear: [ undefined, "", null, 0 ] },
    );

    replace(
        {
            pathname,
            query: constructedQuery,
        },
        generateAsPath({ asPath, query: constructedQuery, pathname }),
        { shallow: true },
    );
};
export const exceptNumberSymbols = (e) => {
    [ "e", "E", "+", "-", ".", ",", "v" ].includes(e.key) && e.preventDefault();
};

export const handleCatchError = (dataRes, form) => {
    const errorCode = errorCodes[dataRes?.code];
    if (form && errorCode?.field) {
        form.setFields([
            {
                name: errorCode?.field,
                errors: [ errorCode?.message || dataRes?.message ],
            },
        ]);

        return;
    }

    if (errorCode?.message) {
        toast.error(errorCode?.message);
    } else {
        toast.error(dataRes?.message);
    }
};

const unitTestThumbnailVI = {
    PRACTICE_UNIT_TEST_IMG: "/images/test-thumbnail/unit-tests.png",
    PRACTICE_LANGUAGE_IMG: "/images/test-thumbnail/topic-based-tests.png",
    PRACTICE_SKILL_IMG: "/images/test-thumbnail/skill-based-tests.png",

    EXAM_15_IMG: "/images/test-thumbnail/on-going-assessment-15m.png",
    EXAM_20_IMG: "/images/test-thumbnail/on-going-assessment-20m.png",
    EXAM_MID_TERM_45_IMG: "/images/test-thumbnail/midterm-tests-45m.png",
    EXAM_MID_TERM_60_IMG: "/images/test-thumbnail/midterm-tests-60m.png",
    EXAM_END_OF_TERM_35_IMG: "/images/test-thumbnail/end-of-term-tests-35m.png",
    EXAM_END_OF_TERM_45_IMG: "/images/test-thumbnail/end-of-term-tests-45m.png",
    EXAM_END_OF_TERM_60_IMG: "/images/test-thumbnail/end-of-term-tests-60m.png",
    EXAM_END_OF_TERM_75_IMG: "/images/test-thumbnail/end-of-term-tests-75m.png",
    EXAM_END_OF_TERM_90_IMG: "/images/test-thumbnail/end-of-term-tests-90m.png",
    EXAM_END_OF_TERM_120_IMG: "/images/test-thumbnail/end-of-term-tests-120m.png",
    EXAM_END_OF_TERM_150_IMG: "/images/test-thumbnail/end-of-term-tests-150m.png",

    FOCUS_GOOD_STUDENT_IMG: "/images/test-thumbnail/high-school-entrance-exam.png",
    FOCUS_SUPPLEMENT_IMG: "/images/test-thumbnail/competency-assessment-exam.png",
    FOCUS_REINFORCE_IMG: "/images/test-thumbnail/high-school-graduation-exam.png",

    TOEIC: "/images/test-thumbnail/toeic.png",
    TOEFL: "/images/test-thumbnail/toefl.png",
    IELTS: "/images/test-thumbnail/ielts.png",
    APTIS: "/images/test-thumbnail/aptis.png",
    VSTEP: "/images/test-thumbnail/vstep.png",
    CAMBRIDGE_STARTERS: "/images/test-thumbnail/cambridge-starters.png",
    CAMBRIDGE_MOVERS: "/images/test-thumbnail/cambridge-movers.png",
    CAMBRIDGE_FLYERS: "/images/test-thumbnail/cambridge-flyers.png",
    CAMBRIDGE_KEY: "/images/test-thumbnail/cambridge-a2-key.png",
    CAMBRIDGE_KEY_FOR_SCHOOL: "/images/test-thumbnail/cambridge-a2-key-school.png",
    CAMBRIDGE_PET: "/images/test-thumbnail/cambridge-b1-preliminary.png",
    CAMBRIDGE_PET_FOR_SCHOOL: "/images/test-thumbnail/cambridge-b1-preliminary-school.png",
    CAMBRIDGE_FIRST: "/images/test-thumbnail/cambridge-fce.png",
    CAMBRIDGE_ADVANCED: "/images/test-thumbnail/cambridge-cae.png",
    CAMBRIDGE_PROFICIENCY: "/images/test-thumbnail/cambridge-cpe.png",

    LANGUAGECERT_A1: "/images/test-thumbnail/a1-pre.png",
    LANGUAGECERT_A2: "/images/test-thumbnail/a2-access.png",
    LANGUAGECERT_B1: "/images/test-thumbnail/b1-achiever.png",
    LANGUAGECERT_B2: "/images/test-thumbnail/b2-communicator.png",
    LANGUAGECERT_C1: "/images/test-thumbnail/c1-expert.png",
    LANGUAGECERT_C2: "/images/test-thumbnail/c2-mastery.png",
    LANGUAGECERT_OWL: "/images/test-thumbnail/a1-fox.png",
    LANGUAGECERT_FOX: "/images/test-thumbnail/a1-owl.png",

    PLACEMENT_TEST: "/images/test-thumbnail/placement-test.png",
};

const unitTestThumbnailEN = {
    ...unitTestThumbnailVI,

    PRACTICE_UNIT_TEST_IMG: "/images/test-thumbnail/unit-tests-en.png",
    PRACTICE_LANGUAGE_IMG: "/images/test-thumbnail/topic-based-tests-en.png",
    PRACTICE_SKILL_IMG: "/images/test-thumbnail/skill-based-tests-en.png",

    EXAM_15_IMG: "/images/test-thumbnail/on-going-assessment-15m-en.png",
    EXAM_20_IMG: "/images/test-thumbnail/on-going-assessment-20m-en.png",
    EXAM_MID_TERM_45_IMG: "/images/test-thumbnail/midterm-tests-45m-en.png",
    EXAM_MID_TERM_60_IMG: "/images/test-thumbnail/midterm-tests-60m-en.png",
    EXAM_END_OF_TERM_35_IMG: "/images/test-thumbnail/end-of-term-tests-35m-en.png",
    EXAM_END_OF_TERM_45_IMG: "/images/test-thumbnail/end-of-term-tests-45m-en.png",
    EXAM_END_OF_TERM_60_IMG: "/images/test-thumbnail/end-of-term-tests-60m-en.png",
    EXAM_END_OF_TERM_75_IMG: "/images/test-thumbnail/end-of-term-tests-75m-en.png",
    EXAM_END_OF_TERM_90_IMG: "/images/test-thumbnail/end-of-term-tests-90m-en.png",
    EXAM_END_OF_TERM_120_IMG: "/images/test-thumbnail/end-of-term-tests-120m-en.png",
    EXAM_END_OF_TERM_150_IMG: "/images/test-thumbnail/end-of-term-tests-150m-en.png",

    FOCUS_GOOD_STUDENT_IMG: "/images/test-thumbnail/high-school-entrance-exam-en.png",
    FOCUS_SUPPLEMENT_IMG: "/images/test-thumbnail/competency-assessment-exam-en.png",
    FOCUS_REINFORCE_IMG: "/images/test-thumbnail/high-school-graduation-exam-en.png",

    PLACEMENT_TEST: "/images/test-thumbnail/placement-test-en.png",
};

export const renderUnitTestThumbnail = (unitTestType, time, locale) => {
    const unitTestThumbnail = unitTestThumbnailVI;

    switch (unitTestType) {
        case PRACTICE_VALUE.PRACTICE_UNIT_TEST:
            return unitTestThumbnail.PRACTICE_UNIT_TEST_IMG;
        case PRACTICE_VALUE.PRACTICE_TOPIC:
            return unitTestThumbnail.PRACTICE_LANGUAGE_IMG;
        case PRACTICE_VALUE.PRACTICE_SKILL:
            return unitTestThumbnail.PRACTICE_SKILL_IMG;
        case EXAM_VALUE.EXAM_15:
            if (time === 15) return unitTestThumbnail.EXAM_15_IMG;
            return unitTestThumbnail.EXAM_20_IMG;
        case EXAM_VALUE.EXAM_MID_TERM:
            if (time === 60) return unitTestThumbnail.EXAM_MID_TERM_60_IMG;
            else if (time === 45) return unitTestThumbnail.EXAM_MID_TERM_45_IMG;
            return unitTestThumbnail.EXAM_MID_TERM_45_IMG;
        case EXAM_VALUE.EXAM_END_OF_TERM: {
            if (time === 60) return unitTestThumbnail.EXAM_END_OF_TERM_60_IMG;
            if (time === 45) return unitTestThumbnail.EXAM_END_OF_TERM_45_IMG;
            if (time === 75) return unitTestThumbnail.EXAM_END_OF_TERM_75_IMG;
            if (time === 90) return unitTestThumbnail.EXAM_END_OF_TERM_90_IMG;
            if (time === 120) return unitTestThumbnail.EXAM_END_OF_TERM_120_IMG;
            if (time === 150) return unitTestThumbnail.EXAM_END_OF_TERM_150_IMG;
            return unitTestThumbnail.EXAM_END_OF_TERM_35_IMG;
        }
        case LOCAL_EXAM_VALUE.RECRUITMENT_10:
            return unitTestThumbnail.FOCUS_GOOD_STUDENT_IMG;
        case LOCAL_EXAM_VALUE.ASSESSMENT:
            return unitTestThumbnail.FOCUS_SUPPLEMENT_IMG;
        case LOCAL_EXAM_VALUE.GRADUATE:
            return unitTestThumbnail.FOCUS_REINFORCE_IMG;
        case LOCAL_EXAM_VALUE.APPLY_JOB:
            return unitTestThumbnail.FOCUS_GOOD_STUDENT_IMG;
        case LOCAL_EXAM_VALUE.STUDY_ABROAD:
            return unitTestThumbnail.FOCUS_SUPPLEMENT_IMG;
        case LOCAL_EXAM_VALUE.OTHER:
            return;
        case APTIS_GENERAL_VALUE.A1:
        case APTIS_GENERAL_VALUE.A12:
        case APTIS_GENERAL_VALUE.A2:
        case APTIS_GENERAL_VALUE.B1:
        case APTIS_GENERAL_VALUE.B2:
        case APTIS_GENERAL_VALUE.C1:
        case APTIS_GENERAL_VALUE.C2:
            return unitTestThumbnail.APTIS;
        case IELTS_VALUE.PRE:
        case IELTS_VALUE.LOW:
        case IELTS_VALUE.MEDIUM:
        case IELTS_VALUE.HIGH:
        case IELTS_VALUE.SUPER:
            return unitTestThumbnail.IELTS;
        case TOEIC_VALUE.PRE:
        case TOEIC_VALUE.LOW:
        case TOEIC_VALUE.MEDIUM:
        case TOEIC_VALUE.HIGH:
        case TOEIC_VALUE.SUPER:
            return unitTestThumbnail.TOEIC;
        case TOEFL_VALUE.PRE:
        case TOEFL_VALUE.LOW:
        case TOEFL_VALUE.MEDIUM:
        case TOEFL_VALUE.HIGH:
        case TOEFL_VALUE.SUPER:
            return unitTestThumbnail.TOEFL;
        case CAMBRIDGE_VALUE.STARTERS:
            return unitTestThumbnail.CAMBRIDGE_STARTERS;
        case CAMBRIDGE_VALUE.ADVANCED:
            return unitTestThumbnail.CAMBRIDGE_ADVANCED;
        case CAMBRIDGE_VALUE.FIRST:
            return unitTestThumbnail.CAMBRIDGE_FIRST;
        case CAMBRIDGE_VALUE.FLYERS:
            return unitTestThumbnail.CAMBRIDGE_FLYERS;
        case CAMBRIDGE_VALUE.MOVERS:
            return unitTestThumbnail.CAMBRIDGE_MOVERS;
        case CAMBRIDGE_VALUE.KEY:
            return unitTestThumbnail.CAMBRIDGE_KEY_FOR_SCHOOL;
        case CAMBRIDGE_VALUE.KEY2:
            return unitTestThumbnail.CAMBRIDGE_KEY;
        case CAMBRIDGE_VALUE.PRELIMINARY:
            return unitTestThumbnail.CAMBRIDGE_PET_FOR_SCHOOL;
        case CAMBRIDGE_VALUE.PRELIMINARY2:
            return unitTestThumbnail.CAMBRIDGE_PET;
        case CAMBRIDGE_VALUE.PROFICIENCY:
            return unitTestThumbnail.CAMBRIDGE_PROFICIENCY;
        case LANGUAGECERT_VALUE.A1:
            return unitTestThumbnail.LANGUAGECERT_A1;
        case LANGUAGECERT_VALUE.A2:
            return unitTestThumbnail.LANGUAGECERT_A2;
        case LANGUAGECERT_VALUE.B1:
            return unitTestThumbnail.LANGUAGECERT_B1;
        case LANGUAGECERT_VALUE.B2:
            return unitTestThumbnail.LANGUAGECERT_B2;
        case LANGUAGECERT_VALUE.C1:
            return unitTestThumbnail.LANGUAGECERT_C1;
        case LANGUAGECERT_VALUE.C2:
            return unitTestThumbnail.LANGUAGECERT_C2;
        case LANGUAGECERT_VALUE.OWL:
            return unitTestThumbnail.LANGUAGECERT_OWL;
        case LANGUAGECERT_VALUE.FOX:
            return unitTestThumbnail.LANGUAGECERT_FOX;
        case VSTEP_VALUE.A1:
        case VSTEP_VALUE.A2:
        case VSTEP_VALUE.B1:
        case VSTEP_VALUE.B2:
        case VSTEP_VALUE.C1:
            return unitTestThumbnail.VSTEP;
        case PLACEMENT_TEST_VALUE.PRIMARY:
        case PLACEMENT_TEST_VALUE.GENERAL:
            return unitTestThumbnail.PLACEMENT_TEST;
        default:
            return unitTestThumbnail.PRACTICE_UNIT_TEST_IMG;
    }
};

export function trimSpaceName(input) {
    return input?.trim()?.replace(/\s+/g, " ");
}
export function dayOfWeekAsString(dayWeek) {
    return [ "SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY" ].findIndex(
        (e) => e == dayWeek,
    );
}

export function timetableId(classId, weekId, numberDateOfWeek, periodId) {
    return [ classId, weekId, numberDateOfWeek, periodId ].join("-");
}

export const getIconPath = (fileName, type = "FOLDER") => {
    const extension = fileName.split(".").pop().toLowerCase();
    const iconMap = {
        ppt: "/images/file/powerpoint-icon.png",
        pptx: "/images/file/powerpoint-icon.png",
        doc: "/images/file/word-icon.png",
        docx: "/images/file/word-icon.png",
        xls: "/images/file/exels-icon.png",
        xlsx: "/images/file/exels-icon.png",
        jpg: "/images/file/jpeg-icon.png",
        jpeg: "/images/file/jpeg-icon.png",
        png: "/images/file/image-icon.png",
        pdf: "/images/file/pdf-icon.png",
        zip: "/images/file/zip-icon.png",
        rar: "/images/file/rar-icon.png",
        mp3: "/images/file/sound-icon.png",
        mp4: "/images/file/video-icon.png",
        // Add other file extensions as needed
    };

    if (type === "EXTERNAL_LINK") return "/images/file/link-icon.png";
    if (type === "FOLDER") return "/images/file/folder-icon.png";
    // Return the corresponding icon path or a default one if not found
    return iconMap[extension] || "/icons/default-icon.svg";
};

export function isImageFile(filename) {
    const imageExtensions = new Set([ "jpg", "jpeg", "png" ]);

    const extension = filename.split(".").pop().toLowerCase();

    return imageExtensions.has(extension);
}
