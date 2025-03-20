import profnav from "./profnav.js"
export default{
    components:{
        'n':profnav
    },
    template:`
    <div>
    <n></n>
    <h2>Welcome {{userData.username}} Professional</h2>
    <div class="row border">
        <div class="col-7 border" style="height: 750px; overflow-y:scroll">
            <h2>Customer Request</h2>
            <div v-for="t in transactions" class="card">
                <div v-if="t.status == 'Pending'">
                    <p>Pending Request</p>
                        <table class="table table-striped">
                                <thead>
                                    <tr>
                                    <th scope="col">Unique ID</th>
                                    <th scope="col">Customer ID</th>
                                    <th scope="col">Date_of_Request</th>
                                    <th scope="col">Date_of_completion</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Service ID</th>
                                    <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <td>{{t.id}}</td>
                                    <td>{{t.customer_id}}</td>
                                    <td>{{t.Date_of_Request}}</td>
                                    <td>{{t.Date_of_completion}}</td>
                                    <td>{{t.amount}}</td>
                                    <td>{{t.service_id}}</td>
                                    <td>
                                        <router-link :to="{name:'paccept',params:{id: t.id,status: t.status}}" class="btn btn-warning">Accept</router-link>
                                    </td>
                                    <td>
                                        <router-link :to="{name:'preject',params:{id: t.id,status: t.status}}" class="btn btn-warning">Reject</router-link>
                                    </td>
                                </tbody>
                            </table>
                </div>
                <div v-if="t.status == 'Accepted'">
                    <p>Accepted Request</p>
                        <table class="table table-striped">
                                <thead>
                                    <tr>
                                    <th scope="col">Unique ID</th>
                                    <th scope="col">Customer ID</th>
                                    <th scope="col">Date_of_Request</th>
                                    <th scope="col">Date_of_completion</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Service ID</th>
                                    <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <td>{{t.id}}</td>
                                    <td>{{t.customer_id}}</td>
                                    <td>{{t.Date_of_Request}}</td>
                                    <td>{{t.Date_of_completion}}</td>
                                    <td>{{t.amount}}</td>
                                    <td>{{t.service_id}}</td>  
                                    <td>
                                        <router-link :to="{name:'complete',params:{id: t.id,status: t.status}}" class="btn btn-warning">Complete</router-link>
                                    </td>
                                    <td>
                                        <router-link :to="{name:'tupdate',params:{id: t.id,status: t.status,Request_date:t.Date_of_Request}}" class="btn btn-warning">update</router-link>
                                    </td>
                                </tbody>
                            </table>
                </div>
                <div v-if="t.status == 'Closed'">
                    <p>Closed Request</p>
                        <table class="table table-striped">
                                <thead>
                                    <tr>
                                    <th scope="col">Unique ID</th>
                                    <th scope="col">Customer ID</th>
                                    <th scope="col">Date_of_Request</th>
                                    <th scope="col">Date_of_completion</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Service ID</th>
                                    <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <td>{{t.id}}</td>
                                    <td>{{t.customer_id}}</td>
                                    <td>{{t.Date_of_Request}}</td>
                                    <td>{{t.Date_of_completion}}</td>
                                    <td>{{t.amount}}</td>
                                    <td>{{t.service_id}}</td>
                                    <td>
                                        <router-link :to="{name:'pdelete',params:{id: t.id,status: t.status}}" class="btn btn-warning">Delete</router-link>
                                    </td>
                                </tbody>
                            </table>
                </div>
                <div v-if="t.status == 'Rejected'">
                    <p>Rejected Request</p>
                        <table class="table table-striped">
                                <thead>
                                    <tr>
                                    <th scope="col">Unique ID</th>
                                    <th scope="col">Customer ID</th>
                                    <th scope="col">Date_of_Request</th>
                                    <th scope="col">Date_of_completion</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Service ID</th>
                                    <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <td>{{t.id}}</td>
                                    <td>{{t.customer_id}}</td>
                                    <td>{{t.Date_of_Request}}</td>
                                    <td>{{t.Date_of_completion}}</td>
                                    <td>{{t.amount}}</td>
                                    <td>{{t.service_id}}</td>
                                    <td>
                                        <router-link :to="{name:'pdelete',params:{id: t.id,status: t.status}}" class="btn btn-warning">Delete</router-link>
                                    </td>
                                </tbody>
                            </table>
                </div>
                <div v-if="t.status == 'Completed'">
                    <p>Completed Request</p>
                        <table class="table table-striped">
                                <thead>
                                    <tr>
                                    <th scope="col">Unique ID</th>
                                    <th scope="col">Customer ID</th>
                                    <th scope="col">Date_of_Request</th>
                                    <th scope="col">Date_of_completion</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Service ID</th>
                                    <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <td>{{t.id}}</td>
                                    <td>{{t.customer_id}}</td>
                                    <td>{{t.Date_of_Request}}</td>
                                    <td>{{t.Date_of_completion}}</td>
                                    <td>{{t.amount}}</td>
                                    <td>{{t.service_id}}</td>
                                    <td>
                                        <router-link :to="{name:'close',params:{id: t.id,status: t.status}}" class="btn btn-warning">Close</router-link>
                                    </td>
                                </tbody>
                            </table>
                </div>
            </div>
        </div>
    <div class="col-5 border" style="height: 750px;overflow-y:scroll;overflow-x:scroll">
    <h4>Service History</h4>
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
                </tbody>
            </table>
        </div>
        <p>Completed Services</p>
        <div v-for="t in transactions" v-if="t.status=='Completed'" class="card mt-2">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Customer ID</th>
                        <th scope="col">Date of Request</th>
                        <th scope="col">Date of completion</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Service ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        <td>{{t.customer_id}}</td>
                        <td>{{t.Date_of_Request}}</td>
                        <td>{{t.Date_of_completion}}</td>
                        <td>{{t.amount}}</td>
                        <td>{{t.service_id}}</td>
                    </tbody>
                </table>
            </div>
            <p>Pending Services</p>
            <div v-for="t in transactions" v-if="t.status=='Pending'" class="card mt-2">
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
                    </tbody>
                </table>
            </div>
            <p>Closed Services</p>
            <div v-for="t in transactions" v-if="t.status=='Closed'" class="card mt-2">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Customer ID</th>
                            <th scope="col">Date of Request</th>
                            <th scope="col">Date of completion</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Service ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        <td>{{t.customer_id}}</td>
                        <td>{{t.Date_of_Request}}</td>
                        <td>{{t.Date_of_completion}}</td>
                        <td>{{t.amount}}</td>
                        <td>{{t.service_id}}</td>
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
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>`,
    data: function(){
        return{
            userData:"",
            transactions:null,
            message:"",
            service:null,
            ser:null
        }
    },
    mounted(){ 
        this.loadTrans()
        this.loadUser()
        this.loadser()
        this.loadsers()
    },
    methods:{
        loadUser(){
            fetch('/api/home',{
                method:'GET',  
                headers:{
                    "Content-Type":'application/json',
                    "Authentication-Token":localStorage.getItem("auth_token")
                }
            }).then(response => response.json())
            .then(data => this.userData=data)
        },
        loadTrans(){
            fetch('/api/get',{
                method:'GET',
                headers:{
                    "Content-Type":'application/json',
                    "Authentication-Token":localStorage.getItem("auth_token")
                }
            }).then(response => response.json())
            .then(data =>{this.transactions=data;
                console.log(data)
            })
        },
        loadser(){
            fetch('/api/getser',{
                method:'POST',
                headers:{
                    "Content-Type":'application/json',
                    "Authentication-Token":localStorage.getItem("auth_token")
                }
            }).then(response => response.json())
            .then(data =>{
                this.service=data;
            
            })
        },
        pay(){

        },
        del(){

        },
        loadsers(){
            fetch('/api/getsers',{
                method:'POST',
                headers:{
                    "Content-Type":'application/json'

                }
            }).then(response => response.json())
            .then(data => {
                this.ser=data;
            }
            )
        },
        close(){
            
        },
        accept(){

        }
    }                                      
}