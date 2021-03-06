import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import FormInputHelp from './FormInputHelp';
import FormInputErrors from './FormInputErrors';

class FormRadioGroup extends React.Component {
  static propTypes = {
    options: PropTypes.arrayOf(
      PropTypes.shape({
        className: PropTypes.string,
        label: PropTypes.string.isRequired,
        help: PropTypes.string,
        value: PropTypes.oneOfType([
          PropTypes.bool,
          PropTypes.string
        ]).isRequired
      })
    ).isRequired,
    value: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string
    ]),
    label: PropTypes.string,
    name: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func,
    errors: PropTypes.array
  };

  inputs = []

  render() {
    return (
      <div className={classNames("mb2", this.props.className)}>
        {this.props.label && <label className={classNames("block bold", { "red": this._hasErrors() })}>{this.props.label}</label>}
        {this._renderInputs()}
        {this._renderErrors()}
      </div>
    );
  }

  getValue() {
    return this.input.checked;
  }

  focus() {
    this.input.focus();
  }

  _hasErrors() {
    return this.props.errors && this.props.errors.length > 0;
  }

  _renderErrors() {
    if (this._hasErrors()) {
      return (
        <FormInputErrors errors={this.props.errors}/>
      );
    }
  }

  _renderInputs() {
    return this.props.options.map(
      (option, index) => (
        <div key={index} className="mt1">
          <label className="mt1 inline-block pl4">
            <input
              className={classNames('absolute', { "is-error": this._hasErrors() }, option.className)}
              style={{ marginLeft: '-20px' }}
              name={this.props.name}
              type="radio"
              defaultChecked={this.props.value === option.value}
              value={option.value}
              onChange={this.props.onChange}
              ref={(input) => this.inputs[index] = input}
            />
            <span className="bold block" style={{ marginBottom: -5 }}> {option.label}</span>
            {option.help && <FormInputHelp html={option.help} />}
          </label>
        </div>
      )
    );
  }
}

export default FormRadioGroup;
