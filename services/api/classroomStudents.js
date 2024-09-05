import apiConfig from "./config";
import fetcher from "./fetcher";

export async function getClassroomStudents({ context, data, ...rest } = {}) {
    const res = await fetcher(apiConfig.classroomStudents.getList, {
        context,
        params: data,
        ...rest,
    });

    return res?.data;
}

export async function getStudentsAutoComplete({ context, data, ...rest } = {}) {
    const res = await fetcher(apiConfig.classroomStudents.getAutoComplete, {
        context,
        params: data,
        ...rest,
    });

    return res?.data;
}

export async function getClassroomTeachingPlan({ context, data, ...rest } = {}) {
    const res = await fetcher(apiConfig.teachingPlan.getList, {
        context,
        params: data,
        ...rest,
    });

    return res?.data;
}

export async function addStudentByPhone({ context, data, ...rest } = {}) {
    const res = await fetcher(apiConfig.classroomStudents.addByPhone, {
        context,
        data,
        ...rest,
    });

    return res?.data;
}

export async function updateStudentStatus({ context, data }) {
    const res = await fetcher(apiConfig.classroomStudents.updateStatus, {
        context,
        data,
    });

    return res?.data;
}

export async function addNewStudent({ context, data, ...rest } = {}) {
    const res = await fetcher(apiConfig.classroomStudents.addNewStudent, {
        context,
        data,
        ...rest,
    });

    return res?.data;
}

export async function deleteClassroomStudent({ context, data, ...rest } = {}) {
    const res = await fetcher(apiConfig.classroomStudents.deleteClassroomStudent, {
        context,
        pathParams: data,
        ...rest,
    });

    return res?.data;
}

export async function getDetailClassroom({ context, data, ...rest } = {}) {
    const res = await fetcher(apiConfig.classrooms.getDetail, {
        context,
        pathParams: data,
        ...rest,
    });

    return res?.data;
}

export async function transferClassroomStudent({ context, data, ...rest } = {}) {
    const res = await fetcher(apiConfig.classroomStudents.transferClassroomStudent, {
        context,
        data,
        ...rest,
    });

    return res?.data;
}

export async function addListStudent({ context, data, ...rest } = {}) {
    const res = await fetcher(apiConfig.classroomStudents.addListStudent, {
        context,
        data,
        ...rest,
    });

    return res?.data;
}
