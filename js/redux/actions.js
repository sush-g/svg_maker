import keyMirror from 'keymirror';

export const APP__SET_SUB_APP = 'APP__SET_SUB_APP';

export const CANVAS__SET_MODE = 'CANVAS__SET_MODE';
export const CANVAS__SET_REF_IMAGE = 'CANVAS__SET_REF_IMAGE';
export const CANVAS__SET_REF_IMAGE_OPACITY = 'CANVAS__SET_REF_IMAGE_OPACITY';
export const CANVAS__SET_DIMENSIONS = 'CANVAS__SET_DIMENSIONS';

export const EDITOR__ADD_NEW_UNIT_PATH = 'EDITOR__ADD_NEW_UNIT_PATH';
export const EDITOR__SELECT_UNIT_PATH = 'EDITOR__SELECT_UNIT_PATH';
export const EDITOR__ADD_LINE = 'EDITOR__ADD_LINE';
export const EDITOR__ADD_CUBIC = 'EDITOR__ADD_CUBIC';
export const EDITOR__ADD_SMOOTH_CUBIC = 'EDITOR__ADD_SMOOTH_CUBIC';
export const EDITOR__ADD_QUADRATIC = 'EDITOR__ADD_QUADRATIC';
export const EDITOR__ADD_SMOOTH_QUADRATIC = 'EDITOR__ADD_SMOOTH_QUADRATIC';
export const EDITOR__TOGGLE_ENCLOSURE = 'EDITOR__TOGGLE_ENCLOSURE';
export const EDITOR__REPOSITION_POINT = 'EDITOR__REPOSITION_POINT';
export const EDITOR__REPOSITION_UNIT_PATH = 'EDITOR__REPOSITION_UNIT_PATH';
export const EDITOR__REPOSITION_FIRST_CONTROL_PT = 'EDITOR__REPOSITION_FIRST_CONTROL_PT';
export const EDITOR__REPOSITION_SECOND_CONTROL_PT = 'EDITOR__REPOSITION_SECOND_CONTROL_PT';
export const EDITOR__DELETE_ELEMENT = 'EDITOR__DELETE_ELEMENT';

export const LAYERS__ADD_LAYER = 'LAYERS__ADD_LAYER';
export const LAYERS__DELETE_LAYER = 'LAYERS__DELETE_LAYER';
export const LAYERS__SELECT_LAYER = 'LAYERS__SELECT_LAYER';
export const LAYERS__SET_STROKE_WIDTH = 'LAYERS__SET_STROKE_WIDTH';
export const LAYERS__SET_STROKE = 'LAYERS__SET_STROKE';
export const LAYERS__SET_FILL = 'LAYERS__SET_FILL';
export const LAYERS__REPOSITION_LAYER = 'LAYERS__REPOSITION_LAYER';


export const app__set_sub_app = sub_app => ({
  type: APP__SET_SUB_APP,
  payload: sub_app
});

export const canvas__set_mode = mode => ({
  type: CANVAS__SET_MODE,
  payload: mode
});

export const canvas__set_ref_image = ref_img_src => ({
  type: CANVAS__SET_REF_IMAGE,
  payload: ref_img_src
});

export const canvas__set_ref_image_opacity = ref_img_opacity => ({
  type: CANVAS__SET_REF_IMAGE_OPACITY,
  payload: ref_img_opacity
});

export const canvas__set_dimensions = (width, height) => ({
  type: CANVAS__SET_DIMENSIONS,
  payload: {width: width, height: height}
});

export const editor__add_new_unit_path = (dx=0, dy=0) => ({
  type: EDITOR__ADD_NEW_UNIT_PATH,
  payload: {dx: dx, dy: dy}
});

export const editor__select_unit_path = pos_delta => ({
  type: EDITOR__SELECT_UNIT_PATH,
  payload: pos_delta
});

export const editor__add_line = (dx, dy) => ({
  type: EDITOR__ADD_LINE,
  payload: {dx: dx, dy: dy}
});

export const editor__add_cubic = (dx1, dy1, dx2, dy2, dx, dy) => ({
  type: EDITOR__ADD_CUBIC,
  payload: {
    dx1: dx1, dy1: dy1,
    dx2: dx2, dy2: dy2,
    dx: dx, dy: dy
  }
});

export const editor__add_smooth_cubic = (dx2, dy2, dx, dy) => ({
  type: EDITOR__ADD_SMOOTH_CUBIC,
  payload: {
    dx2: dx2, dy2: dy2,
    dx: dx, dy: dy
  }
});

export const editor__add_quadratic = (dx1, dy1, dx, dy) => ({
  type: EDITOR__ADD_QUADRATIC,
  payload: {
    dx1: dx1, dy1: dy1,
    dx: dx, dy: dy
  }
});

export const editor__add_smooth_quadratic = (dx, dy) => ({
  type: EDITOR__ADD_SMOOTH_QUADRATIC,
  payload: {dx: dx, dy: dy}
});

export const editor__toggle_enclosure = () => ({
  type: EDITOR__TOGGLE_ENCLOSURE,
  payload: null
});

export const editor__delete_element = () => ({
  type: EDITOR__DELETE_ELEMENT,
  payload: null
});

export const editor__reposition_point = (dx, dy) => ({
  type: EDITOR__REPOSITION_POINT,
  payload: {dx: dx, dy: dy}
});

export const editor__reposition_unit_path = (dx, dy) => ({
  type: EDITOR__REPOSITION_UNIT_PATH,
  payload: {dx: dx, dy: dy}
});

export const editor__reposition_first_control_pt = (dx, dy) => ({
  type: EDITOR__REPOSITION_FIRST_CONTROL_PT,
  payload: {dx: dx, dy: dy}
});

export const editor__reposition_second_control_pt = (dx, dy) => ({
  type: EDITOR__REPOSITION_SECOND_CONTROL_PT,
  payload: {dx: dx, dy: dy}
});

export const layers__add_layer = () => ({
  type: LAYERS__ADD_LAYER,
  payload: null
});

export const layers__delete_layer = idx => ({
  type: LAYERS__DELETE_LAYER,
  payload: idx
});

export const layers__select_layer = idx => ({
  type: LAYERS__SELECT_LAYER,
  payload: idx
});

export const layers__set_stroke_width = (idx, stroke_width) => ({
  type: LAYERS__SET_STROKE_WIDTH,
  payload: {idx: idx, stroke_width: stroke_width}
});

export const layers__set_stroke = (idx, hex, alpha) => ({
  type: LAYERS__SET_STROKE,
  payload: {idx: idx, hex: hex, alpha: alpha}
});

export const layers__set_fill = (idx, hex, alpha) => ({
  type: LAYERS__SET_FILL,
  payload: {idx: idx, hex: hex, alpha: alpha}
});

export const layers__reposition_layer = (source_idx, target_idx) => ({
  type: LAYERS__REPOSITION_LAYER,
  payload: {source_idx: source_idx, target_idx: target_idx}
});
