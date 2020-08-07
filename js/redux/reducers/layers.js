import update from 'immutability-helper';
import { cloneDeep } from 'lodash';
import { LAYERS__ADD_LAYER, LAYERS__DELETE_LAYER, LAYERS__SELECT_LAYER, EDITOR__ADD_NEW_UNIT_PATH,
         EDITOR__SELECT_UNIT_PATH, EDITOR__ADD_LINE, EDITOR__ADD_CUBIC, EDITOR__ADD_SMOOTH_CUBIC,
         EDITOR__ADD_QUADRATIC, EDITOR__ADD_SMOOTH_QUADRATIC, EDITOR__TOGGLE_ENCLOSURE,
         EDITOR__REPOSITION_POINT, EDITOR__REPOSITION_UNIT_PATH,
         EDITOR__REPOSITION_FIRST_CONTROL_PT, EDITOR__REPOSITION_SECOND_CONTROL_PT,
         EDITOR__DELETE_ELEMENT, LAYERS__SET_STROKE_WIDTH, LAYERS__SET_STROKE, LAYERS__SET_FILL,
         LAYERS__REPOSITION_LAYER, LAYERS__IMPORT } from '../actions';
import { reducer } from '../../utils';
import Layer from '../../core/Layer';
import LayerSet from '../../core/LayerSet';


const initial_state = {
  layer_set: new LayerSet()
};

const updateLayerSet = (state) => {
  return update(state, {layer_set: {$set: cloneDeep(state.layer_set)}});
};

export default reducer(initial_state, {
  [LAYERS__IMPORT]: (state, payload) => {
    return {
      ...state,
      layer_set: payload
    };
  },
  [LAYERS__ADD_LAYER]: (state, payload) => {
    state.layer_set.addNewLayer();
    return updateLayerSet(state);
  },
  [LAYERS__DELETE_LAYER]: (state, payload) => {
    state.layer_set.deleteLayerAtIdx(payload);
    return updateLayerSet(state);
  },
  [LAYERS__SELECT_LAYER]: (state, payload) => {
    state.layer_set.layer_idx_to_edit = payload;
    return updateLayerSet(state);
  },
  [EDITOR__SELECT_UNIT_PATH]: (state, payload) => {
    const layer_to_edit = state.layer_set.layer_to_edit;
    layer_to_edit.selectUnitPath(payload);
    return updateLayerSet(state);
  },
  [EDITOR__ADD_NEW_UNIT_PATH]: (state, payload) => {
    const layer_to_edit = state.layer_set.layer_to_edit;
    layer_to_edit.addUnitPath();
    return updateLayerSet(state);
  },
  [EDITOR__ADD_LINE]: (state, payload) => {
    const layer_to_edit = state.layer_set.layer_to_edit;
    const {dx, dy} = payload;
    layer_to_edit.selected_unit_path.addLine(dx, dy);
    return updateLayerSet(state);
  },
  [EDITOR__ADD_CUBIC]: (state, payload) => {
    const layer_to_edit = state.layer_set.layer_to_edit;
    const {dx1, dy1, dx2, dy2, dx, dy} = payload;
    layer_to_edit.selected_unit_path.addCubic(dx1, dy1, dx2, dy2, dx, dy);
    return updateLayerSet(state);
  },
  [EDITOR__ADD_SMOOTH_CUBIC]: (state, payload) => {
    const layer_to_edit = state.layer_set.layer_to_edit;
    const {dx2, dy2, dx, dy} = payload;
    layer_to_edit.selected_unit_path.addSmoothCubic(dx2, dy2, dx, dy);
    return updateLayerSet(state);
  },
  [EDITOR__ADD_QUADRATIC]: (state, payload) => {
    const layer_to_edit = state.layer_set.layer_to_edit;
    const {dx1, dy1, dx, dy} = payload;
    layer_to_edit.selected_unit_path.addQuadratic(dx1, dy1, dx, dy);
    return updateLayerSet(state);
  },
  [EDITOR__ADD_SMOOTH_QUADRATIC]: (state, payload) => {
    const layer_to_edit = state.layer_set.layer_to_edit;
    const {dx, dy} = payload;
    layer_to_edit.selected_unit_path.addSmoothQuadratic(dx, dy);
    return updateLayerSet(state);
  },
  [EDITOR__TOGGLE_ENCLOSURE]: (state, payload) => {
    const layer_to_edit = state.layer_set.layer_to_edit;
    layer_to_edit.selected_unit_path.toggleEnclosure();
    return updateLayerSet(state);
  },
  [EDITOR__REPOSITION_POINT]: (state, payload) => {
    const layer_to_edit = state.layer_set.layer_to_edit;
    const {dx, dy} = payload;
    layer_to_edit.selected_unit_path.repositionTail(dx, dy);
    return updateLayerSet(state);
  },
  [EDITOR__REPOSITION_UNIT_PATH]: (state, payload) => {
    const layer_to_edit = state.layer_set.layer_to_edit;
    const {dx, dy} = payload;
    layer_to_edit.selected_unit_path.reposition(dx, dy);
    return updateLayerSet(state);
  },
  [EDITOR__REPOSITION_FIRST_CONTROL_PT]: (state, payload) => {
    const layer_to_edit = state.layer_set.layer_to_edit;
    const {dx, dy} = payload;
    layer_to_edit.selected_unit_path.repositionFirstControlPoint(dx, dy);
    return updateLayerSet(state);
  },
  [EDITOR__REPOSITION_SECOND_CONTROL_PT]: (state, payload) => {
    const layer_to_edit = state.layer_set.layer_to_edit;
    const {dx, dy} = payload;
    layer_to_edit.selected_unit_path.repositionSecondControlPoint(dx, dy);
    return updateLayerSet(state);
  },
  [EDITOR__DELETE_ELEMENT]: (state, payload) => {
    const layer_to_edit = state.layer_set.layer_to_edit;
    layer_to_edit.selected_unit_path.deleteElement();
    return updateLayerSet(state);
  },
  [LAYERS__SET_STROKE_WIDTH]: (state, payload) => {
    const layer = state.layer_set.layers[payload.idx];
    layer.stroke_width = payload.stroke_width;
    return updateLayerSet(state);
  },
  [LAYERS__SET_STROKE]: (state, payload) => {
    const layer = state.layer_set.layers[payload.idx];
    layer.stroke = payload.hex;
    layer.stroke_opacity = payload.alpha;
    return updateLayerSet(state);
  },
  [LAYERS__SET_FILL]: (state, payload) => {
    const layer = state.layer_set.layers[payload.idx];
    layer.fill = payload.hex;
    layer.fill_opacity = payload.alpha;
    return updateLayerSet(state);
  },
  [LAYERS__REPOSITION_LAYER]: (state, payload) => {
    state.layer_set.repositionLayer(payload.source_idx, payload.target_idx);
    return updateLayerSet(state);
  }
});
