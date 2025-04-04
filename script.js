const countdown = document.getElementById("countdown");
const birthdayMessage = document.getElementById("birthdayMessage");
const heading = document.getElementById("heading");
const music = document.getElementById("birthdayMusic");

// 🎂 Countdown to April 6, 2025 at 00:00:00
const birthdayDate = new Date("April 6, 2025 00:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = birthdayDate - now;

  if (distance <= 0) {
    countdown.style.display = "none";
    heading.style.display = "none";
    birthdayMessage.style.display = "flex";
    startConfetti();
    startSparkles();
    music?.play();
    return;
  }

  document.getElementById("days").textContent = Math.floor(distance / (1000 * 60 * 60 * 24));
  document.getElementById("hours").textContent = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  document.getElementById("minutes").textContent = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  document.getElementById("seconds").textContent = Math.floor((distance % (1000 * 60)) / 1000);
}

setInterval(updateCountdown, 1000);
updateCountdown();

function startConfetti() {
  const canvas = document.getElementById("confettiCanvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const confetti = [];
  const count = 150;
  const colors = ['#ff69b4', '#ffb6c1', '#ba55d3', '#dda0dd', '#ffffff'];

  for (let i = 0; i < count; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * 2 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      tilt: Math.random() * 10 - 10,
      tiltAngle: 0,
      tiltAngleIncrement: Math.random() * 0.1 + 0.05,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < confetti.length; i++) {
      const c = confetti[i];
      ctx.beginPath();
      ctx.lineWidth = c.r;
      ctx.strokeStyle = c.color;
      ctx.moveTo(c.x + c.tilt + c.r / 2, c.y);
      ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r / 2);
      ctx.stroke();
    }
    update();
  }

  function update() {
    for (let i = 0; i < confetti.length; i++) {
      const c = confetti[i];
      c.tiltAngle += c.tiltAngleIncrement;
      c.y += (Math.cos(c.d) + c.r / 2) / 2;
      c.x += Math.sin(c.d);
      c.tilt = Math.sin(c.tiltAngle) * 15;

      if (c.y > canvas.height) {
        c.y = -20;
        c.x = Math.random() * canvas.width;
      }
    }
  }

  function animate() {
    draw();
    requestAnimationFrame(animate);
  }

  animate();
}

function startSparkles() {
  const canvas = document.getElementById("sparkleCanvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let sparkles = Array.from({ length: 100 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 2 + 1,
    alpha: Math.random(),
    dx: Math.random() * 0.5 - 0.25,
    dy: Math.random() * 0.5 - 0.25
  }));

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    sparkles.forEach(s => {
      ctx.beginPath();
      ctx.globalAlpha = s.alpha;
      ctx.fillStyle = 'white';
      ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      ctx.fill();
      s.x += s.dx;
      s.y += s.dy;
      s.alpha += (Math.random() - 0.5) * 0.05;

      if (s.alpha <= 0 || s.alpha > 1) s.alpha = Math.random();
    });
    requestAnimationFrame(animate);
  }

  animate();
}
