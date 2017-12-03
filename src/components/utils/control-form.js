import React from "react";
import PropTypes from "prop-types";

class ControlForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.initialState || {};
    this.onSubmit = this.onSubmit.bind(this);
    this.onReset = this.onReset.bind(this);
    this.onChangeCreate = this.onChangeCreate.bind(this);
    this.getValue = this.getValue.bind(this);
    this.reset = this.reset.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit && this.props.onSubmit(this.state);
    this.reset();
  }

  onReset(e) {
    e.preventDefault();
    this.props.onReset && this.props.onReset(this.state);
    this.reset();
  }

  onChangeCreate(key) {
    return e => {
      this.setState({ [key]: e.target.value });
      this.props.onChange && this.props.onChange(this.state);
    };
  }

  getValue(key) {
    return this.state[key];
  }

  reset() {
    this.setState(this.props.initialState);
  }

  render() {
    return (
      <form onSubmit={this.onSubmit} onReset={this.onReset}>
        {this.props.children({
          onChange: this.onChangeCreate,
          reset: this.reset,
          value: this.getValue,
          state: this.state
        })}
      </form>
    );
  }
}

ControlForm.propTypes = {
  initialState: PropTypes.object.isRequired,
  children: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func
};

export { ControlForm };
