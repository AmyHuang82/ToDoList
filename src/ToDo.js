import React from 'react';
import { uid } from 'react-uid';
import ToDoItem from './ToDoItem';

var i = 1;

class ToDo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: "",
            items: [],
            tab: "all"
        };

        this.textChangeHandler = this.textChangeHandler.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
        this.keyPressHandler = this.keyPressHandler.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.switchCategory = this.switchCategory.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
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
            this.setState({ items: [...this.state.items, { text: this.state.text, status: false, className: "", label: `uid${i}` }] });
            this.setState({ text: "" });
            i++;
        }
    }
    deleteItem(index, e) {
        // Object.assign或slice都可以複製一個陣列
        let newData = this.state.items.slice();
        // let newData = Object.assign([], this.state.items);
        newData.splice(index, 1);
        this.setState({ items: newData });
    }
    switchCategory(e) {
        if (e.target.textContent === "All") {
            this.setState({ tab: "all" });
        } else if (e.target.textContent === "Active") {
            this.setState({ tab: "active" });
        } else {
            this.setState({ tab: "completed" });
        }
    }
    changeStatus(todo_state) {
        let newData = this.state.items.slice();
        for (let i = 0; i < newData.length; i++) {
            if (newData[i].label === todo_state.label) {
                newData[i].status = todo_state.status;
                newData[i].className = todo_state.className;
            }
        }
        this.setState({ items: newData });
    }
    render() {
        // 用tab去辨認現在要render哪些資料
        const { tab, items } = this.state;
        let data = items;
        if (tab === 'active') {
            data = data.filter(item => item.status === false);
        } else if (tab === 'completed') {
            data = data.filter(item => item.status === true);
        }
        // return React.createElement("H1", null, "Hello World");
        return (
            <div className="container">
                <button className="status-btn" onClick={this.switchCategory}>All</button>
                <button className="status-btn" onClick={this.switchCategory}>Active</button>
                <button className="status-btn" onClick={this.switchCategory}>Completed</button>
                <div className="top">
                    <h1>TO DO LIST</h1>
                    <div className="add_to_do">
                        <input onChange={this.textChangeHandler} onKeyPress={this.keyPressHandler} value={this.state.text} type="text" name="todo" placeholder="增加待辦事項..." />
                        <button onClick={this.clickHandler}>ADD</button>
                    </div>
                </div>
                <ul className="to_do" >
                    {
                        data.map((item, index) => {
                            {/* 注意{this.deleteItem.bind(this, index)}this被bind，而index是傳入值，所以下面function的順序是(index, e) */ }
                            return <ToDoItem
                                deleteItem={this.deleteItem.bind(this, index)}
                                text={item.text}
                                key={uid(item)}
                                label={uid(item)}
                                changeStatus={this.changeStatus}
                                status={item.status}
                                className={item.className}
                            ></ToDoItem>
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default ToDo;