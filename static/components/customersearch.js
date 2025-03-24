import cusnav from "./cusnav.js"
export default {
    components:{
       "n": cusnav
    },
    template: `
   <div>
    <n></n>
    <div class="row border">
                <div class="col-12 border" style="height: 750px; overflow-y: scroll">
                    <h2>Search Function</h2>
                        <div class="d-flex justify-content-center mt-3">
                            <div style="width: 600%;" class="d-flex">
                                <input v-model="transData.search" type="text" class="form-control" placeholder="Search..........">
                                <div class="mb-3">
                                    <label for="source" class="form-label"> Filter-By</label>
                                    <select class="form-select" aria-label="Default select example" v-model="transData.filter">
                                        <option selected>Open this select menu</option>
                                        <option value="amount">Amount</option>
                                        <option value="Service_name">Service Name</option>
                                    </select>
                                </div>
                                <br><br>
                            </div>
                        </div>
                        <button @click="handleSearch" class="btn btn-warning">
                                <i class="bi bi-search">Search</i>
                            </button>

                        <div v-for="t in transactions"  class="card mt-2">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                    <th scope="col">Unique ID</th>
                                    <th scope="col">Service Name</th>
                                    <th scope="col">Time Required</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Amount </th>
                                    <th scope="col">Professional ID</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <td>{{t.id}}</td>
                                    <td>{{t.Service_name}}</td>
                                    <td>{{t.Time_required}}</td>
                                    <td>{{t.Description}}</td>
                                    <td>{{t.amount}}</td>
                                    <td>{{t.prof_id}}</td>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <router-link to="/dashboard" class="btn btn-success">Back</router-link>
                    </div>
                    </div>`,
                    data:function(){
                        return{
                            transactions:null,
                            transData:{
                                search:'',
                                filter:''
                            }
                        }
                    },
                    mounted(){
                        this.handleSearch()
                    },
                    methods:{
                        handleSearch(){
                            fetch('/api/adminsearchin',{
                                method:'POST',
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body:JSON.stringify(this.transData)
                            })
                            .then(response => response.json())
                            .then(data =>{
                                this.transactions=data
                            })
                        }
                    }
                }