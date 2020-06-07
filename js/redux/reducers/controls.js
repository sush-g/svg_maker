import { MODES } from '../../constants';
import {CONTROLS__SET_MODE, CONTROLS__SET_REF_IMAGE, CONTROLS__SET_REF_IMAGE_OPACITY} from '../actions';
import { reducer } from '../../utils';

const initial_state = {
  mode: MODES.edit,
  ref_img_src: 'https://i.dlpng.com/static/png/6619362_preview.png',
  ref_img_opacity: 0.5
};

export default reducer(initial_state, {
  CONTROLS__SET_MODE: (state, payload) => {
    return {
      ...state,
      mode: payload
    };
  },
  CONTROLS__SET_REF_IMAGE: (state, payload) => {
    return {
      ...state,
      ref_img_src: payload
    };
  },
  CONTROLS__SET_REF_IMAGE_OPACITY: (state, payload) => {
    return {
      ...state,
      ref_img_opacity: payload
    };
  }
});
