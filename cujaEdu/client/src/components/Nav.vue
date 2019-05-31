<template>
  <b-navbar toggleable="lg" type="dark" class="cujaNav">
    <b-navbar-brand href="#"><img class="logo" src="../assets/cuja.png" alt="logo cuja"></b-navbar-brand>
    <b-navbar-toggle target="nav_text_collapse" />

    <b-collapse is-nav id="nav_text_collapse">
      <b-navbar-nav>
        <router-link class="nav-link" to="/home"><b-nav-text class="navText">Dashboard</b-nav-text></router-link>
        <router-link v-if="profile.role === 'instructor'" class="nav-link" to="/instructor"><b-nav-text class="navText">Instructor</b-nav-text></router-link>
      </b-navbar-nav>
    </b-collapse>

    <b-navbar-brand class="profileTrigger">
      <router-link v-if="!profile.email" to="/login"><b-nav-text class="navText">Login</b-nav-text></router-link>
      <router-link class="navText" to="/profile"><span class="displayName">{{ profile.displayName ? profile.displayName : profile.email }}</span></router-link>
      <b-img v-if="profile.photoURL" alt="Circle image" :src="profile.photoURL" class="thumbnail"></b-img>
    </b-navbar-brand>
  </b-navbar>
</template>

<script>

export default {
  name: 'Nav',
  data () {
    return {
    }
  },
  computed: {
    profile () {
      return this.$store.state.profile
    }
  }
}
</script>

<style scoped>
.navText {
  font-size: 1em;
  color: white;
}
.navText:hover{
  color: #eee;
  text-decoration: none;
}
.displayName {
  font-size: 0.8em;
}

.displayName:hover {
  color: #eee;
}

.cujaNav {
  background: #00a7e1;
  color: white;
  padding: 0 1%;
}
.navbar-toggler {
  border-color: rgba(255,255,255,0.8);
}
.nav-link {
  display: inline;
}
.logo {
  width: 80px;
}
@media only screen and (max-width: 992px) {
  .profileTrigger {
    display: none;
  }
}
</style>
