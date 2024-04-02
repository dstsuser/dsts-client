import React from 'react';
import HeaderBanner from '../HeaderBanner/HeaderBanner';
import { Header } from '../Header/Header';
import HeaderCarousel from '../HeaderCarousel/HeaderCarousel';

function HeaderComponent() {
  return (
    <div style={{ height: '100vh'}}>
        <div style={{ height: '92vh',}}>
            <HeaderCarousel/>
        </div>
        <div style={{ height: '8vh' }}>
            <Header />
        </div>
    </div>
  );
}

export default HeaderComponent;
