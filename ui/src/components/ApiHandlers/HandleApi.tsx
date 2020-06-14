import React, { Component } from 'react';
import { ProgressBar } from 'react-bootstrap';
import BadRequest from './400';

interface Props {
  statuses: Array<number>;
  success_msg?: string;
}

export default class HandleApiStatus extends Component<Props> {
  render (): JSX.Element {
    if (this.props.statuses.includes(0)) {
      return (
        <ProgressBar
          className='fadein'
          animated
          now={
            this.props.statuses.sort().reverse().indexOf(0)
          }
          max={this.props.statuses.length}
        />
      );
    }
    else if (this.props.statuses.every((status) => (status === 200))) {
      if (this.props.success_msg) {
        return (
          <h4>{this.props.success_msg}</h4>
        );
      }
    }
    return (
      <BadRequest />
    );
  };
}
