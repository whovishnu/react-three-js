import React, { Component } from 'react';
import * as THREE from 'three.js';
const path = require('path');

class Scene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showContent: false
    };
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.animate = this.animate.bind(this);
  }

  componentDidMount() {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;

    // step 1 create Scene
    const scene = new THREE.Scene();

    // step 2 create camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 40;

    // step 2 create randerer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor('#aaa');
    renderer.setSize(width, height);

    // create cube box
    const geometry = new THREE.BoxGeometry(22, 22, 22);

    const texture1 = new THREE.TextureLoader().load('/image/1.png');
    const texture2 = new THREE.TextureLoader().load('/image/2.png');
    const texture3 = new THREE.TextureLoader().load('/image/3.png');
    const texture4 = new THREE.TextureLoader().load('/image/4.png');
    const texture5 = new THREE.TextureLoader().load('/image/5.png');
    const texture6 = new THREE.TextureLoader().load('/image/6.png');

    const material1 = new THREE.MeshBasicMaterial({ map: texture1 });
    const material2 = new THREE.MeshBasicMaterial({ map: texture2 });
    const material3 = new THREE.MeshBasicMaterial({ map: texture3 });
    const material4 = new THREE.MeshBasicMaterial({ map: texture4 });
    const material5 = new THREE.MeshBasicMaterial({ map: texture5 });
    const material6 = new THREE.MeshBasicMaterial({ map: texture6 });

    const cube = new THREE.Mesh(
      geometry,
      new THREE.MeshFaceMaterial([
        material1,
        material2,
        material3,
        material4,
        material5,
        material6
      ])
    );

    scene.add(cube);

    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    // this.material = material;
    this.cube = cube;

    this.mount.appendChild(this.renderer.domElement);
    this.start();
  }

  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }

  start() {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  }

  stop() {
    cancelAnimationFrame(this.frameId);
  }

  animate() {
    this.renderer.render(this.scene, this.camera);
    this.frameId = window.requestAnimationFrame(this.animate);
  }

  handleMouseDown(event) {
    event.preventDefault();

    //use raycaster
    const raycaster = new THREE.Raycaster();
  }

  render() {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          margin: 'auto',
          width: 200
        }}
      >
        <div
          onMouseDown={this.handleMouseDown}
          onMouseMove={({ movementX, movementY }) => {
            if (movementX > 0) {
              this.cube.rotation.y -= 0.11;
            }
            if (movementY > 0) {
              this.cube.rotation.x -= 0.11;
            }
            if (movementX < 0) {
              this.cube.rotation.y += 0.11;
            }
            if (movementY < 0) {
              this.cube.rotation.x += 0.11;
            }
          }}
          onClick={() =>
            this.setState({ showContent: !this.state.showContent })
          }
          className={'bigSize'}
          ref={(mount) => {
            this.mount = mount;
          }}
        />
        {this.state.showContent && (
          <div className='content'>
            <h1> THREE.js </h1>
            <p>Learing THREE.js in react. create a Cube.</p>
          </div>
        )}
      </div>
    );
  }
}

export default Scene;
