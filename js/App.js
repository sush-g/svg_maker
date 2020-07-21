import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { SUB_APPS } from './constants';
import Canvas from './components/Canvas';

class App extends Component {
  handleImport(e) {
    e && e.preventDefault();
  }

  handleExport(e) {
    e && e.preventDefault();
  }

  render() {
    const sub_app_to_render = this.props.sub_app_to_render;
    if (sub_app_to_render === SUB_APPS.import) {
      return <div>Import sub app</div>;
    } else if (sub_app_to_render === SUB_APPS.canvas) {
      return <Canvas/>;
    }
  }
}

App.propTypes = {
  sub_app_to_render: PropTypes.string
}

const mapStateToProps = (state, props) => ({
  sub_app_to_render: state.app.sub_app_to_render
});

export default connect(mapStateToProps)(App);
