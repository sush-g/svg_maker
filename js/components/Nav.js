import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom';

class Nav extends Component {
  render() {
    return (
      <div className="nav">
        <NavLink to="/canvas" activeClassName="selected">Canvas</NavLink>
        <NavLink to="/import" activeClassName="selected">Import</NavLink>
        <NavLink to="/export" activeClassName="selected">Export</NavLink>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
});

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
