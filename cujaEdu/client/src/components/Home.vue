<template>
  <div>
    <h4 class="title">Dashboard</h4>
  </div>
</template>

<script>
import firebase from 'firebase'
import router from 'vue-router'
import axios from 'axios'

export default {
  name: 'Home',
  data () {
    return {
      profile: {}
    }
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
  created(){
  }
}
</script>

<style scoped>
</style>
