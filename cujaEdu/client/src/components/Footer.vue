<template>
  <footer id="footer">
    <b-link v-if="profile.email" class=""@click="logout">Logout</b-link>
  </footer>
</template>

<script>
import firebase from 'firebase'
import router from 'vue-router'
import axios from 'axios'

export default {
  name: 'Footer',
  data () {
    return {}
  },
  methods: {
    logout: function(){
      firebase.auth().signOut().then(function() {
        alert("Signed Out!")
      }).catch(function(error) {
        alert("An Error occured: ", error)
      });
      this.$store.commit('clearUser')
      this.$router.push("/login")
    }
  },
  computed: {
    profile(){
      return this.$store.state.profile
    }
  }
}
</script>

<style scoped>
#footer {
  position: fixed;
  bottom: 0;
  padding: 1em;
}
</style>
