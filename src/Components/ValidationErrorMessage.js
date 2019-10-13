import React from "react";

export default class ValidationErrorMessage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props.message) {
      return <div classname="error">{this.props.message}</div>;
    }
    return <></>;
  }
}
