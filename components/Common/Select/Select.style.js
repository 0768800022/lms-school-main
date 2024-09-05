export default {
    control: (baseStyles, state) => ({
        ...baseStyles,
        borderRadius: "0.8rem",
        border: state.isFocused
            ? "1px solid var(--primary-color)"
            : "1px solid rgba(138, 138, 160, 0.3)",
        boxShadow: "none",
        ":hover": {
            borderColor: state.isFocused ? "var(--primary-color)" : "rgba(138, 138, 160, 0.3)",
        },
    }),
    indicatorSeparator: (baseStyles) => ({
        ...baseStyles,
        display: "none",
    }),
    placeholder: (baseStyles, state) => ({
        ...baseStyles,
        transition: "all 0.2s",
        transform: (state.isFocused || state.hasValue) ? "translate(0, -80%)" : "none",
        color: (state.isFocused || state.hasValue) ? "var(--text-color)" : "#B8B8B8",
        fontSize: (state.isFocused || state.hasValue) ? "1.2rem" : "1.6rem",
        lineHeight: "1.8rem",
        fontWeight: 400,
    }),
    valueContainer: (baseStyles) => ({
        ...baseStyles,
        padding: "1rem 0rem 1rem 1.2rem",
        overflow: "visible",
    }),
    input: (baseStyles) => ({
        ...baseStyles,
        fontSize: "1.6rem",
    }),
    menu: (baseStyles) => ({
        ...baseStyles,
        borderRadius: "0px 0px 10px 10px",
        background: "#FFF",
        marginTop: "0.3rem",
        fontSize: "1.6rem",
        color: "#444",
        boxShadow: "0px 4px 8px 0px rgba(68, 68, 68, 0.16), 0px 0px 2px 0px rgba(68, 68, 68, 0.04)",
    }),
    menuList: (baseStyles) => ({
        ...baseStyles,
        padding: "1rem",
        paddingRight: 0,
        maxHeight: "20rem",
    }),
    option: (baseStyles, state) => {
        if (!state.isDisabled) {
            return {
                ...baseStyles,
                borderRadius: "1rem",
                color: "#444",
                padding: "1.2rem 1.6rem",
                backgroundColor: state.isSelected ? "#0095DA1A" : null,
                marginBottom: "0.5rem",
                cursor: "pointer",
                fontWeight: 500,

                ":active": {
                    backgroundColor: "#0095DA1A",
                },
                ":hover": {
                    backgroundColor: "#0095DA1A",
                },
            };
        } else {
            return baseStyles;
        }
    },
    singleValue: (baseStyles) => ({
        ...baseStyles,
        fontSize: "1.6rem",
        fontWeight: 500,
        color: "#444",
        overflow: "visible",
    }),
    dropdownIndicator: (baseStyles, state) => ({
        ...baseStyles,
        transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : "rotate(0deg)",
        paddingRight: state.selectProps.menuIsOpen ? "0.8rem" : "2rem",
        paddingLeft: state.selectProps.menuIsOpen ? "2rem" : "0.8rem",
    }),
};

export const primaryStyle = {
    control: (baseStyles, state) => ({
        ...baseStyles,
        borderRadius: "0.8rem",
        border: "1px solid var(--primary-color)",
        boxShadow: "none",
        ":hover": {
            borderColor: "var(--primary-color)",
        },
    }),
    placeholder: (baseStyles) => ({
        ...baseStyles,
        color: "var(--primary-color)",
        fontSize: "1.6rem",
        fontWeight: 500,
    }),
    singleValue: (baseStyles) => ({
        ...baseStyles,
        fontSize: "1.6rem",
        fontWeight: 500,
        color: "var(--primary-color)",
        overflow: "visible",
    }),
};

export const basePlaceholder = (baseStyles) => ({
    ...baseStyles,
    transition: "all 0.2s",
    color: "#c7c7c7",
    fontSize: "1.6rem",
    lineHeight: "1.8rem",
    fontWeight: 400,
});
