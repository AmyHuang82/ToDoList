import React from 'react';
import ReactDOM from 'react-dom';
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
    deleteItem(e, index) {
        // Object.assign可以複製一個陣列
        let newData = Object.assign([], this.state.itemArray);
        newData.splice(index, 1);
        this.setState({ itemArray: newData });
    }
}

window.addEventListener('load', () => {
    // let mycomponent = React.createElement(HelloWorld, null);
    ReactDOM.render(<ToDo />, document.getElementById('root'));
});