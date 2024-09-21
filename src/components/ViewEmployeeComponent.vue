<template>
    <div>
      <br />
      <div class="card col-md-6 offset-md-3">
        <h3 class="text-center">View Employee Details</h3>
        <div class="card-body">
          <div class="row">
            <label>Employee ID:</label>
            <div>{{ employee.empNo }}</div>
          </div>
          <div class="row">
            <label>Employee Name:</label>
            <div>{{ employee.empName }}</div>
          </div>
          <div class="row">
            <label>Employee Position:</label>
            <div>{{ employee.position }}</div>
          </div>
          <div class="row">
            <label>Employee Photo:</label>
            <div>
              <img
                v-if="employee.photoUrl"
                :src="`http://localhost:8080${employee.photoUrl}`"
                :alt="employee.empName"
                style="width: 100px; height: 100px"
              />
              <div v-else>No photo available</div>
            </div>
          </div>
          <div class="row">
            <label>Quantity:</label>
            <div>{{ employee.quantity }}</div>
          </div>
          <div class="row">
            <label>Price:</label>
            <div>{{ employee.price }}</div>
          </div>
          <button class="btn btn-primary" @click="addToCart">Add to Cart</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import EmployeeService from '../service/EmployeeService';
  import AuthService from '../service/AuthService';
  
  export default {
    data() {
      return {
        id: this.$route.params.id,
        employee: {}
      };
    },
    mounted() {
      this.fetchEmployee();
    },
    methods: {
      fetchEmployee() {
        EmployeeService.getEmployeeById(this.id)
          .then((res) => {
            this.employee = res.data;
          })
          .catch((error) => {
            console.error('Error fetching employee:', error);
          });
      },
      addToCart() {
        let cart = AuthService.loadCart();
        const existingEmployee = cart.find(item => item.empNo === this.employee.empNo);
        if (existingEmployee) {
          cart = cart.map(item =>
            item.empNo === this.employee.empNo
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          cart.push({ ...this.employee, quantity: 1 });
        }
        AuthService.saveCart(cart);
        alert('Employee added to cart');
      }
    }
  };
  </script>
  
  <style scoped>
  .card {
    margin-top: 20px;
  }
  </style>
  