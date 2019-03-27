import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Route from 'react-router-dom/Route';

// import component
import ToDoItem from './toDoItem';

class ToDo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            itemArray: []
        };
    }
    render() {
        // return React.createElement("H1", null, "Hello World");
        return (
            <div className="container">
                <Router>
                    <button className="status-btn">All</button>
                    <button className="status-btn">Active</button>
                    <button className="status-btn">Completed</button>
                </Router>
                <div className="top">
                    <h1>TO DO LIST</h1>
                    <div className="add_to_do">
                        <input onChange={this.textChangeHandler.bind(this)} onKeyPress={this.keyPressHandler.bind(this)} value={this.state.text} type="text" name="todo" placeholder="增加待辦事項..." />
                        <button onClick={this.clickHandler.bind(this)}>ADD</button>
                    </div>
                </div>
                <ul className="to_do" >
                    {
                        this.state.itemArray.map((item, index) => {
                            {/* 注意{this.deleteItem.bind(this, index)}this被bind，而index是傳入值，所以下面function的順序是(index, e) */ }
                            return <ToDoItem deleteItem={this.deleteItem.bind(this, index)} text={item} key={index}></ToDoItem>
                        })
                    }
                </ul>
            </div>
        );
    }
    textChangeHandler(e) {
        this.setState({ text: e.currentTarget.value });
    }
    clickHandler(e) {
        this.addItem();
    }
    keyPressHandler(e) {
        if (e.key === "Enter") {
            this.addItem();
        }
    }
    addItem() {
        if (this.state.text !== "") {
            this.setState({ text: this.state.text });
            this.setState({ itemArray: [...this.state.itemArray, this.state.text] });
            this.setState({ text: "" });
        }
    }
    deleteItem(index, e) {
        // Object.assign或slice都可以複製一個陣列
        let newData = this.state.itemArray.slice();
        // let newData = Object.assign([], this.state.itemArray);
        newData.splice(index, 1);
        this.setState({ itemArray: newData });
    }
}

window.addEventListener('load', () => {
    // let mycomponent = React.createElement(HelloWorld, null);
    ReactDOM.render(<ToDo />, document.getElementById('root'));
});