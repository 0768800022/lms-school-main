import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { ALLOCATE_TYPES, commonStatus } from "@/constants/constant";
import { assignSubjectTeacher, getTeachersAssign } from "@/services/api/assign";
import { getClassAutoComplete } from "@/services/api/grade";
import { getSubjectAutoComplete } from "@/services/api/subject";

function useSubjectTeacherAssign() {
    const [ teachersAssign, setTeachersAssign ] = useState({});

    const { isPending: teachersAssignLoading, mutate: fetchTeachersAssign } = useMutation({
        mutationKey: [ "getSubjectTeachersAssign" ],
        mutationFn: async (payload = {}) => {
            const defaultPayload = {
                ...payload,
                status: commonStatus.ACTIVE,
            };
            const [ { data: classes }, { data: subjects }, { data: assigns } ] = await Promise.all([
                getClassAutoComplete({
                    data: defaultPayload,
                }),
                getSubjectAutoComplete({
                    data: defaultPayload,
                }),
                getTeachersAssign({
                    data: {
                        ...defaultPayload,
                        kinds: [ ALLOCATE_TYPES.SUBJECT, ALLOCATE_TYPES.ASSISTANT ],
                    },
                }),
            ]);

            const classesAssign = classes.reduce((acc, cur) => {
                if (!acc[cur.id]) {
                    acc[cur.id] = {
                        ...cur,
                    };
                }

                return acc;
            }, {});

            const returnValue = {
                classes: Object.values(classesAssign),
                assigns,
                subjects,
            };

            setTeachersAssign(returnValue);

            return returnValue;
        },
        onError: () => {
            setTeachersAssign({});
        },
    });

    const { mutate: mutateHeadTeacher } = useMutation({
        mutationFn: (data) => assignSubjectTeacher({ data }),
    });

    return { teachersAssign, teachersAssignLoading, mutateHeadTeacher, fetchTeachersAssign };
}

export default useSubjectTeacherAssign;
