export type subTask = {
  id: number,
  subtask: string,
  done: boolean
}

export type Task = {
  id: number;
  title: string;
  description: string;
  dateCreat: string;
  subTasks: subTask[];
  timeInDev?: string;
  timeEndDev?: string;
};

export enum ActionTypes {
  ADD_ITEM = "ADD_ITEM",
  CHANGE_ITEM = 'CHANGE_ITEM',
  REMOVE_ITEM = "REMOVE_ITEM",
  REMOVE_SUBITEM = "REMOVE_SUBITEM",
}

export type AddItemAction = {
  type: ActionTypes.ADD_ITEM;
  payload: Task;
};

export type ChangeItemAction = {
  type: ActionTypes.CHANGE_ITEM;
  payload: Task;
};

export type RemoveItemAction = {
  type: ActionTypes.REMOVE_ITEM;
  payload: number; // id
};

export type Action = AddItemAction | ChangeItemAction | RemoveItemAction
