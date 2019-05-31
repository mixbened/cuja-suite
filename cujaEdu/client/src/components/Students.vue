<template>
  <div>
    <b-table striped hover small :items="students" :fields="fields"></b-table>
    <div class="text-center" v-if="loading">
        <b-spinner class="cuja" label="Spinning"></b-spinner>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Students',
  data () {
    return {
      profile: {},
      loading: false,
      students: [],
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
    getStudents () {
      this.toggleLoading()
      const db = firebase.firestore()
      let instance = this
      db.collection('users').where('role', '==', 'student')
        .get()
        .then(function (querySnapshot) {
          querySnapshot.docs.map(doc => {
            // console.log(doc.id, doc.data())
            instance.students.push(doc.data())
            // add id value to object
            let i = instance.students.length - 1
            instance.students[i].UID = doc.id
          })
          instance.toggleLoading()
        })
        .catch(function (error) {
          console.log('Error getting documents: ', error)
        })
    },
    toggleLoading () {
      this.loading = !this.loading
    }
  },
  created () {
    this.getStudents()
  }
}
</script>

<style scoped>
</style>
