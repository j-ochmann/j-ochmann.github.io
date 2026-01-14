document.addEventListener('DOMContentLoaded', () => {
  // Polyfill for THREE modules if not present (for standalone script usage)
  if (typeof THREE === 'undefined') {
    console.error("THREE.js is not loaded.");
    return;
  }

  // Data for the graph
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

  // Container for the graph
  const container = document.getElementById('3d-graph');
  if (!container) {
    console.error("Container #3d-graph not found.");
    return;
  }
  
  // Initialize the 3D Force Graph
  const Graph = ForceGraph3D()(container)
    .graphData(gData)
    .backgroundColor('#000003')
    .nodeLabel('id')
    .nodeThreeObject(node => {
      const color = new THREE.Color(node.color).convertSRGBToLinear().multiplyScalar(5);
      return new THREE.Mesh(
        new THREE.SphereGeometry(4, 32, 32),
        new THREE.MeshStandardMaterial({
          color,
          emissive: color,
          emissiveIntensity: 3,
          roughness: 0.2,
          metalness: 0
        })
      );
    })
    .linkMaterial(link => {
      const color = new THREE.Color(link.color || '#ffffff').convertSRGBToLinear().multiplyScalar(3);
      return new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 2,
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

  // Add lighting to the scene for the bloom effect
  Graph.scene().add(new THREE.AmbientLight(0xffffff, 0.5));
  const dirLight = new THREE.DirectionalLight(0xffffff, 1);
  dirLight.position.set(50, 50, 50);
  Graph.scene().add(dirLight);

  // Add UnrealBloomPass for the glow effect
  // Ensure EffectComposer and passes are loaded
  if (THREE.EffectComposer && THREE.UnrealBloomPass) {
    const bloomPass = new THREE.UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      4,   // strength
      1,   // radius
      0    // threshold
    );
    Graph.postProcessingComposer().addPass(bloomPass);

    // Handle window resizing
    window.addEventListener('resize', () => {
        Graph.renderer().setSize(window.innerWidth, window.innerHeight);
        bloomPass.setSize(new THREE.Vector2(window.innerWidth, window.innerHeight));
    });
  } else {
    console.error("EffectComposer or UnrealBloomPass not loaded. Make sure they are included.");
  }


  // Zoom to fit the graph
  Graph.zoomToFit(400);

});