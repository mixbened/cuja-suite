<template>
  <div>
    <h4 class="title">{{ doc.name }}</h4>
    <div class="text-center" v-if="loading">
        <b-spinner class="cuja" label="Spinning"></b-spinner>
    </div>
    <b-container v-if="!loading">
        <b-jumbotron class="doc" header="Document" lead="Get Basic Information plus important Resources">
          <router-link  v-if="doc" :to="docLink"><b-button variant="primary">Show</b-button></router-link>
        </b-jumbotron>
        <b-jumbotron class="doc" header="Slides" lead="Presentation Slides for Classrooms">
          <b-button v-if="slides" variant="primary" target="_blank" :href="slidesLink">Show</b-button>
          <b-button v-if="!instructions" variant="warning">No File</b-button>
        </b-jumbotron>
        <b-jumbotron class="doc" v-if="profile.role === 'instructor'" header="Instructions/Tipps" lead="This is only for Instructors, to get Information how to teach this Module">
          <router-link v-if="instructions" :to="tippsLink"><b-button variant="primary">Show</b-button></router-link>
          <b-button v-if="!instructions" variant="warning">No File</b-button>
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
      if (this.doc) return `/doc/${this.doc.id}`
    },
    slidesLink () {
      if (this.slides) return this.slides.webViewLink
    },
    tippsLink () {
      if (this.instructions) return `/doc/${this.instructions.id}`
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
