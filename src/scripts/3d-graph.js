import * as THREE from 'three';
import ForceGraph3D from '3d-force-graph';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

// Graph data
const gData = {
  nodes: [
    { id: 'Animal', color: '#ff0000' },
    { id: 'Mammal', color: '#00ff00' },
    { id: 'Reptile', color: '#0000ff' },
    { id: 'Canine', color: '#00ffff' },
    { id: 'Feline', color: '#ffaa00' },
    { id: 'Dog', color: '#00ffff' },
    { id: 'Cat', color: '#ffaa00' },
    { id: 'Lizard', color: '#0000ff' }
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
      const color = new THREE.Color(node.color).convertSRGBToLinear().multiplyScalar(1.5);
      return new THREE.Mesh(
        new THREE.SphereGeometry(4, 32, 32),
        new THREE.MeshStandardMaterial({
          color,
          emissive: color,
          emissiveIntensity: 1,
          roughness: 0.2,
          metalness: 0
        })
      );
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
