import { combineReducers, legacy_createStore as createStore } from 'redux';
import dashboardSlice from './slice/dashboardSlice';

const rootReducer = combineReducers({
    dashboard: dashboardSlice,
});
export const store = createStore(rootReducer);
export type RootState = ReturnType<typeof rootReducer>;