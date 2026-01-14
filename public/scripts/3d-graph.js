
// Sample data representing an inheritance structure
const gData = {
  nodes: [
    { id: 'Animal', color: '#ff6666' },
    { id: 'Mammal', color: '#66ff66' },
    { id: 'Reptile', color: '#6666ff' },
    { id: 'Canine', color: '#87ceeb' },
    { id: 'Feline', color: '#ffa500' },
    { id: 'Dog', color: '#87ceeb' },
    { id: 'Cat', color: '#ffa500' },
    { id: 'Lizard', color: '#6666ff' }
  ],
  links: [
    { source: 'Mammal', target: 'Animal' },
    { source: 'Reptile', target: 'Animal' },
    { source: 'Canine', target: 'Mammal' },
    { source: 'Feline', target: 'Mammal' },
    { source: 'Dog', target: 'Canine' },
    { source: 'Cat', target: 'Feline' },
    { source: 'Lizard', target: 'Reptile' }
  ]
};

// Wait for the DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  const graphContainer = document.getElementById('3d-graph');
  if (graphContainer) {
    const myGraph = ForceGraph3D()(graphContainer);

    // --- Bloom Effect ---
    const bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
    bloomPass.strength = 1.2;
    bloomPass.radius = 1;
    bloomPass.threshold = 0.1;
    myGraph.postProcessingComposer().addPass(bloomPass);
    
    myGraph.graphData(gData)
      .nodeLabel('id') // Keep hover label
      // --- Click-to-focus ---
      .onNodeClick(node => {
        const distance = 80;
        const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);

        myGraph.cameraPosition(
          { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
          node, // lookAt target
          2000  // transition duration
        );
      })
      // --- Text-nodes ---
      .nodeCanvasObject((node, ctx, globalScale) => {
        const label = node.id;
        const fontSize = 14 / globalScale;
        ctx.font = `${fontSize}px Sans-Serif`;
        const textWidth = ctx.measureText(label).width;
        const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.4); // padding

        ctx.fillStyle = 'rgba(30, 30, 30, 0.9)';
        ctx.fillRect(-bckgDimensions[0] / 2, -bckgDimensions[1] / 2, ...bckgDimensions);

        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = node.color;
        ctx.fillText(label, 0, 0);

        node.__bckgDimensions = bckgDimensions; // for pointer interaction
      })
      .nodePointerAreaPaint((node, color, ctx) => {
        ctx.fillStyle = color;
        const bckgDimensions = node.__bckgDimensions;
        bckgDimensions && ctx.fillRect(-bckgDimensions[0] / 2, -bckgDimensions[1] / 2, ...bckgDimensions);
      })
      .linkDirectionalParticles(2)
      .linkDirectionalParticleWidth(1.2);

    // Fit graph to canvas
    myGraph.zoomToFit(400);
  }
});
