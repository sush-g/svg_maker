import React, { Component } from "react";
import { connect } from "react-redux";
import { import__trigger_import } from '../redux/actions';

class ImportSVG extends Component {
  constructor(props) {
    super(props);
    this.state = {
      svg_code: ''
    };
  }

  handleSVGCodeUpdate(e) {
    this.setState({svg_code: e.target.value});
  }

  handleImport(e) {
    e && e.preventDefault();
    this.props.import__trigger_import(this.state.svg_code);
  }

  render() {
    return (
      <div className="import-svg">
        <h1>Import SVG</h1>
        <textarea value={this.state.svg_code} onChange={this.handleSVGCodeUpdate.bind(this)} />
        <a href="#" onClick={this.handleImport.bind(this)}>Import</a>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
});

const mapDispatchToProps = dispatch => {
  return {
    import__trigger_import: (svg_code) => dispatch(import__trigger_import(dispatch, svg_code))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportSVG);
