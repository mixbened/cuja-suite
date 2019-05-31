<template>
  <div>
    <h4 class="title">Course</h4>
  </div>
</template>

<script>

export default {
  name: 'Course',
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
</style>
