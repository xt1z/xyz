document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('networkBackground');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let connections = [];
    let animationFrame;
  
    // Handle resize
    function handleResize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    }
  
    // Initialize particles
    function initParticles() {
      particles = [];
      const particleCount = Math.min(Math.floor(window.innerWidth * window.innerHeight / 15000), 100);
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 1.5 + 0.5,
        });
      }
    }
  
    // Find connections between particles
    function findConnections() {
      connections = [];
      const maxDistance = 150;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            connections.push({
              particleA: particles[i],
              particleB: particles[j],
              distance: distance,
            });
          }
        }
      }
    }
  
    // Animation function
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update particle positions
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        
        // Draw particles
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(135, 214, 245, 0.8)";
        ctx.fill();
      });
      
      findConnections();
      
      // Draw connections
      connections.forEach(connection => {
        const opacity = 1 - (connection.distance / 150);
        ctx.beginPath();
        ctx.moveTo(connection.particleA.x, connection.particleA.y);
        ctx.lineTo(connection.particleB.x, connection.particleB.y);
        ctx.strokeStyle = `rgba(155, 135, 245, ${opacity * 0.2})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });
      
      animationFrame = requestAnimationFrame(animate);
    }
  
    // Initialize
    window.addEventListener('resize', handleResize);
    handleResize();
    animate();
  
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrame);
    };
  });