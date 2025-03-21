export default{
    template:`
            <div>
            <h4>admin Management</h4>
                <p>Are you sure you want Change the status of service</p>
                <p>Changing Status {{status}} to Completed for id-{{id}}</p>
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
                        this.id = this.$route.params.id
                    },

                    save(){
                        const data12={
                            id : this.$route.params.id,
                            status: this.$route.params.status
                        };
                        fetch(`/api/acomplete/${this.$route.params.id}`,{
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
                        alert("Changed Succesfully");
                        this.$router.push('/admin');
                    }
                    )}
                    }
                }