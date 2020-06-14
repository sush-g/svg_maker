import React from "react";
import { SVG_STROKE_LINECAP } from '../constants';
import UnitPath from './UnitPath';
import { safe_mod } from '../utils';

export default class Layer {
  constructor(fill='transparent', stroke='#000', stroke_width=1,
              stroke_linecap=SVG_STROKE_LINECAP.round) {
    this._unit_paths = [];
    this._fill = fill;
    this._stroke = stroke;
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

  get fill() {
    return this._fill;
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

  get stroke_linecap() {
    return this._stroke_linecap;
  }

  _getSelectedUnitPath() {
    return this._unit_paths[this._selected_unit_path_idx];
  }

  selectUnitPath(pos_delta) {
    this._selected_unit_path_idx = this._unit_paths.length === 0 ? -1:
      safe_mod(this._selected_unit_path_idx + pos_delta, this._unit_paths.length);
  }

  addUnitPath() {
    const selected_unit_path = this._getSelectedUnitPath();
    if (selected_unit_path && !selected_unit_path.hasElements()) return;
    const new_unit_path = new UnitPath();
    new_unit_path.starting_cursor = selected_unit_path ? selected_unit_path.terminal_cursor : {x: 0, y: 0};
    this._unit_paths.splice(this._selected_unit_path_idx+1, 0, new_unit_path);
    this.selectUnitPath(1);
  }

  addLine(dx, dy) {
    const selected_unit_path = this._getSelectedUnitPath();
    selected_unit_path && selected_unit_path.addLine(dx, dy);
  }

  addCubic(dx1, dy1, dx2, dy2, dx, dy) {
    const selected_unit_path = this._getSelectedUnitPath();
    selected_unit_path && selected_unit_path.addCubic(dx1, dy1, dx2, dy2, dx, dy);
  }

  addSmoothCubic(dx2, dy2, dx, dy) {
    const selected_unit_path = this._getSelectedUnitPath();
    selected_unit_path && selected_unit_path.addSmoothCubic(dx2, dy2, dx, dy);
  }

  addQuadratic(dx1, dy1, dx, dy) {
    const selected_unit_path = this._getSelectedUnitPath();
    selected_unit_path && selected_unit_path.addQuadratic(dx1, dy1, dx, dy);
  }

  addSmoothQuadratic(dx, dy) {
    const selected_unit_path = this._getSelectedUnitPath();
    selected_unit_path && selected_unit_path.addSmoothQuadratic(dx, dy);
  }

  toggleEnclosure() {
    const selected_unit_path = this._getSelectedUnitPath();
    if (selected_unit_path) {
      selected_unit_path.enclosed ? selected_unit_path.openPath() : selected_unit_path.closePath();
    }
  }

  repositionTail(dx, dy) {
    const selected_unit_path = this._getSelectedUnitPath();
    selected_unit_path && selected_unit_path.repositionTail(dx, dy);
  }

  repositionUnitPath(dx, dy) {
    const selected_unit_path = this._getSelectedUnitPath();
    selected_unit_path && selected_unit_path.reposition(dx, dy);
  }

  repositionFirstControlPoint(dx, dy) {
    const selected_unit_path = this._getSelectedUnitPath();
    selected_unit_path && selected_unit_path.repositionFirstControlPoint(dx, dy);
  }

  repositionSecondControlPoint(dx, dy) {
    const selected_unit_path = this._getSelectedUnitPath();
    selected_unit_path && selected_unit_path.repositionSecondControlPoint(dx, dy);
  }

  deleteElement() {
    const selected_unit_path = this._getSelectedUnitPath();
    selected_unit_path && selected_unit_path.deleteElement();
    if (!selected_unit_path.hasElements()) {
      this._unit_paths.splice(this._selected_unit_path_idx, 1);
      this.selectUnitPath(-1);
    }
    if (this._unit_paths.length === 0) {
      this.addUnitPath();
    }
  }

  getLastElementRenderCode() {
    const selected_unit_path = this._getSelectedUnitPath();
    return selected_unit_path && selected_unit_path.getLastElementRenderCode();
  }

  getPathCode() {
    let d = this._unit_paths.map(unit_path => unit_path.render()).join(' ');
    return <path d={d} fill={this._fill} stroke={this._stroke}
                       strokeWidth={this._stroke_width} strokeLinecap={this._stroke_linecap} />;
  }

  getGuideCode() {
    const selected_unit_path = this._getSelectedUnitPath();
    return selected_unit_path && selected_unit_path.render_guide(this);
  }
}
