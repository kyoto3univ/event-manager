import { FleurContext } from '@fleur/react';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import '@blueprintjs/core/lib/css/blueprint.css';
import 'normalize.css/normalize.css';

import './firebase';
import { store } from './store';
import { RootView } from './views/Root';

const main = document.querySelector('main');
if (main) {
  render(
    <FleurContext value={store}>
      <BrowserRouter>
        <RootView />
      </BrowserRouter>
    </FleurContext>,
    main,
  );
}
