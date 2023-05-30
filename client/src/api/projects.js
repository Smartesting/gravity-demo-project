import { ampli } from '../ampli';
import http from './http';
import socket from './socket';

/* Actions */

const getProjects = (headers) => socket.get('/projects', undefined, headers);

const createProject = (data, headers) => {
  socket.post('/projects', data, headers);
  ampli.createdProject();
};

const getProject = (id, headers) => socket.get(`/projects/${id}`, undefined, headers);

const updateProject = (id, data, headers) => socket.patch(`/projects/${id}`, data, headers);

const updateProjectBackgroundImage = (id, data, headers) =>
  http.post(`/projects/${id}/background-image`, data, headers);

const deleteProject = (id, headers) => {
  socket.delete(`/projects/${id}`, undefined, headers);
  ampli.removedProject();
};

export default {
  getProjects,
  createProject,
  getProject,
  updateProject,
  updateProjectBackgroundImage,
  deleteProject,
};
