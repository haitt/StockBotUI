const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://stockapi.harico.io.vn/api';

// AuthContext lắng nghe event này để hạ trạng thái đăng nhập khi token hết hạn.
export const UNAUTHORIZED_EVENT = 'auth:unauthorized';

export const SESSION_EXPIRED_MESSAGE = 'Your session has expired. Please login again.';

const request = async (path, { method = 'GET', body, auth = true } = {}) => {
  const headers = { 'Content-Type': 'application/json' };

  if (auth) {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token');
    }
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  // 401 trên endpoint cần token = token hết hạn/sai; 401 của /auth/login là sai mật khẩu
  // nên không đi vào nhánh này (auth = false).
  if (auth && response.status === 401) {
    localStorage.removeItem('token');
    window.dispatchEvent(new Event(UNAUTHORIZED_EVENT));
    throw new Error(SESSION_EXPIRED_MESSAGE);
  }

  // Backend trả envelope {success, message, data}; lỗi hạ tầng (nginx, timeout) có thể
  // trả HTML nên phải chịu được body không phải JSON.
  let payload = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok || payload?.success === false) {
    throw new Error(payload?.message || `Request failed (HTTP ${response.status})`);
  }

  return payload?.data ?? null;
};

export const login = (username, password) =>
  request('/auth/login', { method: 'POST', body: { username, password }, auth: false });

export const getWatchLists = () => request('/watch-lists');

export const addSymbol = (name) => request('/watch-lists', { method: 'POST', body: { name } });

export const removeSymbol = async (id) => {
  await request(`/watch-lists/${id}`, { method: 'DELETE' });
  return true;
};
