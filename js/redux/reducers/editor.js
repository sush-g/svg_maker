import { reducer } from '../../utils';
import { EDITOR__SET_LAYER_DIMENSIONS } from '../actions';

const initial_state = {
  layer_dimensions: {
    width: 0,
    height: 0
  }
};

export default reducer(initial_state, {
  [EDITOR__SET_LAYER_DIMENSIONS]: (state, payload) => {
    const {width, height} = payload;
    return {
      ...state,
      layer_dimensions: {
        width: width,
        height: height
      }
    };
  }
});
