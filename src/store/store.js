import { createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import rootReducer from './reducers/rootReducers';

let middleware = [ReduxThunk]

export const store = createStore(rootReducer, applyMiddleware(...middleware))

