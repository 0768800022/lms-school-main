import DropdownMenu from "@/components/Common/DropdownMenu/DropdownMenu";
import TextClamp from "@/components/Common/TextClamp";
import Tooltip from "@/components/Common/Tooltip";
import { TEACHER_TYPES } from "@/constants/constant";
import useTeacherClasses from "@/hooks/useTeacherClasses";
import IconArrowDown from "@/public/icons/arrow-down.svg";
import IconInfo from "@/public/icons/info-circle.svg";

import styles from "./SelectClass.module.scss";

function SelectClass() {
    const { classes, defaultClass, changeTeacherClass } = useTeacherClasses();

    if (!defaultClass) return null;

    return (
        <DropdownMenu
            className={styles.dropdown}
            align="start"
            trigger={
                <div className={styles.dropdownTarget}>
                    <div className={styles.targetContent}>
                        <div className={styles.selectedType}>{getClassType(defaultClass.type)}</div>
                        <TextClamp className={styles.selectedValue} fontSize="1.6rem" lineClamp={1}>
                            {defaultClass.name}
                        </TextClamp>
                    </div>
                    <div>
                        <IconArrowDown className={styles.iconArrowDown} />
                    </div>
                </div>
            }
        >
            <DropdownGroup
                type={TEACHER_TYPES.HEAD}
                data={classes?.headClassrooms}
                onItemClick={changeTeacherClass}
                selectedItem={defaultClass.id}
            />
            <DropdownGroup
                type={TEACHER_TYPES.SUBJECT}
                data={classes?.subjectClassrooms}
                onItemClick={changeTeacherClass}
                selectedItem={defaultClass.id}
            />
        </DropdownMenu>
    );
}

function getClassType(type) {
    return type === TEACHER_TYPES.HEAD ? "Lớp chủ nhiệm" : "Lớp bộ môn";
}

function DropdownGroup({ type, data, onItemClick, selectedItem }) {
    if (!data?.length) return null;

    return (
        <DropdownMenu.Group>
            <div className={styles.dropdownGroup}>{getClassType(type)}</div>
            {data.map((c) => (
                <DropdownMenu.Item
                    onClick={() => onItemClick(c.id)}
                    data-selected={c.id === selectedItem}
                    key={c.id}
                    className={styles.dropdownItem}
                >
                    <li>{c.name}</li>
                </DropdownMenu.Item>
            ))}
        </DropdownMenu.Group>
    );
}

function ClassInformation() {
    return (
        <Tooltip
            className={styles.tooltip}
            delayDuration={200}
            align="start"
            trigger={
                <Tooltip.Trigger>
                    <div>
                        <IconInfo className={styles.iconInfo} />
                    </div>
                </Tooltip.Trigger>
            }
        >
            <div className={styles.tooltipTitle}>Thông tin lớp [Tên lớp học]</div>
            <div className={styles.tooltipContent}>
                <div className={styles.tooltipLabel}>Chi nhánh</div>
                <div className={styles.tooltipValue}>[Tên chi nhánh]</div>

                <div className={styles.tooltipLabel}>Khối lớp</div>
                <div className={styles.tooltipValue}>[Tênkhối lớp]</div>

                <div className={styles.tooltipLabel}>Giáo viên chủ nhiệm</div>
                <div className={styles.tooltipValue}>
                    <div>[Tên GVCN 1]</div>
                    <div>[Tên GVCN 1] [Tên GVCN 1] [Tên GVCN 1] [Tên GVCN 1] [Tên GVCN 1]</div>
                </div>
            </div>
        </Tooltip>
    );
}

export default SelectClass;
