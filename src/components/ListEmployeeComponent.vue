<template>
    <div>
      <h2 class="text-center">Employees List</h2>
      <div class="row">
        <button class="btn btn-primary" @click="addEmployee">Add Employee</button>
      </div>
      <br />
      <div class="row">
        <table class="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Employee Name</th>
              <th>Position</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="employee in employees" :key="employee.empNo">
              <td>{{ employee.empNo }}</td>
              <td>{{ employee.empName }}</td>
              <td>{{ employee.position }}</td>
              <td>
                <button @click="updateEmployee(employee.empNo)" class="btn btn-info">Update</button>
                <button @click="deleteEmployee(employee.empNo)" class="btn btn-danger" style="margin-left: 10px;">Delete</button>
                <button @click="viewEmployee(employee.empNo)" class="btn btn-info" style="margin-left: 10px;">View</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import EmployeeService from '@/service/EmployeeService'; // Giả sử bạn đặt EmployeeService ở thư mục 'services'
  
  export default {
    data() {
      return {
        employees: [],
      };
    },
    created() {
      // Tương tự như componentDidMount trong React
      this.fetchEmployees();
    },
    methods: {
      fetchEmployees() {
        EmployeeService.getEmployees().then((res) => {
          this.employees = res.data;
        });
      },
      viewEmployee(id) {
        this.$router.push(`/view-employee/${id}`);
      },
      updateEmployee(id) {
        this.$router.push(`/update-employee/${id}`);
      },
      deleteEmployee(id) {
        EmployeeService.deleteEmployee(id).then(() => {
          this.employees = this.employees.filter(employee => employee.empNo !== id);
        });
      },
      addEmployee() {
        this.$router.push('/add-employee/_add');
      },
    },
  };
  </script>
  
  <style scoped>
  /* CSS tùy chỉnh nếu cần */
  </style>
  