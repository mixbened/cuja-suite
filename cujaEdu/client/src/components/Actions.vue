<template>
    <div>
        <h4 class="title">Instructor</h4>
        <div>
            <b-tabs content-class="mt-3" align="center">
                <b-tab title="Upcoming Courses">
                    <div class="mt-4 text-left overflow-auto">
                        <button type="button" class="btn btn-dark m-2 font-weight-bold text-sm btn-sm">Create Course</button>
                        <b-table striped hover :items="courses"></b-table>
                        <div class="text-center" v-if="loading">
                            <b-spinner class="cuja" label="Spinning"></b-spinner>
                        </div>
                    </div>
                </b-tab>
                <b-tab title="Modules"><Modules /></b-tab>
                <b-tab title="Students"><Students /></b-tab>
            </b-tabs>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'
import Students from './Students'
import Modules from './Modules'

export default {
  name: 'Actions',
  components: {Students, Modules},
  data () {
    return {
      courses: [],
      loading: false
    }
  },
  computed: {
    profile () {
      return this.$store.state.profile
    }
  },
  methods: {
    getCourses: function () {
      const db = firebase.firestore()
      this.toggleLoading()
      // console.log('Current User: ', this.profile.userRef)
      const uid = this.profile.uid
      const userRef = db.collection('users').doc(uid)
      // console.log('Current User: ', userRef)
      // make values and method accessible from inside the async
      let instance = this
      db.collection('courses').where('instructor', '==', userRef)
        .get()
        .then(function (querySnapshot) {
          // INFO: filling course data by hand
          // console.log('Snap: ', querySnapshot.docs[0].data())
          querySnapshot.docs.map(doc => {
            const courseData = doc.data()
            const startDate = courseData.date_start.toDate()
            const endDate = courseData.date_end.toDate()
            // TABLE DATA
            instance.courses.push({'Partner': courseData.partner, title: courseData.title, location: courseData.location, 'Date Start': startDate.toLocaleDateString(), 'Date End': endDate.toLocaleDateString(), 'Count Students': courseData.students.length, instructor: instance.profile.displayName})
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
    // check for instructor access
    // console.log('Created: ', this.profile)
    if (this.profile.role !== 'instructor') {
      alert('Access denied')
      this.$router.push('/login')
    }
    // get courses
    this.getCourses()
  }
}
</script>

<style scoped>
li > .nav-link {
    color: #444;
}
</style>
