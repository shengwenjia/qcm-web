import React, { Component, PropTypes } from 'react';
import Todos from './Todos/Todos';

import MainLayout from '../layouts/MainLayout/MainLayout';
import HomePage from '../layouts/HomePage/HomePage'; // 引导页

import NotFound from './NotFound/NotFound';

const App = ({ location }) => {
  if(location.pathname === '/'){
    return (<HomePage />);
  }else{
    return (
      <MainLayout>
        <Todos location={ location } />
      </MainLayout>
    );
  }
};

App.propTypes = {
};

export default App;
