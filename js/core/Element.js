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

export class AddLine extends MovableElement {
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

export class ClosePath {
  render() {
    return `z`;
  }
}
