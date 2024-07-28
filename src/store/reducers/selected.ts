import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDetails } from "../../components/DetailedCard/DetailedCard";

interface SelectedState {
    items: IDetails[];
}

const initialState: SelectedState = {
    items: [],
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
        }
    },
})

export const { addItem, removeItem, resetItems } = selectedSlice.actions;
export default selectedSlice.reducer;
