document.addEventListener('DOMContentLoaded', function () {
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or use the system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.body.classList.add('dark');
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
    }
    
    // Toggle theme function
    function toggleTheme() {
      const isDark = document.body.classList.contains('dark');
      
      document.body.classList.toggle('dark');
      
      if (isDark) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'light');
      } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'dark');
      }
      
      // Add animation to theme toggle
      themeToggle.classList.add('theme-toggle-animation');
      setTimeout(() => {
        themeToggle.classList.remove('theme-toggle-animation');
      }, 500);
    }
    
    // Theme toggle event listener
    themeToggle.addEventListener('click', toggleTheme);
    
    // Bangkok clock functionality (GMT+7)
    function updateBangkokTime() {
      const now = new Date();
      const options = { 
        timeZone: 'Asia/Bangkok',
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: false
      };
      
      const bangkokTime = new Intl.DateTimeFormat('en-US', options).format(now);
      document.getElementById('bangkok-time').textContent = bangkokTime;
    }
    
    // Update time immediately and then every second
    updateBangkokTime();
    setInterval(updateBangkokTime, 1000);
    
    // Update current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Scroll animations
    const sections = document.querySelectorAll('section');
    
    function checkScroll() {
      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.8) {
          section.style.opacity = '1';
          section.style.transform = 'translateY(0)';
        }
      });
    }
    
    // Check sections on load
    checkScroll();
    
    // Check sections on scroll
    window.addEventListener('scroll', checkScroll);
    
    // Add animation class to skill items with delay
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
      item.style.animationDelay = `${index * 100}ms`;
    });
    
    // Hover effects for cards
    const cards = document.querySelectorAll('.card, .music-card');
    cards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 12px 20px rgba(0, 0, 0, 0.15)';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.boxShadow = '';
      });
    });
  });