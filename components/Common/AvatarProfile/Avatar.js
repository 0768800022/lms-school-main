import React from "react";

import style from "./Avatar.module.scss";
const Avatar = ({ user }) => {
    return user?.avatar ? (
        <img src={user.avatar} className={style.avatar} />
    ) : (
        <span className={style.userProfile}>
            {[ user?.lastName?.slice(0,1), user?.firstName?.slice(0,1) ].filter((item) => item).join("")}
        </span>
    );
};
export default Avatar;
