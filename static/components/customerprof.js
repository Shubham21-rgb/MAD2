export default{
    template:`
    <div class="container mt-5">
        <h1 align="center">Update Customer Profile</h1>
            <div class="d-flex justify-content-center align-items-center vh-80">
                <div class="alert alert-primary" role="alert" style="width: 800px; height: 600px; padding: 20px; font-size: 18px;">
                    <br><br>
                <p>Update Your own profile ------------->> Customer id-{{id}}</p>
                <div class="mb-3">
                    <label for="type" class="form-label"> Contact-no</label>
                    <input type="text" class="form-control" id="amount" v-model="date.contact_no">
                </div>
                <div class="mb-3">
                    <label for="type" class="form-label">Address</label>
                    <input type="text" class="form-control" id="amount" v-model="date.address">
                </div>
                <button class="btn btn-success" @click="save">Save+</button>
                <router-link to="/dashboard" class="btn btn-warning">Back</router-link>
            </div>
        </div>
    <div>
        `,
                data:function(){
                    return{
                        id:null,
                        date: {
                            contact_no:'',
                            address:''
                        }
                    }
                },
                mounted(){
                    this.cr()
                },
                methods:{
                    cr(){
                        this.id = this.$route.params.id
                    },

                    save(){
                        fetch(`/api/updateprof/${this.$route.params.id}`,{
                            method:'POST',
                            headers: {
                                "Content-Type":'application/json',
                                "Authentication-Token":localStorage.getItem("auth_token")
                            },
                            body:JSON.stringify(this.date)
                    }).then(response => response.json())
                    .then(data =>{
                        console.log(data);
                        let message=data;
                        alert("Succesfully added the details");
                        this.$router.push('/dashboard');
                    }
                    )}
                    }
                }