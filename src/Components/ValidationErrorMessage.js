import React from "react";

export default class ValidationErrorMessage extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        if (props.message) {
            return <div classname="error">{props.message}</div>;
        }
        return <></>;
    }
}
