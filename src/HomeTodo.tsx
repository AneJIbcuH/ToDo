import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Button, Modal, Input } from "antd";
const { TextArea } = Input;
import { useSelector, useDispatch } from "react-redux";
import { Action, ActionTypes, Task, subTask, dragTask } from "./store/types";

const HomeTodo: React.FC = () => {
  const [nameTask, setNameTask] = useState<string>("");
  const [textTask, setTextTask] = useState<string>("");
  const [statusTask, setStatusTask] = useState<string>("");
  const [dragId, setDragId] = useState<number>()

  const tasks = useSelector((state: Task[]) => state);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const createNewTask = () => {
    setIsModalOpen(true);
  };

  const addTask = () => {
    setIsModalOpen(false);
    const task: Task = {
      id: Date.now(),
      title: nameTask,
      description: textTask,
      dateCreat: new Date(Date.now()).toLocaleString(),
      subTasks: [],
      status: statusTask,
    };

    const addItemAction: Action = {
      type: ActionTypes.ADD_ITEM,
      payload: task,
    };
    dispatch(addItemAction);

    setNameTask("");
    setTextTask("");
    setStatusTask("");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  function dragStart(e) {
    setDragId(Number(e.target.id))
    console.log("start");
    console.log(e.target.id);
    console.log(e.target.parentNode.className);
  }

  function dragDrop(e) {
    e.preventDefault();
    console.log("drop");
    console.log(e.currentTarget.className);
    // вытянуть айди из стейта и сменить глобал стейт
    let mydDragTask: dragTask = {
      id: dragId,
      status: e.currentTarget.className
    }
    const DragItemAction: Action = {
      type: ActionTypes.DRAG_ITEM,
      payload: mydDragTask,
    };
    dispatch(DragItemAction);
  }

  function dragEnd(e) {
    console.log("dragend");
    console.log(e.target.id);
    // e.target.style.boxShadow = "none";
  }

  // function dragLeave(e) {
  //   e.target.style.boxShadow = "none";
  // }

  function dragOver(e) {
    e.preventDefault();
    // console.log(e.currentTarget.className);
    // if (e.target.className == "task") {
    //   e.target.style.boxShadow = "0 10px 10px black";
    // }
  }

  return (
    <div className="taskList">
      <Button type="primary" onClick={createNewTask}>
        Добавить задачу
      </Button>
      <Modal
        title="Добавление задачи"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[<Button onClick={addTask}>Добавить</Button>]}
      >
        <TextArea
          placeholder="Название задачи"
          autoSize
          value={nameTask}
          onChange={(e) => setNameTask(e.target.value)}
        />
        <div style={{ margin: "24px 0" }} />
        <TextArea
          placeholder="Описание задачи"
          autoSize={{ minRows: 2, maxRows: 6 }}
          value={textTask}
          onChange={(e) => setTextTask(e.target.value)}
        />
        <div style={{ margin: "24px 0" }} />
        <TextArea
          placeholder="Статус"
          autoSize
          value={statusTask}
          onChange={(e) => setStatusTask(e.target.value)}
        />
      </Modal>
      {/* {tasks?.map((task: Task) => (
          <div
            className="task"
            id={String(task.id)}
            onClick={() => navigate(`/task/${task.id}`)}
          >
            <p>№{tasks.indexOf(task) + 1}</p>
            <p>{task.title}</p>
            <p>{task.description}</p>
          </div>
        ))} */}
      <div className="status">
        <div className="queue">
          {tasks?.map((task: Task) => {
            if (task.status == "queue") {
              return (
                <div
                  className="task"
                  id={String(task.id)}
                  onClick={() => navigate(`/task/${task.id}`)}
                  draggable={true}
                  onDragStart={(e) => dragStart(e)}
                  // onDragOver={(e) => dragOver(e)}
                  // onDragLeave={(e) => dragLeave(e)}
                  // onDragEnd={(e) => dragEnd(e)}
                  // onDrop={e => dragDrop(e)}
                >
                  <p>№{tasks.indexOf(task) + 1}</p>
                  <p>{task.title}</p>
                  <p>{task.description}</p>
                </div>
              );
            }
          })}
        </div>
        <div
          className="development"
          onDragOver={(e) => dragOver(e)}
          onDrop={(e) => dragDrop(e)}
          // onDragLeave={(e) => dragLeave(e)}
          // onDragEnd={(e) => dragEnd(e)}
        >
          {tasks?.map((task: Task) => {
            if (task.status == "development") {
              return (
                <div
                  className="task"
                  id={String(task.id)}
                  onClick={() => navigate(`/task/${task.id}`)}
                >
                  <p>№{tasks.indexOf(task) + 1}</p>
                  <p>{task.title}</p>
                  <p>{task.description}</p>
                </div>
              );
            }
          })}
        </div>
        <div
          className="done"
          onDragOver={(e) => dragOver(e)}
          onDrop={(e) => dragDrop(e)}
        >
          {tasks?.map((task: Task) => {
            if (task.status == "done") {
              return (
                <div
                  className="task"
                  id={String(task.id)}
                  onClick={() => navigate(`/task/${task.id}`)}
                >
                  <p>№{tasks.indexOf(task) + 1}</p>
                  <p>{task.title}</p>
                  <p>{task.description}</p>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default HomeTodo;
