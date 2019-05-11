import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Profile from '@/components/Profile'
import Actions from '@/components/Actions'
import Course from '@/components/Course'
import firebase from 'firebase'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/course',
      name: 'Course',
      component: Course,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/instructor',
      name: 'Instructor',
      component: Actions,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  // console.log('Router: ', requiresAuth)
  // console.log('User: ', currentUser)
  // can build check with admin role
  if(requiresAuth && !currentUser){
    console.log('Redirect to LOGIN!')
    next('login')
  } else {
    next()
  }
  // else if(!requiresAuth && currentUser) next('home');
  // else next();
})

export default router;
