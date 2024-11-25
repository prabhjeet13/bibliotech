import profileReducer from '../slices/profileSlice';
import cartReducer from '../slices/cartSlice';

import { combineReducers } from 'redux';
const rootReducer = combineReducers({
    profile: profileReducer,
    cart : cartReducer
});
export default rootReducer;