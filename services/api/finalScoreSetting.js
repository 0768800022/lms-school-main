import apiConfig from "./config";
import fetcher from "./fetcher";

export async function getSettingPointDisableSubject({ context, data, ...rest } = {}) {
    try {
        const res = await fetcher(apiConfig.settingPoint.getDisableSubject, {
            context,
            pathParams: data,
            ...rest,
        });
        return res?.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}
