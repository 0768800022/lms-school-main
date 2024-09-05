import { useQuery } from "@tanstack/react-query";

import { getRoles } from "@/services/api/common";

function useRole(placeholder) {
    const { data, error, isFetching } = useQuery({
        queryKey: [ "role" ],
        queryFn: getRoles,
        staleTime: Infinity,
        onError: (error) => {
            console.error("Error fetching roles data:", error);
        },
        placeholderData: { data: placeholder || [] },
        select: data => data?.data?.map(item => {
            item.value = item.code;
            item.label = item.name;

            return item;
        }),
    });

    return { roles: data, error, isFetching };
}

export default useRole;
