import * as React from 'react';
import CreatePrice from '../createPrice/CreatePrice';
import PriseList from '../priceList/PriceList';

export default function App(): JSX.Element {
  return (
    <>
      <CreatePrice />
      <PriseList />
    </>

  );
}
