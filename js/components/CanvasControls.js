import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { CANVAS_MODES } from '../constants';
import { canvas__set_mode, canvas__set_ref_image, canvas__set_ref_image_opacity } from '../redux/actions';


class CanvasControls extends Component {
  handleModeSelect(e) {
    this.props.canvas__set_mode(e.target.value);
  }

  handleRefImgInput(e) {
    this.props.canvas__set_ref_image(e.target.value);
  }

  handleRefImgOpacityInput(e) {
    let input_val = e.target.value;
    this.props.canvas__set_ref_image_opacity(input_val);
  }

  renderModeOptions() {
    return (
      <select value={this.props.mode} onChange={this.handleModeSelect.bind(this)}>
        <option value={CANVAS_MODES.edit}>
          Edit
        </option>
        <option value={CANVAS_MODES.preview}>
          Preview
        </option>
      </select>
    )
  }

  render() {
    return (
      <div className="canvas-controls">
        <div>
          <span>Ref Image:</span>
          <input type="text" value={this.props.ref_img_src} onChange={this.handleRefImgInput.bind(this)}/>
        </div>
        <div>
          <span>Ref Image Opacity:</span>
          <input type="text" value={this.props.ref_img_opacity} onChange={this.handleRefImgOpacityInput.bind(this)} />
        </div>
        <div>
          <span>Mode:</span>
          {this.renderModeOptions()}
        </div>
      </div>
    );
  }
}

CanvasControls.propTypes = {
  mode: PropTypes.string,
  ref_img_src: PropTypes.string,
  ref_img_opacity: PropTypes.string,
  canvas__set_mode: PropTypes.func,
  canvas__set_ref_image: PropTypes.func,
  canvas__set_ref_image_opacity: PropTypes.func
}

const mapStateToProps = (state, props) => ({
  mode: state.canvas.mode,
  ref_img_src: state.canvas.ref_img_src,
  ref_img_opacity: state.canvas.ref_img_opacity
});

const mapDispatchToProps = {
  canvas__set_mode,
  canvas__set_ref_image,
  canvas__set_ref_image_opacity
};

export default connect(mapStateToProps, mapDispatchToProps)(CanvasControls);
