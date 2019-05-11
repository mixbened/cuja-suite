<template>
  <div>
  <h1>Login</h1>
  <b-container>
    <b-form-row>
      <b-form-input class="m-2" v-model="username" type="text" placeholder="Enter your Mail-Adress" />
    </b-form-row>
    <b-form-row>
      <b-form-input class="m-2" v-model="pw" type="text" placeholder="Enter your Password" />
    </b-form-row>
    <b-form-row class="loginButton m-2">
      <b-button class="button" @click="login">Login</b-button>
    </b-form-row>
    <b-form-row class="loginButton m-2">
      <div class="googleLogin">
        <b-button class="button" id="googleButton" @click="googleSignIn">Google sign in</b-button>
        <img id="googleLogo" src="http://pngimg.com/uploads/google/google_PNG19635.png" alt="google logo"/>
      </div>
    </b-form-row>
    <span>Not registered? <router-link to="/register"><b-nav-text class="navText">Create Account</b-nav-text></router-link></span>

  </b-container>
  </div>
</template>

<script>
// firebase config
import firebase from 'firebase'
var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
// firebase.auth().useDeviceLanguage
provider.setCustomParameters({
  'login_hint': 'user@example.com'
});

export default {
  name: 'Login',
  data () {
    return {
      username: "",
      pw: ""
    }
  },
  methods: {
    login: function(){
      const store = this.$store
      const router = this.$router
      const db = firebase.firestore()
      firebase.auth().signInWithEmailAndPassword(this.username, this.pw).then(result => {
        // console.log('User ID', result.user)
        const { displayName, email, photoURL, phoneNumber, uid } = result.user
        const docRef = db.collection("users").doc(uid)
        docRef.get().then(function(doc) {
            if (doc.exists) {
                // Profile Creation PART II
                const profile = {uid, email, displayName, photoURL, phoneNumber,...doc.data()}
                // make profile information accessible
                console.log("Profile data:", profile)
                store.commit('setUser', profile)
                router.push('home')
                alert('You are now authenticated')
            } else {
                console.log("No such document!");
            }
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code
          var errorMessage = error.message
          console.log('Error:', errorMessage)
        });
      })
    },
    googleSignIn: function(){
      const router = this.$router
      const store = this.$store
      const db = firebase.firestore()
      firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const token = result.credential.accessToken;
        // Profile Creation PART I
        const { displayName, email, photoURL, phoneNumber, uid } = result.user
        // check for User in Users Table - if not in there, create
        const docRef = db.collection("users").doc(uid)
        docRef.get().then(function(doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data())
                // Profile Creation PART II
                const profile = {uid, token, email, displayName, photoURL, phoneNumber,...doc.data()}
                // make profile information accessible
                store.commit('setUser', profile)
                router.push('home')
            } else {
                // doc.data() will be undefined in this case
                // create User Profile in Users Table
                docRef.set({
                // set roles manually for now in firestore console
                    role: "student"
                })
                .then(function() {
                    console.log("Document successfully written!");
                    docRef.get().then(function(doc){
                      if(doc.exists){
                        const profile = {uid, email, displayName, photoURL, phoneNumber,...doc.data()}
                        // make profile information accessible
                        store.commit('setUser', profile)
                      } else {
                        console.error("Error writing document: ", error);
                      }
                    })
                })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                });
            }
        }).catch(function(error) {
            console.log("Error getting document:", error)
        });
        router.push("home")
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code
        var errorMessage = error.message
        // The email of the user's account used.
        var email = error.email
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential
        // ...
        console.log("Google Error: ", errorMessage)
      });
    }
  }
}
</script>

<style scoped>
.loginButton {
  justify-content: center;
}
.loginButton > button {
  width: 10em;
}
.googleLogin {
  position: relative;
}
#googleLogo {
  position: absolute;
  width: 2em;
  top: 2px;
  left: 2px;
}
#googleButton {
  padding-left: 2.5em;
}
</style>
