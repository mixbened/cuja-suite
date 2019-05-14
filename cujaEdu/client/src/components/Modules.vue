<template>
  <div>
    <b-table striped hover small :items="modules" :fields="fields"></b-table>
    <div class="text-center" v-if="loading">
        <b-spinner class="cuja" label="Spinning"></b-spinner>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import router from 'vue-router'
import axios from 'axios'

export default {
  name: 'Students',
  data () {
    return {
      profile: {},
      loading: false,
      modules: [],
      fields: {
          UID: {
            label: 'UID',
            sortable: true
          },
          last: {
            label: 'Last Name',
            sortable: true
          },
          first: {
            label: 'First name',
            sortable: false
          },
          city: {
            label: 'City',
            sortable: true
          },
          organisation: {
            label: 'Partner',
            sortable: true
          }
        }
    }
  },
  methods: {
    getModules(){
      const functions = firebase.functions()
      this.toggleLoading()
      const getModules = firebase.functions().httpsCallable('getModules')
      getModules({'key': 'Message from Frontend'}).then(res => {
        console.log('Response ', res)
      }).catch(err => {
        var code = err.code;
        var message = err.message;
        var details = err.details;
        console.log('Cloud Functions ', message)
      })
    },
    toggleLoading(){
          this.loading = !this.loading
      }
  },
  created(){
    this.getModules()
  }
}
</script>

<style scoped>
</style>
