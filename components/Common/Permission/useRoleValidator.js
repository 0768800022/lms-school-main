import { useCallback } from "react";

import { useAppContext } from "@/contexts";
import { roleValidator } from "@/utils/auth";

function useRoleValidator({ validator = roleValidator } = {}) {
    const { activeRole } = useAppContext();

    const validateRole = useCallback(
        (requiredRoles) => {
            return validator(activeRole, requiredRoles);
        },
        [ activeRole ],
    );

    return { validateRole, activeRole };
}

export default useRoleValidator;
