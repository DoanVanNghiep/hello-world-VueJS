<template>
    <div class="login-container">
      <div class="card login-card">
        <h3 class="text-center">Login</h3>
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="username">Username</label>
            <input
              type="text"
              class="form-control"
              name="username"
              v-model="username"
              placeholder="Enter your username"
            />
          </div>
  
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              class="form-control"
              name="password"
              v-model="password"
              placeholder="Enter your password"
            />
          </div>
  
          <div class="form-group">
            <button
              class="btn btn-primary btn-block"
              :disabled="loading"
            >
              <span v-if="loading" class="spinner-border spinner-border-sm"></span>
              <span v-if="!loading">Login</span>
            </button>
          </div>
  
          <div v-if="message" class="form-group">
            <div class="alert alert-danger" role="alert">
              {{ message }}
            </div>
          </div>
        </form>
        <div class="form-group text-center mt-3">
          <router-link to="/register" class="register-link">
            Don't have an account? Register
          </router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import AuthService from '@/service/AuthService';
  
  export default {
    data() {
      return {
        username: '',
        password: '',
        loading: false,
        message: ''
      };
    },
    methods: {
      handleLogin() {
        this.loading = true;
        this.message = '';
  
        AuthService.login(this.username, this.password)
          .then(() => {
            const role = AuthService.getCurrentUserRole();
            if (role === 0) {
              this.$router.push('/employee');
            } else if (role === 1) {
              this.$router.push('/user');
            }
            window.location.reload();
          })
          .catch(error => {
            const resMessage =
              (error.response && error.response.data && error.response.data.message) ||
              error.message ||
              error.toString();
  
            this.loading = false;
            this.message = resMessage;
          });
      }
    }
  };
  </script>
  
  <style scoped>
 .login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f8f9fa;
}

.login-card {
  width: 100%;
  max-width: 400px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: white;
}

h3.text-center {
  margin-bottom: 20px;
  color: #343a40;
}

.form-group {
  margin-bottom: 15px;
}

input.form-control {
  padding: 10px;
  font-size: 16px;
}

button.btn-block {
  width: 100%;
  padding: 10px;
  font-size: 16px;
}

.alert {
  margin-top: 10px;
}

.register-link {
  color: #007bff;
  text-decoration: none;
}

.register-link:hover {
  text-decoration: underline;
}

.mt-3 {
  margin-top: 1rem;
}
  </style>
  