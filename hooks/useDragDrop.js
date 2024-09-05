import { useEffect, useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { renderUpdateFetcher } from "@/services/api/common";

const sortColumn = {
    key: "sort",
    align: "center",
    width: 30,
};

function useDragDrop({ data = [], apiConfig, setTableLoading, indexField, idField = "id" }) {
    const [ sortedData, setSortedData ] = useState(
        (data.length > 0 && data.sort((a, b) => a?.[indexField] - b?.[indexField])) || [],
    );
    // console.log(data);
    // console.log(sortedData);
    const { mutate: updateSort, isPending: isPendingCreate } = useMutation({
        mutationKey: apiConfig?.updateSort?.path,
        mutationFn: renderUpdateFetcher(apiConfig?.updateSort),
        meta: {
            invalidates: [ apiConfig?.getList?.url ],
        },
    });
    const onDragEnd = ({ active, over }) => {
        if (active.id !== over?.id) {
            setSortedData((prevState) => {
                const activeIndex = prevState.findIndex((record) => record.id === active?.id);
                const overIndex = prevState.findIndex((record) => record.id === over?.id);
                const returnArray = arrayMove(prevState, activeIndex, overIndex);
                handleUpdate(returnArray);
                return returnArray;
            });
        }
    };

    const handleUpdate = (data = [], selectedOrdering) => {
        let dataUpdate = [];
        const sortList = data.length > 0 ? data : sortedData;
        if (typeof selectedOrdering === "number") {
            sortList.map((item, index) => {
                index++;
                if (index > selectedOrdering) {
                    index++;
                    dataUpdate.push({
                        [idField]: item.id,
                        [indexField]: index,
                    });
                }
            });
        } else {
            sortList.map((item, index) => {
                dataUpdate.push({
                    [idField]: item.id,
                    [indexField]: index + 1,
                });
            });
        }

        updateSort([ ...dataUpdate ], {
            onSuccess: () => {
                toast.success("Cập nhật vị trí thành công");
            },
            onError: (err) => {
                toast.error("Cập nhật vị trí thất bại");
            },
        });
    };

    useEffect(() => {
        if (data) setSortedData(data);
        else setSortedData([]);
    }, [ data ]);

    return { sortedData, onDragEnd, sortColumn, handleUpdate, loading: isPendingCreate };
}

export default useDragDrop;
