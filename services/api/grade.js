import apiConfig from "./config";
import fetcher from "./fetcher";

export async function getGrade({ context, data, ...rest } = {}) {
    const res = await fetcher(apiConfig.grade.getList, {
        context,
        params: data,
        ...rest,
    });

    return res?.data;
}
export async function getGradeAutoComplete({ context, data, ...rest } = {}) {
    const res = await fetcher(apiConfig.grade.autocomplete, {
        context,
        params: data,
        ...rest,
    });

    return res?.data;
}

export async function getGradeResourceAutoComplete({ context, data, ...rest } = {}) {
    const res = await fetcher(apiConfig.grade.getResourceGrade, {
        context,
        params: data,
        ...rest,
    });

    return res?.data;
}

export async function getClassAutoComplete({ context, data, ...rest } = {}) {
    const res = await fetcher(apiConfig.classrooms.autocomplete, {
        context,
        params: data,
        ...rest,
    });

    return res?.data;
}

export async function getSchollYear({ context, data, ...rest } = {}) {
    const res = await fetcher(apiConfig.schoolYear.getList, {
        context,
        params: data,
        ...rest,
    });

    return res?.data;
}

export async function updateGradeStatus({ context, data }) {
    const res = await fetcher(apiConfig.grade.updateStatus, {
        context,
        data,
    });

    return res?.data;
}

export async function getGradeDetail({ context, id } = {}) {
    const res = await fetcher(apiConfig.grade.getDetail, {
        context,
        pathParams: {
            id,
        },
    });

    return res?.data;
}

export async function createGrade({ context, data }) {
    const res = await fetcher(apiConfig.grade.createGrade, {
        context,
        data,
    });

    return res?.data;
}

export async function deleteGrade({ context, id } = {}) {
    const res = await fetcher(apiConfig.grade.deleteGrade, {
        context,
        pathParams: {
            id,
        },
    });

    return res?.data;
}


export async function getGradeSystem({ context, data, ...rest } = {}) {
    const res = await fetcher(apiConfig.gradeSystem.getList, {
        context,
        params: data,
        ...rest,
    });

    return res?.data;
}
