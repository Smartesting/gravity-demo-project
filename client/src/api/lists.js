import { ampli } from '../ampli';
import socket from './socket';

/* Actions */

const createList = (boardId, data, headers) => {
  socket.post(`/boards/${boardId}/lists`, data, headers);
  ampli.createdList();
};

const updateList = (id, data, headers) => socket.patch(`/lists/${id}`, data, headers);

const deleteList = (id, headers) => {
  socket.delete(`/lists/${id}`, undefined, headers);
  ampli.removedList();
};

export default {
  createList,
  updateList,
  deleteList,
};
