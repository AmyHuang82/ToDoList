import React from 'react';

class ToDoItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            className: "checked",
            status: true,
            label: this.props.label
        };
        this.clickHandler = this.clickHandler.bind(this);
    }
    clickHandler(e) {
        if (this.state.status === false) {
            this.setState({ className: "checked" });
            this.setState({ status: true });
            this.props.changeStatus(this.state);
        } else {
            this.setState({ className: "" });
            this.setState({ status: false });
            this.props.changeStatus(this.state);
        }
    }
    render() {
        return (
            <li className={this.props.className}>
                <span onClick={this.clickHandler} className="item">{this.props.text}</span>
                <span onClick={this.props.deleteItem} className="delete">X</span>
            </li>
        );
    }
}

export default ToDoItem;