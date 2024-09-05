import classNames from "classnames";

import NextLink from "../../NextLink";

import styles from "./CategoryPage.module.scss";

const CategoryCard = ({ icon, label, bgColor, iconColor, path, className }) => (
    <NextLink href={path}>
        <div className={classNames(styles.card, className)} style={{ "--bg-color": bgColor }}>
            <div style={{ "--icon-color": iconColor }} className={styles.icon}>
                {icon}
            </div>
            <div className={styles.text}>{label}</div>
        </div>
    </NextLink>
);

export default CategoryCard;
