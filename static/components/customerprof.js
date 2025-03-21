export default{
    template:`
            <div>
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
            </div>
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