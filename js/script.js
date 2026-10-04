/**
 * ANUJ GANGANE - FULL-STACK .NET DEVELOPER PORTFOLIO
 * Vanilla JavaScript (ES6+) Implementation
 * 
 * Features:
 * - Theme Toggle (Dark/Light with localStorage persistence)
 * - Mobile Navigation Drawer
 * - Active Section Tracking & Smooth Scroll
 * - IntersectionObserver Scroll Reveal Animations
 * - Interactive Project Details Modal (Keyboard & Mobile accessible)
 * - Accessible Contact Form Validation & Mailto Handler
 * - One-Click Email Copy Helper
 * - Floating Back-To-Top Controller
 * - Dynamic Copyright Year
 * - Prefers-Reduced-Motion Support
 */

(function () {
  'use strict';

  // ==========================================================================
  // PROJECT DATA STORE (Faithful to resume, zero fabrication)
  // ==========================================================================
  const projectsData = {
    'task-management': {
      title: 'Staff Task Management System',
      category: 'Enterprise Web Application',
      technologies: ['Entity Framework Core', 'ASP.NET Core MVC', 'C#', 'SQL Server'],
      image: 'assets/images/Task.jpeg',
      alt: 'Staff Task Management System Dashboard Preview',
      description: 'Developed a robust web application for task assignment and management, enabling managers and team leaders to allocate work and track task progress in real time across departments.',
      features: [
        'Task assignment and delegation workflows',
        'Task prioritization and status tracking',
        'Custom deadline notifications and scheduling',
        'Role-based security (Manager, Team Lead, Employee)',
        'Comprehensive employee management module',
        'Central administrator governance & oversight'
      ],
      githubUrl: 'https://github.com/AnujGangane',
      liveDemoUrl: null,
      placeholderNote: 'Repository & full source code available on GitHub profile.'
    },
    'asset-management': {
      title: 'Asset Management System',
      category: 'Hardware & IoT Integrated System',
      technologies: ['ASP.NET MVC', 'Blazor', 'C#', 'SQL Server', 'Entity Framework'],
      image: 'assets/images/Asset.jpg',
      alt: 'Asset Management System Dashboard Preview',
      description: 'Developed a high-performance web-based platform for tracking, managing, and monitoring physical enterprise assets using RFID technology and automated tracking mechanisms.',
      features: [
        'Automated RFID-based asset tracking & logging',
        'Dynamic asset assignment and relocation history',
        'Calibration schedule management & threshold alerts',
        'Preventative maintenance scheduling',
        'Real-time operational status monitoring',
        'Auditing, compliance, and lifecycle reporting'
      ],
      githubUrl: 'https://github.com/AnujGangane',
      liveDemoUrl: null,
      placeholderNote: 'Repository & full source code available on GitHub profile.'
    },
    'medical-store': {
      title: 'Medical Store Management System',
      category: 'E-Commerce & Dispensary Platform',
      technologies: ['ASP.NET Core MVC', 'C#', 'SQL Server', 'EF Core', 'SignalR'],
      image: 'assets/images/Medical.png',
      alt: 'Medical Store Management System Dashboard Preview',
      description: 'Developed a full-featured e-commerce pharmacy and dispensary management platform with dual role-based access for Customers and Administrators, featuring real-time updates and prescription verification.',
      features: [
        'Customer and Administrator dual role-based access',
        'Prescription upload and verification workflows',
        'Centralized medicine and equipment inventory tracking',
        'Barcode inward reception and batch management',
        'End-to-end order-to-delivery fulfillment pipeline',
        'Real-time order tracking powered by SignalR'
      ],
      githubUrl: 'https://github.com/AnujGangane',
      liveDemoUrl: null,
      placeholderNote: 'Repository & full source code available on GitHub profile.'
    }
  };

  // ==========================================================================
  // 1. THEME MANAGER (Dark / Light Mode)
  // ==========================================================================
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const storageKey = 'anuj_portfolio_theme';

  function initTheme() {
    const savedTheme = localStorage.getItem(storageKey);
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
      updateThemeToggleAria(savedTheme);
    } else {
      // Default to Dark Mode as per requirements
      document.documentElement.setAttribute('data-theme', 'dark');
      updateThemeToggleAria('dark');
    }
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem(storageKey, newTheme);
    updateThemeToggleAria(newTheme);
  }

  function updateThemeToggleAria(theme) {
    if (!themeToggleBtn) return;
    const label = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
    themeToggleBtn.setAttribute('aria-label', label);
    themeToggleBtn.setAttribute('title', label);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }

  // ==========================================================================
  // 2. MOBILE NAVIGATION DRAWER & BACKDROP OVERLAY
  // ==========================================================================
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navOverlay = document.getElementById('nav-overlay');
  const navLinks = document.querySelectorAll('.nav-link');

  function openMobileMenu() {
    if (!mobileToggle || !navMenu) return;
    mobileToggle.classList.add('active');
    mobileToggle.setAttribute('aria-expanded', 'true');
    navMenu.classList.add('active');
    if (navOverlay) navOverlay.classList.add('active');
    document.body.classList.add('mobile-nav-open');
  }

  function closeMobileMenu() {
    if (!mobileToggle || !navMenu) return;
    mobileToggle.classList.remove('active');
    mobileToggle.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('active');
    if (navOverlay) navOverlay.classList.remove('active');
    document.body.classList.remove('mobile-nav-open');
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', function () {
      const isOpen = navMenu.classList.contains('active');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  // Close mobile menu when clicking the overlay
  if (navOverlay) {
    navOverlay.addEventListener('click', closeMobileMenu);
  }

  // Close mobile menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', function (e) {
    if (
      navMenu &&
      navMenu.classList.contains('active') &&
      !navMenu.contains(e.target) &&
      !mobileToggle.contains(e.target) &&
      (!navOverlay || !navOverlay.contains(e.target))
    ) {
      closeMobileMenu();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeMobileMenu();
      closeModal();
    }
  });

  // Close on window resize > 992px
  window.addEventListener('resize', function () {
    if (window.innerWidth > 992 && navMenu && navMenu.classList.contains('active')) {
      closeMobileMenu();
    }
  });

  // ==========================================================================
  // 3. NAVBAR SCROLL EFFECT & ACTIVE NAVIGATION INDICATOR
  // ==========================================================================
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');

  function handleNavbarScroll() {
    if (!navbar) return;
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  function updateActiveNavLink() {
    const scrollY = window.pageYOffset + 120;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');
      const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (correspondingLink) {
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          correspondingLink.classList.add('active');
        } else {
          correspondingLink.classList.remove('active');
        }
      }
    });
  }

  window.addEventListener('scroll', function () {
    handleNavbarScroll();
    updateActiveNavLink();
    handleBackToTopVisibility();
  }, { passive: true });

  // ==========================================================================
  // 4. FLOATING BACK-TO-TOP BUTTON
  // ==========================================================================
  const backToTopBtn = document.getElementById('back-to-top');

  function handleBackToTopVisibility() {
    if (!backToTopBtn) return;
    if (window.scrollY > 350) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ==========================================================================
  // 5. INTERSECTION OBSERVER SCROLL REVEAL
  // ==========================================================================
  function initScrollReveal() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealElements.forEach(el => el.classList.add('is-revealed'));
      return;
    }

    const checkAndReveal = () => {
      const windowH = window.innerHeight || document.documentElement.clientHeight;
      revealElements.forEach(el => {
        if (!el.classList.contains('is-revealed')) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= windowH - 30) {
            el.classList.add('is-revealed');
          }
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px 50px 0px',
      threshold: 0
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // Run immediate check and listen for scroll
    checkAndReveal();
    window.addEventListener('scroll', checkAndReveal, { passive: true });
  }

  // ==========================================================================
  // 6. PROJECT MODAL CONTROLLER
  // ==========================================================================
  const projectModal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalTechList = document.getElementById('modal-tech-list');
  const modalDesc = document.getElementById('modal-desc');
  const modalFeatures = document.getElementById('modal-features');
  const modalNotice = document.getElementById('modal-notice');
  const modalGithubBtn = document.getElementById('modal-github-btn');
  const modalDemoBtn = document.getElementById('modal-demo-btn');
  let lastActiveElement = null;

  function openModal(projectId) {
    const data = projectsData[projectId];
    if (!data || !projectModal) return;

    lastActiveElement = document.activeElement;

    // Dynamically retrieve image from the card if updated in HTML, or fallback to data.image
    const cardEl = document.querySelector(`.project-card[data-project="${projectId}"]`);
    const cardImg = cardEl ? cardEl.querySelector('.project-img') : null;
    const resolvedImage = (cardImg && cardImg.getAttribute('src')) ? cardImg.getAttribute('src') : data.image;

    // Populate data
    modalTitle.textContent = data.title;
    modalDesc.textContent = data.description;
    modalImg.src = resolvedImage;
    modalImg.alt = (cardImg && cardImg.getAttribute('alt')) ? cardImg.getAttribute('alt') : data.alt;

    // Clear and populate tech badges
    modalTechList.innerHTML = '';
    data.technologies.forEach(tech => {
      const badge = document.createElement('span');
      badge.className = 'tech-badge';
      badge.textContent = tech;
      modalTechList.appendChild(badge);
    });

    // Clear and populate features
    modalFeatures.innerHTML = '';
    data.features.forEach(feat => {
      const li = document.createElement('li');
      li.className = 'modal-feature-item';
      li.innerHTML = `
        <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
        <span>${feat}</span>
      `;
      modalFeatures.appendChild(li);
    });

    // Handle GitHub and Live Demo buttons (No fake URLs)
    if (modalNotice) {
      modalNotice.textContent = data.placeholderNote;
    }

    if (modalGithubBtn) {
      modalGithubBtn.href = data.githubUrl || 'https://github.com/AnujGangane';
      modalGithubBtn.target = '_blank';
      modalGithubBtn.rel = 'noopener noreferrer';
      modalGithubBtn.className = 'btn btn-primary';
      modalGithubBtn.style.display = 'inline-flex';
      modalGithubBtn.innerHTML = `
        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
        </svg>
        <span>View Github Repository</span>
      `;
    }

    // Schedule Walkthrough removed per instructions
    if (modalDemoBtn) {
      modalDemoBtn.style.display = 'none';
    }

    // Show modal
    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');

    // Focus close button for accessibility
    if (modalCloseBtn) {
      modalCloseBtn.focus();
    }
  }

  function closeModal() {
    if (!projectModal || !projectModal.classList.contains('active')) return;
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');

    if (lastActiveElement) {
      lastActiveElement.focus();
    }
  }

  // Attach event listeners to project trigger buttons & cards
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    const projectId = card.getAttribute('data-project');
    
    // Clicking card opens modal
    card.addEventListener('click', function (e) {
      // Don't trigger twice if clicking direct button inside
      if (!e.target.closest('a')) {
        openModal(projectId);
      }
    });

    // Keyboard accessibility for card
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(projectId);
      }
    });

    // "View Details" button inside card
    const viewBtn = card.querySelector('.view-project-btn');
    if (viewBtn) {
      viewBtn.addEventListener('click', function (e) {
        e.preventDefault();
        openModal(projectId);
      });
    }
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  // Close on clicking backdrop outside dialog
  if (projectModal) {
    projectModal.addEventListener('click', function (e) {
      if (e.target === projectModal) {
        closeModal();
      }
    });
  }

  // ==========================================================================
  // 7. CONTACT FORM -> GOOGLE SHEETS REAL-TIME INTEGRATION
  // ==========================================================================
  // To connect your Google Sheet:
  // 1. Create a Google Sheet & open Extensions > Apps Script.
  // 2. Paste the script from google_apps_script.js (included in your project folder).
  // 3. Click Deploy > New deployment > Web app (Who has access: Anyone) and copy the URL.
  // 4. Paste your Web App URL below into GOOGLE_SHEET_URL:
  const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbyRLG-Hrz9SI6z1HoyaxKWxBOnX_3fPfoJfp733qic2O7tajFlkw5d6rHxOQVtpb3V2SA/exec';

  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const subjectInput = document.getElementById('contact-subject');
  const messageInput = document.getElementById('contact-message');
  const formStatus = document.getElementById('form-status');
  const contactSubmitBtn = document.getElementById('contact-submit-btn');
  const submitBtnText = document.getElementById('submit-btn-text');

  function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).trim().toLowerCase());
  }

  function showFieldError(input, errorElementId, message) {
    input.classList.add('is-invalid');
    const errEl = document.getElementById(errorElementId);
    if (errEl) {
      errEl.textContent = message;
      errEl.classList.add('visible');
    }
  }

  function clearFieldError(input, errorElementId) {
    input.classList.remove('is-invalid');
    const errEl = document.getElementById(errorElementId);
    if (errEl) {
      errEl.textContent = '';
      errEl.classList.remove('visible');
    }
  }

  function setupFieldValidation(input, errorId, validatorFn, errorMsg) {
    if (!input) return;
    input.addEventListener('blur', function () {
      if (!validatorFn(input.value)) {
        showFieldError(input, errorId, errorMsg);
      } else {
        clearFieldError(input, errorId);
      }
    });

    input.addEventListener('input', function () {
      if (input.classList.contains('is-invalid') && validatorFn(input.value)) {
        clearFieldError(input, errorId);
      }
    });
  }

  setupFieldValidation(nameInput, 'error-name', val => val.trim().length >= 2, 'Please enter your name (minimum 2 characters).');
  setupFieldValidation(emailInput, 'error-email', validateEmail, 'Please enter a valid email address.');
  setupFieldValidation(subjectInput, 'error-subject', val => val.trim().length >= 3, 'Please enter a subject (minimum 3 characters).');
  setupFieldValidation(messageInput, 'error-message', val => val.trim().length >= 10, 'Please write a message (minimum 10 characters).');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
        showFieldError(nameInput, 'error-name', 'Please enter your name (minimum 2 characters).');
        isValid = false;
      } else {
        clearFieldError(nameInput, 'error-name');
      }

      // Validate Email
      if (!validateEmail(emailInput.value)) {
        showFieldError(emailInput, 'error-email', 'Please enter a valid email address.');
        isValid = false;
      } else {
        clearFieldError(emailInput, 'error-email');
      }

      // Validate Subject
      if (!subjectInput.value.trim() || subjectInput.value.trim().length < 3) {
        showFieldError(subjectInput, 'error-subject', 'Please enter a subject (minimum 3 characters).');
        isValid = false;
      } else {
        clearFieldError(subjectInput, 'error-subject');
      }

      // Validate Message
      if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
        showFieldError(messageInput, 'error-message', 'Please write a message (minimum 10 characters).');
        isValid = false;
      } else {
        clearFieldError(messageInput, 'error-message');
      }

      if (!isValid) {
        if (formStatus) {
          formStatus.className = 'form-status error';
          formStatus.textContent = 'Please correct the highlighted errors before submitting.';
        }
        return;
      }

      // ========================================================================
      // SUBMIT DIRECTLY TO GOOGLE SHEET (NO FILE DOWNLOAD)
      // ========================================================================
      const originalText = submitBtnText ? submitBtnText.textContent : 'Submit';
      if (contactSubmitBtn) {
        contactSubmitBtn.disabled = true;
      }
      if (submitBtnText) {
        submitBtnText.textContent = 'Submitting...';
      }

      const now = new Date();
      const formattedDate = now.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: '2-digit'
      }) + ' ' + now.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });

      const submissionData = {
        date: formattedDate,
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        subject: subjectInput.value.trim(),
        message: messageInput.value.trim()
      };

      // Always save a local fallback copy in localStorage
      try {
        const stored = JSON.parse(localStorage.getItem('anuj_portfolio_contact_messages') || '[]');
        stored.push(submissionData);
        localStorage.setItem('anuj_portfolio_contact_messages', JSON.stringify(stored));
      } catch (err) {
        console.warn('LocalStorage backup:', err);
      }

      const resetBtnState = () => {
        if (contactSubmitBtn) contactSubmitBtn.disabled = false;
        if (submitBtnText) submitBtnText.textContent = originalText;
      };

      const showSuccess = () => {
        if (formStatus) {
          formStatus.className = 'form-status success';
          formStatus.innerHTML = `
            <strong>✓ Message submitted successfully!</strong><br>
          `;
        }
        contactForm.reset();
        resetBtnState();
      };

      const isLiveUrl = GOOGLE_SHEET_URL &&
        !GOOGLE_SHEET_URL.includes('YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL') &&
        GOOGLE_SHEET_URL.startsWith('http');

      if (isLiveUrl) {
        // Send data directly to Google Sheet Web App using URLSearchParams
        const postData = new URLSearchParams();
        postData.append('date', submissionData.date);
        postData.append('name', submissionData.name);
        postData.append('email', submissionData.email);
        postData.append('subject', submissionData.subject);
        postData.append('message', submissionData.message);

        fetch(GOOGLE_SHEET_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: postData.toString()
        })
        .then(() => {
          showSuccess();
        })
        .catch((error) => {
          console.error('Google Sheet submission error:', error);
          if (formStatus) {
            formStatus.className = 'form-status error';
            formStatus.innerHTML = `
              <strong>Notice:</strong> Could not reach Google Sheets. Your message was saved locally. Please check your internet connection.
            `;
          }
          resetBtnState();
        });
      } else {
        // Demo/local execution: simulate smooth submission without downloading any file
        setTimeout(() => {
          showSuccess();
          console.info('Google Sheets Integration: Data saved locally. To link your live Google Sheet, paste your Google Apps Script Web App URL into GOOGLE_SHEET_URL in js/script.js (refer to google_apps_script.js).');
        }, 500);
      }
    });
  }

  // ==========================================================================
  // 8. ONE-CLICK EMAIL COPY HELPER
  // ==========================================================================
  const copyEmailBtn = document.getElementById('copy-email-btn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', function () {
      const emailText = 'anujgangane9812@gmail.com';
      navigator.clipboard.writeText(emailText).then(() => {
        const originalText = copyEmailBtn.innerHTML;
        copyEmailBtn.innerHTML = `
          <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16" aria-hidden="true">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
          Email Copied!
        `;
        setTimeout(() => {
          copyEmailBtn.innerHTML = originalText;
        }, 2500);
      }).catch(() => {
        alert('Email address: anujgangane9812@gmail.com');
      });
    });
  }

  // ==========================================================================
  // 9. DYNAMIC CURRENT YEAR
  // ==========================================================================
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // ==========================================================================
  // 10. INITIALIZATION
  // ==========================================================================
  document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    handleNavbarScroll();
    updateActiveNavLink();
    initScrollReveal();
  });

})();
