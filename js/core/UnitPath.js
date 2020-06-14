import React from "react";
import { MovableElement, MoveTo, Line, Cubic, SmoothCubic, Quadratic, SmoothQuadratic, ClosePath,
         has_first_control_pt, has_second_control_pt } from './Element';


const PIN_COLOR = "rgba(0,0,0,0.5)";

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
    const line = new Line(args);
    this._elements.push(line);
    this._updateRelCursor({dx, dy});
  }

  addCubic(dx1, dy1, dx2, dy2, dx, dy) {
    const args = {
      start_x: this._rel_cursor.x,
      start_y: this._rel_cursor.y,
      dx1: dx1,
      dy1: dy1,
      dx2: dx2,
      dy2: dy2,
      dx: dx,
      dy: dy
    };
    const cubic = new Cubic(args);
    this._elements.push(cubic);
    this._updateRelCursor({dx, dy});
  }

  addSmoothCubic(dx2, dy2, dx, dy) {
    const args = {
      start_x: this._rel_cursor.x,
      start_y: this._rel_cursor.y,
      dx2: dx2,
      dy2: dy2,
      dx: dx,
      dy: dy
    };
    const smooth_cubic = new SmoothCubic(args);
    this._elements.push(smooth_cubic);
    this._updateRelCursor({dx, dy});
  }

  addQuadratic(dx1, dy1, dx, dy) {
    const args = {
      start_x: this._rel_cursor.x,
      start_y: this._rel_cursor.y,
      dx1: dx1,
      dy1: dy1,
      dx: dx,
      dy: dy
    };
    const quadratic = new Quadratic(args);
    this._elements.push(quadratic);
    this._updateRelCursor({dx, dy});
  }

  addSmoothQuadratic(dx, dy) {
    const args = {
      start_x: this._rel_cursor.x,
      start_y: this._rel_cursor.y,
      dx: dx,
      dy: dy
    };
    const smooth_quadratic = new SmoothQuadratic(args);
    this._elements.push(smooth_quadratic);
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

  repositionFirstControlPoint(dx, dy) {
    const last_element = this._elements[this._elements.length-1];
    if (has_first_control_pt(last_element)) {
      last_element.dx1 += dx;
      last_element.dy1 += dy;
    } else if (!has_first_control_pt(last_element) && has_second_control_pt(last_element)) {
      last_element.dx2 += dx;
      last_element.dy2 += dy;
    }
  }

  repositionSecondControlPoint(dx, dy) {
    const last_element = this._elements[this._elements.length-1];
    if (has_second_control_pt(last_element)) {
      last_element.dx2 += dx;
      last_element.dy2 += dy;
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

  getLastElementRenderCode() {
    const last_element = this._elements[this._elements.length-1];
    if (last_element) {
      const abs_start_x = this._starting_cursor.x+last_element.start_x;
      const abs_start_y = this._starting_cursor.y+last_element.start_y;
      return `[${abs_start_x}, ${abs_start_y}] ${last_element.render()}`;
    }
  }

  render() {
    let elements = [this._moveTo(), ...this._elements];
    if (this._enclosed) {
      elements.push(new ClosePath());
    }
    return elements.map(elem => elem.render()).join(' ');
  }

  renderControlPointGuide() {
    const control_clr = "rgba(255,255,255,0.5)";
    const control_pt_radius = 3;
    const last_element = this._elements[this._elements.length-1];
    let last_element_start_x = null;
    let last_element_start_y = null;
    let first_control_pt = null;
    let second_control_pt = null;
    let start_line = null;
    let end_line = null;
    if (last_element instanceof MovableElement) {
      last_element_start_x = this._starting_cursor.x + last_element.start_x;
      last_element_start_y = this._starting_cursor.y + last_element.start_y;
    }
    if (has_first_control_pt(last_element)) {
      first_control_pt = <circle cx={last_element_start_x+last_element.dx1}
                                 cy={last_element_start_y+last_element.dy1}
                                 r={control_pt_radius}/>;
      start_line = <line x1={last_element_start_x}
                         y1={last_element_start_y}
                         x2={last_element_start_x+last_element.dx1}
                         y2={last_element_start_y+last_element.dy1}
                         stroke-dasharray="4" />;
    }
    if (has_second_control_pt(last_element)) {
      second_control_pt = <circle cx={last_element_start_x+last_element.dx2}
                                  cy={last_element_start_y+last_element.dy2}
                                  r={control_pt_radius}/>;
      end_line = <line x1={last_element_start_x+last_element.dx}
                       y1={last_element_start_y+last_element.dy}
                       x2={last_element_start_x+last_element.dx2}
                       y2={last_element_start_y+last_element.dy2}
                       stroke-dasharray="4" />;
    }
    if (first_control_pt && !second_control_pt) {
      end_line = <line x1={last_element_start_x+last_element.dx}
                       y1={last_element_start_y+last_element.dy}
                       x2={last_element_start_x+last_element.dx1}
                       y2={last_element_start_y+last_element.dy1}
                       stroke-dasharray="4" />;
    }
    return <g stroke={PIN_COLOR} fill={control_clr}>
      {first_control_pt}
      {second_control_pt}
      {start_line}
      {end_line}
    </g>;
  }

  render_guide(ref_layer) {
    const radius = 5;
    const pin_length = 10;
    const marker_v_delta = pin_length + radius;
    const terminal_cursor = this.terminal_cursor;
    const start_clr = "rgba(76,175,80,0.5)";
    const terminal_clr = "rgba(255,87,34,0.5)";

    return (<g strokeWidth="1">
        <circle cx={this._starting_cursor.x} cy={this._starting_cursor.y - marker_v_delta}
                    r={radius} stroke={PIN_COLOR} fill={start_clr} />
        <path d={`M ${this._starting_cursor.x} ${this._starting_cursor.y} v ${-pin_length}`}
              stroke={PIN_COLOR} />
        <circle cx={terminal_cursor.x} cy={terminal_cursor.y - marker_v_delta}
                    r={radius} stroke={PIN_COLOR} fill={terminal_clr} />
        <path d={`M ${terminal_cursor.x} ${terminal_cursor.y} v ${-pin_length}`}
              stroke={PIN_COLOR} />
        {this.renderControlPointGuide()}
      </g>
    );
  }
}
