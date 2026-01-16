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
  // Ensure icons have a transition property for smooth return
  // This transition will be temporarily disabled during the bouncing animation
  icon.style.transition = 'transform 0.5s ease-out, left 0.5s ease-out, top 0.5s ease-out';
});

// Helper to get initial random velocity and rotational speed
function getRandomVelocity() {
  const initialSpeed = 3 + Math.random() * 12; // Initial speed: 3-15 pixels per frame (wider range)
  const angle = Math.random() * Math.PI * 2; // Random initial direction in radians
  return {
    vx: Math.cos(angle) * initialSpeed,
    vy: Math.sin(angle) * initialSpeed,
    vRot: (Math.random() - 0.5) * 10, // Rotational speed: -5 to 5 degrees per frame
    initialSpeed: initialSpeed // Return the initial speed
  };
}

function startContinuousFlyAway(icon) {
  // Clear any existing interval for this icon to prevent multiple animations
  if (iconMovementIntervals.has(icon)) {
    clearInterval(iconMovementIntervals.get(icon));
  }

  // Ensure a dedicated container for ghost elements exists
  let ghostContainer = document.getElementById('fly-away-ghost-container');
  if (!ghostContainer) {
    ghostContainer = document.createElement('div');
    ghostContainer.id = 'fly-away-ghost-container';
    ghostContainer.style.position = 'fixed';
    ghostContainer.style.top = '0';
    ghostContainer.style.left = '0';
    ghostContainer.style.width = '100vw';
    ghostContainer.style.height = '100vh';
    ghostContainer.style.pointerEvents = 'none'; // Ghosts should not interfere with mouse events
    ghostContainer.style.zIndex = '1'; // Place behind main icons and other elements if needed
    document.body.appendChild(ghostContainer);
  }

  const initialRect = originalRects.get(icon);
  // Start icons from their original position on the screen
  let currentX = initialRect.left;
  let currentY = initialRect.top;
  let currentRot = (Math.random() * 360); // Start with some random rotation

  let { vx, vy, vRot, initialSpeed } = getRandomVelocity();

  // Temporarily change positioning to fixed for viewport-relative movement
  icon.style.position = 'fixed';
  icon.style.left = `${currentX}px`;
  icon.style.top = `${currentY}px`;
  icon.style.margin = '0'; // Clear any margins that might affect position
  icon.style.transition = 'none'; // Disable CSS transition for physics-like movement during bounce

  // Store the current state for this icon, including initialSpeed
  bouncingIconsState.set(icon, { x: currentX, y: currentY, vx, vy, rot: currentRot, vRot, initialSpeed });

  const intervalId = setInterval(() => {
    const state = bouncingIconsState.get(icon);
    if (!state) return; // Should not happen if state is properly managed

    // Calculate currentSpeed ONCE at the beginning of the interval
    const currentSpeed = Math.sqrt(state.vx * state.vx + state.vy * state.vy);

    // Create ghost elements for trails
    const minGhostDistance = 15; // Pixels distance to create a new ghost
    const distanceSinceLastGhost = Math.sqrt(
      Math.pow(state.x - state.lastGhostX, 2) + Math.pow(state.y - state.lastGhostY, 2)
    );

    const dynamicMaxSpeedForGhost = Math.min(state.initialSpeed * 2.5, 35); // Get dynamicMaxSpeed for ghost opacity calculation

    if (currentSpeed > 3 && distanceSinceLastGhost > minGhostDistance) {
      const ghost = icon.cloneNode(true); // Clone the icon element
      ghost.classList.add('fly-away-ghost'); // Add a class for identification and potential CSS styling
      ghostContainer.appendChild(ghost); // Append to the dedicated ghost container

      // Apply initial styles
      ghost.style.position = 'fixed';
      ghost.style.left = `${state.x}px`; // Use current (previous frame's) position
      ghost.style.top = `${state.y}px`;
      ghost.style.transform = `rotate(${state.rot}deg)`;
      ghost.style.pointerEvents = 'none'; // Ensure ghosts don't interfere with mouse events

      // Calculate blur and initial opacity based on speed
      const ghostBlurAmount = Math.min(currentSpeed * 0.7, 10); // More blur for ghosts
      const initialGhostOpacity = Math.min(currentSpeed / dynamicMaxSpeedForGhost * 0.8, 0.8); // More opaque for faster ghosts

      ghost.style.filter = `blur(${ghostBlurAmount}px)`;
      ghost.style.opacity = `${initialGhostOpacity}`;
      ghost.style.transition = 'opacity 0.6s ease-out, filter 0.6s ease-out, transform 0.6s ease-out';

      // Schedule fade out and removal
      setTimeout(() => {
        ghost.style.opacity = '0';
        ghost.style.filter = 'blur(0px)'; // Reduce blur as it fades
      }, 50); // Start fading shortly after creation

      setTimeout(() => {
        ghost.remove();
      }, 650); // Remove after transition duration + initial delay

      state.lastGhostX = state.x;
      state.lastGhostY = state.y;
    }

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

    // Dynamic speed limit based on initial speed
    // Base maxSpeed and minSpeed on the icon's initial speed
    const dynamicMaxSpeed = Math.min(state.initialSpeed * 2.5, 35); // Cap at 35 for global safety
    const dynamicMinSpeed = Math.max(state.initialSpeed * 0.2, 0.5);   // Floor at 0.5 for global safety

    if (currentSpeed > dynamicMaxSpeed) {
      state.vx = (state.vx / currentSpeed) * dynamicMaxSpeed;
      state.vy = (state.vy / currentSpeed) * dynamicMaxSpeed;
    } else if (currentSpeed < dynamicMinSpeed) {
      state.vx = (state.vx / currentSpeed) * dynamicMinSpeed;
      state.vy = (state.vy / currentSpeed) * dynamicMinSpeed;
    }

    // Apply new position and rotation
    icon.style.left = `${state.x}px`;
    icon.style.top = `${state.y}px`;
    icon.style.transform = `rotate(${state.rot}deg)`; // Only rotation here, position is by left/top
  }, 20); // Faster interval (50 frames per second) for smoother animation

  iconMovementIntervals.set(icon, intervalId);
}

