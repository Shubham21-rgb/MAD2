import Home from './components/Home.js' 
import Login from './components/Login.js' 
import Register from './components/Register.js' 
import Navbar from './components/Navbar.js' 
import Footer from './components/Footer.js' 
import pregister from './components/pregister.js'
import dashboard from './components/dashboard.js'
import update from './components/update.js'
import admin from './components/admin.js'
import trans from './components/trans.js'
import pdashboard from './components/pdashboard.js'
import paccept from './components/paccept.js'
import preject from './components/preject.js'
import pdelete from './components/pdelete.js'
import pay from './components/pay.js'
import complete from './components/complete.js'
import close from './components/close.js'
import cancel from './components/cancel.js'
import timeupdate from './components/timeupdate.js'


const routes=[
    {path: '/',component: Home},
    {path: '/login',component: Login},
    {path: '/register',component: Register},
    {path:'/pregister',component:pregister},
    {path:'/dashboard',component:dashboard},
    {path:'/show/:id',name:'show',component:trans},
    {path:'/pdashboard',component:pdashboard},
    {path:'/paccept/:id',name:'paccept',component:paccept},
    {path:'/preject/:id',name:'preject',component:preject},
    {path:'/pdelete/:id',name:'pdelete',component:pdelete},
    {path:'/cpay/:id',name:'cpay',component:pay},
    {path:'/complete/:id',name:'complete',component:complete},
    {path:'/close/:id',name:'close',component:close},
    {path:'/cancel/:id',name:'cancel',component:cancel},
    {path:'/tupdates/:id',name:'tupdate',component:timeupdate},
    {path:'/update/:id',name:'update',component:update},
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