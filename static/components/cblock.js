export default{
    template:`
    <div class="container mt-5">
        <h1 align="center">Waiting for Confirmation</h1>
        <div class="d-flex justify-content-center align-items-center vh-80">
            <div class="alert alert-primary" role="alert" style="width: 800px; height: 200px; padding: 20px; font-size: 18px;">
            <h4>Admin Management</h4>
                <p>Are you sure you want it to block this User</p>
                <p>You are going to Block the User with id {{id}}</p>
                <button class="btn btn-success" @click="save">Confirm</button>
                <router-link to="/verify" class="btn btn-warning">Back</router-link>
            </div>
        </div>
    </div>
        `,
                data:function(){
                    return{
                        id:null,
                        message:""
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
                        fetch(`/api/cblock/${this.$route.params.id}`,{
                            method:'GET',
                            headers: {
                                "Content-Type":'application/json',
                                "Authentication-Token":localStorage.getItem("auth_token")
                            }
                    }).then(response => response.json())
                    .then(data =>{
                        console.log(data);
                        const message=data;
                        alert("Succesfullly Blocked");
                        this.$router.push('/verify');
                    }
                    )}
                    }
                }