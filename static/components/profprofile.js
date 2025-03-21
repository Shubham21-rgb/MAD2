export default{
    template:`
            <div>
            <br><br>
                <p>Update Your own profile ------------->> professional id-{{id}}</p>
                <div class="mb-3">
                    <label for="type" class="form-label">Company-Info</label>
                    <input type="text" class="form-control" id="amount" v-model="date.description">
                </div>
                <div class="mb-3">
                    <label for="type" class="form-label"> Experience</label>
                    <input type="text" class="form-control" id="amount" v-model="date.Experience">
                </div>
                <div class="mb-3">
                    <label for="type" class="form-label"> Service-Type</label>
                    <input type="text" class="form-control" id="amount" v-model="date.service_type">
                </div>
                <div class="mb-3">
                    <label for="type" class="form-label">Founder</label>
                    <input type="text" class="form-control" id="amount" v-model="date.Founder">
                </div>
                <button class="btn btn-success" @click="save">Save+</button>
            </div>
        `,
                data:function(){
                    return{
                        id:null,
                        date: {
                            service_type:'',
                            Experience:'',
                            description:'',
                            Founder:''
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
                        this.$router.push('/pdashboard');
                    }
                    )}
                    }
                }