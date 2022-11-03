import { combineReducers } from 'redux';
import propertyReducer from './propertyReducer';
import userReducer from './userReducer';

export default combineReducers({
    propertyReducer,
    userReducer
});