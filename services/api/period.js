import apiConfig from "./config";
import fetcher from "./fetcher";

export async function getPeriodAutoComplete({ context, data, ...rest } = {}) {
    const res = await fetcher(apiConfig.period.autocomplete, {
        context,
        params: data,
        ...rest,
    });

    return res?.data;
}
