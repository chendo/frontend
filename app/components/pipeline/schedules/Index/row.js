import React from 'react';
import PropTypes from 'prop-types';
import Relay from 'react-relay';

import Panel from '../../../shared/Panel';
import Emojify from '../../../shared/Emojify';

class Row extends React.Component {
  static propTypes = {
    pipelineSchedule: PropTypes.shape({
      uuid: PropTypes.string.isRequired,
      cronline: PropTypes.string.isRequired,
      label: PropTypes.string,
      commit: PropTypes.string,
      branch: PropTypes.string,
      pipeline: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        organization: PropTypes.shape({
          slug: PropTypes.string.isRequired
        }).isRequired
      }).isRequired
    }).isRequired
  };

  render() {
    const organization = this.props.pipelineSchedule.pipeline.organization;
    const pipeline = this.props.pipelineSchedule.pipeline;

    return (
      <Panel.RowLink to={`/${organization.slug}/${pipeline.slug}/settings/schedules/${this.props.pipelineSchedule.uuid}`}>
        <div className="flex flex-stretch items-center line-height-1" style={{ minHeight: '3em' }}>
          <div className="flex-auto">
            <div className="m0 semi-bold">{this.props.pipelineSchedule.cronline}</div>
            {this.renderLabel()}
          </div>
          <div className="flex flex-none flex-stretch items-center my1 pr3">
            <code className="dark-gray">{this.props.pipelineSchedule.branch} | {this.props.pipelineSchedule.commit}</code>
          </div>
        </div>
      </Panel.RowLink>
    );
  }

  renderLabel() {
    if (this.props.pipelineSchedule.label) {
      return (
        <div className="regular dark-gray mt1"><Emojify text={this.props.pipelineSchedule.label} /></div>
      );
    }
  }
}

export default Relay.createContainer(Row, {
  fragments: {
    pipelineSchedule: () => Relay.QL`
      fragment on PipelineSchedule {
        uuid
        cronline
        label
        commit
        branch
        pipeline {
          slug
          organization {
            slug
          }
        }
      }
    `
  }
});
