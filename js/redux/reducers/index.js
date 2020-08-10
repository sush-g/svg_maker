import { combineReducers } from "redux";
import app from './app';
import canvas from './canvas';
import layers from './layers';

export default combineReducers({ app, canvas, layers });
