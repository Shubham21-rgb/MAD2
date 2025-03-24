import adminnav from "./adminnav.js"
export default{
    components:{
                'n':adminnav
            },
    template:`
    <div class="row border">
        <div class="col-9 border fs-2" >
        HOUSE-HOLD SERVICES BY UNITY 
        </div>
        <div class="col-12 my-3">
        <img :src="'static/pie_chart1.png'" alt="Pie Chart" class="img-fluid">
        <img :src="'static/bar_chart1.png'" alt="Bar Chart" class="img-fluid">
        </div>
        <router-link to="/admin" class="btn btn-warning">Back</router-link>
    </div>`,
    mounted(){
        this.loaduser()
    },
    methods:{
        loaduser(){
            fetch('/api/persummary',{
                method:'GET',
                headers:{
                    "Authentication-Token":localStorage.getItem("auth_token")
                }
            })
            .then(response=>response.json())
            .then(data=>{
                console.log(data)
            })
        }
    }
}