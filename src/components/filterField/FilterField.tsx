import * as React from 'react';
import { useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { filterPrice } from '../../features/priceList/priceListSlice';
import './filterField.scss';

export default function FilterField(): JSX.Element {
  const [filter, setFilter] = useState('');
  const dispatch = useAppDispatch();

  const hendelChangeInput = (e:React.ChangeEvent<HTMLInputElement>): void => {
    setFilter(e.target.value);
    dispatch(filterPrice({ searchQuery: e.target.value }));
  };

  return (
    <label htmlFor="find" className="FilterField__lable">
      <input
        id="find"
        className="FilterField__input"
        value={filter}
        onChange={(e) => hendelChangeInput(e)}
      />
      Поле ввода для поиска
    </label>
  );
}
