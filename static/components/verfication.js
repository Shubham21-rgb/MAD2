  import navbar2 from "./navbar2.js"
  export default{
    components:{
        "n":navbar2
    },
    template:`
    <div>
    <n></n>
        <h2 class="my-2">Welcome To Verification Page</h2>
            <div class="row border">
                <div class="col-6 border" style="height: 750px; overflow-y: scroll">
                    <h2>Customer-Verificaion</h2>
                    <p>Not-Verified IDS</p>
                        <div v-for="t in transactions" v-if="t.Verification=='Not Verfied'" class="card mt-2">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                    <th scope="col">Unique ID</th>
                                    <th scope="col">Customer ID</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Contact No</th>
                                    <th scope="col">Verification</th>
                                    <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <td>{{t.id}}</td>
                                    <td>{{t.user_id}}</td>
                                    <td>{{t.username}}</td>
                                    <td>{{t.address}}</td>
                                    <td>{{t.contact_no}}</td>
                                    <td>{{t.Verification}}</td>
                                    <td>
                                        <router-link :to="{name:'verify',params:{id: t.id}}" class="btn btn-warning">Review</router-link>
                                    </td>
                                </tbody>
                            </table>
                    </div>
                    <p>Verified IDS</p>
                    <div v-for="t in transactions" v-if="t.Verification=='Verified'" class="card mt-2">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                    <th scope="col">Unique ID</th>
                                    <th scope="col">Customer ID</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Contact No</th>
                                    <th scope="col">Verification</th>
                                    <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <td>{{t.id}}</td>
                                    <td>{{t.user_id}}</td>
                                    <td>{{t.username}}</td>
                                    <td>{{t.address}}</td>
                                    <td>{{t.contact_no}}</td>
                                    <td>{{t.Verification}}</td>
                                    <td>
                                        <router-link :to="{name:'cblock',params:{id: t.id}}" class="btn btn-warning">Block</router-link>
                                    </td>
                                </tbody>
                             </table>
                        </div>
                        <p>Blocked-User</p>
                    <div v-for="t in transactions" v-if="t.Verification=='Verified-Blocked'" class="card mt-2">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                    <th scope="col">Unique ID</th>
                                    <th scope="col">Customer ID</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Contact No</th>
                                    <th scope="col">Verification</th>
                                    <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <td>{{t.id}}</td>
                                    <td>{{t.user_id}}</td>
                                    <td>{{t.username}}</td>
                                    <td>{{t.address}}</td>
                                    <td>{{t.contact_no}}</td>
                                    <td>{{t.Verification}}</td>
                                    <td>
                                        <router-link :to="{name:'cunblock',params:{id: t.id}}" class="btn btn-warning">Unblock</router-link>
                                    </td>
                                </tbody>
                             </table>
                        </div>
                        <br><br>
                        <h3>Service Ratings</h3>
                    <div v-for="t in transaction2" class="card mt-2">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                    <th scope="col">Unique ID</th>
                                    <th scope="col">Review</th>
                                    <th scope="col">Remarks</th>
                                    <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <td>{{t.id}}</td>
                                    <td>{{t.review}}</td>
                                    <td>{{t.remarks}}</td>
                                    <td>
                                        <button @click="compl" class="btn btn-info btn-sm">Review</button>
                                    </td>
                                </tbody>
                             </table>
                        </div>
                    
                </div>
            <div class="col-6 border" style="height: 750px;overflow-y: scroll">
                <h2>Professional-Verificaion</h2>
                    <p>Not-Verified IDS</p>
                        <div v-for="t in transaction" v-if="t.Verification=='Not Verfied'" class="card mt-2">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                    <th scope="col">Unique ID</th>
                                    <th scope="col">Professional ID</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Experience</th>
                                    <th scope="col">Verification</th>
                                    <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <td>{{t.id}}</td>
                                    <td>{{t.user_id}}</td>
                                    <td>{{t.username}}</td>
                                    <td>{{t.description}}</td>
                                    <td>{{t.Experience}}</td>
                                    <td>{{t.Verification}}</td>
                                    <td>
                                        <router-link :to="{name:'verify1',params:{id: t.id}}" class="btn btn-warning">Review</router-link>
                                    </td>
                                </tbody>
                            </table>
                    </div>
                    <p>Verified IDS</p>
                    <div v-for="t in transaction" v-if="t.Verification=='Verified'" class="card mt-2">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                    <th scope="col">Unique ID</th>
                                    <th scope="col">Customer ID</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Experience No</th>
                                    <th scope="col">Verification</th>
                                    <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <td>{{t.id}}</td>
                                    <td>{{t.user_id}}</td>
                                    <td>{{t.username}}</td>
                                    <td>{{t.description}}</td>
                                    <td>{{t.Experience}}</td>
                                    <td>{{t.Verification}}</td>
                                    <td>
                                        <router-link :to="{name:'pblock',params:{id: t.id}}" class="btn btn-warning">Block</router-link>
                                    </td>
                                </tbody>
                             </table>
                    </div>
                     <p>Blocked-Professional</p>
                    <div v-for="t in transaction" v-if="t.Verification=='Verified-Blocked'" class="card mt-2">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                    <th scope="col">Unique ID</th>
                                    <th scope="col">Customer ID</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Contact No</th>
                                    <th scope="col">Verification</th>
                                    <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <td>{{t.id}}</td>
                                    <td>{{t.user_id}}</td>
                                    <td>{{t.username}}</td>
                                    <td>{{t.description}}</td>
                                    <td>{{t.Experience}}</td>
                                    <td>{{t.Verification}}</td>
                                    <td>
                                        <router-link :to="{name:'punblock',params:{id: t.id}}" class="btn btn-warning">Unblock</router-link>
                                    </td>
                                </tbody>
                             </table>
                        </div>
            </div>
    </div>
</div>
    `,
    data:function(){
        return{
            transactions:null,
            transaction:null,
            transaction2:null
        }
    },
    mounted(){
        this.loadcus()
        this.loadprof()
        this.loadrate()

    },
    methods:{
        loadcus(){
            fetch('/api/cdetails',{
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authentication-Token": localStorage.getItem("auth_token")
                }
            })
            .then(response => response.json())
            .then(data => {
                this.transactions=data
            })
        },
        loadprof(){
            fetch('/api/pdetails',{
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authentication-Token": localStorage.getItem("auth_token")
                }
            })
            .then(response => response.json())
            .then(data => {
                this.transaction=data
            })
        },
        loadrate(){
            fetch('/api/ratings',{
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authentication-Token": localStorage.getItem("auth_token")
                }
            })
            .then(response => response.json())
            .then(data => this.transaction2=data)
        },
        compl(){

        }
    }
  }