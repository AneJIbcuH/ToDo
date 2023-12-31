export type subTask = {
  id: number,
  subtask: string,
  done: boolean
}

export type dragTask = {
  id: number,
  status: string,
  timeEndDev?: number;
}

export type Task = {
  id: number;
  title: string;
  description: string;
  dateCreat: string;
  subTasks: subTask[];
  timeEndDev?: number;
  status?: string;
};

export enum ActionTypes {
  ADD_ITEM = "ADD_ITEM",
  CHANGE_ITEM = 'CHANGE_ITEM',
  REMOVE_ITEM = "REMOVE_ITEM",
  DRAG_ITEM = "DRAG_ITEM",
  LOCALE_STORAGE = "LOCALE_STORAGE"
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

export type DragItemAction = {
  type: ActionTypes.DRAG_ITEM;
  payload: dragTask; // id status
};

export type LocaleStorageAction = {
  type: ActionTypes.LOCALE_STORAGE;
  payload: Task[]; // 
};

export type Action = AddItemAction | ChangeItemAction | RemoveItemAction | DragItemAction | LocaleStorageAction