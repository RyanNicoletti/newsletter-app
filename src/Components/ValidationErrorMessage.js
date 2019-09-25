import React from "react";
// import CreateAccount from "./CreateAccount";

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
