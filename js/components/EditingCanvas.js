import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { HotKeys, configure as hotkeys_configure } from "react-hotkeys";
import { to_opacity_float, wrap_svg } from "../utils";
import { editor__set_layer_dimensions, editor__add_new_unit_path, editor__select_unit_path,
         editor__add_line, editor__toggle_enclosure, editor__reposition_point,
         editor__reposition_unit_path, editor__delete_element } from '../redux/actions';
import Layer from '../core/Layer';

hotkeys_configure({
  ignoreRepeatedEventsWhenKeyHeldDown: false
});

class EditingCanvas extends Component {
  constructor(props) {
    super(props);
    this._keyMap = this._getKeyMap();
    this._keyHandlers = this._getKeyHandlers();
  }

  _getKeyMap() {
    return {
      ADD_NEW_UNIT_PATH: "n",
      SELECT_PREV_UNIT_PATH: "shift+,",
      SELECT_NEXT_UNIT_PATH: "shift+.",
      ADD_LINE: "l",
      TOGGLE_ENCLOSURE: "z",
      REPOSITION: ["up", "down", "left", "right",
                   "alt+up", "alt+down", "alt+left", "alt+right",
                   "shift+up", "shift+down", "shift+left", "shift+right",
                   "shift+alt+up", "shift+alt+down", "shift+alt+left", "shift+alt+right"],
      DELETE: ["del", "backspace"]
    };
  }

  _getKeyHandlers() {
    return {
      ADD_NEW_UNIT_PATH: event => {
        event.preventDefault();
        console.log('ADD_NEW_UNIT_PATH');
        this.props.editor__add_new_unit_path();
      },
      SELECT_PREV_UNIT_PATH: event => {
        event.preventDefault();
        console.log('SELECT_PREV_UNIT_PATH');
        this.props.editor__select_unit_path(-1);
      },
      SELECT_NEXT_UNIT_PATH: event => {
        event.preventDefault();
        console.log('SELECT_NEXT_UNIT_PATH');
        this.props.editor__select_unit_path(1);
      },
      ADD_LINE: event => {
        event.preventDefault();
        console.log('ADD_LINE');
        this.props.editor__add_line(0, 0);
      },
      TOGGLE_ENCLOSURE: event => {
        event.preventDefault();
        console.log('TOGGLE_ENCLOSURE');
        this.props.editor__toggle_enclosure();
      },
      REPOSITION: event => {
        event.preventDefault();
        console.log('REPOSITION');
        let pos_delta = {
          "ArrowUp": [0, -1],
          "ArrowDown": [0, 1],
          "ArrowLeft": [-1, 0],
          "ArrowRight": [1, 0]
        }[event.key];
        pos_delta = event.shiftKey ? pos_delta.map(d => d*10) : pos_delta;
        event.altKey ? this.props.editor__reposition_unit_path(...pos_delta) :
                       this.props.editor__reposition_point(...pos_delta);
      },
      DELETE: event => {
        event.preventDefault();
        console.log('DELETE');
        this.props.editor__delete_element();
      }
    };
  }

  handleImgLoad(event) {
    this.props.editor__set_layer_dimensions(event.target.width, event.target.height);
  }

  render() {
    const ref_img_styles = {
      opacity: to_opacity_float(this.props.ref_img_opacity)
    };
    const {width, height} = this.props.layer_dimensions;
    const layer_styles = {
      width: width,
      height: height,
      border: width ? '1px solid #000': '0'
    };
    const selected_layer_obj = this.props.layer_objs[this.props.selected_layer_obj_idx];

    return (
      <HotKeys keyMap={this._keyMap} handlers={this._keyHandlers}>
        <div className="editing-canvas">
          <div className="ref-img-wrapper" style={ref_img_styles}>
            <img src={this.props.ref_img_src} onLoad={this.handleImgLoad.bind(this)}/>
          </div>
          <div className="layer-wrapper" style={layer_styles}>
            {selected_layer_obj ? wrap_svg([
              selected_layer_obj.getPathCode(),
              selected_layer_obj.getGuideCode()
            ], width, height): null}
          </div>
        </div>
      </HotKeys>
    );
  }
}

EditingCanvas.propTypes = {
  ref_img_src: PropTypes.string,
  ref_img_opacity: PropTypes.string,
  layer_objs: PropTypes.arrayOf(PropTypes.instanceOf(Layer)),
  selected_layer_obj_idx: PropTypes.number,
  layer_dimensions: PropTypes.object
};

const mapStateToProps = (state, props) => ({
  ref_img_src: state.controls.ref_img_src,
  ref_img_opacity: state.controls.ref_img_opacity,
  layer_objs: state.layers.layer_objs,
  selected_layer_obj_idx: state.layers.selected_layer_obj_idx,
  layer_dimensions: state.editor.layer_dimensions
});

const mapDispatchToProps = {
  editor__set_layer_dimensions,
  editor__reposition_point,
  editor__reposition_unit_path,
  editor__add_new_unit_path,
  editor__select_unit_path,
  editor__add_line,
  editor__toggle_enclosure,
  editor__delete_element
}

export default connect(mapStateToProps, mapDispatchToProps)(EditingCanvas);
