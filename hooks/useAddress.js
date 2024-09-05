import React, { useCallback, useEffect, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const fetcher = async (ids) => {
    return fetch(
        `${process.env.NEXT_PUBLIC_INTEGRATION_API_HOST}/integration/areas${ids ? "?ids=" + ids.join(",") : ""}`,
    ).then((res) => res.json());
};

const useAddress = (data = []) => {
    const [ uniqueIds, setUniqueIds ] = useState([]);

    useEffect(() => {
        if (data.length > 0) {
            const allIds = data.reduce((accumulator, currentItem) => {
                accumulator.add(currentItem.districtId);
                accumulator.add(currentItem.provinceId);
                accumulator.add(currentItem.wardId);
                return accumulator;
            }, new Set());
            setUniqueIds(Array.from(allIds));
        }
    }, [ data ]);

    const {
        data: addressData,
        isLoading,
        isError,
    } = useQuery({
        queryKey: [ "addresses", uniqueIds ],
        queryFn: () => fetcher(uniqueIds),
        placeholderData: keepPreviousData,
        staleTime: Infinity,
        enabled: uniqueIds.length > 0,
        select: (res) =>
            res.data.map((value) => ({
                ...value,
                value: value.id,
                label: value.name,
            })),
    });

    const getAddressObject = ({ wardId, provinceId, districtId }) => {
        return {
            ward: addressData?.find((item) => item.id === wardId) || "",
            province: addressData?.find((item) => item.id === provinceId) || "",
            district: addressData?.find((item) => item.id === districtId) || "",
        };
    };

    return {
        uniqueIds,
        addressData,
        isLoading,
        isError,
        getAddressObject,
    };
};

export default useAddress;
