import apiConfig from "./config";
import fetcher from "./fetcher";

export async function getTeachersAssign({ context, data, ...rest  }) {
    const res = await fetcher(apiConfig.allocate.getListTeacher, {
        context,
        params: data,
        ...rest,
    });

    return res?.data;
}

export async function getPeriodAmountAllocation({ context, data, ...rest  }) {
    const res = await fetcher(apiConfig.periodAmountAllocation.getList, {
        context,
        params: data,
        ...rest,
    });

    return res?.data;
}

export async function assignHeadTeacher({ context, data }) {
    const res = await fetcher(apiConfig.allocate.allocateHeadTeacher, {
        context,
        data,
    });

    return res?.data;
}

export async function assignSubjectTeacher({ context, data }) {
    const res = await fetcher(apiConfig.allocate.allocateSubjectTeacher, {
        context,
        data,
    });

    return res?.data;
}

export async function assignPeriod({ context, data }) {
    const res = await fetcher(apiConfig.allocate.allocatePeriod, {
        context,
        data,
    });

    return res?.data;
}

export async function allocatePeriod({ context, data }) {
    const res = await fetcher(apiConfig.periodAmountAllocation.allocatePeriod, {
        context,
        data,
    });

    return res?.data;
}


export async function assignTimeTable({ context, data }) {
    const res = await fetcher(apiConfig.timetableValues.create, {
        context,
        data,
    });

    return res?.data;
}
export async function assignTimeTableFullYear({ context, data }) {
    const res = await fetcher(apiConfig.timetableValues.applyFullYear, {
        context,
        data,
    });

    return res?.data;
}
export async function assignTimeTableNote({ context, data }) {
    const res = await fetcher(apiConfig.timetableValueWeekNote.create, {
        context,
        data,
    });

    return res?.data;
}

export async function assignTimeTableUpdateNote({ context, data }) {
    const res = await fetcher(apiConfig.timetableValueWeekNote.update, {
        context,
        data,
    });

    return res?.data;
}
