document.addEventListener('DOMContentLoaded', () => {

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
{ source: 'Mammal', target: 'Animal', color: '#ff00ff' },
{ source: 'Reptile', target: 'Animal', color: '#ff00ff' },
{ source: 'Canine', target: 'Mammal', color: '#00ffff' },
{ source: 'Feline', target: 'Mammal', color: '#00ffff' },
{ source: 'Dog', target: 'Canine', color: '#00ffff' },
{ source: 'Cat', target: 'Feline', color: '#ffaa00' },
{ source: 'Lizard', target: 'Reptile', color: '#ffaa00' }
]
};

const container = document.getElementById('3d-graph');

const Graph = ForceGraph3D()(container)
.graphData(gData)
.backgroundColor('#000000')
.nodeThreeObject(node => {
// Uzly s vysokou HDR intenzitou
const color = new THREE.Color(node.color).convertSRGBToLinear().multiplyScalar(5);
const material = new THREE.MeshStandardMaterial({
color,
emissive: color,
emissiveIntensity: 1,
roughness: 0.4,
metalness: 0
});
return new THREE.Mesh(new THREE.SphereGeometry(4, 32, 32), material);
})
.linkMaterial(link => {
const color = new THREE.Color(link.color || '#ffffff').convertSRGBToLinear().multiplyScalar(5);
return new THREE.MeshStandardMaterial({
color,
emissive: color,
emissiveIntensity: 1,
transparent: true,
opacity: 0.8
});
})
.nodeLabel(node => node.id)
.linkDirectionalParticles(2)
.linkDirectionalParticleWidth(1.2)
.onNodeClick(node => {
const distance = 120;
const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);
Graph.cameraPosition(
{ x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio },
node,
1500
);
});

// --- Render přes HDR + UnrealBloomPass ---
const renderer = Graph.renderer();
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.outputEncoding = THREE.sRGBEncoding;

const bloomPass = new THREE.UnrealBloomPass(
new THREE.Vector2(window.innerWidth, window.innerHeight),
3.0, // síla glow
1.0, // radius
0.0 // threshold nízko = vše projde bloomem
);
Graph.postProcessingComposer().addPass(bloomPass);

Graph.zoomToFit(400);

// Resizing
window.addEventListener('resize', () => {
bloomPass.setSize(window.innerWidth, window.innerHeight);
});

});
