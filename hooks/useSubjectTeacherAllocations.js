import { useCallback, useState } from "react";
import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";

import { getTeachersAssign } from "@/services/api/assign";
import apiConfig from "@/services/api/config";
import { getPeriodAutoComplete } from "@/services/api/period";
import { getSubjectTeacherAllocationsAutoComplete } from "@/services/api/subject";

function useSubjectTeacherAllocations({ branchId, gradeId, kinds, schoolYearId,classroomId, queryOptions } = {}) {
    const {
        data: assigns,
        isFetching: isAssignLoading,
        refetch: fetchTeacherAssigns,
    } = useQuery({
        queryKey: [
            apiConfig.allocate.getListTeacher.url,
            { branchId, gradeId, kinds, schoolYearId,classroomId },
        ],
        staleTime: Infinity,
        enabled: !!branchId && !!gradeId && !!kinds && !!schoolYearId && !!classroomId,
        placeholderData: keepPreviousData,
        queryFn: async ({ queryKey }) => {
            const [ , payload ] = queryKey;

            const { data } = await getTeachersAssign({
                data: payload,
            });

            return data;
        },
        ...queryOptions,
    });


    const {
        data: period,
        isFetching: isPeriodLoading,
        refetch: fetchPeriodAssigns,
    } = useQuery({
        queryKey: [
            apiConfig.period.autocomplete,
            { branchId, gradeId, kinds, schoolYearId,classroomId },
        ],
        staleTime: Infinity,
        enabled: !!branchId && !!gradeId && !!kinds && !!schoolYearId && !!classroomId,
        placeholderData: keepPreviousData,
        queryFn: async ({ queryKey }) => {
            const [ , payload ] = queryKey;

            const { data } = await getPeriodAutoComplete({
                data: payload,
            });

            return data;
        },
        ...queryOptions,
    });

    return {
        assigns,period,isAssignLoading
    };
}

export default useSubjectTeacherAllocations;
