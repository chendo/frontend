import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Badge from '../Badge';
import BaseButton from '../Button';
import Icon from '../Icon';

class Button extends React.Component {
  static displayName = "Menu.Button";

  static propTypes = {
    label: PropTypes.string.isRequired,
    icon: PropTypes.string,
    badge: PropTypes.number,
    href: PropTypes.string,
    active: PropTypes.bool,
    link: PropTypes.string
  };

  render() {
    return (
      <BaseButton className={classNames(`block hover-lime focus-lime`, { "lime": this._isActive() })}
        theme={false}
        href={this.props.href}
        link={this.props.link}
      >
        <div className="flex">
          <div className="flex-auto flex items-center">
            {this._renderIcon()}
            <div className="truncate">{this.props.label}</div>
          </div>
          {this._renderBadge()}
        </div>
      </BaseButton>
    );
  }

  _isActive() {
    if (this.props.active !== undefined) {
      return this.props.active;
    } else {
      // Use a super simple way of figuring out if the current href is active
      return window.location.pathname.indexOf(this.props.link || this.props.href) === 0;
    }
  }

  _renderIcon() {
    if (this.props.icon) {
      return (
        <Icon className="flex-none icon-mr" icon={this.props.icon}/>
      );
    }
  }

  _renderBadge() {
    if (this.props.badge) {
      return (
        <div className="flex-none">
          <Badge className={classNames(`hover-lime-child`, { "bg-lime": this._isActive() })}>
            {this.props.badge}
          </Badge>
        </div>
      );
    }
  }
}

export default Button;

