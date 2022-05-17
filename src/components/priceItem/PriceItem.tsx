import * as React from 'react';
import { useContext } from 'react';
import { useAppDispatch } from '../../hooks';
import { changeCreateed }
  from '../../features/priceList/priceListSlice';
import { PriceContext } from '../createPrice/CreatePrice';

import './priceItem.scss';

export default function PriseItem({ name, cost, id }:
{ name: string, cost: number, id: string }): JSX.Element {
  const dispatch = useAppDispatch();

  const hendlClickDeletePrice = useContext(PriceContext);

  const hendlClickChangePrice = (id: string): void => {
    dispatch(changeCreateed({ changeOrCreate: 'change', id }));
  };

  return (
    <li className="PriseItem__item">
      <span className="PriseItem__text">
        {name}
        {' '}
        {cost}
      </span>
      <button
        type="button"
        className="PriseItem__change"
        onClick={() => { hendlClickChangePrice(id); }}
      />
      <button
        type="button"
        className="PriseItem__delete"
        onClick={() => { hendlClickDeletePrice(id); }}
      />

    </li>
  );
}
