export default{
    template:`
            <div>
            <h4>admin Management</h4>
                <p>Are you sure you want t Accept the request</p>
                <p>You are going delete id {{id}} permenantly</p>
                <button class="btn btn-success" @click="save">Confirm</button>
            </div>
        `,
                data:function(){
                    return{
                        id:null,
                        status:null,
                        message:""
                    }
                },
                mounted(){
                    this.cr()
                },
                methods:{
                    cr(){
                        this.id = this.$route.params.id,
                        this.status= this.$route.params.status
                    },

                    save(){
                        const data12={
                            id : this.$route.params.id,
                            status: this.$route.params.status
                        };
                        fetch(`/api/adelete/${this.$route.params.id}`,{
                            method:'POST',
                            headers: {
                                "Content-Type":'application/json',
                                "Authentication-Token":localStorage.getItem("auth_token")
                            },
                            body:JSON.stringify(data12)
                    }).then(response => response.json())
                    .then(data =>{
                        console.log(data);
                        const message=data;
                        alert("Succesfully Deleted");
                        this.$router.push('/admin');
                    }
                    )}
                    }
                }