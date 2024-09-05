import useRoleValidator from "./useRoleValidator";

function RoleBasedRenderer({ components = [], validator, fallback = null }) {
    const { activeRole, validateRole } = useRoleValidator({ validator });

    if (!activeRole) return fallback;

    const element = components.find(({ roles }) => validateRole(roles))?.component || fallback;

    return element;
}

export default RoleBasedRenderer;
