import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { ROLES_WEIGHT } from "@/constants/constant";
import { useAppContext } from "@/contexts";
import { getBranchRoles, getProfile } from "@/services/api/account";
import { logout } from "@/utils/auth";

function useAuth() {
    const { activeRole } = useAppContext();

    const { data, error, isFetching, refetch } = useQuery({
        queryKey: [ "user" ],
        queryFn: getProfile,
        staleTime: Infinity,
        onError: (error) => {
            console.error("Error fetching user data:", error);
        },
    });

    const user = data?.data;
    const userRoles = useMemo(() => {
        if (!user) return [];

        return user.roles.sort((a, b) => ROLES_WEIGHT[a.code] - ROLES_WEIGHT[b.code]);
    }, [ user ]);

    const {
        data: branchRoles,
        error: errorBranchRoles,
        isFetching: isFetchingBranchRoles,
        refetch: refetchBranchRoles,
    } = useQuery({
        queryKey: [ "user_branches" ],
        queryFn: getBranchRoles,
        staleTime: Infinity,
        onError: (error) => {
            console.error("Error fetching branch role data:", error);
        },
    });

    return {
        user: user || {},
        userRoles,
        activeRole: userRoles?.find(({ code }) => code === activeRole),
        error,
        isFetching,
        logout,
        refetch,
        branchRoles: branchRoles?.data,
        errorBranchRoles,
        isFetchingBranchRoles,
        refetchBranchRoles,
    };
}

export default useAuth;
