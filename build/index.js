var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
};

// node_modules/@remix-run/dev/dist/config/defaults/entry.server.node.tsx
var entry_server_node_exports = {};
__export(entry_server_node_exports, {
  default: () => handleRequest
});
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import * as isbotModule from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { jsx } from "react/jsx-runtime";
var ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isBotRequest(request.headers.get("user-agent")) || remixContext.isSpaMode ? handleBotRequest(
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
  return userAgent ? "isbot" in isbotModule && typeof isbotModule.isbot == "function" ? isbotModule.isbot(userAgent) : "default" in isbotModule && typeof isbotModule.default == "function" ? isbotModule.default(userAgent) : !1 : !1;
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
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
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
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
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App
});
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "@remix-run/react";
import { Provider } from "react-redux";

// app/store/store.ts
import { combineReducers, configureStore } from "@reduxjs/toolkit";

// app/store/api.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// app/store/reducers/selected.ts
import { createSlice } from "@reduxjs/toolkit";
var initialState = {
  items: [],
  pageData: {},
  currentPage: 1
}, selectedSlice = createSlice({
  name: "selected",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    resetItems: (state) => {
      state.items = [], state.pageData = {};
    },
    setPageData: (state, action) => {
      let { page, data } = action.payload;
      state.pageData[page] = data, state.currentPage = page;
    }
  }
}), { addItem, removeItem, resetItems, setPageData } = selectedSlice.actions, selected_default = selectedSlice.reducer;

// app/store/api.ts
var api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://swapi.dev/api/" }),
  endpoints: (builder) => ({
    getPeople: builder.query({
      query: ({ page, search }) => {
        let request = `people/?page=${page}`;
        return search.trim() && (request = `people/?search=${encodeURIComponent(search.trim())}&page=${page}`), request;
      },
      async onQueryStarted({ page, search }, { dispatch, queryFulfilled }) {
        try {
          let { data } = await queryFulfilled;
          dispatch(setPageData({ page, data: data.results }));
        } catch (error) {
          console.error(error, search);
        }
      }
    })
  })
}), { useGetPeopleQuery } = api;

// app/store/store.ts
var rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  selected: selected_default
}), store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
});

// app/context/ThemeProvider.tsx
import { createContext, useState } from "react";
var defaultValue = {
  darkMode: !1,
  handleDarkMode: () => {
  }
}, ThemeContext = createContext(defaultValue);

// app/root.tsx
import { useState as useState5 } from "react";

// app/components/ErrorBoundary/ErrorBoundary.tsx
import { Component } from "react";

// app/components/ErrorBoundary/styles.module.css
var styles_module_default = { error_info: "aWmop" };

