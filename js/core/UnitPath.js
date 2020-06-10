import React from "react";
import { MoveTo, AddLine, ClosePath } from './Element';


export default class UnitPath {
  constructor() {
    this._elements = [];
    this._starting_cursor = null;
    this._rel_cursor = {x: 0, y: 0};
    this._enclosed = false;
  }

  get starting_cursor() {
    return this._starting_cursor;
  }

  set starting_cursor({x, y}) {
    this._starting_cursor = {x, y};
  }

  get terminal_cursor() {
    if (this._enclosed) {
      return this.starting_cursor;
    } else {
      return {
        x: this._starting_cursor.x + this._rel_cursor.x,
        y: this._starting_cursor.y + this._rel_cursor.y
      };
    }
  }

  get enclosed() {
    return this._enclosed;
  }

  _updateRelCursor({dx, dy}) {
    this._rel_cursor.x += dx;
    this._rel_cursor.y += dy;
  }

  _moveTo() {
    const args = {
      start_x: this._starting_cursor.x,
      start_y: this._starting_cursor.y
    };
    return new MoveTo(args);
  }

  addLine(dx, dy) {
    const args = {
      start_x: this._rel_cursor.x,
      start_y: this._rel_cursor.y,
      dx: dx,
      dy: dy
    };
    const add_line = new AddLine(args);
    this._elements.push(add_line);
    this._updateRelCursor({dx, dy});
  }

  reposition(dx, dy) {
    this._starting_cursor.x += dx;
    this._starting_cursor.y += dy;
  }

  repositionTail(dx, dy) {
    const last_element = this._elements[this._elements.length-1];
    if (last_element) {
      last_element.dx += dx;
      last_element.dy += dy;
      this._updateRelCursor({dx, dy});
    } else {
      this.reposition(dx, dy);
    }
  }

  hasElements() {
    return this._elements.length > 0;
  }

  closePath() {
    this._enclosed = true;
  }

  openPath() {
    this._enclosed = false;
  }

  deleteElement() {
    const to_delete = this._elements[this._elements.length-1];
    if (to_delete) {
      const {dx, dy} = to_delete.getTerminal();
      this._updateRelCursor({dx: -dx, dy: -dy});
      this._elements.pop();
    }
  }

  render() {
    let elements = [this._moveTo(), ...this._elements];
    if (this._enclosed) {
      elements.push(new ClosePath());
    }
    return elements.map(elem => elem.render()).join(' ');
  }

  render_guide(ref_layer) {
    const radius = 5;
    const pin_length = 10;
    const marker_v_delta = pin_length + radius;
    const terminal_cursor = this.terminal_cursor;
    const start_clr = "rgb(76,175,80)";
    const terminal_clr = "rgb(255,87,34)";
    const pin_clr = "rgba(0,0,0,0.5)";
    return (<g strokeWidth="1">
        <circle cx={this._starting_cursor.x} cy={this._starting_cursor.y - marker_v_delta}
                    r={radius} stroke={pin_clr} fill={start_clr} />
        <path d={`M ${this._starting_cursor.x} ${this._starting_cursor.y} v ${-pin_length}`}
              stroke={pin_clr} />
        <circle cx={terminal_cursor.x} cy={terminal_cursor.y - marker_v_delta}
                    r={radius} stroke={pin_clr} fill={terminal_clr} />
        <path d={`M ${terminal_cursor.x} ${terminal_cursor.y} v ${-pin_length}`}
              stroke={pin_clr} />
      </g>
    );
  }
}
