import React, { Component } from "react";
import { connect } from "react-redux";

class PreviewingCanvas extends Component {
  render() {
    const {width, height} = this.props.canvas_dimensions;

    return (
      <div className="previewing-canvas">
        {this.props.layer_set.getSVG(width, height)}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  layer_set: state.layers.layer_set,
  canvas_dimensions: state.canvas.dimensions
});

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(PreviewingCanvas);
