import React from 'react';
import PropTypes from 'prop-types';

import PusherStore from '../../stores/PusherStore';
import StateSwitcher from '../build/StateSwitcher';

class BuildCountsBreakdown extends React.Component {
  static propTypes = {
    viewer: PropTypes.shape({
      builds: PropTypes.shape({
        count: PropTypes.number.isRequired
      }),
      scheduledBuilds: PropTypes.shape({
        count: PropTypes.number.isRequired
      }),
      runningBuilds: PropTypes.shape({
        count: PropTypes.number.isRequired
      })
    }),
    state: PropTypes.string
  };

  state = {
    buildsCount: this.props.viewer.builds.count,
    scheduledBuildsCount: this.props.viewer.scheduledBuilds.count,
    runningBuildsCount: this.props.viewer.runningBuilds.count
  };

  componentDidMount() {
    PusherStore.on("user_stats:change", this._onStoreChange.bind(this));
  }

  componentWillUnmount() {
    PusherStore.off("user_stats:change", this._onStoreChange.bind(this));
  }

  render() {
    return (
      <StateSwitcher
        path="/builds"
        state={this.props.state}
        buildsCount={this.state.buildsCount}
        runningBuildsCount={this.state.runningBuildsCount}
        scheduledBuildsCount={this.state.scheduledBuildsCount}
      />
    );
  }

  _onStoreChange(payload) {
    this.setState({
      buildsCount: payload.buildsCount,
      scheduledBuildsCount: payload.scheduledBuildsCount,
      runningBuildsCount: payload.runningBuildsCount
    });
  }
}

export default BuildCountsBreakdown;
