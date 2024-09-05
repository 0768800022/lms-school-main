import apiConfig from "./config";
import fetcher from "./fetcher";

export async function getSchoolYearDetail({ context, data, ...rest } = {}) {
    const res = await fetcher(apiConfig.schoolYear.getDetail, {
        context,
        pathParams: data,
        ...rest,
    });

    return res?.data;
}
