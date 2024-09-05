import apiConfig from "./config";
import fetcher from "./fetcher";

export async function getClassExam({ context, data, ...rest } = {}) {
    const res = await fetcher(apiConfig.classExam.getList, {
        context,
        params: data,
        ...rest,
    });

    return res?.data;
}

export async function getClassExamAll({ context, data, ...rest } = {}) {
    const res = await fetcher(apiConfig.classExam.getListAll, {
        context,
        params: data,
        ...rest,
    });

    return res?.data;
}

export async function getDetailClassExam({ context, data, ...rest } = {}) {
    const res = await fetcher(apiConfig.classExam.getDetail, {
        context,
        pathParams: data,
        ...rest,
    });

    return res?.data;
}

export async function getClassroomResult({ context, data, ...rest } = {}) {
    const res = await fetcher(apiConfig.classroomExamResult.getByExam, {
        context,
        pathParams: data,
        ...rest,
    });

    return res?.data;
}

export async function getClassroomExamResult({ context, data, ...rest } = {}) {
    const res = await fetcher(apiConfig.classroomExamResult.getDetail, {
        context,
        pathParams: data,
        ...rest,
    });

    return res?.data;
}

export async function getClassroomExamGrade({ context, data, ...rest } = {}) {
    const res = await fetcher(apiConfig.classroomExamResult.getStudentGrade, {
        context,
        pathParams: data,
        ...rest,
    });

    return res?.data;
}

export async function createClassExam({ context, data }) {
    const res = await fetcher(apiConfig.classExam.create, {
        context,
        data,
    });

    return res?.data;
}

export async function updateClassExam({ context, id, data }) {
    const res = await fetcher(apiConfig.classExam.update, {
        context,
        pathParams: {
            id,
        },
        data,
    });

    return res?.data;
}

export async function deleteClassExam({ context, id }) {
    const res = await fetcher(apiConfig.classExam.delete, {
        context,
        pathParams: {
            id,
        },
    });

    return res?.data;
}
