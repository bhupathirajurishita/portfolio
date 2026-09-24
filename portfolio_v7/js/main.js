document.addEventListener('DOMContentLoaded', () => {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const heroImg = document.getElementById('hero-portrait');
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';

  function applyTheme(theme) {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('portfolio-theme', 'light');
      if (heroImg?.dataset.srcLight) heroImg.src = heroImg.dataset.srcLight;
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('portfolio-theme', 'dark');
      if (heroImg?.dataset.srcDark) heroImg.src = heroImg.dataset.srcDark;
    }
  }
  applyTheme(savedTheme);
  themeToggleBtn?.addEventListener('click', () => {
    applyTheme(document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
  });

  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  mobileToggle?.addEventListener('click', () => {
    navMenu?.classList.toggle('mobile-active');
    mobileToggle.setAttribute('aria-expanded', navMenu?.classList.contains('mobile-active') ? 'true' : 'false');
  });
  document.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', () => {
    navMenu?.classList.remove('mobile-active');
    mobileToggle?.setAttribute('aria-expanded', 'false');
  }));

  // Active navigation, including Contact at the bottom.
  const navLinks = document.querySelectorAll('.nav-link');
  const sectionIds = ['home','about','skills','projects','certifications','hackathons','education','contact'];
  function setActiveNav(id) {
    navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${id}`));
  }
  function updateActiveNav() {
    const bottom = window.innerHeight + window.scrollY;
    if (document.documentElement.scrollHeight - bottom <= 120) return setActiveNav('contact');
    const line = window.scrollY + 160;
    let current = 'home';
    sectionIds.forEach(id => {
      const section = document.getElementById(id);
      if (section && line >= section.offsetTop && line < section.offsetTop + section.offsetHeight) current = id;
    });
    setActiveNav(current);
  }
  addEventListener('scroll', updateActiveNav, {passive:true});
  addEventListener('resize', updateActiveNav);
  updateActiveNav();

  // Full-site mouse-following glow.
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reducedMotion) {
    addEventListener('mousemove', e => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    }, {passive:true});
  }

  // Radial reveal follows the pointer inside buttons.
  document.querySelectorAll('.btn-radial').forEach(btn => {
    btn.addEventListener('pointermove', e => {
      const r = btn.getBoundingClientRect();
      btn.style.setProperty('--rx', `${e.clientX-r.left}px`);
      btn.style.setProperty('--ry', `${e.clientY-r.top}px`);
    });
  });

  // Project detail data. Technology chips and supporting details appear only inside the modal.
  const projects = {
    movie: {
      title:'Movie Recommendation System',
      overview:'A content-based system that recommends movies based on user preferences.',
      details:[
        'Builds movie representations from genre, keywords, cast, crew, and overview information.',
        'Applies CountVectorizer to convert movie metadata into text features and cosine similarity to compare titles.',
        'Returns relevant recommendations through an interactive interface for quick, user-driven exploration.'
      ],
      tech:['Python','Pandas','Scikit-learn','Gradio'],
      live:'https://cinema-recommender-2026.streamlit.app/', github:'https://github.com/bhupathirajurishita/movie-recommendation-system'
    },
    churn: {
      title:'Customer Churn Prediction',
      overview:'Predicting customer churn using machine learning models and data-driven analysis.',
      details:[
        'Preprocesses structured customer data and performs exploratory analysis to identify useful patterns.',
        'Benchmarks Decision Tree, Random Forest, and XGBoost classification approaches for churn prediction.',
        'Uses GridSearchCV with 5-fold cross-validation to tune the Random Forest model.'
      ],
      tech:['Python','Pandas','Scikit-learn','XGBoost','GridSearchCV'],
      live:'https://customer-churn-guard.streamlit.app/', github:'https://github.com/bhupathirajurishita/customer-churn-prediction'
    },
    sentiment: {
      title:'Text Sentiment Analyzer',
      overview:'A text sentiment analysis application that classifies user input and provides an interactive response.',
      details:[
        'Classifies user-provided text into positive or negative sentiment.',
        'Uses the DistilBERT sentiment model from the Transformers library for sentiment classification.',
        'Presents the result through an interactive Streamlit interface with playful responses.'
      ],
      tech:['Python','Transformers','Streamlit'],
      live:'https://hows-the-vibe.streamlit.app/', github:'https://github.com/bhupathirajurishita/sentiment-analyzer'
    },
    voice: {
      title:'Voice Attendance System',
      overview:'A voice-enabled attendance system for recording and managing student attendance.',
      details:[
        'Supports voice-based attendance input for recording student attendance.',
        'Includes subject-wise attendance workflows and prevents duplicate attendance entries.',
        'Stores attendance records in CSV files and displays attendance information through the application.'
      ],
      tech:['Python','Streamlit','Speech Recognition','Pandas'],
      live:'https://voice-attendance-system.streamlit.app/', github:'https://github.com/bhupathirajurishita/Voice-Attendance-System'
    },
    handconnect: {
      title:'HandConnect AI',
      overview:'An interactive browser-based computer vision experience that tracks hand gestures through the camera.',
      details:[
        'Uses the browser camera to provide real-time hand tracking.',
        'Uses MediaPipe Hands to detect and track up to two hands in the browser.',
        'Maps detected hand movement into an interactive visual experience.'
      ],
      tech:['HTML','CSS','JavaScript','MediaPipe'],
      live:'https://bhupathirajurishita.github.io/handconnect-ai/', github:'https://github.com/bhupathirajurishita/handconnect-ai'
    },
    ecommerce: {
      title:'E-Commerce Business Intelligence & Customer Analytics',
      overview:'An interactive analytics dashboard for exploring e-commerce sales, customers, payments, delivery performance, and customer satisfaction.',
      details:[
        'Presents an interactive view of e-commerce business data through a dashboard.',
        'Explores sales, customer, payment, delivery, and satisfaction information.',
        'The published version is available as a Streamlit dashboard.'
      ],
      tech:['Python','Streamlit','Pandas','Data Visualization'],
      live:'https://ecommerce-bi.streamlit.app/', github:'https://github.com/bhupathirajurishita/ecommerce-business-intelligence'
    },
    productivity: {
      title:'Smart Productivity Assistant',
      overview:'A productivity-focused application designed to help users organize and manage tasks.',
      details:[
        'Designed around a simple task-management workflow for organizing tasks.',
        'Focuses on keeping everyday task organization straightforward through the interface.',
        'The project source code is available through the GitHub repository.'
      ],
      tech:['HTML','CSS','JavaScript'],
      live:null, github:'https://github.com/bhupathirajurishita/smart-productivity-assistant'
    }
  };

  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalOverview = document.getElementById('modal-overview');
  const modalDetails = document.getElementById('modal-details');
  const modalTech = document.getElementById('modal-tech');
  const modalActions = document.getElementById('modal-actions');
  let lastFocused = null;

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
    lastFocused?.focus();
  }

  function openModal(key) {
    const p = projects[key];
    if (!modal || !p) return;
    lastFocused = document.activeElement;
    modalTitle.textContent = p.title;
    modalOverview.textContent = p.overview;
    modalDetails.innerHTML = `<div class="modal-section"><h3>Project Details</h3><ul class="modal-detail-list">${p.details.map(d => `<li>${d}</li>`).join('')}</ul></div>`;
    modalTech.innerHTML = `<div class="modal-section modal-tech-section"><h3>Technologies</h3><div class="modal-tech-list">${p.tech.map(t => `<span class="skill-badge">${t}</span>`).join('')}</div></div>`;
    modalActions.innerHTML = '';
    if (p.live) modalActions.insertAdjacentHTML('beforeend', `<a class="btn-primary btn-neon" href="${p.live}" target="_blank" rel="noopener noreferrer">Try Live <span>↗</span></a>`);
    if (p.github) modalActions.insertAdjacentHTML('beforeend', `<a class="btn-outline btn-radial" href="${p.github}" target="_blank" rel="noopener noreferrer">View Code <span>↗</span></a>`);
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
    modal.querySelector('.modal-close')?.focus();
    modal.querySelectorAll('.btn-radial').forEach(btn => {
      btn.addEventListener('pointermove', e => {
        const r = btn.getBoundingClientRect();
        btn.style.setProperty('--rx', `${e.clientX-r.left}px`);
        btn.style.setProperty('--ry', `${e.clientY-r.top}px`);
      });
    });
  }

  document.querySelectorAll('.project-detail-btn').forEach(btn => {
    btn.addEventListener('click', () => openModal(btn.closest('[data-project]')?.dataset.project));
  });
  modal?.querySelectorAll('[data-close-modal]').forEach(el => el.addEventListener('click', closeModal));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal?.classList.contains('is-open')) closeModal();
  });

});
