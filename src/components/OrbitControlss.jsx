import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const OrbitControlss = () => {
  let tut1 = useRef(null);
  useEffect(() => {
    //setting up the scene
    const scene = new THREE.Scene();

    //setting the camera
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      100
    );
    camera.position.z = 5;
    scene.add(camera);

    //renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    tut1.current.appendChild(renderer.domElement);

    //Orbit Controls for moving camera around a object
    const controls = new OrbitControls(camera, renderer.domElement);
    //enable damping gives a smooth effect
    controls.enableDamping = true;

    // //creating a cube
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      tut1.current.removeChild(renderer.domElement);
    };
  }, []);
  return <div ref={tut1}></div>;
};

export default OrbitControlss;
