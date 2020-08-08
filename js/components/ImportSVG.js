import React, { Component } from "react";
import { connect } from "react-redux";
import { import__trigger_import } from '../redux/actions';
import { WATERMARK_DESC } from '../constants';


const WATERMARK_REGEXP = new RegExp(`<desc>${WATERMARK_DESC}</desc>`, 'g');
const WATERMARK_ERROR = 'The drawing you are trying to import was not created using this tool.'

class ImportSVG extends Component {
  constructor(props) {
    super(props);
    this.state = {
      svg_code: '',
      error: null
    };
  }

  handleSVGCodeUpdate(e) {
    this.setState({svg_code: e.target.value});
  }

  hasWatermark() {
    return !!this.state.svg_code.match(WATERMARK_REGEXP);
  }

  handleImport(e) {
    e && e.preventDefault();
    if (!this.hasWatermark()) {
      this.setState({error: WATERMARK_ERROR});
    } else {
      this.setState({error: null}, () => {
        this.props.import__trigger_import(this.state.svg_code);
      });
    }
  }

  render() {
    let error_elem = null;
    if (this.state.error) {
      error_elem = <div className="error-msg">
        {this.state.error}
      </div>;
    }
    return (
      <div className="import-svg">
        <h1>Import SVG</h1>
        <textarea value={this.state.svg_code} onChange={this.handleSVGCodeUpdate.bind(this)} />
        {error_elem}
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
