import { useNavigate, useParams } from "react-router-dom";
import { Button, FloatButton, Modal, Input } from "antd";
const { TextArea } = Input;
import { useSelector, useDispatch } from "react-redux";
import { Action, ActionTypes, Task, subTask } from "./store/types";
import { DeleteOutlined, EditOutlined, BarsOutlined } from "@ant-design/icons";
import { useState } from "react";
import moment from "moment";
import CommentContainer from "./CommentContainer";

const MyTask: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const newid = Number(id);
  const tasks = useSelector((state: Task[]) => state);
  const task = tasks.find((el) => el.id == newid);
  const [newTitle, setNewTitle] = useState(task?.title);
  const [newDescription, setNewDescription] = useState(task?.description);
  const [newSubTasks, setNewSubTasks] = useState(task?.subTasks);
  const [subTask, setSubTask] = useState("");

  function removeTask() {
    const addItemAction: Action = {
      type: ActionTypes.REMOVE_ITEM,
      payload: newid,
    };
    dispatch(addItemAction);
    navigate("/");
  }

  function changeTask() {
    const newTask: Task = {
      id: task.id,
      title: newTitle,
      description: newDescription,
      // dateCreat: task.dateCreat,
      subTasks: newSubTasks,
    };
    const changeItemAction: Action = {
      type: ActionTypes.CHANGE_ITEM,
      payload: newTask,
    };
    dispatch(changeItemAction);
    setIsModalOpen(false);
  }

  function addSubTask() {
    if (subTask) {
      let newSubTask: subTask = {
        id: Date.now(),
        subtask: subTask,
        done: false,
      };
      setNewSubTasks([...newSubTasks, newSubTask]);
      setSubTask("");
    }
  }

  function removeSubTask(idSubTask: number) {
    console.log(idSubTask);
    let arr = newSubTasks;
    setNewSubTasks(arr?.filter((el) => el.id != idSubTask));
  }

  function changeStatus(idSubTask: number) {
    let arr = newSubTasks?.map((el: subTask) => {
      if (el.id == idSubTask) {
        return {
          ...el,
          done: !el.done,
        };
      }
      return el;
    });
    setNewSubTasks(arr);
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModalChangeTask = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setNewSubTasks(task?.subTasks);
  };

  const comments = [
    {
      id: 1,
      text: "корневой",
      children: [2, 3],
    },
    {
      id: 2,
      text: "ответ на корненой",
      children: [4],
    },
    {
      id: 3,
      text: "еще один ответ на комментарий",
      children: [],
    },
    {
      id: 4,
      text: "ответ на ответ",
      children: [],
    },
    {
      id: 5,
      text: "корневой 2",
      children: [6],
    },
    {
      id: 6,
      text: "ответ на корневой 2",
      children: [7],
    },
    {
      id: 7,
      text: "ответ на ответ корневого 2",
      children: [],
    },
  ];

  return (
    <div className="taskList">
      <Button
        type="text"
        icon={<BarsOutlined />}
        size="large"
        onClick={() => navigate("/")}
        className="btn"
      ></Button>
      <Button
        type="text"
        onClick={openModalChangeTask}
        icon={<EditOutlined />}
        size="large"
        className="btn"
      ></Button>
      <Modal
        title="Измение задачи"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <div>
            <Button onClick={addSubTask}>Добавить подзадачу</Button>
            <Button onClick={changeTask}>Сохранить изменения</Button>
          </div>,
        ]}
      >
        <p>Заголовок</p>
        <TextArea
          placeholder="Название задачи"
          autoSize
          onChange={(e) => setNewTitle(e.target.value)}
          value={newTitle}
        />
        <div style={{ margin: "24px 0" }} />
        <p>Описание</p>
        <TextArea
          placeholder="Описание задачи"
          autoSize={{ minRows: 2, maxRows: 6 }}
          onChange={(e) => setNewDescription(e.target.value)}
          value={newDescription}
        />
        <div style={{ margin: "24px 0" }} />
        <p>Подзадача</p>
        <TextArea
          placeholder="Добавить подзадачу"
          autoSize
          onChange={(e) => setSubTask(e.target.value)}
          value={subTask}
        />
        {newSubTasks?.map((el: subTask) => (
          <p className={el.done ? "subTaskdone" : ""}>
            {el.subtask} - id - {el.id} -
            <Button
              onClick={(e) => removeSubTask(e.currentTarget.value)}
              value={el.id}
            >
              Удалить
            </Button>
            <Button
              onClick={(e) => changeStatus(e.currentTarget.value)}
              value={el.id}
            >
              {el.done ? "сделано" : "не сделано"}
            </Button>
          </p>
        ))}
      </Modal>
      <FloatButton
        tooltip={<div>Удалить задачу</div>}
        onClick={removeTask}
        icon={<DeleteOutlined />}
      />
      <p>Заголовок: {task?.title}</p>
      <p>Описание: {task?.description}</p>
      <p>Статус: {task?.status}</p>
      {task?.status == "done" ? (
        <p>
          Задача была выполнена : {new Date(task?.timeEndDev).toLocaleString()}{" "}
          за {(task?.timeEndDev - task.id) / 1000} секунд
        </p>
      ) : (
        <p>Задача в работе : {moment(task?.id).fromNow().slice(0, -3)}</p>
      )}
      <p>Задача создана : {task?.dateCreat}</p>
      {task?.subTasks.map((el: subTask) => (
        <p id={el.id} className={el.done ? "subTaskdone" : ""}>
          - {el.subtask} - id - {el.id}
        </p>
      ))}
      <CommentContainer comments={comments} />
    </div>
  );
};

export default MyTask;
