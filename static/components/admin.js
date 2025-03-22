import adminnav from "./adminnav.js"
export default {
    components:{
       "n": adminnav
    },
    template: `
   <div>
    <n></n>
        <h2 class="my-2">Welcome, {{userData.username}}!</h2>
        <div class="row border">
            <div class="text-end"><router-link to="/adminupdate" class="btn btn-warning">Modify-Service</router-link></div>
        </div>
        <div class="row border">
            <div class="text-end"><button @click="csvd" class="btn btn-info btn-sm">Download CSV</button></div>
        </div>
            <div class="row border">
                <div class="col-8 border" style="height: 750px; overflow-y: scroll">
                    <h2>All Service_Request</h2>
                    <p>Accepted Services</p>
                        <div v-for="t in transactions" v-if="t.status=='Accepted'" class="card mt-2">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                    <th scope="col">Customer ID</th>
                                    <th scope="col">Date of Request</th>
                                    <th scope="col">Date of completion</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Service ID</th>
                                    <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <td>{{t.customer_id}}</td>
                                    <td>{{t.Date_of_Request}}</td>
                                    <td>{{t.Date_of_completion}}</td>
                                    <td>{{t.amount}}</td>
                                    <td>{{t.service_id}}</td>
                                    <td>
                                        <router-link :to="{name:'acomplete',params:{id: t.id,status: t.status}}" class="btn btn-warning">Completed</router-link>
                                    </td>
                                    <td>
                                        <router-link :to="{name:'aupdate',params:{id: t.id,status: t.status,Request_date:t.Date_of_Request}}" class="btn btn-warning">Update</router-link>
                                    </td>
                                </tbody>
                            </table>
                        </div>
                    <p>Pending Services</p>
                        <div v-for="t in transactions" v-if="t.status=='Pending'" class="card mt-2">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                    <th scope="col">Customer ID</th>
                                    <th scope="col">Date of Request Name</th>
                                    <th scope="col">Date of completion</th>
                                    <th scope="col">Service ID</th>
                                    <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <td>{{t.customer_id}}</td>
                                    <td>{{t.Date_of_Request}}</td>
                                    <td>{{t.Date_of_completion}}</td>
                                    <td>{{t.service_id}}</td>
                                    <td>
                                        <router-link :to="{name:'adminaccept',params:{id: t.id,status: t.status}}" class="btn btn-warning">Accept</router-link>
                                    </td>
                                    <td>
                                        <router-link :to="{name:'adminreject',params:{id: t.id,status: t.status}}" class="btn btn-warning">Reject</router-link>
                                    </td>
                                </tbody>
                             </table>
                        </div>
                    <p>Completed Service</p>
                        <div v-for="t in transactions" v-if="t.status=='Completed'" class="card mt-2">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                    <th scope="col">Customer ID</th>
                                    <th scope="col">Date of Request Name</th>
                                    <th scope="col">Service ID</th>
                                    <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <td>{{t.customer_id}}</td>
                                    <td>{{t.Date_of_Request}}</td>
                                    <td>{{t.service_id}}</td>
                                    <td>
                                        <router-link :to="{name:'aclose',params:{id: t.id,status: t.status}}" class="btn btn-warning">Close</router-link>
                                    </td>
                                </tbody>
                            </table>
                        </div>
                    <p>Closed Services</p>
                        <div v-for="t in transactions" v-if="t.status=='Closed'" class="card mt-2">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                    <th scope="col">Customer ID</th>
                                    <th scope="col">Date of Request Name</th>
                                    <th scope="col">Date of completion</th>
                                    <th scope="col">Service ID</th>
                                    <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <td>{{t.customer_id}}</td>
                                    <td>{{t.Date_of_Request}}</td>
                                    <td>{{t.Date_of_completion}}</td>
                                    <td>{{t.service_id}}</td>
                                    <td>
                                        <router-link :to="{name:'adelete',params:{id: t.id,status: t.status}}" class="btn btn-warning">Delete</router-link>
                                    </td>
                                </tbody>
                            </table>
                        </div>
                    <p>Rejected Services</p>
                        <div v-for="t in transactions" v-if="t.status=='Rejected'" class="card mt-2">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                    <th scope="col">Customer ID</th>
                                    <th scope="col">Date of Request</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Service ID</th>
                                    <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <td>{{t.customer_id}}</td>
                                    <td>{{t.Date_of_Request}}</td>
                                    <td>{{t.amount}}</td>
                                    <td>{{t.service_id}}</td>
                                    <td>
                                        <router-link :to="{name:'adelete',params:{id: t.id,status: t.status}}" class="btn btn-warning">Delete</router-link>
                                    </td>
                                </tbody>
                            </table>
                        </div>
                </div>
            <div class="col-4 border" style="height: 750px;">
                <h3>Create Service</h3>
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
            <div class="mb-3">
                    <label for="source" class="form-label"> Professional </label>
                    <select class="form-select" aria-label="Default select example" v-model="transData.prof_id">
                        <option selected>Open this select menu</option>
                        <option v-for="p in profess" :value="p.id">{{p.email}}</option>
                    </select>
            </div>
            <div class="mb-3 text-end">
                <button @click="createTrans" class="btn btn-primary">Create+</button>
            </div>
            <div>{{message}}</div>
            </div>
        </div>
    </div>`,
    data: function(){
        return {
            userData: "",
            profess:null,
            transactions: null,
            transData: {
                id: '',
                amount: '',
                service_name: '',
                Time_required: '',
                Description: '',
                prof_id:''
            },
            message:""

            
        }
    },
    mounted(){
        this.loadUser()
        this.loadTrans() 
        this.callprof()   
    },
    methods:{
        compl(){

        },
        accept(){

        },
        reject(){

        },
        close(){

        },
        del(){

        },
        loadUser(){
            fetch('/api/home', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authentication-Token": localStorage.getItem("auth_token")
                }
            })
            .then(response => response.json())
            .then(data => this.userData = data)
        },
        loadTrans(){
            fetch('/api/get', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authentication-Token": localStorage.getItem("auth_token")
                }
            })
            .then(response => response.json())
            .then(data => {
                this.transactions = data
            })
        },
        callprof(){
            fetch('/api/getprof',{
                method:'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authentication-Token": localStorage.getItem("auth_token")
                }
            }).then(response => response.json())
            .then(data =>{
                this.profess=data
            })
        },
        createTrans(){
            fetch('/api/adcreate',{
                method:'POST',
                headers:{
                    "Content-Type":"application/json",
                    "Authentication-Token":localStorage.getItem("auth_token")
                },
                body:JSON.stringify(this.transData)
            })
            .then(response => response.json())
            .then(data => {
                this.message=data
            })
        },
        csvd(){
            fetch('/api/export')
            .then(response => response.json())
            .then(data=>{
                window.location.href = `/api/csv_result/${data.id}`
            })
        }
    }

}