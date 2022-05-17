import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

type Price = {
  id: string,
  name: string,
  cost: number,
};

type InitialStateType = {
  prices?: (Price | null)[],
  changeOrCreate?: string,
  changePrise: {
    name: string,
    cost: number,
    id: string,
  },
  visible?: (Price | null)[],
  searchQuery: string,
};

const initialState: InitialStateType = {
  prices: [],
  changeOrCreate: 'create',
  changePrise: {
    name: '',
    cost: 0,
    id: '',
  },
  visible: [],
  searchQuery: '',
};

function filter(arr: (Price | null)[], filterString: string): (Price | null)[] {
  if (filterString === '') {
    return arr;
  }
  return arr.filter((price) => {
    const lowPrice: string = price!.name.toLowerCase();
    return new RegExp(filterString).test(lowPrice);
  });
}

export const priceListSlice = createSlice({
  name: 'priceList',
  initialState,
  reducers: {
    savePrise: (state, action: PayloadAction<Price>) => {
      const { name, cost } = action.payload;
      state?.prices?.push({ id: nanoid(), name, cost });
      state.visible = filter(state.prices, state.searchQuery);
    },
    changePrise: (state, action: PayloadAction<Price>) => {
      const { name, cost, id } = action.payload;
      state.prices = state?.prices?.map((item) => (
        item?.id === id ? { ...item, name, cost } : item
      ));
      state.visible = filter(state.prices, state.searchQuery);
    },
    deletePrice: (state, action: PayloadAction<Price>) => {
      const { id } = action.payload;
      const delIndex = state?.prices
        ?.findIndex((item) => item?.id === id);
      state?.prices?.splice(delIndex!, 1);
      if (state.changeOrCreate === 'change') {
        state.changePrise = ({
          ...state.changePrise, name: '', cost: 0, id: '',
        });
        state.changeOrCreate = 'create';
      }
      state.visible = state.prices;
    },
    changeCreateed: (state, action: PayloadAction<any>) => {
      const { changeOrCreate, id } = action.payload;
      state.changeOrCreate = changeOrCreate;
      if (id === null) {
        state.changePrise = ({
          ...state.changePrise, name: '', cost: 0, id: '',
        });
        return;
      }
      const changePrise = state?.prices?.find((item) => item?.id === id);
      state.changePrise = ({
        ...state.changePrise,
        name: changePrise!.name,
        cost: changePrise!.cost,
        id: changePrise!.id,
      });
    },
    filterPrice: (state, action: PayloadAction<string>) => {
      const searchQuery = action.payload.searchQuery.toLowerCase();
      state.searchQuery = searchQuery;
      state.visible = filter(state.prices, searchQuery);
    },
    default: (state) => {
      state;
    },
  },
});

export const {
  savePrise, changePrise,
  deletePrice, changeCreateed, filterPrice,
} = priceListSlice.actions;

export default priceListSlice.reducer;
