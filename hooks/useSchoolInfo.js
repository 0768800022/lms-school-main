import { useQuery } from "@tanstack/react-query";

import { getSchoolInfo } from "@/services/api/account";

const useSchoolInfo = () => {
    const { data, refetch, isFetching } = useQuery({
        queryKey: [ "logo" ],
        queryFn: getSchoolInfo,
        select: (res) => res.data,
        staleTime: Infinity,
    });
    return {
        schoolInfo: data,
        logo: data?.logo,
        loading: isFetching,
        refetch,
    };
};

export default useSchoolInfo;
