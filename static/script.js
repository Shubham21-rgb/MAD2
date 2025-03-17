import Home from './components/Home.js' 
import Login from './components/Login.js' 
//import Register from './components/Register.js' 
import Navbar from './components/Navbar.js' 
import Footer from './components/Footer.js' 
//import dashboard from './components/dashboard.js'
//import update from './components/update.js'
import admin from './components/admin.js'


const routes=[
    {path: '/',component: Home},
    {path: '/login',component: Login},
    //{path: '/register',component: Register},
    //{path:'/dashboard',component:dashboard},
    //{path:'/update/:id',name:'update',component:update},
    {path:'/admin',component:admin}

]
const router=new VueRouter({
    routes

})
const app = new Vue({
    el:"#app",
    router,
    template:`
    <div class="container">Welcome To Our Portal from Developer
    <nav-bar></nav-bar>
    <router-view></router-view>
    <foot></foot>
    </div>
    `,
    data:{
        section:"frontend"
    },
    components:{
        "nav-bar":Navbar,
        "foot":Footer
    }
})