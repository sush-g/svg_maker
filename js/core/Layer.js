import React from "react";
import { findIndex } from "lodash";
import { SVG_STROKE_LINECAP } from '../constants';
import UnitPath from './UnitPath';
import { safe_mod } from '../utils';


export default class Layer {
  constructor(fill='#000', stroke='#000', stroke_width=1,
              stroke_linecap=SVG_STROKE_LINECAP.round,
              fill_opacity=0, stroke_opacity=1) {
    this._unit_paths = [];
    this._fill = fill;
    this._fill_opacity = fill_opacity;
    this._stroke = stroke;
    this._stroke_opacity = stroke_opacity;
    this._stroke_width = stroke_width;
    this._stroke_linecap = stroke_linecap;
    this._selected_unit_path_idx = -1;
    this.addUnitPath();
  }

  get stroke_width() {
    return this._stroke_width;
  }

  get stroke() {
    return this._stroke;
  }

  get stroke_opacity() {
    return this._stroke_opacity;
  }

  get fill() {
    return this._fill;
  }

  get fill_opacity() {
    return this._fill_opacity;
  }

  get stroke_linecap() {
    return this._stroke_linecap;
  }

  set stroke_width(new_width) {
    this._stroke_width = new_width;
  }

  set stroke(new_hex) {
    this._stroke = new_hex;
  }

  set fill(new_hex) {
    this._fill = new_hex;
  }

  set stroke_opacity(new_opacity) {
    this._stroke_opacity = new_opacity;
  }

  set fill_opacity(new_opacity) {
    this._fill_opacity = new_opacity;
  }

  set stroke_linecap(new_linecap) {
    this._stroke_linecap = new_linecap;
  }

  get selected_unit_path() {
    return this._unit_paths[this._selected_unit_path_idx];
  }

  selectUnitPath(pos_delta) {
    this._selected_unit_path_idx = this._unit_paths.length === 0 ? -1:
      safe_mod(this._selected_unit_path_idx + pos_delta, this._unit_paths.length);
  }

  addUnitPath() {
    if (this.selected_unit_path && !this.selected_unit_path.hasElements()) return;
    const new_unit_path = new UnitPath(this);
    new_unit_path.starting_cursor = this.selected_unit_path ?
                                    this.selected_unit_path.terminal_cursor : {x: 0, y: 0};
    this._unit_paths.splice(this._selected_unit_path_idx+1, 0, new_unit_path);
    this.selectUnitPath(1);
  }

  deleteUnitPath(unit_path) {
    const index_to_rm = findIndex(this._unit_paths, (o) => {return o == unit_path;});
    this._unit_paths.splice(index_to_rm, 1);
    if (index_to_rm <= this._selected_unit_path_idx) {
      this.selectUnitPath(-1);
    }
    if (this._unit_paths.length === 0) {
      this.addUnitPath();
    }
  }

  getLastElementRenderCode() {
    const selected_unit_path = this.selected_unit_path;
    return selected_unit_path && selected_unit_path.getLastElementRenderCode();
  }

  _getDrawingString() {
    return this._unit_paths.map(unit_path => unit_path.render()).join(' ');
  }

  getPathString() {
    const d = this._getDrawingString();
    return [`<path d="${d}" fill="${this._fill}" stroke="${this._stroke}"`,
            `stroke-opacity="${this._stroke_opacity}" fill-opacity="${this._fill_opacity}"`,
            `stroke-width="${this._stroke_width}" stroke-linecap="${this._stroke_linecap}" />`
    ].join(' ');
  }

  getPathCode() {
    const d = this._getDrawingString();
    return <path d={d} fill={this._fill} stroke={this._stroke} strokeOpacity={this._stroke_opacity}
                       fillOpacity={this._fill_opacity} strokeWidth={this._stroke_width}
                       strokeLinecap={this._stroke_linecap} />;
  }

  getGuideCode() {
    const selected_unit_path = this.selected_unit_path;
    return selected_unit_path && selected_unit_path.render_guide(this);
  }
}
