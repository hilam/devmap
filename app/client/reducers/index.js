import { combineReducers } from "redux";
import maps from './maps';
import nodes from './node';
import feeds from './feeds';
export const reducers = combineReducers({maps, nodes, feeds});