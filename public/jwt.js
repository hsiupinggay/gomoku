// JWT auth
const token = localStorage.getItem('authToken');
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
