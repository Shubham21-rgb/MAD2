export default{
    template:`
    <div class="row border">
        <div class="col" style="height: 750px;" >
            <div class="border mx-auto mt-5" style="height: 400px; width: 300px;">
                Login-Area
                <div>
    <h2 class="text-center">Login-Form</h2>
    <div>
        <label for="email">Enter Your Email:</label>
        <input type="text" id="email" v-model="formData.email">
    </div>
    <div>
        <label for="pass">Enter Your Password:</label>
        <input type="password" id="pass" v-model="formData.password">
    </div>
    <div>{{message}}</div>
    <div>
        <button class="btn btn-primary" @click="loginUser">Login</button>
    </div>
</div>
            </div>
        </div>
    </div>`,
    data: function(){
        return{
            formData:{
                email:"",
                password:""
            },
            message:""
        }
    },
    methods:{
        loginUser: function(){
            fetch('/api/login',{
                method: 'POST',
                headers: {
                    "Content-Type":'application/json'
                },
                body:JSON.stringify(this.formData)

            })
            .then(response => response.json())
            .then(data => {if (Object.keys(data).includes('auth-token')){
                localStorage.setItem("auth_token",data["auth-token"])
                if(data.roles.includes('admin')){
                    this.$router.push('/admin')
                }else if(data.roles.includes('user')){
                    this.$router.push('/dashboard')
                }else{
                    this.$router.push('/pdashboard')
                }
            }
                
              
            else{
                this.message=data.message
            }
                
                   
                })

            },
            
    }
        }


