(() => {
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let width, height;

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.radius = Math.random() * 2 + 1;
      this.speedX = (Math.random() - 0.5) * 1.5;
      this.speedY = (Math.random() - 0.5) * 1.5;
      this.color = 'rgba(194, 0, 187, 0.7)';
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x < 0 || this.x > width) this.speedX *= -1;
      if (this.y < 0 || this.y > height) this.speedY *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.shadowColor = '#c200bb80';
      ctx.shadowBlur = 10;
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const particlesArray = [];
  const PARTICLE_COUNT = 70;

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particlesArray.push(new Particle());
  }

  function connectParticles() {
    const maxDistance = 150;
    for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a + 1; b < particlesArray.length; b++) {
        const dx = particlesArray[a].x - particlesArray[b].x;
        const dy = particlesArray[a].y - particlesArray[b].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDistance) {
          ctx.strokeStyle = `rgba(38, 47, 104, ${1 - dist / maxDistance})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
          ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particlesArray.forEach(p => {
      p.update();
      p.draw();
    });
    connectParticles();
    requestAnimationFrame(animate);
  }

  animate();
})();
