import React from "react";
import { SVG_STROKE_LINECAP } from '../constants';
import UnitPath from './UnitPath';

export default class Layer {
  constructor(fill='transparent', stroke='#000', stroke_width=1,
              stroke_linecap=SVG_STROKE_LINECAP.round) {
    this._unit_paths = [];
    this._fill = fill;
    this._stroke = stroke;
    this._stroke_width = stroke_width;
    this._stroke_linecap = stroke_linecap;
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

  _getLastUnitPath() {
    return this._unit_paths[this._unit_paths.length-1];
  }

  addUnitPath() {
    const last_unit_path = this._getLastUnitPath();
    if (last_unit_path && !last_unit_path.hasElements(last_unit_path)) return;
    const new_unit_path = new UnitPath();
    new_unit_path.starting_cursor = last_unit_path ? last_unit_path.terminal_cursor : {x: 0, y: 0};
    this._unit_paths.push(new_unit_path);
  }

  addLine(dx, dy) {
    const last_unit_path = this._getLastUnitPath();
    last_unit_path && last_unit_path.addLine(dx, dy);
  }

  toggleEnclosure() {
    const last_unit_path = this._getLastUnitPath();
    if (last_unit_path) {
      last_unit_path.enclosed ? last_unit_path.openPath() : last_unit_path.closePath();
    }
  }

  reposition(dx, dy) {
    const last_unit_path = this._getLastUnitPath();
    last_unit_path && last_unit_path.repositionTail(dx, dy);
  }

  deleteElement() {
    const last_unit_path = this._getLastUnitPath();
    last_unit_path && last_unit_path.deleteElement();
    if (!last_unit_path.hasElements()) {
      this._unit_paths.splice(this._unit_paths.length-1, 1);
    }
    if (this._unit_paths.length === 0) {
      this.addUnitPath();
    }
  }

  getPathCode() {
    let d = this._unit_paths.map(unit_path => unit_path.render()).join(' ');
    return <path d={d} fill={this._fill} stroke={this._stroke}
                       strokeWidth={this._stroke_width} strokeLinecap={this._stroke_linecap} />;
  }

  getGuideCode() {
    const last_unit_path = this._getLastUnitPath();
    return last_unit_path.render_guide();
  }
}
