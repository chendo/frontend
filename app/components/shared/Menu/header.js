import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {
  static displayName = "Menu.Header";

  static propTypes = {
    children: PropTypes.node.isRequired
  };

  render() {
    return (
      <div className="border border-gray bg-silver py2 px3 semi-bold rounded-top">
        {this.props.children}
      </div>
    );
  }
}

export default Header;
