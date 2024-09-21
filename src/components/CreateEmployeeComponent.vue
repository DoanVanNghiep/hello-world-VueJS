<template>
    <div>
      <br />
      <div class="container">
        <div class="row">
          <div class="card col-md-6 offset-md-3">
            <h3 class="text-center">{{ id === '_add' ? 'Add Employee' : 'Update Employee' }}</h3>
            <div class="card-body">
              <form @submit.prevent="saveOrUpdateEmployee">
                <div class="form-group">
                  <label>Employee No:</label>
                  <input
                    placeholder="Employee No"
                    v-model="empNo"
                    class="form-control"
                  />
                </div>
                <div class="form-group">
                  <label>Employee Name:</label>
                  <input
                    placeholder="Employee Name"
                    v-model="empName"
                    class="form-control"
                  />
                </div>
                <div class="form-group">
                  <label>Position:</label>
                  <input
                    placeholder="Position"
                    v-model="position"
                    class="form-control"
                  />
                </div>
                <div class="form-group">
                  <label>Quantity:</label>
                  <input
                    placeholder="Quantity"
                    type="number"
                    v-model="quantity"
                    class="form-control"
                  />
                </div>
                <div class="form-group">
                  <label>Price:</label>
                  <input
                    placeholder="Price"
                    type="number"
                    step="0.01"
                    v-model="price"
                    class="form-control"
                  />
                </div>
                <div class="form-group">
                  <label>Photo:</label>
                  <input type="file" class="form-control" @change="changePhotoHandler" />
                </div>
                <div v-if="photoUrl" class="form-group">
                  <img :src="photoUrl" alt="Employee Photo" style="width: 100px; height: 100px;" />
                </div>
                <button class="btn btn-success" @click="saveOrUpdateEmployee">Save</button>
                <button class="btn btn-danger" @click="cancel" style="margin-left: 10px;">Cancel</button>
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
        id: this.$route.params.id || '_add',
        empNo: '',
        empName: '',
        position: '',
        photoUrl: '',
        quantity: 0,
        price: 0.0
      };
    },
    mounted() {
      if (this.id !== '_add') {
        EmployeeService.getEmployeeById(this.id).then((res) => {
          const employee = res.data;
          this.empNo = employee.empNo;
          this.empName = employee.empName;
          this.position = employee.position;
          this.photoUrl = employee.photoUrl;
          this.quantity = employee.quantity;
          this.price = employee.price;
        });
      }
    },
    methods: {
      saveOrUpdateEmployee() {
        const employee = {
          empNo: this.empNo,
          empName: this.empName,
          position: this.position,
          photoUrl: this.photoUrl,
          quantity: this.quantity,
          price: this.price
        };
  
        if (this.id === '_add') {
          EmployeeService.createEmployee(employee).then(() => {
            this.$router.push('/employee');
          });
        } else {
          EmployeeService.updateEmployee(this.id, employee).then(() => {
            this.$router.push('/employee');
          });
        }
      },
      changePhotoHandler(event) {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
  
        EmployeeService.uploadPhoto(formData)
          .then((response) => {
            this.photoUrl = response.data;
          })
          .catch((error) => {
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
  .container {
    margin-top: 20px;
  }
  </style>
  