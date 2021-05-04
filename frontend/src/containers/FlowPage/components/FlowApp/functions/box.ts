import * as THREE from 'three';

export const box = () => {
  const container = new THREE.Object3D();
  container.matrixAutoUpdate = false;

  const generateBox = () => {
    const geometry = new THREE.BoxGeometry(2, 2, 2);

    const material = new THREE.ShaderMaterial({
      fragmentShader: `
        void main() {
          gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
        }
      `,
      vertexShader: `
        void main() {
          vec4 modelPosition = modelMatrix * vec4(position, 1.0);
          vec4 viewPosition = viewMatrix * modelPosition;
          vec4 projectedPosition = projectionMatrix * viewPosition;
          gl_Position = projectedPosition;
        }
      `,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, 0);

    container.add(mesh);
  };

  generateBox();

  return {
    container,
  };
};
