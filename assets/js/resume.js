// Set up Vue-i18n
Vue.use(VueI18n);
// Get the default language of the user's browser
const defaultLanguage = navigator.language || navigator.userLanguage;

// Extract the language code (e.g., 'en', 'fr', 'es')
const languageCode = defaultLanguage.split('-')[0];
console.log(languageCode);

// Define supported locales
const supportedLocales = ['en', 'zh']; // Add all supported locales

// Set the default language if it's supported; otherwise, fallback to a default locale
const defaultLocale = supportedLocales.includes(languageCode) ? languageCode : 'en';

const i18n = new VueI18n({
  locale: defaultLocale, // default locale
  fallbackLocale: 'en', // fallback locale
  messages: {
    en: {
      // English translations
      //load greetings from resume.json {{}}
      home: 'Home',
      about: 'About',
      skills: 'Skills',
      resume: 'Resume',
      projects: 'Projects',
    },
    zh: {
      //chinese translations
      home: '首页',
      about: '关于',
      skills: '技能',
      resume: '简历',
      projects: '项目',
    }
  },
});

new Vue({
  el: '#app',
  data: {
    resume: {}
  },
  i18n,
  mounted() {
    this.loadResume();
  }, computed: {
    fullName() {
      return this.resume.Summary ? `${this.resume.Summary.fname} ${this.resume.Summary.lname}` : '';
    }
  },
  methods: {
    switchLanguage(locale) {
      this.$i18n.locale = locale;
    },

truncateDescription(description) {
  const maxWords = 15;
  const words = description.split(' ');
  return words.length > maxWords ? `${words.slice(0, maxWords).join(' ')}...` : description;
},
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
    getName() {
      if (this.resume && this.resume.Summary) {
        switch (this.$i18n.locale) {
          case 'en':
            return this.fullName || '';
          case 'zh':
            return this.resume.Summary.chinesename || this.fullName || '';
          default:
            return this.fullName || '';
        }
      }
      return '';
    },

    getDescription() {
      // Return the description based on the current locale
      if (this.resume && this.resume.Summary) {
        switch (this.$i18n.locale) {
          case 'en':
            return this.resume.Summary.description;
          case 'zh':
            // Add support for Chinese description if available
            return this.resume.Summary.chinesedescription || this.resume.Summary.description;
          default:
            return this.resume.Summary.description;
        }
      }
      return '';
    },
    getAboutme() {
      if (this.resume && this.resume.Summary) {
        // Return the description based on the current locale                    
        switch (this.$i18n.locale) {
          case 'en':
            return this.resume.Summary.aboutme;
          case 'zh':
            // Add support for Chinese description if available
            return this.resume.Summary.chineseaboutme || this.resume.Summary.description;
          default:
            return this.resume.Summary.aboutme;
        }
      }
      return '';
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