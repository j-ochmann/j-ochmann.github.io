const actionIconsContainer = document.querySelector('.action-icons');
const socialIcons = document.querySelectorAll('.social-icons a');
const originalTransforms = new Map();
const originalRects = new Map();
const iconMovementIntervals = new Map();
const bouncingIconsState = new Map();
socialIcons.forEach(icon => {
  icon.style.transition = 'transform 0.5s ease-out, left 0.5s ease-out, top 0.5s ease-out';
});
function getRandomVelocity() {
  const initialSpeed = 3 + Math.random() * 12;
  const angle = Math.random() * Math.PI * 2;
  return {
    vx: Math.cos(angle) * initialSpeed,
    vy: Math.sin(angle) * initialSpeed,
    vRot: (Math.random() - 0.5) * 10,
    initialSpeed: initialSpeed
  };
}

function startContinuousFlyAway(icon) {
  if (iconMovementIntervals.has(icon)) {
    clearInterval(iconMovementIntervals.get(icon));
  }

  let ghostContainer = document.getElementById('fly-away-ghost-container');
  if (!ghostContainer) {
    ghostContainer = document.createElement('div');
    ghostContainer.id = 'fly-away-ghost-container';
    ghostContainer.style.position = 'fixed';
    ghostContainer.style.top = '0';
    ghostContainer.style.left = '0';
    ghostContainer.style.width = '100vw';
    ghostContainer.style.height = '100vh';
    ghostContainer.style.pointerEvents = 'none';
    ghostContainer.style.zIndex = '1';
    document.body.appendChild(ghostContainer);
  }

  const initialRect = originalRects.get(icon);
  let currentX = initialRect.left;
  let currentY = initialRect.top;
  let currentRot = (Math.random() * 360);

  let { vx, vy, vRot, initialSpeed } = getRandomVelocity();

  icon.style.position = 'fixed';
  icon.style.left = `${currentX}px`;
  icon.style.top = `${currentY}px`;
  icon.style.margin = '0';
  icon.style.transition = 'none';

  bouncingIconsState.set(icon, { x: currentX, y: currentY, vx, vy, rot: currentRot, vRot, initialSpeed });

  const intervalId = setInterval(() => {
    const state = bouncingIconsState.get(icon);
    if (!state) return;

    const currentSpeed = Math.sqrt(state.vx * state.vx + state.vy * state.vy);

    const minGhostDistance = 15;
    const distanceSinceLastGhost = Math.sqrt(
      Math.pow(state.x - state.lastGhostX, 2) + Math.pow(state.y - state.lastGhostY, 2)
    );

    const dynamicMaxSpeedForGhost = Math.min(state.initialSpeed * 2.5, 35);

    if (currentSpeed > 3 && distanceSinceLastGhost > minGhostDistance) {
      const ghost = icon.cloneNode(true);
      ghost.classList.add('fly-away-ghost');
      ghostContainer.appendChild(ghost);

      ghost.style.position = 'fixed';
      ghost.style.left = `${state.x}px`;
      ghost.style.top = `${state.y}px`;
      ghost.style.transform = `rotate(${state.rot}deg)`;
      ghost.style.pointerEvents = 'none';

      const ghostBlurAmount = Math.min(currentSpeed * 0.7, 10);
      const initialGhostOpacity = Math.min(currentSpeed / dynamicMaxSpeedForGhost * 0.8, 0.8);

      ghost.style.filter = `blur(${ghostBlurAmount}px)`;
      ghost.style.opacity = `${initialGhostOpacity}`;
      ghost.style.transition = 'opacity 0.6s ease-out, filter 0.6s ease-out, transform 0.6s ease-out';

      setTimeout(() => {
        ghost.style.opacity = '0';
        ghost.style.filter = 'blur(0px)';
      }, 50);

      setTimeout(() => {
        ghost.remove();
      }, 650);

      state.lastGhostX = state.x;
      state.lastGhostY = state.y;
    }

    state.x += state.vx;
    state.y += state.vy;
    state.rot += state.vRot;

    const iconWidth = icon.offsetWidth;
    const iconHeight = icon.offsetHeight;

    if (state.x < 0) {
      state.x = 0;
      state.vx *= -1;
      state.vx += (Math.random() - 0.5) * 1;
    } else if (state.x + iconWidth > window.innerWidth) {
      state.x = window.innerWidth - iconWidth;
      state.vx *= -1;
      state.vx -= (Math.random() - 0.5) * 1;
    }

    if (state.y < 0) {
      state.y = 0;
      state.vy *= -1;
      state.vy += (Math.random() - 0.5) * 1;
    } else if (state.y + iconHeight > window.innerHeight) {
      state.y = window.innerHeight - iconHeight;
      state.vy *= -1;
      state.vy -= (Math.random() - 0.5) * 1;
    }

    const dynamicMaxSpeed = Math.min(state.initialSpeed * 2.5, 35);
    const dynamicMinSpeed = Math.max(state.initialSpeed * 0.2, 0.5);

    if (currentSpeed > dynamicMaxSpeed) {
      state.vx = (state.vx / currentSpeed) * dynamicMaxSpeed;
      state.vy = (state.vy / currentSpeed) * dynamicMaxSpeed;
    } else if (currentSpeed < dynamicMinSpeed) {
      state.vx = (state.vx / currentSpeed) * dynamicMinSpeed;
      state.vy = (state.vy / currentSpeed) * dynamicMinSpeed;
    }

    icon.style.left = `${state.x}px`;
    icon.style.top = `${state.y}px`;
    icon.style.transform = `rotate(${state.rot}deg)`;
  }, 20);

  iconMovementIntervals.set(icon, intervalId);
}

