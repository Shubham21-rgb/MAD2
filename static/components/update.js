export default{
    template:`
            <div>
                <p>Update Your own Service------------->> Your id-{{id}}</p>
                <div class="mb-3">
                    <label for="type" class="form-label"> Service-Name</label>
                    <select class="form-select" aria-label="Default select example" v-model="date.Service_name">
                        <option selected>Open this select menu</option>
                        <option value="Household Cleaning">Household Cleaning</option>
                        <option value="Household Sanitary">Household Sanitary</option>
                        <option value="Household Electricals">Household Electricals</option>
                        <option value="Household Security">Household Security</option>
                        <option value="Household Garderning">Household Garderning</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="type" class="form-label"> Time-Required</label>
                    <input type="text" class="form-control" id="amount" v-model="date.Time_required">
                </div>
                <div class="mb-3">
                    <label for="type" class="form-label"> Description</label>
                    <input type="text" class="form-control" id="amount" v-model="date.Description">
                </div>
                <div class="mb-3">
                    <label for="type" class="form-label"> Amount</label>
                    <input type="text" class="form-control" id="amount" v-model="date.amount">
                </div>
                <button class="btn btn-success" @click="save">Save+</button>
            </div>
        `,
                data:function(){
                    return{
                        id:null,
                        date: {
                            Service_name:'',
                            Time_required:'',
                            Description:'',
                            amount:''
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
                        fetch(`/api/update/${this.$route.params.id}`,{
                            method:'PUT',
                            headers: {
                                "Content-Type":'application/json',
                                "Authentication-Token":localStorage.getItem("auth_token")
                            },
                            body:JSON.stringify(this.date)
                    }).then(response => response.json())
                    .then(data =>{
                        console.log(data);
                        let message=data;
                        alert(message);
                        this.$router.push('/pdashboard');
                    }
                    )}
                    }
                }