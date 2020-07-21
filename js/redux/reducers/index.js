import { combineReducers } from "redux";
import app from './app';
import canvas from './canvas';
import layers from './layers';
import editor from './editor';

export default combineReducers({app, canvas, editor, layers });
