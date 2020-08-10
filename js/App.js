import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import history from './history';
import Nav from './components/Nav';
import Canvas from './components/Canvas';
import PreviewingCanvas from './components/PreviewingCanvas';
import ImportSVG from './components/ImportSVG';
import ExportSVG from './components/ExportSVG';

class App extends Component {
  handleImport(e) {
    e && e.preventDefault();
  }

  handleExport(e) {
    e && e.preventDefault();
  }

  render() {
    return (
      <HashRouter history={history}>
        <Nav/>
        <Switch>
          <Route exact path="/import">
            <ImportSVG/>
          </Route>
          <Route exact path="/export">
            <ExportSVG/>
          </Route>
          <Route exact path="/canvas">
            <Canvas/>
          </Route>
          <Route exact path="/canvas/preview">
            <PreviewingCanvas/>
          </Route>
          <Route exact path="/">
            <Redirect to="/canvas" />
          </Route>
        </Switch>
      </HashRouter>
    );
  }
}

App.propTypes = {
}

const mapStateToProps = (state, props) => ({
});

export default connect(mapStateToProps)(App);
