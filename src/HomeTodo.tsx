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
  const [dragId, setDragId] = useState<number>();
  const tasks = useSelector((state: Task[]) => state);
  const [myFilter, setMyFilter] = useState("");

  const arrTasks = tasks.filter((task, index) => {
    return (
      task.title.toLocaleLowerCase().includes(myFilter.toLocaleLowerCase()) ||
      index == Number(myFilter) - 1
    );
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const createNewTask = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const addTask = () => {
    setIsModalOpen(false);
    const task: Task = {
      id: Date.now(),
      title: nameTask,
      description: textTask,
      dateCreat: new Date(Date.now()).toLocaleString(),
      subTasks: [],
      status: "queue",
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

  function dragStart(e) {
    setDragId(Number(e.target.id));
    console.log("start");
    console.log(e.target.id);
    console.log(e.target.parentNode.className);
  }

  function dragDrop(e) {
    e.preventDefault();
    console.log("drop");
    console.log(e.currentTarget.className);
    let mydDragTask: dragTask = {
      id: dragId,
      status: e.currentTarget.className,
    };

    if (e.currentTarget.className === "done") {
      mydDragTask.timeEndDev = Date.now();
    }

    const DragItemAction: Action = {
      type: ActionTypes.DRAG_ITEM,
      payload: mydDragTask,
    };
    dispatch(DragItemAction);
  }

  // function dragEnd(e) {
  //   console.log("dragend");
  //   console.log(e.target.id);
  //   e.target.style.boxShadow = "none";
  // }

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
      <TextArea
        placeholder="Фильтр по заголовку"
        autoSize
        onChange={(e) => setMyFilter(e.target.value)}
      />
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
      </Modal>
      <div className="status">
        <div
          className="queue"
          onDragOver={(e) => dragOver(e)}
          onDrop={(e) => dragDrop(e)}
        >
          {arrTasks?.map((task: Task) => {
            if (task.status == "queue") {
              return (
                <div
                  className="task"
                  id={String(task.id)}
                  onClick={() => navigate(`/task/${task.id}`)}
                  draggable={true}
                  onDragStart={(e) => dragStart(e)}
                  // onDragLeave={(e) => dragLeave(e)}
                  // onDragEnd={(e) => dragEnd(e)}
                >
                  <p>№{arrTasks.indexOf(task) + 1}</p>
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
        >
          {arrTasks?.map((task: Task) => {
            if (task.status == "development") {
              return (
                <div
                  className="task"
                  id={String(task.id)}
                  onClick={() => navigate(`/task/${task.id}`)}
                  draggable={true}
                  onDragStart={(e) => dragStart(e)}
                >
                  <p>№{arrTasks.indexOf(task) + 1}</p>
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
          {arrTasks?.map((task: Task) => {
            if (task.status == "done") {
              return (
                <div
                  className="task"
                  id={String(task.id)}
                  onClick={() => navigate(`/task/${task.id}`)}
                  draggable={true}
                  onDragStart={(e) => dragStart(e)}
                >
                  <p>№{arrTasks.indexOf(task) + 1}</p>
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
