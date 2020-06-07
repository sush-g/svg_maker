import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { HotKeys, configure as hotkeys_configure } from "react-hotkeys";
import { to_opacity_float, wrap_svg } from "../utils";
import { editor__set_layer_dimensions, editor__add_new_unit_path, editor__add_line,
         editor__toggle_enclosure, editor__reposition_point, editor__delete_element
       } from '../redux/actions';
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
      ADD_LINE: "l",
      TOGGLE_ENCLOSURE: "z",
      REPOSITION_UP_SMALL: "up",
      REPOSITION_UP_BIG: "shift+up",
      REPOSITION_DOWN_SMALL: "down",
      REPOSITION_DOWN_BIG: "shift+down",
      REPOSITION_LEFT_SMALL: "left",
      REPOSITION_LEFT_BIG: "shift+left",
      REPOSITION_RIGHT_SMALL: "right",
      REPOSITION_RIGHT_BIG: "shift+right",
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
      REPOSITION_UP_SMALL: event => {
        event.preventDefault();
        console.log('REPOSITION_UP_SMALL');
        this.props.editor__reposition_point(0, -1);
      },
      REPOSITION_UP_BIG: event => {
        event.preventDefault();
        console.log('REPOSITION_UP_BIG');
        this.props.editor__reposition_point(0, -10);
      },
      REPOSITION_DOWN_SMALL: event => {
        event.preventDefault();
        console.log('REPOSITION_DOWN_SMALL');
        this.props.editor__reposition_point(0, 1);
      },
      REPOSITION_DOWN_BIG: event => {
        event.preventDefault();
        console.log('REPOSITION_DOWN_BIG');
        this.props.editor__reposition_point(0, 10);
      },
      REPOSITION_LEFT_SMALL: event => {
        event.preventDefault();
        console.log('REPOSITION_LEFT_SMALL');
        this.props.editor__reposition_point(-1, 0);
      },
      REPOSITION_LEFT_BIG: event => {
        event.preventDefault();
        console.log('REPOSITION_LEFT_BIG');
        this.props.editor__reposition_point(-10, 0);
      },
      REPOSITION_RIGHT_SMALL: event => {
        event.preventDefault();
        console.log('REPOSITION_RIGHT_SMALL');
        this.props.editor__reposition_point(1, 0);
      },
      REPOSITION_RIGHT_BIG: event => {
        event.preventDefault();
        console.log('REPOSITION_RIGHT_BIG');
        this.props.editor__reposition_point(10, 0);
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
  editor__add_new_unit_path,
  editor__add_line,
  editor__toggle_enclosure,
  editor__delete_element
}

export default connect(mapStateToProps, mapDispatchToProps)(EditingCanvas);
