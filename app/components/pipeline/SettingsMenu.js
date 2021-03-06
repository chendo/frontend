import React from 'react';
import PropTypes from 'prop-types';
import Relay from 'react-relay';

import Menu from '../shared/Menu';

import permissions from '../../lib/permissions';

class SettingsMenu extends React.Component {
  static propTypes = {
    pipeline: PropTypes.object.isRequired
  };

  get provider() {
    return this.props.pipeline.repository.provider;
  }

  render() {
    const url = `/${this.props.pipeline.organization.slug}/${this.props.pipeline.slug}/settings`;

    return (
      <div>
        <Menu>
          <Menu.Header>Settings</Menu.Header>
          {this.renderButtons(url)}
        </Menu>

        <Menu>
          <Menu.Button
            icon="emails"
            href={`${url}/email-preferences`}
            label="Personal Email Settings"
          />
        </Menu>
      </div>
    );
  }

  renderButtons(url) {
    return permissions(this.props.pipeline.permissions).collect(
      {
        allowed: "pipelineUpdate",
        render: (idx) => (
          <Menu.Button
            key={idx}
            icon="pipeline"
            href={`${url}`}
            active={this.isPipelineButtonActive(url)}
            label="Pipeline"
          />
        )
      },
      {
        allowed: "pipelineUpdate",
        render: (idx) => (
          <Menu.Button
            key={idx}
            icon="settings"
            href={`${url}/name-and-description`}
            label="Name &amp; Description"
          />
        )
      },
      {
        allowed: "pipelineUpdate",
        render: (idx) => (
          <Menu.Button
            key={idx}
            icon="build-skipping"
            href={`${url}/build-skipping`}
            label="Build Skipping"
          />
        )
      },
      {
        allowed: "pipelineUpdate",
        render: (idx) => (
          <Menu.Button
            key={idx}
            icon={this.repositoryProviderIcon()}
            href={`${url}/repository`}
            label={this.providerLabel()}
          />
        )
      },
      {
        allowed: "pipelineUpdate",
        render: (idx) => (
          <Menu.Button
            key={idx}
            icon="teams" link={`${url}/teams`}
            badge={this.props.pipeline.teams.count}
            label="Teams"
          />
        )
      },
      {
        allowed: "pipelineUpdate",
        render: (idx) => (
          <Menu.Button
            key={idx}
            icon="schedules" link={`${url}/schedules`} badge={this.props.pipeline.schedules.count}
            label="Schedules"
          />
        )
      },
      {
        allowed: "pipelineUpdate",
        render: (idx) => (
          <Menu.Button
            key={idx}
            icon="badges" href={`${url}/badges`}
            label="Build Badges"
          />
        )
      }
    );
  }

  providerLabel() {
    if (this.provider.__typename === "RepositoryProviderUnknown") {
      return "Repository";
    } else {
      return this.provider.name;
    }
  }

  repositoryProviderIcon() {
    if (this.provider.__typename === "RepositoryProviderBitbucket") {
      return "bitbucket";
    } else if (this.provider.__typename === "RepositoryProviderGithub") {
      return "github";
    } else if (this.provider.__typename === "RepositoryProviderGitlab") {
      return "gitlab";
      // TODO: Add all the others
    } else {
      return "git";
    }
  }

  isPipelineButtonActive(url) {
    // We need to override the default `active` handling the Pipelines button
    // since by default, `Menu.Button` will show a button as active if part of
    // it's URL is present in the URL. The but URL for the Pipelines button is
    // present in _all_ URLs
    return window.location.pathname === url;
  }
}

export default Relay.createContainer(SettingsMenu, {
  fragments: {
    pipeline: () => Relay.QL`
      fragment on Pipeline {
        name
        slug
        organization {
          slug
        }
        repository {
          provider {
            __typename
            name
          }
        }
        teams {
          count
        }
        schedules {
          count
        }
        permissions {
          pipelineUpdate {
            allowed
          }
        }
      }
    `
  }
});
