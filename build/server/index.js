import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer, useNavigate, useLocation, useSearchParams, Meta, Links, Outlet, ScrollRestoration, Scripts } from "@remix-run/react";
import * as isbotModule from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useDispatch, useSelector, Provider } from "react-redux";
import { createSlice, combineReducers, configureStore } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createContext, Component, useState, useEffect, useContext } from "react";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  let prohibitOutOfOrderStreaming = isBotRequest(request.headers.get("user-agent")) || remixContext.isSpaMode;
  return prohibitOutOfOrderStreaming ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function isBotRequest(userAgent) {
  if (!userAgent) {
    return false;
  }
  if ("isbot" in isbotModule && typeof isbotModule.isbot === "function") {
    return isbotModule.isbot(userAgent);
  }
  if ("default" in isbotModule && typeof isbotModule.default === "function") {
    return isbotModule.default(userAgent);
  }
  return false;
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
const initialState = {
  items: [],
  pageData: {},
  currentPage: 1
};
const selectedSlice = createSlice({
  name: "selected",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item2) => item2.id !== action.payload);
    },
    resetItems: (state) => {
      state.items = [];
      state.pageData = {};
    },
    setPageData: (state, action) => {
      const { page, data } = action.payload;
      state.pageData[page] = data;
      state.currentPage = page;
    }
  }
});
const { addItem, removeItem, resetItems, setPageData } = selectedSlice.actions;
const selectedReducer = selectedSlice.reducer;
const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://swapi.dev/api/" }),
  endpoints: (builder) => ({
    getPeople: builder.query({
      query: ({ page, search }) => {
        let request = `people/?page=${page}`;
        if (search.trim()) {
          const searchTerm = encodeURIComponent(search.trim());
          request = `people/?search=${searchTerm}&page=${page}`;
        }
        return request;
      },
      async onQueryStarted({ page, search }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setPageData({ page, data: data.results }));
        } catch (error) {
          console.error(error, search);
        }
      }
    })
  })
});
const { useGetPeopleQuery } = api;
const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  selected: selectedReducer
});
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
});
const defaultValue = {
  darkMode: false,
  handleDarkMode: () => {
  }
};
const ThemeContext = createContext(defaultValue);
const error_info = "_error_info_1s0b4_1";
const cls$9 = {
  error_info
};
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return /* @__PURE__ */ jsxs("div", { className: cls$9.error_info, children: [
        /* @__PURE__ */ jsx("h1", { style: { color: "red" }, children: "YEAH, YOU BROKE IT, GREAT JOB" }),
        /* @__PURE__ */ jsx("h2", { children: "Info:" }),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("p", { children: String(this.state.error) }) })
      ] });
    }
    return this.props.children;
  }
}
const useLocalStorage = () => {
  const getInitialQuery = () => {
    if (typeof window !== "undefined") {
      const savedQuery = window.localStorage.getItem("searchTerm");
      return savedQuery ? savedQuery : "";
    }
    return "";
  };
  const [data, setData] = useState(getInitialQuery());
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("searchTerm", data);
    }
  }, [data]);
  return [data, setData];
};
const search__list = "_search__list_snsj8_1";
const cls$8 = {
  search__list
};
const search__listItem = "_search__listItem_16s4g_1";
const search__listItemInfo = "_search__listItemInfo_16s4g_33";
const checkbox = "_checkbox_16s4g_57";
const cls$7 = {
  search__listItem,
  search__listItemInfo,
  checkbox
};
const useAppDispatch = () => useDispatch();
const useAppSelector = useSelector;
const Card = ({ id, gender, birth_year, height, name }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const selectedItems = useAppSelector((state) => state.selected.items);
  const isSelected = selectedItems.some((item2) => item2.id === id);
  const handleClick = () => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.set("details", id);
    navigate(`${location.pathname}?${queryParams.toString()}`, { replace: true });
  };
  const handleCheckboxChange = (e) => {
    const item2 = { id, gender, birth_year, height, name, eye_color: "", hair_color: "", homeworld: "", mass: "", skin_color: "", url: "" };
    if (e.target.checked) {
      dispatch(addItem(item2));
    } else {
      dispatch(removeItem(id));
    }
  };
  return /* @__PURE__ */ jsxs("div", { onClick: handleClick, className: cls$7.search__listItem, children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "checkbox",
        className: cls$7.checkbox,
        checked: isSelected,
        onChange: handleCheckboxChange,
        onClick: (e) => e.stopPropagation()
      }
    ),
    /* @__PURE__ */ jsx("div", { children: name }),
    /* @__PURE__ */ jsxs("ul", { className: cls$7.search__listItemInfo, children: [
      /* @__PURE__ */ jsxs("li", { children: [
        "Gender: ",
        gender
      ] }),
      /* @__PURE__ */ jsxs("li", { children: [
        "Birth Year: ",
        birth_year
      ] }),
      /* @__PURE__ */ jsxs("li", { children: [
        "Height: ",
        height
      ] })
    ] })
  ] });
};
const getIdFromUrl = (url) => {
  const parts = url.split("/");
  return parts[parts.length - 2];
};
const CardList = ({ results }) => {
  if (results && results.length === 0) {
    return /* @__PURE__ */ jsx("div", { children: "No results" });
  }
  return /* @__PURE__ */ jsx("div", { className: cls$8.search__list, children: results.map((item2, index) => /* @__PURE__ */ jsx(
    Card,
    {
      id: getIdFromUrl(item2.url),
      gender: item2.gender,
      height: item2.height,
      birth_year: item2.birth_year,
      name: item2.name
    },
    index
  )) });
};
const wrapper = "_wrapper_1iwkg_1";
const section$1 = "_section_1iwkg_15";
const bottom = "_bottom_1iwkg_29";
const cls$6 = {
  wrapper,
  section: section$1,
  bottom
};
const pageCounter = (total) => {
  return Math.ceil(total / 10);
};
const getPaginationNumbers = (pages) => {
  const arr = [];
  for (let i = 0; i < pages; i++) {
    arr.push(i + 1);
  }
  return arr;
};
const pagination = "_pagination_1cku0_1";
const item = "_item_1cku0_27";
const item_current = "_item_current_1cku0_43";
const item_inactive = "_item_inactive_1cku0_53";
const cls$5 = {
  pagination,
  item,
  item_current,
  item_inactive
};
const Pagination = ({ pagesArr, currPage, setPage, next, previous }) => {
  const handlePrev = () => {
    if (previous) {
      const prevPage = currPage - 1;
      setPage(prevPage);
    }
  };
  const handleNext = () => {
    if (next) {
      const nextPage = currPage + 1;
      setPage(nextPage);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: cls$5.pagination, children: [
    /* @__PURE__ */ jsx("div", { onClick: handlePrev, className: previous ? `${cls$5.item}` : `${cls$5.item} ${cls$5.item_inactive}`, children: "PREV" }),
    pagesArr.map((page) => /* @__PURE__ */ jsxs(
      "div",
      {
        onClick: () => setPage(page),
        className: currPage === page ? `${cls$5.item} ${cls$5.item_current}` : `${cls$5.item}`,
        children: [
          " ",
          page,
          " "
        ]
      },
      page
    )),
    /* @__PURE__ */ jsx("div", { onClick: handleNext, className: next ? `${cls$5.item}` : `${cls$5.item} ${cls$5.item_inactive}`, children: "NEXT" })
  ] });
};
const section = "_section_1saif_1";
const top = "_top_1saif_13";
const searchBlock = "_searchBlock_1saif_25";
const buttonsOptions = "_buttonsOptions_1saif_35";
const cls$4 = {
  section,
  top,
  searchBlock,
  buttonsOptions
};
const button = "_button_16ur0_1";
const cls$3 = {
  button
};
const ButtonCustom = ({ children, type, ...rest }) => {
  return /* @__PURE__ */ jsx("button", { className: type ? `${cls$3.button} ${type}` : cls$3.button, ...rest, children });
};
const label = "_label_g1yiv_1";
const input = "_input_g1yiv_13";
const cls$2 = {
  label,
  input
};
const InputCustom = ({ name, label: label2, ...rest }) => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("label", { htmlFor: name, className: cls$2.label, children: label2 ? label2 : "" }),
    /* @__PURE__ */ jsx("input", { className: cls$2.input, ...rest })
  ] });
};
const Search = ({ search, handleSearch, handleFetch }) => {
  const handleChange = (event) => {
    handleSearch(event);
  };
  const { darkMode, handleDarkMode } = useContext(ThemeContext);
  return /* @__PURE__ */ jsxs("div", { className: `${cls$4.section} ${cls$4.top}`, children: [
    /* @__PURE__ */ jsxs("div", { className: cls$4.searchBlock, children: [
      /* @__PURE__ */ jsx("label", { htmlFor: "search", children: "Mindvan" }),
      /* @__PURE__ */ jsx(InputCustom, { id: "search", name: "search", placeholder: "Type something", onChange: handleChange, type: "search", value: search }),
      /* @__PURE__ */ jsx(ButtonCustom, { onClick: handleFetch, children: "Search" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: cls$4.buttonsOptions, children: /* @__PURE__ */ jsxs(ButtonCustom, { onClick: handleDarkMode, children: [
      "Switch to ",
      darkMode ? "Light" : "Dark",
      " Mode"
    ] }) })
  ] });
};
const flyout = "_flyout_g7b3i_1";
const flyoutBtns = "_flyoutBtns_g7b3i_39";
const cls$1 = {
  flyout,
  flyoutBtns
};
const Flyout = () => {
  const dispatch = useAppDispatch();
  const selectedItems = useAppSelector((state) => state.selected.items);
  const unselectAll = () => {
    dispatch(resetItems());
  };
  const downloadData = () => {
    if (selectedItems.length === 0) return;
    const csvHeader = Object.keys(selectedItems[0]).join(",") + "\n";
    const csvRows = selectedItems.map((item2) => Object.values(item2).join(",")).join("\n");
    const csvData = csvHeader + csvRows;
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    const nowDate = `${selectedItems.length}_people`;
    anchor.download = `${nowDate}.csv`;
    document.body.appendChild(anchor);
    anchor.click();
  };
  if (selectedItems.length === 0) return null;
  return /* @__PURE__ */ jsxs("div", { className: cls$1.flyout, children: [
    /* @__PURE__ */ jsx("span", { children: selectedItems.length === 1 ? "1 item is selected!" : `${selectedItems.length} items are selected!` }),
    /* @__PURE__ */ jsxs("div", { className: cls$1.flyoutBtns, children: [
      /* @__PURE__ */ jsx(ButtonCustom, { onClick: unselectAll, children: "Unselect all" }),
      /* @__PURE__ */ jsx(ButtonCustom, { onClick: downloadData, children: "Download" })
    ] })
  ] });
};
const details = "_details_1neoy_1";
const detailsContainer = "_detailsContainer_1neoy_35";
const backdrop = "_backdrop_1neoy_43";
const closeButton = "_closeButton_1neoy_65";
const cls = {
  details,
  detailsContainer,
  backdrop,
  closeButton
};
const DetailedCard = ({ details: details2 }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [detailsData, setDetailsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!details2) return;
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://swapi.dev/api/people/${details2}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setDetailsData({
          id: details2,
          name: data.name,
          birth_year: data.birth_year,
          eye_color: data.eye_color,
          gender: data.gender,
          hair_color: data.hair_color,
          height: data.height,
          homeworld: data.homeworld,
          mass: data.mass,
          skin_color: data.skin_color,
          url: data.url
        });
        setError(null);
      } catch (error2) {
        if (error2 instanceof Error) {
          setError(error2.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [details2]);
  const handleClose = () => {
    const query = new URLSearchParams(location.search);
    query.delete("details");
    navigate(`${location.pathname}?${query.toString()}`, { replace: true });
  };
  const handleOutside = (event) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };
  return /* @__PURE__ */ jsx("div", { children: details2 && /* @__PURE__ */ jsxs("div", { className: cls.detailsContainer, children: [
    /* @__PURE__ */ jsx("div", { className: cls.backdrop, onClick: handleOutside }),
    /* @__PURE__ */ jsxs("div", { className: cls.details, children: [
      loading ? /* @__PURE__ */ jsx("p", { children: "Loading details..." }) : detailsData ? /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { children: "Details info" }),
        /* @__PURE__ */ jsx("ul", { children: Object.keys(detailsData).map((key) => /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsxs("strong", { children: [
            key,
            ":"
          ] }),
          " ",
          detailsData[key]
        ] }, key)) })
      ] }) : /* @__PURE__ */ jsx("p", { children: error }),
      /* @__PURE__ */ jsx(ButtonCustom, { type: cls.closeButton, onClick: handleClose, children: "Close" })
    ] })
  ] }) });
};
const SearchApp = () => {
  const navigate = useNavigate();
  useLocation();
  const [searchParams] = useSearchParams();
  const pageParam = searchParams.get("page");
  const searchParam = searchParams.get("search");
  const details2 = searchParams.get("details");
  const initialPage = pageParam ? parseInt(pageParam, 10) : 1;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [search, setSearch] = useLocalStorage();
  const [queryString, setQueryString] = useState(searchParam || "");
  const [inputValue, setInputValue] = useState(search || "");
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(resetItems());
  }, [dispatch]);
  useEffect(() => {
    if (searchParam) {
      setQueryString(searchParam);
    }
  }, [searchParam]);
  useEffect(() => {
    if (search && !searchParam) {
      navigate(`?search=${search}&page=1`, { replace: true });
    }
  }, [search, searchParam, navigate]);
  const { data, error, isLoading, isFetching } = useGetPeopleQuery({ page: currentPage, search: queryString || "" });
  const pagesCount = data ? pageCounter(data.count) : 0;
  const pagesArr = getPaginationNumbers(pagesCount);
  const handleSearch = (event) => {
    setInputValue(event.target.value);
  };
  const handleFetch = () => {
    setCurrentPage(1);
    setSearch(inputValue);
    setQueryString(inputValue);
    navigate(`?search=${inputValue}&page=1`, { replace: true });
  };
  const handleNewPage = (newPage) => {
    if (!isNaN(newPage)) {
      setCurrentPage(newPage);
      navigate(`?search=${queryString.trim()}&page=${newPage}`, { replace: true });
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: cls$6.wrapper, children: [
    /* @__PURE__ */ jsx(
      Search,
      {
        search: inputValue,
        handleSearch,
        handleFetch
      }
    ),
    /* @__PURE__ */ jsx("div", { className: `${cls$6.section} ${cls$6.bottom}`, children: isLoading ? /* @__PURE__ */ jsx("p", { children: "Loading..." }) : error ? /* @__PURE__ */ jsxs("p", { children: [
      "Error fetching data: ",
      JSON.stringify(error)
    ] }) : isFetching ? /* @__PURE__ */ jsx("p", { children: "Fetching and caching data..." }) : data ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(CardList, { results: data.results }),
      data.results.length > 0 && /* @__PURE__ */ jsx(
        Pagination,
        {
          pagesArr,
          currPage: currentPage,
          setPage: handleNewPage,
          next: data.next,
          previous: data.previous
        }
      ),
      details2 && /* @__PURE__ */ jsx(DetailedCard, { details: details2 }),
      /* @__PURE__ */ jsx(Flyout, {})
    ] }) : null })
  ] });
};
function App() {
  const [darkMode, setDarkMode] = useState(false);
  const handleDarkMode = () => {
    setDarkMode((prevState) => !prevState);
  };
  return /* @__PURE__ */ jsxs("html", { lang: "en", id: "rootDiv", className: darkMode ? "dark-mode" : "", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsx(Provider, { store, children: /* @__PURE__ */ jsx(ThemeContext.Provider, { value: { darkMode, handleDarkMode }, children: /* @__PURE__ */ jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(SearchApp, {}),
        /* @__PURE__ */ jsx(Outlet, {})
      ] }) }) }) }),
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: App
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-CrJUeaC5.js", "imports": ["/assets/components-BzD752jl.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-DUIJlMiO.js", "imports": ["/assets/components-BzD752jl.js"], "css": ["/assets/root-BVCYtl2_.css"] } }, "url": "/assets/manifest-22a63a49.js", "version": "22a63a49" };
const mode = "production";
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "v3_fetcherPersist": false, "v3_relativeSplatPath": false, "v3_throwAbortReason": false, "unstable_singleFetch": false, "unstable_lazyRouteDiscovery": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
