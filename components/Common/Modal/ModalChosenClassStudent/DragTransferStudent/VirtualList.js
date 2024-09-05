import classNames from "classnames";
import List from "rc-virtual-list";

import Checkbox from "@/components/Common/Checkbox";
import NextLink from "@/components/Common/NextLink";
import { RoleBasedRenderer } from "@/components/Common/Permission";
import TextClamp from "@/components/Common/TextClamp";
import { ROLES_CODE } from "@/constants/constant";
import paths from "@/constants/paths";
import DagIcon from "@/public/icons/dots-six-vertical.svg";

import styles from "./DragTransferStudent.module.scss";

const VirtualList = ({
    data,
    setData,
    targetItem,
    disabled,
    onDragEnter,
    handleDragLeave,
    handleDragStart,
    height,
}) => {
    return (
        <>
            <List data={data} itemKey="id" itemHeight={10} height={height}>
                {(item, index, props) => {
                    return (
                        <label
                            htmlFor={`student-${item.id}`}
                            key={item?.id}
                            className={classNames(styles.tableRow, {
                                [styles.dragItem]: targetItem === item?.student?.id,
                                [styles.disabled]: disabled,
                            })}
                            onDragEnter={onDragEnter}
                            onDragLeave={handleDragLeave}
                            onDragStart={(e) => handleDragStart(e, item?.student?.id || item?.id)}
                            draggable={!disabled}
                        >
                            <div className={styles.action}>
                                <DagIcon />
                                <Checkbox
                                    id={`student-${item.id}`}
                                    disabled={disabled}
                                    checked={item?.selected}
                                    onChange={(e) => {
                                        item.selected = e.target.checked;
                                        setData([ ...data ]);
                                    }}
                                />
                            </div>
                            <div className={styles.studentCode}>
                                <TextClamp title={item?.student?.code || item?.code} lineClamp={1}>
                                    {item?.student?.code || item?.code}
                                </TextClamp>
                            </div>
                            <div className={styles.studentName}>
                                <RoleBasedRenderer
                                    components={[
                                        {
                                            roles: [ ROLES_CODE.ADMIN, ROLES_CODE.SUPER_ADMIN ],
                                            component: (
                                                <NextLink
                                                    nextLinkProps={{
                                                        target: "_blank",
                                                    }}
                                                    href={{
                                                        pathname: paths.userDetail,
                                                        query: {
                                                            id: item?.student?.id || item?.id,
                                                        },
                                                    }}
                                                >
                                                    {item?.student?.fullName || item?.fullName}
                                                </NextLink>
                                            ),
                                        },
                                        {
                                            component: (
                                                <span>
                                                    {item?.student?.fullName || item?.fullName}
                                                </span>
                                            ),
                                        },
                                    ]}
                                />
                                <span>{item?.student?.phone || item?.phone}</span>
                            </div>
                        </label>
                    );
                }}
            </List>
        </>
    );
};

export default VirtualList;
