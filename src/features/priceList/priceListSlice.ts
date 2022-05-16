import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import type { RootState } from '../../store';

type Price = {
  id: string,
  name: string,
  cost: number,
};

type InitialStateType = {
  prices?: (Price | null)[],
  changeOrCreate?: string,
  changePrise?: {
    name: string,
    cost: string,
    id: string,
  },
};

const initialState: InitialStateType = {
  prices: [],
  changeOrCreate: 'create',
  changePrise: {
    name: '',
    cost: '',
    id: '',
  },
};

export const priceListSlice = createSlice({
  name: 'priceList',
  initialState,
  reducers: {
    savePrise: (state, action: PayloadAction<Price>) => {
      const { name, cost } = action.payload;
      state.prices.push({ id: nanoid(), name, cost });
    },
    changePrise: (state, action: PayloadAction<Price>) => {
      const { name, cost, id } = action.payload;
      state.prices = state.prices.map((item) => (
        item.id === id ? { ...item, name, cost } : item
      ));
    },
    deletePrice: (state, action: PayloadAction<Price>) => {
      const { id } = action.payload;
      const delIndex = state.prices.findIndex((item) => item.id === id);
      state.prices.splice(delIndex, 1);
    },
    changeCreateed: (state, action: PayloadAction<InitialStateType>) => {
      const { changeOrCreate, id } = action.payload;
      state.changeOrCreate = changeOrCreate;
      if (id === null) {
        state.changePrise.name = '';
        state.changePrise.cost = '';
        state.changePrise.id = '';

        return;
      }
      const changePrise = state.prices.find((item) => item.id === id);
      state.changePrise.name = changePrise?.name;
      state.changePrise.cost = changePrise?.cost;
      state.changePrise.id = changePrise?.id;
    },
    default: (state) => {
      state;
    },
  },
});

export const {
  savePrise, changePrise,
  deletePrice, changeCreateed,
} = priceListSlice.actions;

export default priceListSlice.reducer;
