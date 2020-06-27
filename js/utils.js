import React from "react";

export const reducer = (default_state, action_handler_map) => {
  return (state, action) => {
    state = state || default_state;
    action = action || {type: null};
    const handler = action_handler_map[action.type] || (() => state);
    return handler(state, action.payload);
  }
};

export const to_opacity_float = (s) => {
  let f = parseFloat(s);
  return isNaN(f) ? 0 : f;
};

export const safe_mod = (num, n) => {
  return ((num%n)+n)%n;
};

export const wrap_svg = (svg_inner_jsx, width=100, height=100) => {
  return (<svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>{svg_inner_jsx}</svg>);
};

export const hex_to_rgb = (hex) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

const component_to_hex = (c) => {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
};

export const rgb_to_hex = (r, g, b) => {
  return "#" + component_to_hex(r) + component_to_hex(g) + component_to_hex(b);
};
