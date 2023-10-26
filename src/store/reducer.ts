import { Task, Action, ActionTypes } from "./types";
// import { applyMiddleware, createStore } from 'redux';

const initialState: Task[] = [];

// function setLS() {
//   let stringArrayTasks = JSON.stringify(initialState);
//   localStorage.setItem("arrayTasks", stringArrayTasks);
// }



const reducer = (state = initialState, action: Action): Task[] => {
  switch (action.type) {
    case ActionTypes.ADD_ITEM:
      return [...state, action.payload]
    case ActionTypes.CHANGE_ITEM:
      const updatedArray = state.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            title: action.payload.title,
            description: action.payload.description,
            subTasks: action.payload.subTasks,
          };
        }
        return item;
      });
      return updatedArray;
    case ActionTypes.REMOVE_ITEM:
      return state.filter((item) => item.id !== action.payload);
    case ActionTypes.DRAG_ITEM:
      const dragArray = state.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            status: action.payload.status,
            timeEndDev: action.payload.timeEndDev,
          };
        }
        return item;
      });
      return dragArray;
    default:
      return state;
  }
};




export default reducer;
