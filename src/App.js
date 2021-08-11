import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";
import { BrowserRouter as Router, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  const [filter, setFilter] = useState("all");

  useEffect(() => {
    console.log("ran useEffect");
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();

      if (filter === "all") {
        setTasks(tasksFromServer);
      } else if (filter === "reminder") {
        setTasks(
          tasksFromServer.filter((task) => task.reminder && !task.complete)
        );
      } else if (filter === "complete") {
        setTasks(tasksFromServer.filter((task) => task.complete));
      }
    };
    getTasks();
  }, [filter]);

  // Toggle Filter
  const toggleFilter = (filterBy) => {
    return setFilter(filterBy);
  };

  // Fetch Tasks (All)
  const fetchTasks = async () => {
    return await (await fetch("http://localhost:5000/tasks").then()).json();
    // const data = await res.json();
    // return data;
  };

  // Fetch Task (Single)
  const fetchTask = async (id) => {
    return await (
      await fetch(`http://localhost:5000/tasks/${id}`).then()
    ).json();
  };
  //Add Task
  const addTask = async (task) => {
    const data = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(task),
    }).then((response) => response.json());
    // const data = await res.json();
    setTasks([...tasks, data]);
    // const id = nanoid();
    // const newTask = { id, ...task };
    // setTasks([...tasks, newTask]);
  };

  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" });
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const data = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(updatedTask),
    }).then((response) => response.json());

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };

  // Toggle Reminder
  const toggleComplete = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updatedTask = { ...taskToToggle, complete: !taskToToggle.complete };

    const data = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(updatedTask),
    }).then((response) => response.json());

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, complete: data.complete } : task
      )
    );
  };

  return (
    <Router>
      <div className="container">
        <Header
          title="Task Tracker"
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />

        <Route
          path="/"
          exact
          render={(props) => (
            <>
              {showAddTask && <AddTask onAdd={addTask} />}
              {tasks.length > 0 ? (
                <Tasks
                  tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={toggleReminder}
                  onComplete={toggleComplete}
                />
              ) : (
                <p>Nothing to show!</p>
              )}
            </>
          )}
        ></Route>

        <Route path="/about" component={About} />
        <Footer onFilter={toggleFilter} />
      </div>
    </Router>
  );
}

export default App;
