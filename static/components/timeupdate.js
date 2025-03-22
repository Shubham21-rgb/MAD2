export default{
    template:`
    <div class="container mt-5">
        <h1 align="center">Update- Date of Completion</h1>
            <div class="d-flex justify-content-center align-items-center vh-80">
                <div class="alert alert-primary" role="alert" style="width: 800px; height: 500px; padding: 20px; font-size: 18px;">
                <p>Please Provide the Given Date to Updatefor id-{{id}}</p>
                <p>Date of Request:{{Request_date}}<p>
                <div class="mb-3">
                    <label for="type" class="form-label"> Date</label>
                    <input type="text" class="form-control" id="amount" v-model="date.time">
                </div>
                <button class="btn btn-success" @click="save">Procced</button>
                <router-link to="/pdashboard" class="btn btn-warning">Back</router-link>
            </div>
        </div>
    </div>
        `,
                data:function(){
                    return{
                        id:null,
                        status:null,
                        Request_date:null,
                        message:"",
                        date: {
                            time:''
                        }
                    }
                },
                mounted(){
                    this.cr()
                },
                methods:{
                    cr(){
                        this.id = this.$route.params.id,
                        this.status= this.$route.params.status
                        this.Request_date= this.$route.params.Request_date
                    },

                    save(){
                        fetch(`/api/tupdate/${this.$route.params.id}`,{
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
                        alert("Succesfully");
                        this.$router.push('/pdashboard');
                    }
                    )}
                    }
                }