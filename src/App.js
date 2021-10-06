import { useEffect, useState } from "react";
import axios from "axios";
import * as Icon from "react-feather";

import "./App.css";
import { removeTodoAPI } from "./api/todoAPI";

const App = () => {
  const url = "http://localhost:80";

  const [task, setTask] = useState([]);
  const [addTask, setAddTask] = useState("");

  const getAllTodo = () => {
    axios
      .get(`${url}/api/todo/get-todos`)
      .then((res) => {
        const { result } = res.data;
        setTask(result);
      })
      .catch((err) => {
        console.log(err, err.response);
      });
  };
  useEffect(() => {
    getAllTodo();
  }, []);

  const addTaskHandler = (e) => {
    if (e.which === 13 && !addTask.length === 0) {
      axios
        .post(`${url}/api/todo/create-todo`, {
          name: addTask,
        })
        .then((res) => {
          // const { result } = res.data;
          getAllTodo();
          setAddTask("");
        })
        .catch((err) => {
          console.log(err, err.response);
        });
    } else if (e.which === 13) {
      alert("Please enter new task");
    }
    // $(document).on('.todo-list .todo-item.added input').click(function () {
    //   if ($(this).is(':checked')) {
    //     $(this).parent().parent().parent().toggleClass('complete');
    //   } else {
    //     $(this).parent().parent().parent().toggleClass('complete');
    //   }
    // });
    // $('.todo-list .todo-item.added .remove-todo-item').click(function () {
    //   $(this).parent().remove();
    // });
  };

  const onRemoveTodo = async (id) => {
    try {
      const data = await removeTodoAPI(id);
      getAllTodo();
    } catch (err) {}
  };
  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card card-white">
              <div className="card-body">
                <form>
                  <input
                    type="text"
                    className="form-control add-task"
                    placeholder="New Task..."
                    value={addTask}
                    onChange={(e) => setAddTask(e.target.value)}
                    onKeyPress={(e) => addTaskHandler(e)}
                  />
                </form>
                <ul className="nav nav-pills todo-nav">
                  <li role="presentation" className="nav-item all-task active">
                    <a href="/" className="nav-link">
                      All
                    </a>
                  </li>
                  <li role="presentation" className="nav-item active-task">
                    <a href="/" className="nav-link">
                      Active
                    </a>
                  </li>
                  <li role="presentation" className="nav-item completed-task">
                    <a href="/" className="nav-link">
                      Completed
                    </a>
                  </li>
                </ul>
                <div className="todo-list">
                  {task.map((task) => {
                    return (
                      <div className="todo-item" key={task.id}>
                        <div className="checker">
                          <span className="">
                            <input type="checkbox" />
                          </span>
                        </div>
                        <span>{" " + task.name}</span>
                        <Icon.Trash
                          color="red"
                          size={22}
                          onClick={() => onRemoveTodo(task.id)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
