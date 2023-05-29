import React from "react";

class App extends React.Component {
  state = {
    todos: [],
    newItemTitle: "",
  };

  inputHandler = (e) => {
    this.setState({
      newItemTitle: e.target.value,
    });
  };

  addItem = (e) => {
    if (e.key === "Enter") {
      if (this.state.newItemTitle.trim() === "") return;

      const newTodoItems = [...this.state.todos];

      newTodoItems.push({
        id: Math.floor(Math.random() * 100000) + 1,
        title: this.state.newItemTitle,
        done: false,
      });

      this.setState({
        todos: newTodoItems,
        newItemTitle: "",
      });
    }
  };

  clickHandler = (e, todoId) => {
    let newTodoItems;

    if (e.shiftKey) {
      // Perform delete action
      console.log(`Shift Pressed`);
      newTodoItems = this.state.todos.filter((item) => item.id !== todoId);
    } else {
      // Perform Toggle State
      newTodoItems = [...this.state.todos];
      const targetItem = newTodoItems.find((item) => item.id === todoId);
      targetItem.done = !targetItem.done;
    }

    this.setState({
      todos: newTodoItems,
    });
  };

  render() {
    return (
      <div className="min-h-screen w-full bg-slate-100 flex justify-center items-center">
        <div className="bg-white flex-1 max-w-md rounded-xl shadow-xl overflow-hidden">
          <input
            type="text"
            className="bg-slate-600 text-white p-6 w-full outline-none text-3xl"
            placeholder="Type something..."
            value={this.state.newItemTitle}
            onChange={this.inputHandler}
            onKeyDown={this.addItem}
          />
          <ul>
            {this.state.todos.map((todo) => (
              <li
                key={todo.id}
                className={`${
                  todo.done ? "line-through" : ""
                } p-6 text-3xl transition border-b border-slate-100 hover:bg-blue-500 hover:text-white cursor-pointer bg-slate-200 text-slate-600`}
                onClick={(e) => this.clickHandler(e, todo.id)}
              >
                {todo.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
