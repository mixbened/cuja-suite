<template>
  <div>
  <h1>Register</h1>
    <b-container>
      <b-form-row>
        <b-form-input class="m-2" v-model="email" type="text" placeholder="Enter your Mail-Adress" />
      </b-form-row>
      <b-form-row>
        <b-form-input class="m-2" v-model="pw" type="text" placeholder="Enter your Password" />
      </b-form-row>
      <b-form-row>
        <b-form-input class="m-2" v-model="organisation" type="text" placeholder="Enter your Organisation" />
      </b-form-row>
      <b-form-row>
        <b-form-input class="m-2" v-model="first" type="text" placeholder="Enter your First Name" />
      </b-form-row>
      <b-form-row>
        <b-form-input class="m-2" v-model="last" type="text" placeholder="Enter your Last Name" />
      </b-form-row>
      <b-form-row>
        <b-form-input class="m-2" v-model="city" type="text" placeholder="Enter the City you live in" />
      </b-form-row>
      <b-form-row>
        <b-form-input class="m-2" v-model="phoneNumber" type="text" placeholder="Enter your Phone Number" />
      </b-form-row>
      <b-form-row class="loginButton m-2">
        <b-button class="button" @click="register">Register</b-button>
      </b-form-row>
    </b-container>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Register',
  data () {
    return {
      email: '',
      pw: '',
      organisation: '',
      first: '',
      last: '',
      city: '',
      displayName: '',
      phoneNumber: ''
    }
  },
  methods: {
    register: function () {
      const router = this.$router
      // initiate and save instace in variable to access in async
      var db = firebase.firestore()
      let instance = this
      // create new Auth-User if not exist and new User in Users Table to store additional Information
      firebase.auth().createUserWithEmailAndPassword(this.email, this.pw).then(res => {
        // get uID
        const uID = res.user.uid
        // set User Info from Auth Profile
        res.user.updateProfile({
          displayName: `${instance.first} ${instance.last}` || 'unset',
          phoneNumber: instance.phoneNumber || 'unset'
        })
        // create User Entity in User Collection - use UID as Key
        db.collection('users').doc(uID).set({
          // set roles manually for now in firestore console
          role: 'student',
          first: instance.first || 'unset',
          last: instance.last || 'unset',
          city: instance.city || 'unset',
          organisation: instance.organisation || 'unset'
        })
          .then(function (docRef) {
            // all positive
            console.log('User Document written with ID: ', docRef)
            alert('User Registered!')
            router.push('login')
          })
          .catch(function (error) {
            // error in creating User Document
            console.error('Error adding User document: ', error)
          })
      })
        .catch(function (error) {
        // Handle Errors from Auth-User
          var errorCode = error.code
          var errorMessage = error.message
          if (errorCode === 'auth/weak-password') {
            alert('The password is too weak.')
          } else {
            alert(errorMessage)
          }
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
</style>
