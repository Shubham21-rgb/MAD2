export default{
    template:`
            <div>
                <p>Are you sure you want it to unblock this User</p>
                <p>You are going to un-Block the User with id {{id}}</p>
                <button class="btn btn-warning" @click="save">Confirm</button>
            </div>
        `,
                data:function(){
                    return{
                        id:null,
                        message:""
                    }
                },
                mounted(){
                    this.cr()
                },
                methods:{
                    cr(){
                        this.id = this.$route.params.id
                    },

                    save(){
                        fetch(`/api/cunblock/${this.$route.params.id}`,{
                            method:'GET',
                            headers: {
                                "Content-Type":'application/json',
                                "Authentication-Token":localStorage.getItem("auth_token")
                            }
                    }).then(response => response.json())
                    .then(data =>{
                        console.log(data);
                        const message=data;
                        alert("Succesfullly Restored");
                        this.$router.push('/verify');
                    }
                    )}
                    }
                }