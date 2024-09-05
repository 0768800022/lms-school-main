import { getIconPath } from "@/utils/common";

export function isImageFile(filename) {
    const imageExtensions = new Set([ "jpg", "jpeg", "png" ]);

    const extension = filename.split(".").pop().toLowerCase();

    return imageExtensions.has(extension);
}

export const getResourceIcon = (item = {}) => {
    if (isImageFile(item.name)) {
        return item.url;
    }

    return getIconPath(item?.name, item.type);
};

function ResourceIcon({ className, resource }) {
    return <img alt="resource icon" className={className} src={getResourceIcon(resource)} />;
}

export default ResourceIcon;
