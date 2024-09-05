import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { ALLOCATE_TYPES } from "@/constants/constant";
import { assignHeadTeacher, getTeachersAssign } from "@/services/api/assign";
import { getClassAutoComplete } from "@/services/api/grade";

function useHeadTeacherAssign() {
    const [ teachersAssign, setTeachersAssign ] = useState([]);

    const { isPending: teachersAssignLoading, mutate: fetchTeachersAssign } = useMutation({
        mutationKey: [ "getHeadTeachersAssign" ],
        mutationFn: async (payload) => {
            const [ { data: classes }, { data: teachersAssign } ] = await Promise.all([
                getClassAutoComplete({
                    data: payload,
                }),
                getTeachersAssign({
                    data: {
                        ...payload,
                        kinds: ALLOCATE_TYPES.HEAD,
                    },
                }),
            ]);

            const classesAssign = classes.reduce((acc, cur) => {
                if (!acc[cur.id]) {
                    acc[cur.id] = {
                        ...cur,
                        assign: [],
                    };
                }
                return acc;
            }, {});

            const result = teachersAssign.reduce((acc, cur) => {
                if (!acc[cur.classroomId]?.assign) {
                    acc[cur.classroomId].assign = [];
                }

                acc[cur.classroomId].assign.push(cur.teacherId);

                return acc;
            }, classesAssign);

            setTeachersAssign(Object.values(result));

            return Object.values(result);
        },
        onError: () => {
            setTeachersAssign([]);
        },
    });

    const { mutate: mutateHeadTeacher } = useMutation({
        mutationFn: (data) => assignHeadTeacher({ data }),
    });

    return { teachersAssign, teachersAssignLoading, mutateHeadTeacher, fetchTeachersAssign };
}

export default useHeadTeacherAssign;
