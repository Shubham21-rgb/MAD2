export default{
    template:`
    <div class="container mt-5">
        <h1 align="center">Waiting for Confirmation</h1>
        <div class="d-flex justify-content-center align-items-center vh-80">
            <div class="alert alert-primary" role="alert" style="width: 800px; height: 200px; padding: 20px; font-size: 18px;">
            <h4>Admin Management</h4>
                <div class="mb-3">
                    <label for="type" class="form-label"> Remarks</label>
                    <input type="text" class="form-control" id="amount" v-model="date.remark">
                </div>
                <button class="btn btn-success" @click="save">Procced</button>
                <router-link to="/verify" class="btn btn-warning">Back</router-link>
            </div>
        </div>
    </div>
        `,
                data:function(){
                    return{
                        id:null,  
                        date:{
                            remark:''
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
                        fetch(`/api/rateadmin/${this.$route.params.id}`,{
                            method:'POST',
                            headers: {
                                "Content-Type":'application/json',
                                "Authentication-Token":localStorage.getItem("auth_token")
                            },
                            body:JSON.stringify(this.date)
                    }).then(response => response.json())
                    .then(data =>{
                        console.log(data);
                        const message=data;
                        alert("Reviewed Succesfully");
                        this.$router.push('/verify');
                    }
                    )}
                    }
                }