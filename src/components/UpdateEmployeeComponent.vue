<template>
    <div>
      <br />
      <div class="container">
        <div class="row">
          <div class="card col-md-6 offset-md-3">
            <h3 class="text-center">Update Employee</h3>
            <div class="card-body">
              <form @submit.prevent="updateEmployee">
                <div class="form-group">
                  <label>Employee No:</label>
                  <input
                    placeholder="Employee No"
                    name="empNo"
                    class="form-control"
                    v-model="employee.empNo"
                    readonly
                  />
                </div>
  
                <div class="form-group">
                  <label>Employee Name:</label>
                  <input
                    placeholder="Employee Name"
                    name="empName"
                    class="form-control"
                    v-model="employee.empName"
                  />
                </div>
  
                <div class="form-group">
                  <label>Position:</label>
                  <input
                    placeholder="Position"
                    name="position"
                    class="form-control"
                    v-model="employee.position"
                  />
                </div>
  
                <div class="form-group">
                  <label>Quantity:</label>
                  <input
                    placeholder="Quantity"
                    name="quantity"
                    type="number"
                    class="form-control"
                    v-model="employee.quantity"
                  />
                </div>
  
                <div class="form-group">
                  <label>Price:</label>
                  <input
                    placeholder="Price"
                    name="price"
                    type="number"
                    step="0.01"
                    class="form-control"
                    v-model="employee.price"
                  />
                </div>
  
                <div class="form-group">
                  <label>Photo:</label>
                  <input type="file" name="photo" class="form-control" @change="changePhotoHandler" />
                </div>
  
                <div v-if="employee.photoUrl" class="form-group">
                  <img :src="employee.photoUrl" :alt="employee.empName" style="width: 100px; height: 100px" />
                </div>
  
                <button class="btn btn-success" type="submit">Update</button>
                <button class="btn btn-danger" @click="cancel" style="margin-left: 10px">Cancel</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import EmployeeService from '../service/EmployeeService';
  
  export default {
    data() {
      return {
        id: this.$route.params.id,
        employee: {
          empNo: '',
          empName: '',
          position: '',
          photoUrl: null,
          quantity: 0,
          price: 0.0
        }
      };
    },
    mounted() {
      this.fetchEmployee();
    },
    methods: {
      fetchEmployee() {
        EmployeeService.getEmployeeById(this.id)
          .then(res => {
            this.employee = res.data;
          })
          .catch(error => {
            console.error('Error fetching employee:', error);
            alert('Could not retrieve employee data. Please try again later.');
          });
      },
      updateEmployee() {
        EmployeeService.updateEmployee(this.id, this.employee)
          .then(() => {
            this.$router.push('/employee');
          })
          .catch(error => {
            console.error('Error updating employee:', error);
            alert('An error occurred while updating the employee. Please try again.');
          });
      },
      changePhotoHandler(event) {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
  
        EmployeeService.uploadPhoto(formData)
          .then(response => {
            this.employee.photoUrl = response.data;
          })
          .catch(error => {
            console.error('Error uploading photo:', error);
            alert('An error occurred while uploading the photo. Please try again.');
          });
      },
      cancel() {
        this.$router.push('/employee');
      }
    }
  };
  </script>
  
  <style scoped>
  .card {
    margin-top: 20px;
  }
  </style>
  