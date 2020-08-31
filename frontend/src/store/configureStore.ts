import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers';
import { RootStateType } from '../types/store';

export default function configureStore(preloadedState?: RootStateType)  {
    const middlewares = [thunk];

    const middlewareEnhancer = applyMiddleware(...middlewares);

    const enhancers = [middlewareEnhancer];
    const composedEnhancers = composeWithDevTools(...enhancers);

    const store = createStore(rootReducer, preloadedState, composedEnhancers);

    if (process.env.NODE_ENV !== 'production' && (module as any).hot) {
        (module as any).hot.accept('./reducers', () => store.replaceReducer(rootReducer))
    }

    return store;
}