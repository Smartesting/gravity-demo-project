import socket from './socket';
import http from './http';
import { transformCard } from './cards';
import { transformAttachment } from './attachments';
import { ampli } from '../ampli';

/* Actions */

const createBoard = (projectId, data, headers) => {
  socket.post(`/projects/${projectId}/boards`, data, headers);
  ampli.createdBoard();
};

const createBoardWithImport = (projectId, data, requestId, headers) =>
  http.post(`/projects/${projectId}/boards?requestId=${requestId}`, data, headers);

const getBoard = (id, subscribe, headers) =>
  socket
    .get(`/boards/${id}${subscribe ? '?subscribe=true' : ''}`, undefined, headers)
    .then((body) => ({
      ...body,
      included: {
        ...body.included,
        cards: body.included.cards.map(transformCard),
        attachments: body.included.attachments.map(transformAttachment),
      },
    }));

const updateBoard = (id, data, headers) => socket.patch(`/boards/${id}`, data, headers);

const deleteBoard = (id, headers) => {
  socket.delete(`/boards/${id}`, undefined, headers);
  ampli.removedBoard();
};

export default {
  createBoard,
  createBoardWithImport,
  getBoard,
  updateBoard,
  deleteBoard,
};
