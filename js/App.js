import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { MODES } from './constants';
import ControlsPane from './components/ControlsPane';
import LayersPane from './components/LayersPane';
import PreviewingCanvas from './components/PreviewingCanvas';
import EditingCanvas from './components/EditingCanvas';

class App extends Component {
  render() {
    let primary_zone;
    if (this.props.mode === MODES.preview) {
      primary_zone = <PreviewingCanvas/>;
    } else if (this.props.mode === MODES.edit) {
      primary_zone = <EditingCanvas/>;
    }
    return (
      <div className="svg-maker-app">
        <div className="sidebar">
          <ControlsPane/>
          <LayersPane/>
        </div>
        <div className="primary-zone">
          { primary_zone }
        </div>
      </div>
    );
  }
}

App.propTypes = {
  mode: PropTypes.string
}

const mapStateToProps = (state, props) => ({
  mode: state.controls.mode
});

export default connect(mapStateToProps)(App);
