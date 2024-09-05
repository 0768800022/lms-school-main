import { useQuery } from "@tanstack/react-query";
import { useAppContext } from "@/contexts";
import apiConfig from "@/services/api/config";
import fetcher from "@/services/api/fetcher";
import { commonStatus } from "@/constants/constant";

function useBranch(placeholder) {
    const { defaultBranch } = useAppContext();

    const { data, error, isFetching } = useQuery({
        queryKey: [ apiConfig.branch.autocomplete.url ],
        queryFn: async () => {
            const { data } = await fetcher(apiConfig.branch.autocomplete, {
                params: { status: commonStatus.ACTIVE },
            });
            return data?.data?.map((item) => ({ value: item.id, label: item.name, ...item }));
        },
        staleTime: Infinity,
        meta: {
            onError: (error) => {
                console.error("Error fetching branches data:", error);
            },
        },
        placeholderData: { data: placeholder || [] },
    });

    return { branches: data, defaultBranch, error, isFetching };
}

export default useBranch;
