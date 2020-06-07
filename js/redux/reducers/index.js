import { combineReducers } from "redux";
import controls from './controls';
import layers from './layers';
import editor from './editor';

export default combineReducers({ controls, editor, layers });
