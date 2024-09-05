import Link from "next/link";
import { useRouter } from "next/router";

function NextLink({ children, href = "", nextLinkProps, className, skipQuery, ...props }) {
    const { query, pathname } = useRouter();

    const checkSkipQuery = () => {
        if (Array.isArray(skipQuery)) {
            return skipQuery.includes(pathname);
        }

        return skipQuery;
    };

    const getHref = () => {
        if (!checkSkipQuery()) {
            return href;
        }

        if (typeof href === "object") {
            return {
                ...href,
                query: {
                    ...query,
                    ...(href.query || {}),
                },
            };
        }

        return { pathname: href, query };
    };

    return (
        <Link {...nextLinkProps} href={getHref()} passHref>
            <div {...props} className={className}>
                {children}
            </div>
        </Link>
    );
}
export default NextLink;
