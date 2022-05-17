import * as React from 'react';
import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import {
  savePrise, changeCreateed, changePrise, deletePrice,
}
  from '../../features/priceList/priceListSlice';
import './createPrice.scss';
import PriseList from '../priceList/PriceList';
import FilterField from '../filterField/FilterField';

export const PriceContext = React.createContext(null);

export default function CreatePrice(): JSX.Element {
  const [name, setName] = useState('');
  const [cost, setCost] = useState(0);
  const stateChangeOrCreate = useAppSelector((state) => (
    state.priceListReducer.changeOrCreate
  ));

  const changePrice = useAppSelector((state) => (
    state.priceListReducer.changePrise
  ));

  const dispatch = useAppDispatch();

  const hendlerClickSave = (): void => {
    if (stateChangeOrCreate === 'change') {
      dispatch(changePrise({ name, cost, id: changePrice.id }));
      dispatch(changeCreateed({ changeOrCreate: 'create', id: null }));
    } else {
      dispatch(savePrise({ name, cost, id: '' }));
    }

    setName('');
    setCost(0);
  };

  const hendlerClickCancel = (): void => {
    setName('');
    setCost(0);
    dispatch(changeCreateed({ changeOrCreate: 'create', id: null }));
  };

  useEffect(() => {
    if (stateChangeOrCreate === 'change') {
      setName(changePrice.name);
      setCost(Number(changePrice.cost));
    }
  }, [changePrice, stateChangeOrCreate]);

  const hendlClickDeletePrice = (id: string): void => {
    dispatch(deletePrice({ id }));
    setName('');
    setCost(0);
  };

  return (
    <PriceContext.Provider value={hendlClickDeletePrice}>
      <div className="wrapper">
        <div className="CreatePrice__wrapper">
          <label className="CreatePrice__label" htmlFor="name">
            Название работы
            <input
              className="CreatePrice__input"
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label className="CreatePrice__label" htmlFor="cost">
            Стоимость работы
            <input
              className="CreatePrice__input"
              type="number"
              id="cost"
              value={cost}
              onChange={(e) => setCost(Number(e.target.value))}
            />
          </label>
          <button
            className="CreatePrice__save"
            type="button"
            onClick={hendlerClickSave}
          >
            Save
          </button>
          {stateChangeOrCreate === 'change'
            ? (
              <button
                className="CreatePrice__save"
                type="button"
                onClick={hendlerClickCancel}
              >
                Cansel
              </button>
            ) : null}
        </div>
        <FilterField />
        <PriseList />

      </div>
    </PriceContext.Provider>

  );
}