function stopContinuousFlyAway() {
  const ghostContainer = document.getElementById('fly-away-ghost-container');
  if (ghostContainer) {
    ghostContainer.remove();
  }

  const maxReturnDuration = 800;
  let maxDistance = 0;

  const distances = new Map();
  socialIcons.forEach(icon => {
    const state = bouncingIconsState.get(icon);
    if (!state) {
      distances.set(icon, 0);
      return;
    }

    const initialRect = originalRects.get(icon);
    const targetX = initialRect.left;
    const targetY = initialRect.top;

    const currentX = state.x;
    const currentY = state.y;

    const distance = Math.sqrt(Math.pow(currentX - targetX, 2) + Math.pow(currentY - targetY, 2));
    distances.set(icon, distance);
    if (distance > maxDistance) {
      maxDistance = distance;
    }
  });

  socialIcons.forEach(icon => {
    if (iconMovementIntervals.has(icon)) {
      clearInterval(iconMovementIntervals.get(icon));
      iconMovementIntervals.delete(icon);
    }
    bouncingIconsState.delete(icon);

    const distance = distances.get(icon);
    const individualDuration = (maxDistance > 0) ? (maxReturnDuration * (distance / maxDistance)) : 0;
    const actualDuration = Math.max(individualDuration, 100);
    icon.style.transition = `transform ${actualDuration}ms ease-out, ` +
                             `left ${actualDuration}ms ease-out, ` +
                             `top ${actualDuration}ms ease-out`;
    const initialRect = originalRects.get(icon);
    icon.style.left = `${initialRect.left}px`;
    icon.style.top = `${initialRect.top}px`;
        icon.style.transform = originalTransforms.get(icon);
    setTimeout(() => {
      icon.style.position = '';
      icon.style.left = '';
      icon.style.top = '';
      icon.style.margin = '';
      icon.style.transform = ''; // Clear inline transform to allow CSS hover effects
      icon.style.transition = 'transform 0.5s ease-out, left 0.5s ease-out, top 0.5s ease-out';
    }, actualDuration);
  });
}

if (actionIconsContainer) {
  actionIconsContainer.addEventListener('mouseenter', () => {
    socialIcons.forEach(icon => {
      const computedStyle = window.getComputedStyle(icon);
      originalTransforms.set(icon, computedStyle.transform);
      originalRects.set(icon, icon.getBoundingClientRect());

      startContinuousFlyAway(icon);
    });
  });
  actionIconsContainer.addEventListener('mouseleave', stopContinuousFlyAway);
}