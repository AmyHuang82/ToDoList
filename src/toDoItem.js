import React from 'react';

class ToDoItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = { className: "" };
    }
    render() {
        return (
            <li className={this.state.className}>
                <span onClick={this.clickHandler.bind(this)} className="item">{this.props.text}</span>
                <span onClick={this.props.deleteItem} className="delete">X</span>
            </li>
        );
    }
    clickHandler(e) {
        if (this.state.className === "") {
            this.setState({ className: "checked" });
        } else {
            this.setState({ className: "" });
        }
    }
}

export default ToDoItem;