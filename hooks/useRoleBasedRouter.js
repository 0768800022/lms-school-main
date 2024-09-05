import { useRouter } from "next/router";

import { useAppContext } from "@/contexts";
import { roleValidator } from "@/utils/auth";

function useRoleBasedRouter({ validator } = {}) {
    const { activeRole } = useAppContext();
    const { push: _push, replace: _replace, ...rest } = useRouter();

    const getRoleBasedUrl = (urls = []) => {
        const validatorFunc = validator || roleValidator;
        const { roles, ...url } = urls.find(({ roles }) => validatorFunc(activeRole, roles));

        return url;
    };

    const push = (urls, asPath, options) => _push(getRoleBasedUrl(urls), asPath, options);

    const replace = (urls, asPath, options) => _replace(getRoleBasedUrl(urls), asPath, options);

    return { push, replace, ...rest };
}

export default useRoleBasedRouter;
