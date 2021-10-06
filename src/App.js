import { useEffect, useState } from 'react';
import axios from "axios";

import './App.css';

const App = () => {

  const [task, setTask] = useState(["Work on wordpress", "Create React App", "Organize office main department", "Error solve in HTML template"]);
  const [addTask, setAddTask] = useState("");

  const insertAfter = (referenceNode, newNode) => {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }

  useEffect(()=>{
    axios
      .get(`${url}/api/todo/get-todos`)
      .then((res) => {
        console.log(res);
        setcouponsData(res.data.result || null);
      })
      .catch((err) => {
        console.log(err, err.response);
        if(err?.response.status===401){
          history.push('/');
          sessionStorage.clear();
        }
        setMsgData(
          {
            message: err?.response?.data.message,
            type: err?.response.status,
          } || null
        );
      });
  },[])

  const addTaskHandler = (e) => {
    if ((e.which == 13) && (!addTask.length == 0)) {
      var newItem = document.createElement("div");
      newItem.classList.add('todo-item');
      newItem.innerHTML = '<div class="checker"><span class=""><input type="checkbox"></span></div> <span>' + addTask + '</span> <a href="javascript:void(0);" class="float-right remove-todo-item"><i class="icon-close"></i></a>';
      var listItem = document.querySelector(".todo-list .todo-item:last-child");
      insertAfter(listItem, newItem);
      setTask([...task, addTask])
      setAddTask("");
    } else if (e.which == 13) {
      alert('Please enter new task');
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
  }

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card card-white">
              <div className="card-body">
                <form action="javascript:void(0);">
                  <input type="text" className="form-control add-task" placeholder="New Task..." value={addTask} onChange={(e) => setAddTask(e.target.value)} onKeyPress={(e) => addTaskHandler(e)} />
                </form>
                <ul className="nav nav-pills todo-nav">
                  <li role="presentation" className="nav-item all-task active"><a href="/" className="nav-link">All</a></li>
                  <li role="presentation" className="nav-item active-task"><a href="/" className="nav-link">Active</a></li>
                  <li role="presentation" className="nav-item completed-task"><a href="/" className="nav-link">Completed</a></li>
                </ul>
                <div className="todo-list">
                  {task.map((task) => {
                    return (
                      <div className="todo-item">
                        <div className="checker"><span className=""><input type="checkbox" /></span></div>
                        <span>{" " + task}</span>
                        <a href="javascript:void(0);" className="float-right remove-todo-item"><i className="icon-close"></i></a>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
