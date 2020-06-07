import { map } from 'lodash';
import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { layers__add_layer, layers__select_layer, layers__set_stroke_width, layers__set_stroke,
         layers__set_fill } from '../redux/actions';
import ColorDropdown from './ColorDropdown';
import Layer from '../core/Layer';

class LayersPane extends Component {
  handleAddLayer(e) {
    this.props.layers__add_layer();
  }

  handleSelectLayer(idx, e) {
    this.props.layers__select_layer(idx);
  }

  handleStrokeWidthInput(layer_obj, idx, e) {
    const val = e.target.value;
    this.props.layers__set_stroke_width(idx, val);
  }

  handleStrokeInput(layer_obj, idx, color, e) {
    this.props.layers__set_stroke(idx, color.hex);
  }

  handleFillInput(layer_obj, idx, color, e) {
    this.props.layers__set_fill(idx, color.hex);
  }

  renderLayerControl(layer_obj, idx) {
    return (
      <div key={`layer-obj-${idx}`}>
        <span class="layer-label" onClick={this.handleSelectLayer.bind(this, idx)}>Layer {idx}</span>
        <label class="formfield-label">Stroke width:
          <input type="text" value={layer_obj.stroke_width} onChange={this.handleStrokeWidthInput.bind(this,layer_obj,idx)} />
        </label>
        <label class="formfield-label">Stroke:
          <ColorDropdown color={layer_obj.stroke} onColorPick={this.handleStrokeInput.bind(this, layer_obj, idx)} />
        </label>
        <label class="formfield-label">Fill:
          <ColorDropdown color={layer_obj.fill} onColorPick={this.handleFillInput.bind(this, layer_obj, idx)} />
        </label>
      </div>
    );
  }

  render() {
    let layers_jsx = map(
      this.props.layer_objs || [],
      (layer_obj, idx) => this.renderLayerControl(layer_obj, idx)
    );
    return (
      <div className="layers-pane">
        <a href="#" onClick={this.handleAddLayer.bind(this)}>Add layer</a>
        <div className="layer-objs">{layers_jsx}</div>
      </div>
    );
  }
}

LayersPane.propTypes = {
  layers: PropTypes.arrayOf(PropTypes.instanceOf(Layer)),
  layers__add_layer: PropTypes.func,
  layers__select_layer: PropTypes.func
}

const mapStateToProps = (state, props) => ({
  layer_objs: state.layers.layer_objs,
  selected_layer_obj_idx: state.layers.selected_layer_obj_idx
});

const mapDispatchToProps = {
  layers__add_layer,
  layers__select_layer,
  layers__set_stroke_width,
  layers__set_stroke,
  layers__set_fill
}

export default connect(mapStateToProps, mapDispatchToProps)(LayersPane);
