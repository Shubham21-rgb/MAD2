export default{
    template:`
    <div class="container mt-5">
        <h1 align="center">Waiting for Confirmation</h1>
        <div class="d-flex justify-content-center align-items-center vh-80">
            <div class="alert alert-primary" role="alert" style="width: 900px; height: 1000px; padding: 20px; font-size: 18px;">
            <div class="col-12 border" style="height: 750px; width:800px">
                <h3>Create Service</h3>
                <p>Your Professional id is : {{id}}</p>
                <p>Please Remember You Can Create Only One Service Not More Than That</p>
                <p>If the admin Has already Created the service then You are only Able to update It</p>
                    <div class="mb-3">
                        <label for="name" class="form-label"> Service-ID</label>
                        <input type="text" class="form-control" id="id" v-model="transData.id">
                    </div>
                <div class="mb-3">
                    <label for="type" class="form-label"> Amount</label>
                    <input type="text" class="form-control" id="amount" v-model="transData.amount">
                </div>
                <div class="mb-3">
                    <label for="source" class="form-label"> Service Type</label>
                    <select class="form-select" aria-label="Default select example" v-model="transData.service_name">
                        <option selected>Open this select menu</option>
                        <option value="Household Cleaning">Household Cleaning</option>
                        <option value="Household Sanitary">Household Sanitary</option>
                        <option value="Household Electricals">Household Electricals</option>
                        <option value="Household Security">Household Security</option>
                        <option value="Household Garderning">Household Garderning</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="destination" class="form-label">Time Required</label>
                    <input type="text" class="form-control" id="time" v-model="transData.Time_required">
                </div>
            <div class="mb-3">
                <label for="description" class="form-label">Description</label>
                <input type="text" class="form-control" id="description" v-model="transData.Description">
            </div>
            <div class="mb-3 text-end">
                <button @click="createTrans" class="btn btn-primary">Create+</button>
            </div>
            </div>
                <router-link to="/pdashboard" class="btn btn-warning">Back</router-link>
            </div>
        </div>
    </div>
        `,
                data:function(){
                    return{
                        id:null,  
                        transData:{
                            id:'',
                            amount:'',
                            service_name:'',
                            Time_required:'',
                            Description:''


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

                    createTrans(){
                        fetch('/api/adcreate',{
                            method:'POST',
                            headers: {
                                "Content-Type":'application/json',
                                "Authentication-Token":localStorage.getItem("auth_token")
                            },
                            body:JSON.stringify(this.transData)
                    }).then(response => response.json())
                    .then(data =>{
                        console.log(data);
                        const message=data;
                        alert(" Succesfull");
                        this.$router.push('/pdashboard');
                    }
                    )}
                    }
                }