import * as React from 'react';
import { useAppSelector } from '../../hooks';
import PriseItem from '../priceItem/PriceItem';
import './priceList.scss';

export default function PriceList(): JSX.Element {
  const visible = useAppSelector((store) => store.priceListReducer.visible);

  return (
    <ul className="PriceList__list">

      <p className="PriceList__headers">
        Здесь выведем список
      </p>
      {visible?.map((prise) => (
        <PriseItem
          key={prise?.id}
          id={prise!.id}
          name={prise!.name}
          cost={prise!.cost}
        />
      ))}

    </ul>
  );
}
