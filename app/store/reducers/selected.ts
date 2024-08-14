import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDetails } from "../../components/DetailedCard/DetailedCard";

interface SelectedState {
    items: IDetails[];
    pageData: { [key: number]: IDetails[] };
    currentPage: number;
}

const initialState: SelectedState = {
    items: [],
    pageData: {},
    currentPage: 1,
}

export const selectedSlice = createSlice({
    name: 'selected',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<IDetails>) => {
            state.items.push(action.payload);
        },
        removeItem: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        resetItems: (state) => {
            state.items = [];
            state.pageData = {};
        },
        setPageData: (state, action: PayloadAction<{ page: number; data: IDetails[] }>) => {
            const { page, data } = action.payload;
            state.pageData[page] = data;
            state.currentPage = page;
        },
    },
});

export const { addItem, removeItem, resetItems, setPageData } = selectedSlice.actions;
export default selectedSlice.reducer;
