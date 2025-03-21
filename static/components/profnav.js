export default{
    template:`
    <div class="row border">
        <div class="col-9 border fs-1" >
        HOUSE-HOLD SERVICES BY UNITY 
        </div>
        <div class="col-3 border" >
        <router-link class="btn btn-primary my-2" to="/login">Summary</router-link>
        <div v-for="t in ser">
            <router-link class="btn btn-primary my-2"  :to="{name:'update',params:{id: t.ids}}">Update-Service</router-link>
        </div>
        <router-link class="btn btn-primary my-2" to="/">Create Service</router-link>
        <div v-for="t in sot">
            <router-link class="btn btn-primary my-2"  :to="{name:'pprofile',params:{id: t.id}}">Profile</router-link>
        </div>
        <router-link class="btn btn-primary my-2" to="/login">Logout</router-link>
        </div>
    </div>`,
    data:function(){
        return{
            ser:null,
            sot:null
        }

    },
    mounted(){
        this.loadsers()
        this.sr()
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
        },
        sr(){
            fetch('/api/profentryies',{
                method:'GET',
                headers:{
                    "Authentication-Token":localStorage.getItem("auth_token")
                }
            })
            .then(response => response.json())
            .then(data=>{
                this.sot=data
                console.log(data)
            })
        }

    }
}