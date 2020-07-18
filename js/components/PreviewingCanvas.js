import React, { Component } from "react";
import { connect } from "react-redux";

class PreviewingCanvas extends Component {
  render() {
    const {width, height} = this.props.layer_dimensions;

    return (
      <div className="previewing-canvas">
        {this.props.layer_set.getSVG(width, height)}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  layer_set: state.layers.layer_set,
  layer_dimensions: state.editor.layer_dimensions
});

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(PreviewingCanvas);
