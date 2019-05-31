<template>
  <div>
    <h4 class="title">{{ doc.name }}</h4>
    <b-container>
        <b-jumbotron class="doc" header="Document" lead="Get Basic Information plus important Resources">
          <router-link :to="docLink"><b-button variant="primary">Show</b-button></router-link>
        </b-jumbotron>
        <b-jumbotron class="doc" header="Slides" lead="Presentation Slides for Classrooms">
          <b-button variant="primary" target="_blank" :href="slidesLink">Show</b-button>
        </b-jumbotron>
        <b-jumbotron class="doc" v-if="profile.role === 'instructor'" header="Instructions/Tipps" lead="This is only for Instructors, to get Information how to teach this Module">
          <router-link :to="tippsLink"><b-button variant="primary">Show</b-button></router-link>
        </b-jumbotron>
    </b-container>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import firebase from 'firebase'
import router from 'vue-router'
import axios from 'axios'

export default {
  name: 'Module',
  data () {
    return {
      loading: false,
      files: [],
      doc: {},
      slides: {},
      instructions: {},
      id: this.$route.params.id
    }
  },
  methods: {
    getModuleContent () {
      const functions = firebase.functions()
      const instance = this
      this.toggleLoading()
      const getFolderList = firebase.functions().httpsCallable('getFolderList')
      getFolderList({folderId: instance.id}).then(res => {
        instance.files = res.data.files
        instance.doc = instance.files.find(el => el.mimeType === 'application/vnd.google-apps.document' && el.name !== 'Tipps')
        instance.instructions = instance.files.find(el => el.mimeType === 'application/vnd.google-apps.document' && el.name === 'Tipps')
        instance.slides = instance.files.find(el => el.mimeType === 'application/vnd.google-apps.presentation')
        this.toggleLoading()
      }).catch(err => {
        var code = err.code
        var message = err.message
        var details = err.details
        console.log('Error receiving Modules: ', message)
      })
    },
    toggleLoading () {
      this.loading = !this.loading
    },
    rowSelect (rows) {
      this.selected = rows
    }
  },
  computed: {
    profile () {
      return this.$store.state.profile
    },
    docLink () {
      return `/doc/${this.doc.id}`
    },
    slidesLink () {
      return `https://docs.google.com/presentation/d/e/${this.slides.id}/pub?start=false&loop=true&delayms=3000`
    },
    tippsLink () {
      return `/doc/${this.instructions.id}`
    }
  },
  created () {
    this.getModuleContent()
  }
}
</script>

<style scoped>
.doc {
  text-align: left;
  padding: 3rem 1.5rem;
}
.doc > h1 {
  font-size: 2rem;
}
</style>
