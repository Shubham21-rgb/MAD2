export default{
    template:`
            <div>
                <p>Are you sure you want to place a request</p>
                <button class="btn btn-success" @click="save">Confirm</button>
            </div>
        `,
                data:function(){
                    return{
                        id:null,
                        amount:null
                    }
                },
                mounted(){
                    this.cr()
                },
                methods:{
                    cr(){
                        this.id = this.$route.params.id,
                        this.amount= this.$route.params.amount
                    },

                    save(){
                        const data12={
                            id : this.$route.params.id,
                            amount: this.$route.params.amount
                        };
                        fetch(`/api/create/${this.$route.params.id}`,{
                            method:'POST',
                            headers: {
                                "Content-Type":'application/json',
                                "Authentication-Token":localStorage.getItem("auth_token")
                            },
                            body:JSON.stringify(data12)
                    }).then(response => response.json())
                    .then(data => 
                        alert(data)
                    )}
                    }
                }