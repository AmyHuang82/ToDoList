import React from 'react';
import { uid } from 'react-uid';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ToDoItem from './ToDoItem';

var i = 1;

class ToDo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: "",
            items: [],
            tab: "all",
            tabs: [
                {
                    tabText: "All",
                    className: "status-btn active"
                },
                {
                    tabText: "Active",
                    className: "status-btn"
                },
                {
                    tabText: "Completed",
                    className: "status-btn"
                }
            ]
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
    deleteItem(todo_state, e) {
        // Object.assign或slice都可以複製一個陣列
        // let newData = Object.assign([], this.state.items);
        let newData = this.state.items.slice();
        let index;

        for (let i = 0; i < newData.length; i++) {
            if (newData[i].label === todo_state.label) {
                index = i;
            }
        }
        newData.splice(index, 1);
        this.setState({ items: newData });
    }
    switchCategory(e) {
        let buttons = this.state.tabs.slice();

        for (let i = 0; i < buttons.length; i++) {
            buttons[i].className = "status-btn";
        }

        if (e.target.textContent === "All") {
            this.setState({ tab: "all" });
            buttons[0].className = "status-btn active";
        } else if (e.target.textContent === "Active") {
            this.setState({ tab: "active" });
            buttons[1].className = "status-btn active";
        } else {
            this.setState({ tab: "completed" });
            buttons[2].className = "status-btn active";
        }

        this.setState({ tabs: buttons });
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

        return (
            <div className="container">
                {
                    this.state.tabs.map((tab) => {
                        return <button className={tab.className} onClick={this.switchCategory} key={tab.tabText}>{tab.tabText}</button>
                    })
                }
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
                            return <ToDoItem
                                deleteItem={this.deleteItem.bind(this)}
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