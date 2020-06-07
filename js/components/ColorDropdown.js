import React, { Component } from "react";
import { SwatchesPicker } from 'react-color';
import PropTypes from 'prop-types';


class ColorDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {closed: true};
  }

  handleInputboxClick() {
    this.setState(state => ({closed: !this.state.closed}));
  }

  handleColorPick(color, e) {
    this.setState(state => ({closed: true}), () => this.props.onColorPick(color, e));
  }

  render() {
    const inputbox_styles = {
      'background-color': this.props.color
    };
    let dropdown_cls = `color-picker-wrapper`;
    dropdown_cls += this.state.closed ? ' closed': '';
    return (
      <div className="color-dropdown-wrapper">
        <div className="color-inputbox" style={inputbox_styles} onClick={this.handleInputboxClick.bind(this)}></div>
        <div className={dropdown_cls}>
          <SwatchesPicker color={this.props.color} onChange={this.handleColorPick.bind(this)}/>
        </div>
      </div>
    );
  }
}

ColorDropdown.propTypes = {
  color: PropTypes.string,
  onColorPick: PropTypes.func
};

export default ColorDropdown;
