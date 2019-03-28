import React from 'react';

class ToDoItem extends React.Component {
    constructor(props) {
        super(props);
        this.clickHandler = this.clickHandler.bind(this);
        this.deleteHandler = this.deleteHandler.bind(this);
    }
    clickHandler(e) {
        this.props.changeStatus(this.props);
    }
    deleteHandler(e) {
        this.props.deleteItem(this.props);
    }
    render() {
        return (
            <li className={this.props.className}>
                <span onClick={this.clickHandler} className="item">{this.props.text}</span>
                <span onClick={this.deleteHandler} className="delete">X</span>
            </li>
        );
    }
}

export default ToDoItem;