function stopContinuousFlyAway() {
  // Remove the dedicated ghost container and all its children
  const ghostContainer = document.getElementById('fly-away-ghost-container');
  if (ghostContainer) {
    ghostContainer.remove();
  }

  const maxReturnDuration = 800; // Total duration for all icons to return, in milliseconds
  let maxDistance = 0;

  // First pass: Calculate distances and find the maximum distance
  const distances = new Map();
  socialIcons.forEach(icon => {
    const state = bouncingIconsState.get(icon);
    if (!state) { // If icon somehow lost its state or was never moved, set distance to 0
      distances.set(icon, 0);
      return;
    }

    const initialRect = originalRects.get(icon);
    const targetX = initialRect.left;
    const targetY = initialRect.top;

    const currentX = state.x; // Use current x from state for distance calculation
    const currentY = state.y; // Use current y from state for distance calculation

    const distance = Math.sqrt(Math.pow(currentX - targetX, 2) + Math.pow(currentY - targetY, 2));
    distances.set(icon, distance);
    if (distance > maxDistance) {
      maxDistance = distance;
    }
  });

  // Second pass: Apply individual transitions and schedule cleanup
  socialIcons.forEach(icon => {
    // Clear the interval for this icon
    if (iconMovementIntervals.has(icon)) {
      clearInterval(iconMovementIntervals.get(icon));
      iconMovementIntervals.delete(icon);
    }
    // Clear the bouncing state for this icon
    bouncingIconsState.delete(icon);

    const distance = distances.get(icon);
    // Calculate individual duration, ensuring a minimum duration for very close icons
    // If maxDistance is 0 (e.g., no icons moved), set a default duration
    const individualDuration = (maxDistance > 0) ? (maxReturnDuration * (distance / maxDistance)) : 0;
    const actualDuration = Math.max(individualDuration, 100); // Minimum 100ms for very close icons

    // Re-enable transition for smooth return on transform, left, top
    icon.style.transition = `transform ${actualDuration}ms ease-out, ` +
                             `left ${actualDuration}ms ease-out, ` +
                             `top ${actualDuration}ms ease-out`;

    // Set target left/top to original screen position (while still fixed)
    const initialRect = originalRects.get(icon);
    icon.style.left = `${initialRect.left}px`;
    icon.style.top = `${initialRect.top}px`;
    
    // Apply the original transform (rotation/scale part)
    icon.style.transform = originalTransforms.get(icon);

    // AFTER the transition completes, revert to original CSS positioning model
    setTimeout(() => {
      // Clear all inline styles to hand control back to CSS
      icon.style.position = ''; // Revert to original CSS position (likely absolute)
      icon.style.left = ''; // Clear left/top to let original CSS take over
      icon.style.top = '';
      icon.style.margin = ''; // Clear margin
      icon.style.transform = ''; // Explicitly clear transform to allow CSS hover effects
      icon.style.transition = ''; // Explicitly clear transition to allow CSS hover effects
    }, actualDuration); // Use the individual duration for the timeout
  });
}

// Attach event listeners to the action-icons container
if (actionIconsContainer) {
  actionIconsContainer.addEventListener('mouseenter', () => {
    socialIcons.forEach(icon => {
      // Recalculate original position and transform on mouseenter
      const computedStyle = window.getComputedStyle(icon);
      originalTransforms.set(icon, computedStyle.transform);
      originalRects.set(icon, icon.getBoundingClientRect());

      startContinuousFlyAway(icon);
    });
  });
  actionIconsContainer.addEventListener('mouseleave', stopContinuousFlyAway);
}