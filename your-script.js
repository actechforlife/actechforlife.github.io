// your-script.js

new Vue({
    el: '#app',
    data: {
      resume: {}
    },
    mounted() {
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
          const response = await fetch('resume.json');
          this.resume = await response.json();
        } catch (error) {
          console.error('Error loading resume:', error);
        }
      }
    }
  });
  