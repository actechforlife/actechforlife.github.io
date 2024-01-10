new Vue({
  el: '#main',
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
        const response = await fetch('assets/json/resume.json');
        this.resume = await response.json();

        // Now that resume data is available, handle project details
        this.handleProjectDetails();
      } catch (error) {
        console.error('Error loading resume:', error);
      }
    },
    truncateDescription(description) {
      const maxWords = 15;
      const words = description.split(' ');
      return words.length > maxWords ? `${words.slice(0, maxWords).join(' ')}...` : description;
    },
    handleProjectDetails() {
      // Get the project index from the URL
      const urlParams = new URLSearchParams(window.location.search);
      const projectIndex = urlParams.get('project_index');

      // Ensure resume is defined
      if (this.resume.Projects) {
        // Use the project index to fetch the corresponding project details
        const project = this.resume.Projects[projectIndex];
        // Create an array of sorted project indices
        const sortedIndices = this.resume.Projects
          .map((_, index) => index)
          .sort((a, b) => this.resume.Projects[a].title.localeCompare(this.resume.Projects[b].title));

        // Make a list of all projects in an id
        const projectList = sortedIndices.map((index) => {
          return `<li><a href="portfolio-details.html?project_index=${index}">${this.resume.Projects[index].title}</a></li>`;
        });

        // sort projectList onproject.title;

        // get the project list and convert to HTML list for display
        const projectsHtml = `<ul>${projectList.join('')}</ul>`;
        document.getElementById('projectList').innerHTML = projectsHtml;



        // Check if project is defined
        if (project) {
          // Populate the page with project details
          document.getElementById('projectTitle').textContent = project.title;
          document.getElementById('projectDescription').textContent = project.description;
          document.getElementById('projectInstitution').textContent = project.institution;
          document.getElementById('projectFunding').textContent = project.funding.amount;
          document.getElementById('projectStatus').textContent = project.duration.end;
          document.getElementById('projectRole').textContent = project.role;
          // project funding amount
          // comma and space seperated technologies          
          const technologies = project.technologies.join(', ');
          document.getElementById('technologies').textContent = technologies;
          // get the contribution list and convert to HTML list for display
          const contributionList = `<ul>${project.contribution.map((contribution) => `<li>${contribution}</li>`).join('')}</ul>`;
          document.getElementById('contributionList').innerHTML = contributionList;

          // outcome
          document.getElementById('outcome').textContent = project.outcome;
          // challenges
          document.getElementById('challenges').textContent = project.challenges;
        } else {
          console.error('Project not found in resume data.');
        }
      } else {
        console.error('Resume data not available.');
      }
    }
  }
});
