import React from "react";
import classNames from "classnames";

import Avatar from "./Avatar";

import style from "./Avatar.module.scss";
const HeadTeacherAvatar = ({ users }) => {
    return users?.length > 1 ? (
        <span className={classNames(style.userProfile, style.userProfileMulti)}>
            {users.length}
        </span>
    ) : (
        <Avatar user={users[0]} />
    );
};
export default HeadTeacherAvatar;
