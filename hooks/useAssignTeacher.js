import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";

import {
    allocatePeriod,
    assignHeadTeacher,
    assignPeriod,
    assignSubjectTeacher,
    getPeriodAmountAllocation,
} from "@/services/api/assign";
import apiConfig from "@/services/api/config";

function useAssignTeacher({ branchId, gradeId, kinds, schoolYearId, queryOptions } = {}) {
    const {
        data: assigns,
        isFetching: isAssignLoading,
        refetch: fetchTeacherAssigns,
    } = useQuery({
        queryKey: [
            apiConfig.periodAmountAllocation.getList.url,
            { branchId, gradeId, kinds, schoolYearId },
        ],
        staleTime: Infinity,
        enabled: !!branchId && !!gradeId && !!kinds && !!schoolYearId,
        placeholderData: keepPreviousData,
        queryFn: async ({ queryKey }) => {
            const [ , payload ] = queryKey;

            const { data } = await getPeriodAmountAllocation({
                data: payload,
            });

            return data;
        },
        ...queryOptions,
    });

    const { mutate: mutateHeadTeacher } = useMutation({
        mutationKey: [ apiConfig.allocate.allocateHeadTeacher ],
        mutationFn: async (data) => {
            const res = await assignHeadTeacher({ data });
            return res;
        },
        meta: {
            invalidates: [ apiConfig.allocate.getListTeacher.url ],
        },
    });

    const { mutate: mutateSubjectTeacher } = useMutation({
        mutationKey: [ apiConfig.allocate.allocateSubjectTeacher ],
        mutationFn: async (data) => {
            const res = await assignSubjectTeacher({ data });
            return res;
        },
        meta: {
            invalidates: [ apiConfig.allocate.getListTeacher.url ],
        },
    });

    const { mutate: mutatePeriod } = useMutation({
        mutationKey: [ apiConfig.periodAmountAllocation.allocatePeriod.url ],
        mutationFn: async (data) => {
            const res = await allocatePeriod({ data });
            return res;
        },
        meta: {
            invalidates: [ apiConfig.periodAmountAllocation.getList.url ],
        },
    });

    return {
        assigns,
        isAssignLoading,
        fetchTeacherAssigns,
        mutateHeadTeacher,
        mutateSubjectTeacher,
        mutatePeriod,
    };
}

export default useAssignTeacher;
