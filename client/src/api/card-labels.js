import { ampli } from '../ampli';
import socket from './socket';

/* Actions */

const createCardLabel = (cardId, data, headers) => {
  socket.post(`/cards/${cardId}/labels`, data, headers);
  ampli.addedLabelToCard();
};

const deleteCardLabel = (cardId, labelId, headers) => {
  socket.delete(`/cards/${cardId}/labels/${labelId}`, undefined, headers);
  ampli.removedLabelFromCard();
};

export default {
  createCardLabel,
  deleteCardLabel,
};
