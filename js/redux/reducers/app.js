import { reducer } from '../../utils';
import { SUB_APPS } from '../../constants';
import { APP__SET_SUB_APP } from '../actions';

const initial_state = {
  sub_app_to_render: SUB_APPS.canvas
};

export default reducer(initial_state, {
  [APP__SET_SUB_APP]: (state, payload) => {
    return {
      ...state,
      sub_app_to_render: payload
    };
  }
});
