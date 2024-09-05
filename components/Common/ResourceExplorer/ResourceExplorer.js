import { forwardRef, useState } from "react";
import cls from "classnames";

import Empty from "@/components/Common/Empty/Empty";
import useMyResource, { useMyResourceBreadcrumb } from "@/hooks/useMyResource";
import useUncontrolled from "@/hooks/useUncontrolled";
import { includesIgnoreAccents } from "@/utils/common";

import ResourceBreadcrumb from "./ResourceBreadcrumb";
import ResourceItem from "./ResourceItem";

import styles from "./ResourceExplorer.module.scss";

const List = forwardRef(function List(
    { emptyContent, renderItem, data, isLoading, className, classNames = {}, ...props },
    ref,
) {
    const empty = emptyContent ?? <Empty label="Tài liệu trống" />;

    return (
        <div
            {...props}
            ref={ref}
            className={cls(styles.listWrapper, className, classNames.wrapper)}
        >
            {/* {isLoading && <div className={classNames.loading}>Loading...</div>} */}
            {!isLoading && !data?.length && empty}
            {!!data?.length && (
                <div className={cls(styles.list, classNames.list)}>{data?.map(renderItem)} </div>
            )}
        </div>
    );
});

function ResourceExplorer({ onSelectResource, onOpenResource, selectedResource, searchText }) {
    const [ selected, onSelected ] = useUncontrolled({
        value: selectedResource,
        onChange: onSelectResource,
        defaultValue: {},
    });
    const [ parentId, setParentId ] = useState();

    const { resources, isResourcesLoading } = useMyResource({ parentId, folderId: parentId });
    const { breadcrumbs } = useMyResourceBreadcrumb({ folderId: parentId });

    let breadcrumbsData = [ { label: "Tài nguyên của tôi" } ];
    if(parentId) {
        breadcrumbsData = breadcrumbsData.concat(breadcrumbs || []);
    }

    const filteredResources = resources?.filter((item) =>
        includesIgnoreAccents(item.name, searchText),
    );

    return (
        <div className={styles.resourceExplorer}>
            <ResourceBreadcrumb
                data={breadcrumbsData}
                onNavigate={({ id }) => {
                    setParentId(id);
                    onSelected(null);
                }}
            />
            <List
                data={filteredResources}
                isLoading={isResourcesLoading}
                renderItem={(item) => (
                    <ResourceItem
                        classNames={{ item: styles.item }}
                        key={item.id}
                        data={item}
                        data-selected={selected?.type && selected?.id === item.id}
                        onSelect={(item) => {
                            onSelected(item);
                        }}
                        onOpen={(item) => {
                            if (item.type) return;

                            onSelected(null);
                            setParentId(item.id);
                            onOpenResource(item);
                        }}
                    />
                )}
            />
        </div>
    );
}

ResourceExplorer.List = List;
ResourceExplorer.Item = ResourceItem;
ResourceExplorer.Breadcrumb = ResourceBreadcrumb;

export default ResourceExplorer;
