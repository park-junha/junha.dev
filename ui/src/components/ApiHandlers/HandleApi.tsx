import React, { Component } from 'react';
import BadRequest from './400';
import Forbidden from './403';
import NotFound from './404';
import ServerError from './500';
import LoadingScreen from '../LoadingScreen';
import UnknownApiCode from './UnknownApiCode';

interface Props {
  status: number;
  success_msg?: string;
}

export default class HandleApiStatus extends Component<Props> {
  render (): JSX.Element {
    switch (this.props.status) {
      case 0:
        return (
          <LoadingScreen />
        );
      case 400:
        return (
          <BadRequest />
        );
      case 403:
        return (
          <Forbidden />
        );
      case 404:
        return (
          <NotFound />
        );
      case 500:
        return (
          <ServerError />
        );
      case 200:
        if (this.props.success_msg) {
          return (
            <h4>{this.props.success_msg}</h4>
          );
        }
        else {
          return (
            <h4>Request successful.</h4>
          );
        }
      default:
        return (
          <UnknownApiCode status={this.props.status}/>
        );
    }
  };
}
