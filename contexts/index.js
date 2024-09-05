import createCtx from "@/utils/create-ctx";

import QueryProvider from "./QueryProvider";

const [ AppProvider, useAppContext ] = createCtx("AppProvider");

export { AppProvider, QueryProvider, useAppContext };
