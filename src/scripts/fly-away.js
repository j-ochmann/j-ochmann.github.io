// Get the container for action icons (trigger for events)
const actionIconsContainer = document.querySelector('.action-icons');

// Get all social icons (these are the ones that will fly away)
const socialIcons = document.querySelectorAll('.social-icons a');

// Map to store original computed transform values for each social icon
const originalTransforms = new Map();
// Map to store original bounding client rect (position and size) for each social icon
const originalRects = new Map();
// Map to store interval IDs for each social icon's movement
const iconMovementIntervals = new Map();
// Map to store the current bouncing state (x, y, vx, vy, rot, vRot) for each social icon
const bouncingIconsState = new Map();

// Store original styles and positions once when the script loads
socialIcons.forEach(icon => {
  // Get the original computed transform string
  const computedStyle = window.getComputedStyle(icon);
  originalTransforms.set(icon, computedStyle.transform);

  // Store original position and size to correctly set `position: fixed` and reset later
  originalRects.set(icon, icon.getBoundingClientRect());

  // Ensure icons have a transition property for smooth return
  // This transition will be temporarily disabled during the bouncing animation
  icon.style.transition = 'transform 0.5s ease-out, left 0.5s ease-out, top 0.5s ease-out';
});

// Helper to get initial random velocity and rotational speed
function getRandomVelocity() {
  const speed = 2 + Math.random() * 3; // Initial speed: 2-5 pixels per frame
  const angle = Math.random() * Math.PI * 2; // Random initial direction in radians
  return {
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    vRot: (Math.random() - 0.5) * 10 // Rotational speed: -5 to 5 degrees per frame
  };
}

function startContinuousFlyAway(icon) {
  // Clear any existing interval for this icon to prevent multiple animations
  if (iconMovementIntervals.has(icon)) {
    clearInterval(iconMovementIntervals.get(icon));
  }

  const initialRect = originalRects.get(icon);
  // Start icons from their original position on the screen
  let currentX = initialRect.left;
  let currentY = initialRect.top;
  let currentRot = (Math.random() * 360); // Start with some random rotation

  let { vx, vy, vRot } = getRandomVelocity();

  // Temporarily change positioning to fixed for viewport-relative movement
  icon.style.position = 'fixed';
  icon.style.left = `${currentX}px`;
  icon.style.top = `${currentY}px`;
  icon.style.margin = '0'; // Clear any margins that might affect position
  icon.style.transition = 'none'; // Disable CSS transition for physics-like movement during bounce

  // Store the current state for this icon
  bouncingIconsState.set(icon, { x: currentX, y: currentY, vx, vy, rot: currentRot, vRot });

  const intervalId = setInterval(() => {
    const state = bouncingIconsState.get(icon);
    if (!state) return; // Should not happen if state is properly managed

    // Update position and rotation based on velocity
    state.x += state.vx;
    state.y += state.vy;
    state.rot += state.vRot;

    // Boundary collision detection and bounce logic
    const iconWidth = icon.offsetWidth;
    const iconHeight = icon.offsetHeight;

    // Horizontal boundaries
    if (state.x < 0) {
      state.x = 0; // Prevent going past the boundary
      state.vx *= -1; // Reverse horizontal velocity
      state.vx += (Math.random() - 0.5) * 1; // Add some randomness on bounce
    } else if (state.x + iconWidth > window.innerWidth) {
      state.x = window.innerWidth - iconWidth; // Prevent going past the boundary
      state.vx *= -1; // Reverse horizontal velocity
      state.vx -= (Math.random() - 0.5) * 1; // Add some randomness on bounce
    }

    // Vertical boundaries
    if (state.y < 0) {
      state.y = 0; // Prevent going past the boundary
      state.vy *= -1; // Reverse vertical velocity
      state.vy += (Math.random() - 0.5) * 1; // Add some randomness on bounce
    } else if (state.y + iconHeight > window.innerHeight) {
      state.y = window.innerHeight - iconHeight; // Prevent going past the boundary
      state.vy *= -1; // Reverse vertical velocity
      state.vy -= (Math.random() - 0.5) * 1; // Add some randomness on bounce
    }

    // Limit speed to prevent icons from becoming too fast or too slow
    const currentSpeed = Math.sqrt(state.vx * state.vx + state.vy * state.vy);
    const maxSpeed = 10; // Max pixels per frame (~500px/sec at 50fps)
    const minSpeed = 3; // Min pixels per frame
    if (currentSpeed > maxSpeed) {
      state.vx = (state.vx / currentSpeed) * maxSpeed;
      state.vy = (state.vy / currentSpeed) * maxSpeed;
    } else if (currentSpeed < minSpeed) {
      state.vx = (state.vx / currentSpeed) * minSpeed;
      state.vy = (state.vy / currentSpeed) * minSpeed;
    }

    // Apply new position and rotation
    icon.style.left = `${state.x}px`;
    icon.style.top = `${state.y}px`;
    icon.style.transform = `rotate(${state.rot}deg)`; // Only rotation here, position is by left/top
  }, 20); // Faster interval (50 frames per second) for smoother animation

  iconMovementIntervals.set(icon, intervalId);
}

function stopContinuousFlyAway() {
  socialIcons.forEach(icon => {
    // Clear the interval for this icon
    if (iconMovementIntervals.has(icon)) {
      clearInterval(iconMovementIntervals.get(icon));
      iconMovementIntervals.delete(icon);
    }
    // Clear the bouncing state for this icon
    bouncingIconsState.delete(icon);

    // Revert styling (re-enable transition for smooth return)
    icon.style.transition = 'transform 0.5s ease-out, left 0.5s ease-out, top 0.5s ease-out';
    icon.style.position = ''; // Revert to original CSS position (likely absolute)
    icon.style.left = ''; // Clear left/top to let original CSS take over
    icon.style.top = '';
    icon.style.margin = ''; // Clear margin
    icon.style.transform = originalTransforms.get(icon); // Restore original CSS transform
  });
}

// Attach event listeners to the action-icons container
if (actionIconsContainer) {
  actionIconsContainer.addEventListener('mouseenter', () => {
    socialIcons.forEach(icon => startContinuousFlyAway(icon));
  });
  actionIconsContainer.addEventListener('mouseleave', stopContinuousFlyAway);
}
