<template>
  <div>
    <h4 class="title">Profile</h4>
    <b-img alt="Circle image" :src="this.$store.state.profile.photoURL ? this.$store.state.profile.photoURL : 'http://www.stleos.uq.edu.au/wp-content/uploads/2016/08/image-placeholder-350x350.png'" class="thumbnail" style="width: 6em; height: 6em;"></b-img>
    <div class="entry">
        <h5>Display Name: </h5>
        <span>{{profile.displayName ? profile.displayName : profile.email}}</span>
    </div>
    <div class="entry">
        <h5>Role: </h5>
        <span>{{profile.role}}</span>
    </div>
    <div class="entry">
        <h5>Surname: </h5>
        <span>{{profile.last}}</span>
    </div>
    <div class="entry">
        <h5>Name: </h5>
        <span>{{profile.first}}</span>
    </div>
    <div class="entry">
        <h5>Location: </h5>
        <span>{{profile.city}}</span>
    </div>
    <div class="entry">
        <h5>Organisation: </h5>
        <span>{{profile.organisation}}</span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Profile',
  data () {
    return {
    }
  },
  computed: {
    profile(){
        return  this.$store.state.profile
    }
  }
}
</script>

<style scoped>
.entry {
    width: 60%;
    margin: 2em auto;
    text-align: left;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid black;
}
.entry > h5 {
    display: inline;
}
</style>