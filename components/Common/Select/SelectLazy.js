import { useEffect, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { useDebounce } from "@/hooks/useDebounce";
import { removeAccents } from "@/utils/common";
import { delayResult } from "@/utils/delay-result";

import { RiseLoader } from "../Loading";

import Select from "./Select";

const Loading = ({ onLoad }) => {
    useEffect(() => {
        try {
            onLoad();
        } catch (err) {
            console.log({ err });
        }
    }, []);

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <RiseLoader />
        </div>
    );
};

function SelectLazy({
    options = [],
    fetcherFilter,
    size = 10,
    value,
    fetcher,
    filterOption = () => true,
    excludesId = [],
    mappingData = (data) =>
        data?.map((item) => {
            item.value = item.id;
            item.label = item.name;

            return item;
        }),
    ...props
}) {
    const defaultOptions = useMemo(() => [], [ value ]);
    const [ _excludesId, setExcludesId ] = useState([ ...excludesId ]);
    const [ search, setSearch ] = useState("");
    const [ page, setPage ] = useState(0);
    const [ canLoad, setCanLoad ] = useState(true);
    const [ _options, setOptions ] = useState(options);
    const queryClient = useQueryClient();

    const searchDebounce = useDebounce(search);

    const fetchData = ({ signal }) => {
        if (!fetcher || !canLoad) return;
        try {
            return delayResult(
                fetcher({
                    data: {
                        ...fetcherFilter,
                        search: searchDebounce,
                        excludesId: _excludesId.join(","),
                        size,
                        page,
                    },
                    signal,
                }),
                300,
            )
                .then((res) => res.data)
                .then((res) => res.content)
                .then(mappingData)
                .then((data) => {
                    if (!data?.length || data?.length < size) {
                        setCanLoad(false);

                        if (!data?.length) {
                            return [];
                        }
                    }
                    // setOptions([ ..._options, ...data ]);
                    return data;
                });
        } catch (err) {
            console.log({ err });
            setCanLoad(false);
            return [];
        }
    };

    const handleLoadmore = async () => {
        const newOptions = await queryClient.fetchQuery({
            queryKey: [
                "select-lazy",
                JSON.stringify(value),
                page,
                searchDebounce,
                _excludesId,
            ],
            queryFn: fetchData,
            staleTime: Infinity,
            onError: (error) => {
                console.error("Error fetching select data:", error);
            },
        });

        if (newOptions?.length > 0 && !newOptions?.filter((option => filterOption(option, value)))?.length) {
            setPage(page + 1);
            return;
        }

        if (!newOptions?.length) {
            setCanLoad(false);
            return;
        }

        setOptions(
            (_options?.length > 0
                ? [ ..._options, ...newOptions ]
                : [ ...defaultOptions, ..._options, ...newOptions ]
            ).filter((option) =>
                typeof option.label === "string" && searchDebounce
                    ? removeAccents(option.label).indexOf(removeAccents(searchDebounce)) >= 0
                    : true,
            ),
        );
        setPage(page + 1);
    };

    const handleSearch = (value) => {
        setSearch(value);
    };

    useEffect(() => {
        if (value) {
            const newValue = [];
            if (Array.isArray(value)) {
                if (!value?.length) return;
                setExcludesId([ ..._excludesId, ...value ]);
                newValue.push(
                    ...value.filter((v) => !_options?.map((option) => option.value)?.includes(v)),
                );
            } else {
                setExcludesId([ ..._excludesId, value ]);
                if (!_options?.map((option) => option.value)?.includes(value)) {
                    newValue.push(value);
                }
            }

            if (!newValue?.length) {
                return;
            }

            queryClient
                .fetchQuery({
                    queryKey: [
                        "select-lazy",
                        value,
                        page,
                        searchDebounce,
                        _excludesId,
                    ],
                    queryFn: () =>
                        fetcher({
                            data: {
                                branchId: fetcherFilter?.branchId,
                                ids: newValue?.join(","),
                            },
                        }),
                    staleTime: Infinity,
                    onError: (error) => {
                        console.error("Error fetching select data:", error);
                    },
                })
                .then((res) => res.data)
                .then((res) => res.content)
                .then(mappingData)
                .then((data) => {
                    if (!data?.length) {
                        return;
                    }
                    defaultOptions.push(...data);
                    setOptions([ ...data, ..._options ]);
                });
        }
    }, [ value ]);

    useEffect(() => {
        setCanLoad(true);
        setPage(0);
        if (searchDebounce) {
            setOptions([]);
        } else {
            setOptions([ ...defaultOptions ]);
        }
    }, [ searchDebounce ]);

    return (
        <Select
            {...props}
            onDropdownVisibleChange={() => {
                setSearch("");
            }}
            value={value}
            filterOption={() => true}
            onSearch={handleSearch}
            options={
                canLoad
                    ? [
                        ..._options.filter((option => filterOption(option, value))),
                        {
                            label: <Loading key={page} onLoad={handleLoadmore} />,
                        },
                    ]
                    : _options.filter((option => filterOption(option, value)))
            }
        />
    );
}

export default SelectLazy;
