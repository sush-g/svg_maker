import { parse as _parseSVG } from 'svg-parser';
import parseSVGd from 'svg-path-parser';
import LayerSet from './LayerSet';
import UnitPath from './UnitPath';


export default class SVGImporter {
  constructor(svg_code) {
    this._svg_code = svg_code;
  }

  _getPaths() {
    const paths = [];
    const parsed = _parseSVG(this._svg_code);
    const q = [];
    let curr;
    q.push(parsed);
    while (q.length !== 0) {
      curr = q.shift();
      if (curr.type === "element" && curr.tagName === "path") {
        paths.push(curr);
      }
      curr.children && curr.children.forEach((child, idx) => {
        q.push(child);
      });
    }
    return paths;
  }

  _setUnitPaths(d_cmds, layer) {
    d_cmds.forEach((cmd, idx) => {
      if (cmd.code === 'M') {
        layer.addUnitPath();
      }
      layer.selected_unit_path.execDrawCmd(cmd);
    });
  }

  // Set drawing attributes on layer given `d` attribute in SVG path element
  _setDrawing(layer, d) {
    const d_cmds = parseSVGd(d);
    this._setUnitPaths(d_cmds, layer);
  }

  getLayerSet() {
    const paths = this._getPaths();
    const layer_set = new LayerSet();
    let curr_layer;
    paths.forEach((path, idx) => {
      curr_layer = layer_set.layer_to_edit;
      curr_layer.fill = path.properties['fill'] || curr_layer.fill;
      curr_layer.stroke = path.properties['stroke'] || curr_layer.stroke;
      curr_layer.fill_opacity = path.properties['fill-opacity'] || curr_layer.fill_opacity;
      curr_layer.stroke_opacity = path.properties['stroke-opacity'] || curr_layer.stroke_opacity;
      curr_layer.stroke_linecap = path.properties['stroke-linecap'] || curr_layer.stroke_linecap;
      curr_layer.stroke_width = path.properties['stroke-width'] || curr_layer.stroke_width;
      this._setDrawing(curr_layer, path.properties['d']);
      if (idx < paths.length-1) {
        layer_set.addNewLayer();
      }
    });
    return layer_set;
  }
};
