import Navbar from "./Navbar.js"
export default{
    components:{
        'n':Navbar,
    },
    template:`
    <div class="row border">
    <n></n>
        <div class="col" style="height: 750px;">
            <div class="border mx-auto mt-5" style="height: 700px; width: 600px;">
                <img src="static/pic1.png" class="img-fluid rounded mx-auto d-block" alt="Home">
            </div>
         <router-link class="btn btn-primary my-2" to="/register">Register?-User</router-link>
        </div>
    </div>`
}