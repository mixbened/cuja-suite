<template>
  <div>
    <div v-if="selected.length > 0">
      <b-button-group size="sm" class="m-2 float-left">
        <router-link :to="docLink"><b-button v-if="selected.length == 1" variant="dark">Show</b-button></router-link>
        <b-button variant="primary">Add to Course</b-button>
      </b-button-group>
    </div>
    <b-table selectable striped hover small :items="modules" :fields="fields" @row-selected="rowSelect"></b-table>
    <div class="text-center" v-if="loading">
        <b-spinner class="cuja" label="Spinning"></b-spinner>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import firebase from 'firebase'
import router from 'vue-router'
import axios from 'axios'

export default {
  name: 'Modules',
  data () {
    return {
      profile: {},
      loading: false,
      modules: [],
      selected: [],
      fields: {
        name: {
          label: 'Module',
          sortable: true
        }
      }
    }
  },
  methods: {
    getModules () {
      console.log('Getting Modules..')
      const functions = firebase.functions()
      this.toggleLoading()
      const instance = this
      const getFolderList = firebase.functions().httpsCallable('getFolderList')
      getFolderList({folderId: ''}).then(res => {
        // console.log('Response ', res.data.files)
        instance.modules = res.data.files
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
    docLink () {
      if (this.selected) {
        return `/module/${this.selected[0].id}`
      }
    }
  },
  created () {
    this.getModules()
  }
}
</script>

<style scoped>
</style>
