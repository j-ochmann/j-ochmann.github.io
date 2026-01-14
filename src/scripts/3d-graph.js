import * as THREE from 'three';
import ForceGraph3D from '3d-force-graph';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

// Graph data
const gData = {
  nodes: [
    { id: 'Animal', color: 'hsl(61, 100%, 50%)' },
    { id: 'Mammal', color: '#00ff00' },
    { id: 'Reptile', color: 'rgb(228, 189, 255)' },
    { id: 'Canine', color: '#00ffff' },
    { id: 'Feline', color: '#ffaa00' },
    { id: 'Dog', color: '#00ffff' },
    { id: 'Cat', color: '#ffaa00' },
    { id: 'Lizard', color: 'rgb(228, 189, 255)' }
  ],
  links: [
    { source: 'Mammal', target: 'Animal', color:'#ff00ff' },
    { source: 'Reptile', target: 'Animal', color:'#ff00ff' },
    { source: 'Canine', target: 'Mammal', color:'#00ffff' },
    { source: 'Feline', target: 'Mammal', color:'#00ffff' },
    { source: 'Dog', target: 'Canine', color:'#00ffff' },
    { source: 'Cat', target: 'Feline', color:'#ffaa00' },
    { source: 'Lizard', target: 'Reptile', color:'#ffaa00' }
  ]
};

// Get container
const container = document.getElementById('3d-graph');

if (container) {
  // Initialize Graph
  const Graph = ForceGraph3D()(container)
    .graphData(gData)
    .backgroundColor('#000003')
    .nodeLabel('id')
    .nodeThreeObject(node => {
      // Create the sphere
      const sphereMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color(node.color).convertSRGBToLinear().multiplyScalar(1.5),
        emissive: new THREE.Color(node.color).convertSRGBToLinear().multiplyScalar(1.5),
        emissiveIntensity: 1,
        roughness: 0.2,
        metalness: 0
      });
      const sphere = new THREE.Mesh(new THREE.SphereGeometry(4, 32, 32), sphereMaterial);

      // Create the text sprite
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      const fontSize = 24;
      context.font = `Bold ${fontSize}px Arial`;
      
      const text = node.id;
      const metrics = context.measureText(text);
      const textWidth = metrics.width;
      canvas.width = textWidth + 8; // padding
      canvas.height = fontSize + 8; // padding

      // Re-apply font settings after canvas resize
      context.font = `Bold ${fontSize}px Arial`;
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillStyle = 'rgba(255, 255, 255, 0.9)';
      context.fillText(text, canvas.width / 2, canvas.height / 2);

      const texture = new THREE.CanvasTexture(canvas);
      const spriteMaterial = new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false });
      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.renderOrder = 999;
      sprite.scale.set(canvas.width / 2, canvas.height / 2, 1.0);
      sprite.position.set(0, 12, 0); // Position the label a bit higher above the sphere

      // Create a group to hold both
      const group = new THREE.Group();
      group.add(sphere);
      group.add(sprite);

      return group;
    })
    .linkMaterial(link => {
      const color = new THREE.Color(link.color || '#ffffff').convertSRGBToLinear();
      return new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.5,
        transparent: true,
        opacity: 0.8
      });
    })
    .linkDirectionalParticles(2)
    .linkDirectionalParticleWidth(1.5)
    .onNodeClick(node => {
      const distance = 120;
      const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);
      Graph.cameraPosition(
        { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio },
        node,
        1500
      );
    });

  // Add lighting
  Graph.scene().add(new THREE.AmbientLight(0xffffff, 0.5));
  const dirLight = new THREE.DirectionalLight(0xffffff, 1);
  dirLight.position.set(50, 50, 50);
  Graph.scene().add(dirLight);

  // Post-processing with Bloom effect
  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.2,  // strength
    0.7,  // radius
    0.85  // threshold
  );
  Graph.postProcessingComposer().addPass(bloomPass);

  // Zoom to fit
  Graph.zoomToFit(400);

  // Handle resize
  window.addEventListener('resize', () => {
    Graph.renderer().setSize(window.innerWidth, window.innerHeight);
    bloomPass.setSize(new THREE.Vector2(window.innerWidth, window.innerHeight));
  });
} else {
  console.error('Container element #3d-graph not found.');
}
