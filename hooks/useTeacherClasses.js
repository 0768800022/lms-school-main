import { useQuery } from "@tanstack/react-query";

import { ROLES_CODE, TEACHER_TYPES } from "@/constants/constant";
import { useAppContext } from "@/contexts";
import apiConfig from "@/services/api/config";
import { getTeacherClasses } from "@/services/api/teachers";

export default function useTeacherClasses(config) {
    const { defaultClassId, changeTeacherClass, activeRole } = useAppContext();

    const {
        data: classes,
        refetch: fetchClasses,
        isFetching: isLoading,
    } = useQuery({
        queryKey: [ apiConfig.teachers.getMyClasses.url ],
        queryFn: ({ signal }) => getTeacherClasses({ signal }),
        enabled: activeRole === ROLES_CODE.TEACHER,
        ...config,
    });

    return {
        classes,
        isLoading,
        defaultClass: getDefaultClass(classes, defaultClassId),
        changeTeacherClass,
        fetchClasses,
    };
}

function getDefaultClass(classes, defaultClassId) {
    if (!classes) return;

    const defaultHeadClassrooms = classes?.headClassrooms?.find((c) => c.id == defaultClassId);
    if (defaultHeadClassrooms) {
        return {
            ...defaultHeadClassrooms,
            type: TEACHER_TYPES.HEAD,
        };
    }

    const defaultSubjectClassrooms = classes?.subjectClassrooms?.find(
        (c) => c.id == defaultClassId,
    );
    if (defaultSubjectClassrooms) {
        return {
            ...defaultSubjectClassrooms,
            type: TEACHER_TYPES.SUBJECT,
        };
    }
}
