import React, {
  Component
} from 'react';
import * as THREE from 'three';

import Footer from './components/Footer';
import Main from './components/Main';
import {
  ApiData
, ProjectsApi
, GQLRequest
} from './interfaces/Api';
import versions from './versions'

import './App.css';
import smoke from './img/smoke.png';

const currentVersion = versions[0]['version'];
const API_URL = 'https://i1mxgd4l94.execute-api.us-west-1.amazonaws.com/dev/';

interface State {
  component: string;
  api: ApiData;
}

interface App {
  mount?: any;
}

class App extends Component<{}, State> {
  state: State = {
    component: 'LandingPage'
    //  Initializing API data state
    //  Is there a better way to do this?
  , api: {
      'Projects': {
        'projects': []
      , 'status': 0
      }
    }
  };

  componentDidMount(): void {
    this.loadProjectsApi();

    let scene: THREE.Scene = new THREE.Scene();
    let camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(60,
      window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 1;
    camera.rotation.x = 1.16;
    camera.rotation.y = -0.12;
    camera.rotation.z = 0.27;

    let ambient: THREE.AmbientLight = new THREE.AmbientLight(0x555555);
    scene.add(ambient);

    let renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    let cloudParticles: THREE.Mesh[] = [];

    scene.fog = new THREE.FogExp2(0x012320, 0.001);
    renderer.setClearColor(scene.fog.color);

    this.mount.appendChild(renderer.domElement);

    let renderScene = function () {
      renderer.render(scene, camera);
      requestAnimationFrame(renderScene);
      cloudParticles.forEach(p => {
        p.rotation.z -= 0.002;
      });
    }

    let loader = new THREE.TextureLoader();

    loader.load(smoke, function (texture) {
      let cloudGeo = new THREE.PlaneBufferGeometry(500, 500);
      let cloudMaterial = new THREE.MeshLambertMaterial({
        map: texture,
        transparent: true
      });
      for(let p = 0; p < 50; p++) {
        let cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
        cloud.position.set(
          Math.random() * 800 - 400,
          500,
          Math.random() * 500 - 500
        );
        cloud.rotation.x = 1.16;
        cloud.rotation.y = -0.12;
        cloud.rotation.z = Math.random() * 2 * Math.PI;
        cloud.material.opacity = 0.55;
        cloudParticles.push(cloud);
        scene.add(cloud);
      }
    });

    let onWindowResize = function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    renderScene();
    window.addEventListener('resize', onWindowResize, false);
  }

  async loadProjectsApi(): Promise<void> {
    const projs = await this.fetchApi<ProjectsApi>(API_URL, {
      query: "{ projects { project_id title description about url source_code_url languages { name color } tools { name color } } }"
    });
    this.setState(prevState => ({
      api: {
        ...prevState.api
      , 'Projects': projs
      }
    }));
  };

  async fetchApi<T>(
    request: RequestInfo
  , body: GQLRequest
  ): Promise<T> {
    const res = await fetch(request, {
      method: 'POST'
    , headers: {
        'Content-Type': 'application/json'
      }
    , body: JSON.stringify(body)
    });
    const api = await res.json();
    api.data.status = res.status;
    return api.data;
  }

  changeComponent = (newComponent: string): void => {
    this.setState({
      component: newComponent
    });
  };

  public render (): JSX.Element {
    return (
      <div
        className='App'
      >
        <div
          ref={ref => (this.mount = ref)}
          className='background'
        ></div>
        <Main
          api={this.state.api}
          component={this.state.component}
          changeComponent={this.changeComponent}
        />
        <Footer
          changeComponent={this.changeComponent}
          currentVersion={currentVersion}
        />
      </div>
    );
  };
}

export default App;
