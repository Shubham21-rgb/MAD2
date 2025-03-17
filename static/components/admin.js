export default {
    template: `
    <div>
        <h2 class="my-2">Welcome, {{userData.username}}!</h2>
            <div class="row border">
                <div class="col-8 border" style="height: 750px; overflow-y: scroll">
                    <h2>All Transactions</h2>
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
                                        <button @click="compl" class="btn btn-info btn-sm">Completed</button>
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
                                        <button @click="accept" class="btn btn-info btn-sm">Accept</button>
                                    </td>
                                    <td>
                                        <button @click="reject" class="btn btn-info btn-sm">Reject</button>
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
                                        <button @click="close" class="btn btn-info btn-sm">Close</button>
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
                                        <button @click="del" class="btn btn-info btn-sm">Delete</button>
                                    </td>
                                </tbody>
                            </table>
                        </div>
                </div>
            </div>
        </div>`,
    data: function(){
        return {
            userData: "",
            transactions: null,
            transData: {
                name: '',
                type: '',
                source: '',
                destination: '',
                desc: ''
            }

            
        }
    },
    mounted(){
        this.loadUser()
        this.loadTrans()    
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
                console.log(data)
                this.transactions = data
            })
        },
        review(){
            
        }
    }

}