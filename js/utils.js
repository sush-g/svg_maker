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
}

export const wrap_svg = (svg_inner_jsx, width=100, height=100) => {
  return (<svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>{svg_inner_jsx}</svg>);
}
