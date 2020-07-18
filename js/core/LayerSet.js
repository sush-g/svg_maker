import Layer from './Layer';
import { safe_mod } from '../utils';

export default class LayerSet {
  constructor() {
    this._layers = [];
    this._layer_idx_to_edit = -1;
    this.addNewLayer();
  }

  get layers() {
    return this._layers;
  }

  get layer_to_edit() {
    return this._layers[this._layer_idx_to_edit];
  }

  set layer_idx_to_edit(new_idx) {
    this._layer_idx_to_edit = safe_mod(new_idx, this._layers.length);
  }

  addNewLayer() {
    this._layers.push(new Layer());
    this._layer_idx_to_edit = this._layers.length - 1;
  }

  deleteLayerAtIdx(idx) {
    const to_delete_idx = safe_mod(idx, this._layers.length);
    this._layers.splice(to_delete_idx, 1);
    if (this._layer_idx_to_edit >= to_delete_idx) {
      this._layer_idx_to_edit--;
    }
    if (this._layers.length === 0) {
      this.addNewLayer();
    }
  }

  repositionLayer(source_idx, target_idx) {
    const safe_source_idx = safe_mod(source_idx, this._layers.length);
    const safe_target_idx = safe_mod(target_idx, this._layers.length);
    const layer = this._layers[safe_source_idx];
    this._layers.splice(safe_source_idx, 1);
    this._layers.splice(safe_target_idx, 0, layer);
    if (this._layer_idx_to_edit === safe_source_idx) {
      this.layer_idx_to_edit = safe_target_idx;
    }
  }
}
