// your-script.js

new Vue({
    el: '#app',
    data: {
      skills: []
    },
    mounted() {
      this.loadSkills();
    },
    methods: {
      async loadSkills() {
        try {
          const response = await fetch('listofskills.txt');
          const data = await response.text();
          this.skills = data.split('\n').filter(skill => skill.trim() !== '');
        } catch (error) {
          console.error('Error loading skills:', error);
        }
      }
    }
  });
  