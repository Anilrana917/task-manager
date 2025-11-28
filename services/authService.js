const MOCK_USER = {
  id: 1,
  username: 'demo_user',
  email: 'user@demo.com'
};

const MOCK_TOKEN = 'mock_jwt_token_12345';

export const authService = {
  async login(credentials) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (credentials.username && credentials.password) {
      const userData = {
        user: MOCK_USER,
        token: MOCK_TOKEN
      };
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', MOCK_TOKEN);
        localStorage.setItem('user_data', JSON.stringify(MOCK_USER));
      }
      
      return userData;
    }
    
    throw new Error('Invalid credentials');
  },

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      window.location.href = '/login';
    }
  },

  getToken() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token');
    }
    return null;
  },

  getUser() {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user_data');
      return userData ? JSON.parse(userData) : null;
    }
    return null;
  },

  isAuthenticated() {
    return !!this.getToken();
  }
};