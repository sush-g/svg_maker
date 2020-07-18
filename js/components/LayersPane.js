import { map } from 'lodash';
import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { layers__add_layer, layers__delete_layer, layers__select_layer, layers__set_stroke_width,
         layers__set_stroke, layers__set_fill, layers__reposition_layer } from '../redux/actions';
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

  handleStrokeInput(layer_obj, idx, hex, alpha, e) {
    this.props.layers__set_stroke(idx, hex, alpha);
  }

  handleFillInput(layer_obj, idx, hex, alpha, e) {
    this.props.layers__set_fill(idx, hex, alpha);
  }

  handleDelete(idx, e) {
    e && e.preventDefault();
    const c = confirm(`You sure you want to delete layer ${idx}`);
    if (c) {
      this.props.layers__delete_layer(idx);
    }
  }

  handleMoveUp(idx, e) {
    e && e.preventDefault();
    this.props.layers__reposition_layer(idx, idx-1);
  }

  handleMoveDown(idx, e) {
    e && e.preventDefault();
    this.props.layers__reposition_layer(idx, idx+1);
  }

  renderLayerControl(layer_obj, idx) {
    return (
      <div key={`layer-obj-${idx}`}>
        <a class="formfield-link" href="#" onClick={this.handleMoveUp.bind(this, idx)}>&#x25B2;</a>
        <a class="formfield-link" href="#" onClick={this.handleMoveDown.bind(this, idx)}>&#x25BC;</a>
        <span class="layer-label" onClick={this.handleSelectLayer.bind(this, idx)}>Layer {idx}</span>
        <label class="formfield-label">Stroke width:
          <input type="text" value={layer_obj.stroke_width} onChange={this.handleStrokeWidthInput.bind(this,layer_obj,idx)} />
        </label>
        <label class="formfield-label">Stroke:
          <ColorDropdown hex={layer_obj.stroke} alpha={layer_obj.stroke_opacity}
                         onColorPick={this.handleStrokeInput.bind(this, layer_obj, idx)} />
        </label>
        <label class="formfield-label">Fill:
          <ColorDropdown hex={layer_obj.fill} alpha={layer_obj.fill_opacity}
                         onColorPick={this.handleFillInput.bind(this, layer_obj, idx)} />
        </label>
        <a class="formfield-link" href="#" onClick={this.handleDelete.bind(this, idx)}>&times;</a>
      </div>
    );
  }

  render() {
    let layers_jsx = map(
      this.props.layer_set.layers,
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
  layers__delete_layer: PropTypes.func,
  layers__select_layer: PropTypes.func
}

const mapStateToProps = (state, props) => ({
  layer_set: state.layers.layer_set,
});

const mapDispatchToProps = {
  layers__add_layer,
  layers__delete_layer,
  layers__select_layer,
  layers__set_stroke_width,
  layers__set_stroke,
  layers__set_fill,
  layers__reposition_layer
}

export default connect(mapStateToProps, mapDispatchToProps)(LayersPane);
