import cls from "classnames";

import Container from "../../Container";

import CategoryCard from "./CategoryCard";

import styles from "./CategoryPage.module.scss";

function CategoryPage({ items, className, classNames = {}, title }) {
    return (
        <Container className={cls(className, classNames.page)}>
            <h5 className={styles.title}>{title}</h5>
            <div className={cls(styles.cards, classNames.cards)}>
                {items.map((item, index) => (
                    <CategoryCard className={classNames.card} key={index} {...item} />
                ))}
            </div>
        </Container>
    );
}

CategoryPage.Card = CategoryCard;

export default CategoryPage;
