import React from "react";

export default class ValidationErrorMessage extends React.Component {
  render() {
    if (this.props.message) {
      return <div className="error">{this.props.message}</div>;
    }
    return <></>;
  }
}
