import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";

const fetcher = async (parentId) => {
    return fetch(
        `${process.env.NEXT_PUBLIC_INTEGRATION_API_HOST}/integration/areas${parentId ? "?parentId=" + parentId : ""}`,
    ).then((res) => res.json());
};

function useArea() {
    const [ province, setProvince ] = useState("");
    const [ district, setDistrict ] = useState("");

    const fetchData = useCallback(({ parentId }) => fetcher(parentId).then(res => res.data), [ ]);

    const {
        data: provinces,
        error: errorProvince,
        isFetching: fetchingProvince,
    } = useQuery({
        queryKey: [ "province" ],
        queryFn: fetchData,
        staleTime: Infinity,
        placeholderData: keepPreviousData,
        select: (res) =>
            res.map((value) => ({
                ...value,
                value: value.id,
                label: value.name,
            })),
    });

    const {
        data: districts,
        error: errorDistrict,
        isFetching: fetchingDistrict,
    } = useQuery({
        queryKey: [ province ],
        queryFn: () => fetchData({ parentId: province }),
        staleTime: Infinity,
        enabled: Boolean(province),
        select: (res) =>
            res.map((value) => ({
                ...value,
                value: value.id,
                label: value.name,
            })),
    });

    const {
        data: wards,
        error: errorWard,
        isFetching: fetchingWard,
    } = useQuery({
        queryKey: [ district ],
        queryFn: () => fetchData({ parentId: district }),
        enabled: Boolean(district),
        staleTime: Infinity,
        select: (res) =>
            res.map((value) => ({
                ...value,
                value: value.id,
                label: value.name,
            })),
    });

    const changeProvince = (newProvince) => {
        setDistrict("");
        setProvince(newProvince);
    };

    const changeDistrict = (newDistrict) => {
        setDistrict(newDistrict);
    };

    const changeBranch = (newBranch) => {
        setBranch(newBranch);
    };

    return {
        provinces,
        districts,
        wards,
        changeProvince,
        changeDistrict,
        changeBranch,
        errorProvince,
        fetchingProvince,
        errorDistrict,
        fetchingDistrict,
        errorWard,
        fetchingWard,
    };
}

export default useArea;
