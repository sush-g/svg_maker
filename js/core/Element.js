import React from "react";
import keyMirror from "keymirror";

export class MovableElement {
  constructor({start_x, start_y}) {
    this._start_x = start_x;
    this._start_y = start_y;
  }

  get start_x() {
    return this._start_x;
  }

  get start_y() {
    return this._start_y;
  }

  set start_x(new_x) {
    this._start_x = new_x;
  }

  set start_y(new_y) {
    this._start_y = new_y;
  }
}

export class MoveTo extends MovableElement {
  render() {
    return `M ${this._start_x} ${this._start_y}`;
  }
}

export class Line extends MovableElement {
  constructor({start_x, start_y, dx, dy}) {
    super({start_x, start_y});
    this._dx = dx;
    this._dy = dy;
  }

  get dx() {
    return this._dx;
  }

  get dy() {
    return this._dy;
  }

  set dx(new_dx) {
    this._dx = new_dx;
  }

  set dy(new_dy) {
    this._dy = new_dy;
  }

  render() {
    return `l ${this._dx} ${this._dy}`;
  }

  getTerminal() {
    return {
      dx: this._dx,
      dy: this._dy
    };
  }
}

export class Cubic extends MovableElement {
  constructor({start_x, start_y, dx1, dy1, dx2, dy2, dx, dy}) {
    super({start_x, start_y});
    this._dx1 = dx1;
    this._dy1 = dy1;
    this._dx2 = dx2;
    this._dy2 = dy2;
    this._dx = dx;
    this._dy = dy;
  }

  get dx() {
    return this._dx;
  }

  get dy() {
    return this._dy;
  }

  get dx1() {
    return this._dx1;
  }

  get dy1() {
    return this._dy1;
  }

  get dx2() {
    return this._dx2;
  }

  get dy2() {
    return this._dy2;
  }

  set dx(new_dx) {
    this._dx = new_dx;
  }

  set dy(new_dy) {
    this._dy = new_dy;
  }

  set dx1(new_dx) {
    this._dx1 = new_dx;
  }

  set dy1(new_dy) {
    this._dy1 = new_dy;
  }

  set dx2(new_dx) {
    this._dx2 = new_dx;
  }

  set dy2(new_dy) {
    this._dy2 = new_dy;
  }

  render() {
    return `c ${this._dx1} ${this._dy1} ${this._dx2} ${this._dy2} ${this._dx} ${this._dy}`;
  }

  getTerminal() {
    return {
      dx: this._dx,
      dy: this._dy
    };
  }
}

export class SmoothCubic extends MovableElement {
  constructor({start_x, start_y, dx1, dy1, dx2, dy2, dx, dy}) {
    super({start_x, start_y});
    this._dx1 = dx1;
    this._dy1 = dy1;
    this._dx2 = dx2;
    this._dy2 = dy2;
    this._dx = dx;
    this._dy = dy;
  }

  get dx() {
    return this._dx;
  }

  get dy() {
    return this._dy;
  }

  get dx2() {
    return this._dx2;
  }

  get dy2() {
    return this._dy2;
  }

  set dx(new_dx) {
    this._dx = new_dx;
  }

  set dy(new_dy) {
    this._dy = new_dy;
  }

  set dx2(new_dx) {
    this._dx2 = new_dx;
  }

  set dy2(new_dy) {
    this._dy2 = new_dy;
  }

  render() {
    return `s ${this._dx2} ${this._dy2} ${this._dx} ${this._dy}`;
  }

  getTerminal() {
    return {
      dx: this._dx,
      dy: this._dy
    };
  }
}

export class Quadratic extends MovableElement {
  constructor({start_x, start_y, dx1, dy1, dx, dy}) {
    super({start_x, start_y});
    this._dx1 = dx1;
    this._dy1 = dy1;
    this._dx = dx;
    this._dy = dy;
  }

  get dx() {
    return this._dx;
  }

  get dy() {
    return this._dy;
  }

  get dx1() {
    return this._dx1;
  }

  get dy1() {
    return this._dy1;
  }

  set dx(new_dx) {
    this._dx = new_dx;
  }

  set dy(new_dy) {
    this._dy = new_dy;
  }

  set dx1(new_dx) {
    this._dx1 = new_dx;
  }

  set dy1(new_dy) {
    this._dy1 = new_dy;
  }

  render() {
    return `q ${this._dx1} ${this._dy1} ${this._dx} ${this._dy}`;
  }

  getTerminal() {
    return {
      dx: this._dx,
      dy: this._dy
    };
  }
}

export class SmoothQuadratic extends MovableElement {
  constructor({start_x, start_y, dx, dy}) {
    super({start_x, start_y});
    this._dx = dx;
    this._dy = dy;
  }

  get dx() {
    return this._dx;
  }

  get dy() {
    return this._dy;
  }

  set dx(new_dx) {
    this._dx = new_dx;
  }

  set dy(new_dy) {
    this._dy = new_dy;
  }

  render() {
    return `t ${this._dx} ${this._dy}`;
  }

  getTerminal() {
    return {
      dx: this._dx,
      dy: this._dy
    };
  }
}

export class ClosePath {
  render() {
    return `z`;
  }
}

export const has_first_control_pt = (element) => {
  return element instanceof Quadratic || element instanceof Cubic;
};

export const has_second_control_pt = (element) => {
  return element instanceof Cubic || element instanceof SmoothCubic;
};
