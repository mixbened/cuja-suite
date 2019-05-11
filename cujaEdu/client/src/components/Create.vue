<template>
  <div>
  </div>
</template>

<script>

export default {
  name: 'Create',
  data () {
    return {
        title: "",
        location: "",
        partner: "",
        date_start: "",
        date_end: "",
        modules: []
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
</style>