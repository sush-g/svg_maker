import React, { Component } from "react";
import { connect } from "react-redux";

class ExportSVG extends Component {
  render() {
    const {width, height} = this.props.canvas_dimensions;
    return (
      <pre className="export">
        {this.props.layer_set.getSVGString(width, height)}
      </pre>
    );
  }
}

const mapStateToProps = (state, props) => ({
  layer_set: state.layers.layer_set,
  canvas_dimensions: state.canvas.dimensions
});

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(ExportSVG);
