export default{
    template:`
            <div>
                <p>Are you sure you want to cancel the request</p>
                <p>Deleting your request permanently for id-{{id}}</p>
                <button class="btn btn-success" @click="save">Procced</button>
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
                        fetch(`/api/cancel/${this.$route.params.id}`,{
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
                        alert("Deleted Succesfully");
                        this.$router.push('/dashboard');
                    }
                    )}
                    }
                }