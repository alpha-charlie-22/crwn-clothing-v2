import { compose, createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';

import { rootReducer } from './rootReducer';

const middleWare = [logger];
const composedEnhancers = compose(applyMiddleware(...middleWare));

export const store = createStore(rootReducer, undefined, composedEnhancers);