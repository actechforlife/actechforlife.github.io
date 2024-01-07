// your-script.js

new Vue({
  el: '#app',
  data: {
    resume: {}
  },
  mounted() {
    console.log('Mounted: Calling loadResume');
    this.loadResume();
  },
  computed: {
    fullName() {
      return this.resume.Summary ? `${this.resume.Summary.fname} ${this.resume.Summary.lname}` : '';
    }
  },
  methods: {
    async loadResume() {
      try {
        // console.log('loadResume: Fetching resume.json');
        const response = await fetch('resume.json');
        // console.log('loadResume: Response', response);
        this.resume = await response.json();
        // console.log('loadResume: Resume data:', this.resume);
        this.$forceUpdate();
      } catch (error) {
        console.error('Error loading resume:', error);
      }
    }
  }
});
