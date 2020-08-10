import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import CanvasControls from './CanvasControls';
import LayersPane from './LayersPane';
import PreviewingCanvas from './PreviewingCanvas';
import EditingCanvas from './EditingCanvas';

class Canvas extends Component {
  render() {
    return (
      <div className="canvas">
        <CanvasControls/>
        <LayersPane/>
        <EditingCanvas/>
      </div>
    );
  }
}

Canvas.propTypes = {
}

const mapStateToProps = (state, props) => ({
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
