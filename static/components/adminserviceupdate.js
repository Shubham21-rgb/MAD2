export default{
    template:`
    <div class="container mt-5">
        <h1 align="center">Service Update</h1>
        <div class="d-flex justify-content-center align-items-center vh-80">
            <div class="alert alert-primary" role="alert" style="width: 800px; height: 1000px; padding: 20px; font-size: 18px;">
            <h2>Admin Management Area</h2>
            <p>General Information If you Keep the Places empty and submit we will update it to that</p>
            <p>So please Fill it carefully</p>
            <br><br>
                <p>Update Service------------->>  id-{{id}}</p>
                <h4>Previous Service Details</h4>
                <p>Service Type:{{service}}</p>
                <p>Time-Required:{{time}}</p>
                <p>Description:{{desc}}</p>
                <p>Amount:{{amount}}</p>
                <p>Unique ID is {{unique}}</p>
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
                <router-link to="/adminupdate" class="btn btn-warning">Back</router-link>
            </div>
        </div>
    </div>
        `,
                data:function(){
                    return{
                        id:null,
                        service:null,
                        time:null,
                        desc:null,
                        amount:null,
                        unique:null,
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
                        this.id = this.$route.params.id,
                        this.service=this.$route.params.service,
                        this.time=this.$route.params.time,
                        this.desc=this.$route.params.desc,
                        this.amount=this.$route.params.amount,
                        this.unique=this.$route.params.unique
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
                        this.$router.push('/adminupdate');
                    }
                    )}
                    }
                }