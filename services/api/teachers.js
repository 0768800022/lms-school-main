import apiConfig from "./config";
import fetcher from "./fetcher";

export async function getTeacherClasses(config) {
    const headers = {
        ...apiConfig.teachers.getMyClasses.headers,
        branchId: config?.branchId,
    };

    const res = await fetcher({ ...apiConfig.teachers.getMyClasses, headers }, config);

    return res.data?.data;
}

export async function getTeacherSubjects(config) {
    const res = await fetcher(apiConfig.teachers.getMySubjects, config);

    return res.data;
}
