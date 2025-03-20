export default{
    template:`
            <div>
                <p>Please Provide the Given Date to Updatefor id-{{id}}</p>
                <p>Date of Request:{{value}}<p>
                <div class="mb-3">
                    <label for="type" class="form-label"> Date</label>
                    <input type="text" class="form-control" id="amount" v-model="date.time">
                </div>
                <button class="btn btn-success" @click="save">Procced</button>
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
                computed:{
                    value(){
                        return this.Request_date.substring(0,10)
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