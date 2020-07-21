import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { CANVAS_MODES } from '../constants';
import CanvasControls from './CanvasControls';
import LayersPane from './LayersPane';
import PreviewingCanvas from './PreviewingCanvas';
import EditingCanvas from './EditingCanvas';

class Canvas extends Component {
  render() {
    let primary_zone;
    if (this.props.mode === CANVAS_MODES.preview) {
      primary_zone = <PreviewingCanvas/>;
    } else if (this.props.mode === CANVAS_MODES.edit) {
      primary_zone = <EditingCanvas/>;
    }
    return (
      <div className="canvas-sub-app">
        <CanvasControls/>
        <LayersPane/>
        <div className="primary-zone">
          { primary_zone }
        </div>
      </div>
    );
  }
}

Canvas.propTypes = {
  mode: PropTypes.string
}

const mapStateToProps = (state, props) => ({
  mode: state.canvas.mode
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
