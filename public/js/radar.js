// Radar animation for background
function initRadar() {
    const canvas = document.getElementById('radarCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let angle = 0;

    function drawRadar() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Get screen center or corner
        const centerX = canvas.width * 0.1;
        const centerY = canvas.height * 0.1;
        const radius = 80;

        // Draw circles
        ctx.strokeStyle = 'rgba(0, 212, 255, 0.2)';
        ctx.lineWidth = 1;

        for (let i = 1; i <= 3; i++) {
            ctx.beginPath();
            ctx.arc(centerX, centerY, (radius / 3) * i, 0, Math.PI * 2);
            ctx.stroke();
        }

        // Draw cross
        ctx.strokeStyle = 'rgba(0, 212, 255, 0.15)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(centerX - radius, centerY);
        ctx.lineTo(centerX + radius, centerY);
        ctx.moveTo(centerX, centerY - radius);
        ctx.lineTo(centerX, centerY + radius);
        ctx.stroke();

        // Draw rotating line
        ctx.strokeStyle = 'rgba(0, 212, 255, 0.4)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.stroke();

        angle += 0.02;
        requestAnimationFrame(drawRadar);
    }

    drawRadar();
}

// Initialize radar when DOM is ready
document.addEventListener('DOMContentLoaded', initRadar);

// Redraw radar on window resize
window.addEventListener('resize', () => {
    const canvas = document.getElementById('radarCanvas');
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
});
