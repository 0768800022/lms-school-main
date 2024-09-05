import { useState } from "react";

import useNavigateConfirm from "@/hooks/useNavigateConfirm";

import ConfirmModal from "../ConfirmModal";

function ConfirmNavigateModal({ shouldStopNavigation = false, onNavigate: _onNavigate }) {
    const [ opened, setOpened ] = useState(false);

    const navigate = useNavigateConfirm({
        shouldStopNavigation,
        onNavigate: () => {
            setOpened(true);
            _onNavigate?.();
        },
    });

    return (
        <ConfirmModal
            open={opened}
            onCancel={() => setOpened(false)}
            onConfirm={navigate}
            title="Dữ liệu chưa được lưu"
            description="Dữ liệu đang thiết lập chưa được lưu, nếu thực hiện chuyển trang hoặc thoát khỏi trang, dữ liệu đang có sẽ không được lưu. Bạn có chắc chắc muốn thực hiện?"
            cancelText="Ở lại trang"
            confirmText="Rời khỏi trang"
        />
    );
}

export default ConfirmNavigateModal;
