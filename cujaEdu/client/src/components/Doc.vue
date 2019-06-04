<template>
  <div>
    <div id="wrapper" v-html="template"></div>
    <div class="text-center" v-if="loading">
        <b-spinner class="cuja" label="Spinning"></b-spinner>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import firebase from 'firebase'
import router from 'vue-router'

export default {
  name: 'Doc',
  data () {
    return {
      profile: {},
      loading: false,
      template: '',
      id: this.$route.params.id
    }
  },
  methods: {
    getDoc () {
      const functions = firebase.functions()
      this.toggleLoading()
      const instance = this
      const getModules = firebase.functions().httpsCallable('getDoc')
      getModules({'id': instance.id}).then(res => {
        // console.log('Response ', res.data)
        const template = res.data.html
        instance.template = instance.cutOutImg(template)
        this.toggleLoading()
      }).catch(err => {
        var code = err.code
        var message = err.message
        var details = err.details
        console.log('Cloud Functions ', message)
      })
    },
    toggleLoading () {
      this.loading = !this.loading
    },
    cutOutImg (text) {
      // console.log('String', text)
      const indexStart = text.indexOf('<img')
      if (indexStart > 0) {
        const indexEnd = indexStart + 376
        const cut = text.slice(0, indexStart - 1) + text.slice(indexEnd + 1, text.length)
        return cut
      } else {
        return text
      }
    }
  },
  created () {
    this.getDoc()
  }
}
</script>

<style scoped>
  #wrapper {
    margin: 0 auto;
    margin-bottom: 4em;
    padding: 0 5%;
    max-width: 1000px;
  }
</style>
