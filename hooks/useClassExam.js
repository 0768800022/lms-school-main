import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";

import paths from "@/constants/paths";
import { getClassExam } from "@/services/api/classExam";


const useClassExam = () => {
    const queryClient = useQueryClient();

    const fetchData = useCallback(({ name, subjectId, semesterId, useScore, examType, students, examState, classId }) => {
        try {
            if (!classId) {
                return {};
            }
            return getClassExam({
                data: { name, subjectId, semesterId, useScore, examType, students, examState, classId },
            })
                .then((res) => res.data);
        } catch (err) {
            console.log({ err });
            return {};
        }
    }, []);

    const getDataClassExam = async ({ name, subjectId, semesterId, useScore, examType, students, examState, classId }) => {
        return queryClient.fetchQuery({
            queryKey: [ paths.getClassExam ],
            queryFn: () =>
                fetchData({ name, subjectId, semesterId, useScore, examType, students, examState, classId }),
            staleTime: Infinity,
            onError: (error) => {
                console.error("Error fetching class exam data:", error);
            },
        });
    };

    return {
        getDataClassExam,
    };
};

export default useClassExam;
