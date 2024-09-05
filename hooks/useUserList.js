import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";

import { renderCreateFetcher } from "@/services/api/common";
import apiConfig from "@/services/api/config";
import { getUsersAutocomplete } from "@/services/api/user";
import { delayResult } from "@/utils/delay-result";

const fetchData = ({ queryKey, signal }) =>
    delayResult(
        getUsersAutocomplete({
            data: queryKey[1],
            signal,
        }),
        300,
    ).then((res) => res.data);

function useUserList({ filter, mappingData = (res) => res }, ...rest) {
    const { data, isFetching, error, refetch } = useQuery({
        queryKey: [ "getUserList", filter ],
        queryFn: fetchData,
        staleTime: Infinity,
        select: mappingData,
        placeholderData: keepPreviousData,
        ...rest,
    });

    const { mutateAsync: createMutate, isPending: isPendingCreate } = useMutation({
        ...(apiConfig.user.createUser || {}),
        mutationKey: apiConfig.user.createUser.url,
        mutationFn: renderCreateFetcher(apiConfig.user.createUser),
    });

    const { mutateAsync: updateMutate, isPending: isPendingUpdate } = useMutation({
        ...(apiConfig.user.updateUser || {}),
        mutationKey: apiConfig.user.updateUser.url,
        mutationFn: renderCreateFetcher(apiConfig.user.updateUser),
        meta: {
            invalidates: [ apiConfig.classrooms.getList.url ],
        },
    });

    return {
        users: data,
        error,
        isFetching,
        refetch,
        createMutate,
        isPendingCreate,
        updateMutate,
        isPendingUpdate,
    };
}

export default useUserList;
