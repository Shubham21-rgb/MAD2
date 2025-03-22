export default{
    template:`
    <div class="container mt-5">
        <h1 align="center">Waiting for Confirmation</h1>
        <div class="d-flex justify-content-center align-items-center vh-80">
            <div class="alert alert-primary" role="alert" style="width: 800px; height: 500px; padding: 20px; font-size: 18px;">
                <p>Ratings Page</p>
                <p>Response of Ratings may take 2 working days </p>
                <div class="mb-3">
                    <label for="type" class="form-label"> Your Review</label>
                    <input type="text" class="form-control" id="amount" v-model="Roi.review">
                </div>
                <button class="btn btn-success" @click="save">Procced</button>
                <router-link to="/dashboard" class="btn btn-warning">Back</router-link>
            </div>
        </div>
    </div>
        `,
                data:function(){
                    return{
                        id:null,  
                        status:null,
                        Roi:{
                            review:''

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
                        fetch(`/api/cusrate/${this.$route.params.id}`,{
                            method:'POST',
                            headers: {
                                "Content-Type":'application/json',
                                "Authentication-Token":localStorage.getItem("auth_token")
                            },
                            body:JSON.stringify(this.Roi)
                    }).then(response => response.json())
                    .then(data =>{
                        console.log(data);
                        const message=data;
                        alert("Rated Succesfully");
                        this.$router.push('/dashboard');
                    }
                    )}
                    }
                }