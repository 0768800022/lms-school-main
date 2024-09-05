import React from "react";

import EyeOpen from "@/public/icons/eye.svg";
import EyeClose from "@/public/icons/eye-slash.svg";

export const PasswordToggleIcon = ({ reveal, ...props }) => {
    return reveal ? <EyeClose {...props} /> : <EyeOpen {...props} />;
};
