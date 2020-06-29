import update from 'immutability-helper';
import { LAYERS__ADD_LAYER, LAYERS__SELECT_LAYER, EDITOR__ADD_NEW_UNIT_PATH,
         EDITOR__SELECT_UNIT_PATH, EDITOR__ADD_LINE, EDITOR__ADD_CUBIC, EDITOR__ADD_SMOOTH_CUBIC,
         EDITOR__ADD_QUADRATIC, EDITOR__ADD_SMOOTH_QUADRATIC, EDITOR__TOGGLE_ENCLOSURE,
         EDITOR__REPOSITION_POINT, EDITOR__REPOSITION_UNIT_PATH,
         EDITOR__REPOSITION_FIRST_CONTROL_PT, EDITOR__REPOSITION_SECOND_CONTROL_PT,
         EDITOR__SET_LAYER_DIMENSIONS, LAYERS__SET_STROKE_WIDTH, LAYERS__SET_STROKE,
         LAYERS__SET_FILL } from '../actions';
import { reducer } from '../../utils';
import Layer from '../../core/Layer';


const make_new_layer = () => new Layer();

const resolve_selected = (state) => {
  return state.layer_objs[state.selected_layer_obj_idx];
};

const update_selected = (state, selected) => {
  return update(state.layer_objs, {$splice: [[state.selected_layer_obj_idx, 1, selected]]});
};

const initial_state = {
  layer_objs: [],
  selected_layer_obj_idx: 0,
  selection_last_updated: null
};

export default reducer(initial_state, {
  LAYERS__ADD_LAYER: (state, payload) => {
    return {
      ...state,
      layer_objs: [].concat(state.layer_objs, make_new_layer())
    };
  },
  LAYERS__SELECT_LAYER: (state, payload) => {
    return {
      ...state,
      selected_layer_obj_idx: payload
    }
  },
  EDITOR__SELECT_UNIT_PATH: (state, payload) => {
    let selected = resolve_selected(state);
    selected.selectUnitPath(payload);
    return {
      ...state,
      layer_objs: update_selected(state, selected)
    };
  },
  EDITOR__ADD_NEW_UNIT_PATH: (state, payload) => {
    let selected = resolve_selected(state);
    selected.addUnitPath();
    return {
      ...state,
      layer_objs: update_selected(state, selected)
    };
  },
  EDITOR__ADD_LINE: (state, payload) => {
    let selected = resolve_selected(state);
    const {dx, dy} = payload;
    selected.selected_unit_path.addLine(dx, dy);
    return {
      ...state,
      layer_objs: update_selected(state, selected)
    };
  },
  EDITOR__ADD_CUBIC: (state, payload) => {
    let selected = resolve_selected(state);
    const {dx1, dy1, dx2, dy2, dx, dy} = payload;
    selected.selected_unit_path.addCubic(dx1, dy1, dx2, dy2, dx, dy);
    return {
      ...state,
      layer_objs: update_selected(state, selected)
    };
  },
  EDITOR__ADD_SMOOTH_CUBIC: (state, payload) => {
    let selected = resolve_selected(state);
    const {dx2, dy2, dx, dy} = payload;
    selected.selected_unit_path.addSmoothCubic(dx2, dy2, dx, dy);
    return {
      ...state,
      layer_objs: update_selected(state, selected)
    };
  },
  EDITOR__ADD_QUADRATIC: (state, payload) => {
    let selected = resolve_selected(state);
    const {dx1, dy1, dx, dy} = payload;
    selected.selected_unit_path.addQuadratic(dx1, dy1, dx, dy);
    return {
      ...state,
      layer_objs: update_selected(state, selected)
    };
  },
  EDITOR__ADD_SMOOTH_QUADRATIC: (state, payload) => {
    let selected = resolve_selected(state);
    const {dx, dy} = payload;
    selected.selected_unit_path.addSmoothQuadratic(dx, dy);
    return {
      ...state,
      layer_objs: update_selected(state, selected)
    };
  },
  EDITOR__TOGGLE_ENCLOSURE: (state, payload) => {
    let selected = resolve_selected(state);
    selected.selected_unit_path.toggleEnclosure();
    return {
      ...state,
      layer_objs: update_selected(state, selected)
    };
  },
  EDITOR__REPOSITION_POINT: (state, payload) => {
    let selected = resolve_selected(state);
    const {dx, dy} = payload;
    selected.selected_unit_path.repositionTail(dx, dy);
    return {
      ...state,
      layer_objs: update_selected(state, selected)
    };
  },
  EDITOR__REPOSITION_UNIT_PATH: (state, payload) => {
    let selected = resolve_selected(state);
    const {dx, dy} = payload;
    selected.selected_unit_path.reposition(dx, dy);
    return {
      ...state,
      layer_objs: update_selected(state, selected)
    };
  },
  EDITOR__REPOSITION_FIRST_CONTROL_PT: (state, payload) => {
    let selected = resolve_selected(state);
    const {dx, dy} = payload;
    selected.selected_unit_path.repositionFirstControlPoint(dx, dy);
    return {
      ...state,
      layer_objs: update_selected(state, selected)
    };
  },
  EDITOR__REPOSITION_SECOND_CONTROL_PT: (state, payload) => {
    let selected = resolve_selected(state);
    const {dx, dy} = payload;
    selected.selected_unit_path.repositionSecondControlPoint(dx, dy);
    return {
      ...state,
      layer_objs: update_selected(state, selected)
    };
  },
  EDITOR__DELETE_ELEMENT: (state, payload) => {
    let selected = resolve_selected(state);
    selected.selected_unit_path.deleteElement();
    return {
      ...state,
      layer_objs: update_selected(state, selected)
    };
  },
  LAYERS__SET_STROKE_WIDTH: (state, payload) => {
    let layer_obj = state.layer_objs[payload.idx];
    layer_obj.stroke_width = payload.stroke_width;
    return {
      ...state,
      layer_objs: update(state.layer_objs, {$splice: [[payload.idx, 1, layer_obj]]})
    };
  },
  LAYERS__SET_STROKE: (state, payload) => {
    let layer_obj = state.layer_objs[payload.idx];
    layer_obj.stroke = payload.hex;
    layer_obj.stroke_opacity = payload.alpha;
    return {
      ...state,
      layer_objs: update(state.layer_objs, {$splice: [[payload.idx, 1, layer_obj]]})
    };
  },
  LAYERS__SET_FILL: (state, payload) => {
    let layer_obj = state.layer_objs[payload.idx];
    layer_obj.fill = payload.hex;
    layer_obj.fill_opacity = payload.alpha;
    return {
      ...state,
      layer_objs: update(state.layer_objs, {$splice: [[payload.idx, 1, layer_obj]]})
    };
  }
});
