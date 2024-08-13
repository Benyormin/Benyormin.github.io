

(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();



  const projects = [
    {
      title: "Fine-Tuning BERT Model for Sentiment Analysis on Customer Reviews Dataset",
      description: "This repository contains code for fine-tuning a BERT (Bidirectional Encoder Representations from Transformers) model for sentiment analysis on the Customer Reviews (CR) dataset using 10-fold cross-validation and cross-entropy loss function. The goal is to classify customer reviews into positive or negative sentiment categories.",
      images: ["assets/img/portfolio/BERT.jpg"],
      category: "Deep learning",
      projectURL: "https://github.com/Benyormin/fineTuneBert",
    },
    {
      title: "Face recognition",
      description: "face recognition creating a One-shot Siamese Neural Network, using TensorFlow 2.0, based on the work presented by Gregory Koch, Richard Zemel, and Ruslan Salakhutdinov",
      images: ["assets/img/portfolio/Face2.png"],
      category: "Deep learning",
      projectURL: "https://github.com/Benyormin/faceRecognition",
    },
    {
      title: "dimensionality reduction",
      description: "reducing dimensions of BERT features using PCA in order to visualize them better",
      images: ["assets/img/portfolio/PCA.jpg"],
      category: "Deep learning, machine learning",
      projectURL: "https://github.com/Benyormin/dimensionality-reduction",
    },
    {
      title: "Traffic sign classification",
      description: "This project aims to classify Traffic Sign Images, This project aims to classify traffic signs using deep learning techniques. It utilizes TensorFlow and a convolutional neural network (CNN) to train a model that can predict the type of traffic sign from input images.",
      images: ["assets/img/portfolio/Trafic signs CCE.png"],
      category: "Deep learning",
      projectURL: "https://github.com/Benyormin/traffic_sign_classification",
    },
    {
      title: "Drink water reminder",
      description: "The Drink Water Reminder Android app helps you stay hydrated by providing personalized water intake recommendations, timely notifications, and customizable settings. Whether you’re a fitness enthusiast, a busy professional, or simply someone who wants to maintain optimal hydration, this app has you covered.",
      images: ["assets/img/portfolio/Drink water reminder.jpg"],
      category: "Android, Java",
      projectURL: "https://github.com/Benyormin/DrinkWaterReminder?tab=readme-ov-file",
    },
    {
      title: "JavaCompiler JFlexCUP",
      description: "This repository contains a Java compiler project developed as part of a university assignment. The project consists of two phases: lexical analysis and parsing. In the first phase, a lexical analyzer is implemented to tokenize input source code. In the second phase, a parser is implemented to analyze the structure of the tokenized code.",
      images: ["assets/img/portfolio/compiler.png"],
      category: "Java",
      projectURL: "https://github.com/Benyormin/JavaCompilerJFlexCUP",
    },
    {
      title: "Netflix website",
      description: "an old design of Netflix website(responsive)",
      images: ["assets/img/portfolio/netflix.jpg"],
      category: "Web development",
      projectURL: "https://github.com/Benyormin/Netflix-website",
    }
    
  ];

 
  
  // 
  // Function to get query parameter by name
  function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }

  // Function to display project details
  function showProjectDetails(projectId) {
    if (!projects[projectId]) {
      console.error("No project found with ID: " + projectId);
      return;
    }
    const project = projects[projectId];

    if (project) {
      document.getElementById("project-title").textContent = project.title;
      document.getElementById("project-description").textContent = project.description;
      document.getElementById("project-category").textContent = project.category;
      document.getElementById("project-url").textContent = project.projectURL;
      document.getElementById("project-url").href = project.projectURL;
      document.getElementById("project-img").src = project.images[0];

      
      
  
          /*          
          // Initialize Swiper after dynamically adding slides
          new Swiper('.portfolio-details-slider', {
            speed: 400,
            loop: true,
            autoplay: {
              delay: 5000,
              disableOnInteraction: false
            },
            pagination: {
              el: '.swiper-pagination',
              type: 'bullets',
              clickable: true
            }
          });
    */
    } 
        // Populate other placeholders for images and slider content if needed
    else {
      console.error("Project not found");
    }


    

    
  }

  // Execute on page load
  window.onload = function() {
    
    const projectId = getQueryParam('id');
    console.log(projectId)
    if (projectId !== null) {
      showProjectDetails(projectId);
    }
  }


})()