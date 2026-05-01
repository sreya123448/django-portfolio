 (function() {
    function smoothScrollToElement(targetId) {
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - navbarHeight - 10;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        history.pushState(null, null, targetId);
      }
    }

    const allNavLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const brandLink = document.querySelector('.navbar-brand');
    const workButton = document.querySelector('#workBtn');

    allNavLinks.forEach(link => {
      link.addEventListener('click', function(event) {
        event.preventDefault();
        const targetHash = this.getAttribute('href');
        if (targetHash && targetHash.startsWith('#')) {
          smoothScrollToElement(targetHash);
          const navbarCollapse = document.querySelector('.navbar-collapse');
          if (navbarCollapse.classList.contains('show')) {
            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
            if (bsCollapse) bsCollapse.hide();
          }
        }
      });
    });

    if (brandLink) {
      brandLink.addEventListener('click', function(e) {
        e.preventDefault();
        smoothScrollToElement('#home');
        allNavLinks.forEach(link => link.classList.remove('active'));
        const homeLink = document.querySelector('.nav-link[href="#home"]');
        if (homeLink) homeLink.classList.add('active');
      });
    }

    if (workButton) {
      workButton.addEventListener('click', function(e) {
        e.preventDefault();
        smoothScrollToElement('#projects');
      });
    }

    const downloadBtns = document.querySelectorAll('#downloadCVBtn, #aboutDownloadCV');
    downloadBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        alert('📄 CV download simulation: "Sreya_Sreekumar_CV.pdf" would be downloaded.');
      });
    });

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const statusDiv = document.getElementById('formStatus');
        statusDiv.innerHTML = '✅ Message sent! I will get back soon.';
        statusDiv.style.color = '#4ade80';
        contactForm.reset();
        setTimeout(() => { statusDiv.innerHTML = ''; }, 3000);
      });
    }

    function updateActiveLinkOnScroll() {
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 120;
      let currentSectionId = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          currentSectionId = section.getAttribute('id');
        }
      });
      allNavLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }

    window.addEventListener('scroll', updateActiveLinkOnScroll);
    window.addEventListener('load', updateActiveLinkOnScroll);
  })();


  
const isSuccess = document.body.dataset.success === "true";

if (isSuccess) {
  const popup = document.getElementById("successPopup");

  if (popup) {
    popup.classList.add("show");

    setTimeout(() => {
      popup.classList.remove("show");
    }, 3000);
  }
}