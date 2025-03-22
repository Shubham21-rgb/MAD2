import adminnav from "./adminnav.js"
export default {
    components:{
       "n": adminnav
    },
    template: `
   <div>
    <n></n>
    <div class="row border">
                <div class="col-12 border" style="height: 750px; overflow-y: scroll">
                    <h2>All Services</h2>
                        <div v-for="t in transactions"  class="card mt-2">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                    <th scope="col">Unique ID</th>
                                    <th scope="col">Service Name</th>
                                    <th scope="col">Time Required</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Amount ID</th>
                                    <th scope="col">Professional ID</th>
                                    <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <td>{{t.id}}</td>
                                    <td>{{t.Service_name}}</td>
                                    <td>{{t.Time_required}}</td>
                                    <td>{{t.Description}}</td>
                                    <td>{{t.amount}}</td>
                                    <td>{{t.prof_id}}</td>
                                    <td>
                                        <router-link :to="{name:'admindelservice',params:{id: t.prof_id,service:t.Service_name,time:t.Time_required,desc:t.Description,amount:t.amount,unique:t.id}}" class="btn btn-warning">Delete</router-link>
                                    </td>
                                    <td>
                                        <router-link :to="{name:'adminserv',params:{id: t.prof_id,service:t.Service_name,time:t.Time_required,desc:t.Description,amount:t.amount,unique:t.id}}" class="btn btn-warning">Update</router-link>
                                    </td>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <router-link to="/admin" class="btn btn-warning">Back</router-link>
                    </div>
                    </div>`,
                    data:function(){
                        return{
                            transactions:null
                        }
                    },
                    mounted(){
                        this.loadservice()
                    },
                    methods:{
                        loadservice(){
                            fetch('/api/adminser',{
                                method:'POST',
                                headers: {
                                    "Content-Type": "application/json",
                                    "Authentication-Token": localStorage.getItem("auth_token")
                                }
                            })
                            .then(response => response.json())
                            .then(data =>{
                                this.transactions=data
                            })
                        }
                    }
                }