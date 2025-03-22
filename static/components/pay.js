export default{
    template:`
    <div class="container mt-5">
        <h1 align="center">Waiting for Confirmation</h1>
        <div class="d-flex justify-content-center align-items-center vh-80">
            <div class="alert alert-primary" role="alert" style="width: 800px; height: 550px; padding: 20px; font-size: 18px;">
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Card Number</label>
                    <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="XXXXXXXXXXXX5643">
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Card Name</label>
                    <input type="email" class="form-control" id="exampleFormControlInput2">
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">CVV</label>
                    <input type="email" class="form-control" id="exampleFormControlInput3" placeholder="See the back of the Card For CVV details">
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">OTP</label>
                    <input type="email" class="form-control" id="exampleFormControlInput4">
                </div>
                <p>Are you sure you want pay for the service</p>
                <p>After Payment we will record as completed service for id {{id}}</p>
                <button class="btn btn-success" @click="save">Pay</button>
                <router-link to="/dashboard" class="btn btn-warning">Back</router-link>
            </div>
            </div>
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
                        fetch(`/api/pay/${this.$route.params.id}`,{
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
                        alert("Paid Succesfully");
                        this.$router.push('/dashboard');
                    }
                    )}
                    }
                }