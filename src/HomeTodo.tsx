import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Button, Modal, Input } from "antd";
const { TextArea } = Input;
import { useSelector, useDispatch } from "react-redux";
import { Action, ActionTypes, Task, subTask } from "./store/types";
import moment from "moment";

const HomeTodo: React.FC = () => {
  const [nameTask, setNameTask] = useState<string>("");
  const [textTask, setTextTask] = useState<string>("");

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
      timeInDev: moment(this?.id).fromNow()
    };

    const addItemAction: Action = {
      type: ActionTypes.ADD_ITEM,
      payload: task,
    };
    dispatch(addItemAction)
    
    setNameTask("");
    setTextTask("");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="taskList">
      <Button type="primary" onClick={createNewTask}>
        Добавить задачу
      </Button>
      <Modal
        title="Добавление задачи"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button onClick={addTask}>Добавить</Button>
        ]}
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
      {tasks?.map((task: Task) => (
          <div
            className="task"
            id={String(task.id)}
            onClick={() => navigate(`/task/${task.id}`)}
          >
            <p>{task.title}</p>
            <p>{task.description}</p>
            {task?.subTasks.map((el: subTask ) => <p>- {el.subtask} - id - {el.id}</p>)}
          </div>
        ))}
    </div>
  );
};

export default HomeTodo;
