import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { MODES } from '../constants';
import { controls__set_mode, controls__set_ref_image, controls__set_ref_image_opacity } from '../redux/actions';


class ControlsPane extends Component {
  handleModeSelect(e) {
    this.props.controls__set_mode(e.target.value);
  }

  handleRefImgInput(e) {
    this.props.controls__set_ref_image(e.target.value);
  }

  handleRefImgOpacityInput(e) {
    let input_val = e.target.value;
    this.props.controls__set_ref_image_opacity(input_val);
  }

  renderModeOptions() {
    return (
      <select value={this.props.mode} onChange={this.handleModeSelect.bind(this)}>
        <option value={MODES.edit}>
          Edit
        </option>
        <option value={MODES.preview}>
          Preview
        </option>
      </select>
    )
  }

  render() {
    return (
      <div className="controls-pane">
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

ControlsPane.propTypes = {
  mode: PropTypes.string,
  ref_img_src: PropTypes.string,
  ref_img_opacity: PropTypes.string,
  controls__set_mode: PropTypes.func,
  controls__set_ref_image: PropTypes.func,
  controls__set_ref_image_opacity: PropTypes.func
}

const mapStateToProps = (state, props) => ({
  mode: state.controls.mode,
  ref_img_src: state.controls.ref_img_src,
  ref_img_opacity: state.controls.ref_img_opacity
});

const mapDispatchToProps = {
  controls__set_mode,
  controls__set_ref_image,
  controls__set_ref_image_opacity
};

export default connect(mapStateToProps, mapDispatchToProps)(ControlsPane);
