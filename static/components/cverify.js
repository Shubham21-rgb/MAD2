export default{
    template:`
            <div>
                <p>Are you sure you want it to verify</p>
                <p>You are going to verify the Customer with id {{id}}</p>
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
                        fetch(`/api/cverify/${this.$route.params.id}`,{
                            method:'GET',
                            headers: {
                                "Content-Type":'application/json',
                                "Authentication-Token":localStorage.getItem("auth_token")
                            }
                    }).then(response => response.json())
                    .then(data =>{
                        console.log(data);
                        const message=data;
                        alert("Succesfullly Verified");
                        this.$router.push('/verify');
                    }
                    )}
                    }
                }