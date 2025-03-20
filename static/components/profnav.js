export default{
    template:`
    <div class="row border">
        <div class="col-9 border fs-2" >
        HOUSE-HOLD SERVICES BY UNITY 
        </div>
        <div class="col-3 border" >
        <router-link class="btn btn-primary my-2" to="/login">Summary</router-link>
        <div v-for="t in ser">
            <router-link class="btn btn-primary my-2"  :to="{name:'update',params:{id: t.ids}}">Update-Service</router-link>
        </div>
        <router-link class="btn btn-primary my-2" to="/">Logout</router-link>
        </div>
    </div>`,
    data:function(){
        return{
            ser:null,
        }

    },
    mounted(){
        this.loadsers()
    },
    methods:{
        loadsers(){
            fetch('/api/entry',{
                method:'POST',
                headers:{
                    "Content-Type":'application/json',
                    "Authentication-Token":localStorage.getItem("auth_token")

                }
            }).then(response => response.json())
            .then(data => {
                console.log(data);
                this.ser=data;
            }
            )
        }

    }
}