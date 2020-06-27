import React, { Component } from "react";
import { SketchPicker } from 'react-color';
import PropTypes from 'prop-types';
import { hex_to_rgb } from '../utils';


class ColorDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {closed: true};
    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleInputboxClick() {
    this.setState(state => ({closed: !this.state.closed}));
  }

  handleColorPick(color, e) {
    this.props.onColorPick(color.hex, color.rgb.a, e);
  }

  handleClickOutside() {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      this.setState(state => ({closed: true}));
    }
  }

  render() {
    const inputbox_styles = {
      'background-color': this.props.hex,
      'opacity': this.props.alpha,
      'width': '100%',
      'height': '100%'
    };
    const rgba = {
      ...hex_to_rgb(this.props.hex),
      a: this.props.alpha
    };
    let dropdown_cls = `color-picker-wrapper`;
    dropdown_cls += this.state.closed ? ' closed': '';
    return (
      <div ref={this.wrapperRef} className="color-dropdown-wrapper">
        <div className="color-inputbox" onClick={this.handleInputboxClick.bind(this)}>
          <div style={inputbox_styles}></div>
        </div>
        <div className={dropdown_cls}>
          <SketchPicker color={rgba} onChange={this.handleColorPick.bind(this)}/>
        </div>
      </div>
    );
  }
}

ColorDropdown.propTypes = {
  hex: PropTypes.string,
  alpha: PropTypes.number,
  onColorPick: PropTypes.func
};

export default ColorDropdown;
