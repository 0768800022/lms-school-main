import apiConfig from "./config";
import fetcher from "./fetcher";

export async function getSubjectAutoComplete({ context, data, ...rest } = {}) {
    const res = await fetcher(apiConfig.subject.autocomplete, {
        context,
        params: data,
        ...rest,
    });

    return res?.data;
}

export async function getSubjectResourceAutoComplete({ context, data, ...rest } = {}) {
    const res = await fetcher(apiConfig.subject.getResourceSubject, {
        context,
        params: data,
        ...rest,
    });

    return res?.data;
}

export async function getSubjectSystem({ context, data, ...rest } = {}) {
    const res = await fetcher(apiConfig.subjectSystem.getList, {
        context,
        params: data,
        ...rest,
    });

    return res?.data;
}

export async function getSubjectTeacherAllocationsAutoComplete({ context, data, ...rest } = {}) {
    const res = await fetcher(apiConfig.allocate.getListTeacher, {
        context,
        params: data,
        ...rest,
    });

    return res?.data;
}