// app/components/ErrorBoundary/ErrorBoundary.tsx
var ErrorBoundary = class extends Component {
  constructor(props) {
    super(props), this.state = { hasError: !1, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: !0, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary:", error, errorInfo);
  }
  render() {
    return this.state.hasError ? <div className={styles_module_default.error_info}>
      <h1 style={{ color: "red" }}>YEAH, YOU BROKE IT, GREAT JOB</h1>
      <h2>Info:</h2>
      <div><p>{String(this.state.error)}</p></div>
    </div> : this.props.children;
  }
};

// app/components/SearchApp/SearchApp.tsx
import { useState as useState4, useEffect as useEffect3 } from "react";

// app/hooks/useLocalStorage.ts
import { useEffect, useState as useState2 } from "react";
var useLocalStorage = () => {
  let getInitialQuery = () => {
    if (typeof window < "u") {
      let savedQuery = window.localStorage.getItem("searchTerm");
      return savedQuery || "";
    }
    return "";
  }, [data, setData] = useState2(getInitialQuery());
  return useEffect(() => {
    typeof window < "u" && window.localStorage.setItem("searchTerm", data);
  }, [data]), [data, setData];
};

// app/components/CardList/styles.module.css
var styles_module_default2 = { search__list: "_36zei" };

// app/components/Card/Card.tsx
import { useNavigate, useLocation } from "@remix-run/react";

// app/components/Card/styles.module.css
var styles_module_default3 = { search__listItem: "dDO-4", search__listItemInfo: "kO8zW", checkbox: "xyP5N" };

// app/store/hooks.ts
import { useDispatch, useSelector } from "react-redux";
var useAppDispatch = () => useDispatch(), useAppSelector = useSelector;

// app/components/Card/Card.tsx
var Card = ({ id, gender, birth_year, height, name }) => {
  let navigate = useNavigate(), location = useLocation(), dispatch = useAppDispatch(), isSelected = useAppSelector((state) => state.selected.items).some((item) => item.id === id), handleClick = () => {
    let queryParams = new URLSearchParams(location.search);
    queryParams.set("details", id), navigate(`${location.pathname}?${queryParams.toString()}`, { replace: !0 });
  }, handleCheckboxChange = (e) => {
    let item = { id, gender, birth_year, height, name, eye_color: "", hair_color: "", homeworld: "", mass: "", skin_color: "", url: "" };
    e.target.checked ? dispatch(addItem(item)) : dispatch(removeItem(id));
  };
  return <div onClick={handleClick} className={styles_module_default3.search__listItem}>
    <input
      type="checkbox"
      className={styles_module_default3.checkbox}
      checked={isSelected}
      onChange={handleCheckboxChange}
      onClick={(e) => e.stopPropagation()}
    />
    <div>{name}</div>
    <ul className={styles_module_default3.search__listItemInfo}>
      <li>
        {"Gender: "}
        {gender}
      </li>
      <li>
        {"Birth Year: "}
        {birth_year}
      </li>
      <li>
        {"Height: "}
        {height}
      </li>
    </ul>
  </div>;
}, Card_default = Card;

// app/components/CardList/CardList.tsx
var getIdFromUrl = (url) => {
  let parts = url.split("/");
  return parts[parts.length - 2];
}, CardList = ({ results }) => results && results.length === 0 ? <div>No results</div> : <div className={styles_module_default2.search__list}>{results.map(
  (item, index) => <Card_default
    key={index}
    id={getIdFromUrl(item.url)}
    gender={item.gender}
    height={item.height}
    birth_year={item.birth_year}
    name={item.name}
  />
)}</div>, CardList_default = CardList;

// app/components/SearchApp/styles.module.css
var styles_module_default4 = { wrapper: "pUQW-", section: "WGGQw", bottom: "ptPMs" };

// app/utils/pageCounter.ts
var pageCounter = (total) => Math.ceil(total / 10), getPaginationNumbers = (pages) => {
  let arr = [];
  for (let i = 0; i < pages; i++)
    arr.push(i + 1);
  return arr;
};

// app/components/Pagination/styles.module.css
var styles_module_default5 = { pagination: "k6i3U", item: "_4xIcK", item_current: "iIM2h", item_inactive: "xwfyg" };

// app/components/Pagination/Pagination.tsx
var Pagination = ({ pagesArr, currPage, setPage, next, previous }) => {
  let handlePrev = () => {
    if (previous) {
      let prevPage = currPage - 1;
      setPage(prevPage);
    }
  }, handleNext = () => {
    if (next) {
      let nextPage = currPage + 1;
      setPage(nextPage);
    }
  };
  return <div className={styles_module_default5.pagination}>
    <div onClick={handlePrev} className={previous ? `${styles_module_default5.item}` : `${styles_module_default5.item} ${styles_module_default5.item_inactive}`}>PREV</div>
    {pagesArr.map(
      (page) => <div
        onClick={() => setPage(page)}
        key={page}
        className={currPage === page ? `${styles_module_default5.item} ${styles_module_default5.item_current}` : `${styles_module_default5.item}`}
      >
        {" "}
        {page}
        {" "}
      </div>
    )}
    <div onClick={handleNext} className={next ? `${styles_module_default5.item}` : `${styles_module_default5.item} ${styles_module_default5.item_inactive}`}>NEXT</div>
  </div>;
}, Pagination_default = Pagination;

// app/components/SearchApp/SearchApp.tsx
import { useSearchParams, useNavigate as useNavigate3, useLocation as useLocation3 } from "@remix-run/react";

// app/components/Search/styles.module.css
var styles_module_default6 = { section: "s2bbl", top: "_0Adwb", searchBlock: "L1WDh", buttonsOptions: "SjRzx" };

// app/components/Search/Search.tsx
import { useContext } from "react";

// app/components/UI/ButtonCustom/styles.module.css
var styles_module_default7 = { button: "K-HZq" };

// app/components/UI/ButtonCustom/ButtonCustom.tsx
var ButtonCustom = ({ children, type, ...rest }) => <button className={type ? `${styles_module_default7.button} ${type}` : styles_module_default7.button} {...rest}>{children}</button>, ButtonCustom_default = ButtonCustom;

// app/components/UI/InputCustom/styles.module.css
var styles_module_default8 = { label: "Hl1wC", input: "qHOHB" };

// app/components/UI/InputCustom/InputCustom.tsx
var InputCustom = ({ name, label, ...rest }) => <>
  <label htmlFor={name} className={styles_module_default8.label}>{label || ""}</label>
  <input className={styles_module_default8.input} {...rest} />
</>, InputCustom_default = InputCustom;

// app/components/Search/Search.tsx
var Search = ({ search, handleSearch, handleFetch }) => {
  let handleChange = (event) => {
    handleSearch(event);
  }, makeError = () => {
    throw new Error("ErrorBoundary reacts");
  }, { darkMode, handleDarkMode } = useContext(ThemeContext);
  return <div className={`${styles_module_default6.section} ${styles_module_default6.top}`}>
    <div className={styles_module_default6.searchBlock}>
      <label htmlFor="search">Mindvan</label>
      <InputCustom_default id="search" name="search" placeholder="Type something" onChange={handleChange} type="search" value={search} />
      <ButtonCustom_default onClick={handleFetch}>Search</ButtonCustom_default>
    </div>
    <div className={styles_module_default6.buttonsOptions}><ButtonCustom_default onClick={handleDarkMode}>
      {"Switch to "}
      {darkMode ? "Light" : "Dark"}
      {" Mode"}
    </ButtonCustom_default></div>
  </div>;
}, Search_default = Search;

// app/components/Flyout/styles.module.css
var styles_module_default9 = { flyout: "nNxc0", flyoutBtns: "lfkUp" };

// app/components/Flyout/Flyout.tsx
var Flyout = () => {
  let dispatch = useAppDispatch(), selectedItems = useAppSelector((state) => state.selected.items), unselectAll = () => {
    dispatch(resetItems());
  }, downloadData = () => {
    if (selectedItems.length === 0)
      return;
    let csvHeader = Object.keys(selectedItems[0]).join(",") + `
`, csvRows = selectedItems.map((item) => Object.values(item).join(",")).join(`
`), csvData = csvHeader + csvRows, blob = new Blob([csvData], { type: "text/csv" }), url = URL.createObjectURL(blob), anchor = document.createElement("a");
    anchor.href = url;
    let nowDate = `${selectedItems.length}_people`;
    anchor.download = `${nowDate}.csv`, document.body.appendChild(anchor), anchor.click();
  };
  return selectedItems.length === 0 ? null : <div className={styles_module_default9.flyout}>
    <span>{selectedItems.length === 1 ? "1 item is selected!" : `${selectedItems.length} items are selected!`}</span>
    <div className={styles_module_default9.flyoutBtns}>
      <ButtonCustom_default onClick={unselectAll}>Unselect all</ButtonCustom_default>
      <ButtonCustom_default onClick={downloadData}>Download</ButtonCustom_default>
    </div>
  </div>;
}, Flyout_default = Flyout;

// app/components/DetailedCard/DetailedCard.tsx
import { useEffect as useEffect2, useState as useState3 } from "react";
import { useNavigate as useNavigate2, useLocation as useLocation2 } from "@remix-run/react";

// app/components/DetailedCard/styles.module.css
var styles_module_default10 = { details: "GgW2w", detailsContainer: "SCZSJ", backdrop: "QK4br", closeButton: "ie-8f" };

// app/components/DetailedCard/DetailedCard.tsx
var DetailedCard = ({ details }) => {
  let navigate = useNavigate2(), location = useLocation2(), [detailsData, setDetailsData] = useState3(null), [loading, setLoading] = useState3(!0), [error, setError] = useState3(null);
  useEffect2(() => {
    if (!details)
      return;
    (async () => {
      try {
        setLoading(!0);
        let response = await fetch(`https://swapi.dev/api/people/${details}`);
        if (!response.ok)
          throw new Error(`Error: ${response.statusText}`);
        let data = await response.json();
        setDetailsData({
          id: details,
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
        }), setError(null);
      } catch (error2) {
        error2 instanceof Error && setError(error2.message);
      } finally {
        setLoading(!1);
      }
    })();
  }, [details]);
  let handleClose = () => {
    let query = new URLSearchParams(location.search);
    query.delete("details"), navigate(`${location.pathname}?${query.toString()}`, { replace: !0 });
  }, handleOutside = (event) => {
    event.target === event.currentTarget && handleClose();
  };
  return <div>{details && <div className={styles_module_default10.detailsContainer}>
    <div className={styles_module_default10.backdrop} onClick={handleOutside} />
    <div className={styles_module_default10.details}>
      {loading ? <p>Loading details...</p> : detailsData ? <div>
        <h2>Details info</h2>
        <ul>{Object.keys(detailsData).map(
          (key) => <li key={key}>
            <strong>
              {key}
              {":"}
            </strong>
            {" "}
            {detailsData[key]}
          </li>
        )}</ul>
      </div> : <p>{error}</p>}
      <ButtonCustom_default type={styles_module_default10.closeButton} onClick={handleClose}>Close</ButtonCustom_default>
    </div>
  </div>}</div>;
}, DetailedCard_default = DetailedCard;

// app/components/SearchApp/SearchApp.tsx
var SearchApp = () => {
  let navigate = useNavigate3(), location = useLocation3(), [searchParams] = useSearchParams(), pageParam = searchParams.get("page"), searchParam = searchParams.get("search"), details = searchParams.get("details"), initialPage = pageParam ? parseInt(pageParam, 10) : 1, [currentPage, setCurrentPage] = useState4(initialPage), [search, setSearch] = useLocalStorage("search", ""), [queryString, setQueryString] = useState4(searchParam || ""), [inputValue, setInputValue] = useState4(search || ""), dispatch = useAppDispatch();
  useEffect3(() => {
    dispatch(resetItems());
  }, [dispatch]), useEffect3(() => {
    searchParam && setQueryString(searchParam);
  }, [searchParam]), useEffect3(() => {
    search && !searchParam && navigate(`?search=${search}&page=1`, { replace: !0 });
  }, [search, searchParam, navigate]);
  let { data, error, isLoading, isFetching } = useGetPeopleQuery({ page: currentPage, search: queryString || "" }), pagesCount = data ? pageCounter(data.count) : 0, pagesArr = getPaginationNumbers(pagesCount), handleSearch = (event) => {
    setInputValue(event.target.value);
  }, handleFetch = () => {
    setCurrentPage(1), setSearch(inputValue), setQueryString(inputValue), navigate(`?search=${inputValue}&page=1`, { replace: !0 });
  }, handleNewPage = (newPage) => {
    isNaN(newPage) || (setCurrentPage(newPage), navigate(`?search=${queryString.trim()}&page=${newPage}`, { replace: !0 }));
  };
  return <div className={styles_module_default4.wrapper}>
    <Search_default
      search={inputValue}
      handleSearch={handleSearch}
      handleFetch={handleFetch}
    />
    <div className={`${styles_module_default4.section} ${styles_module_default4.bottom}`}>{isLoading ? <p>Loading...</p> : error ? <p>
      {"Error fetching data: "}
      {JSON.stringify(error)}
    </p> : isFetching ? <p>Fetching and caching data...</p> : data ? <>
      <CardList_default results={data.results} />
      {data.results.length > 0 && <Pagination_default
        pagesArr={pagesArr}
        currPage={currentPage}
        setPage={handleNewPage}
        next={data.next}
        previous={data.previous}
      />}
      {details && <DetailedCard_default details={details} />}
      <Flyout_default />
    </> : null}</div>
  </div>;
}, SearchApp_default = SearchApp;

// app/root.tsx
function App() {
  let [darkMode, setDarkMode] = useState5(!1), handleDarkMode = () => {
    setDarkMode((prevState) => !prevState);
  };
  return <html lang="en" id="rootDiv" className={darkMode ? "dark-mode" : ""}>
    <head>
      <Meta />
      <Links />
    </head>
    <body>
      <Provider store={store}><ThemeContext.Provider value={{ darkMode, handleDarkMode }}><ErrorBoundary><div>
        <SearchApp_default />
        <Outlet />
      </div></ErrorBoundary></ThemeContext.Provider></Provider>
      <ScrollRestoration />
      <Scripts />
    </body>
  </html>;
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-DLNFUCHL.js", imports: ["/build/_shared/chunk-K5QFEYVH.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-J4GBOWM6.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 } }, version: "98aefc5b", hmr: void 0, url: "/build/manifest-98AEFC5B.js" };

// server-entry-module:@remix-run/dev/server-build
var mode = "production", assetsBuildDirectory = "public\\build", future = { v3_fetcherPersist: !1, v3_relativeSplatPath: !1, v3_throwAbortReason: !1, unstable_singleFetch: !1, unstable_lazyRouteDiscovery: !1 }, publicPath = "/build/", entry = { module: entry_server_node_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  }
};
export {
  assets_manifest_default as assets,
  assetsBuildDirectory,
  entry,
  future,
  mode,
  publicPath,
  routes
};
