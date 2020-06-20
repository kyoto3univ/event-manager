import React from 'react';
import { render } from 'react-dom';

import '@blueprintjs/core/lib/css/blueprint.css';
import 'normalize.css/normalize.css';

import './firebase';
import { RootView } from './views/Root';

const main = document.querySelector('main');
if (main) {
  render(<RootView />, main);
}
