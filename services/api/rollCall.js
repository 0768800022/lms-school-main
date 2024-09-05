import apiConfig from "./config";
import fetcher from "./fetcher";

export async function updateRollCall({ context, data }) {
    const res = await fetcher(apiConfig.rollCall.update, {
        context,
        data,
    });

    return res?.data;
}
export async function getRollCall({ context, data, ...rest } = {}) {
    const res = await fetcher(apiConfig.rollCall.getList, {
        context,
        params: data,
        ...rest,
    });

    return res?.data;
}
