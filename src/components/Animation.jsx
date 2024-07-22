import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const Animation = () => {
    let tut1 = useRef(null);
  useEffect(() => {
    //setting up the scene
    const scene = new THREE.Scene();

    //setting the camera
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 5;
    scene.add(camera);

    //renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    tut1.current.appendChild(renderer.domElement);

    //creating a cube
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
   
    //normal animate function but some pc have higher frames per second and some have slow so box rotataion will not be constant so to make it constant there is a clock function
   /* const animate = () => {
      cube.rotation.x += 0.01;
	    cube.rotation.y += 0.01;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };*/

    
    
    //using Clock now animation speed will be constant for all higher and lower end pc's
    let clock = new THREE.Clock()    
    const animate = () => {

        let elapsedTime = clock.getElapsedTime()
        console.log(elapsedTime)
       
        //using sin and cos we can position cube in a range 
        cube.position.x = Math.sin(elapsedTime);
        cube.position.y = Math.cos(elapsedTime);

               
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      };

    animate();

    return () => {
      tut1.current.removeChild(renderer.domElement);
    };
  }, []);
  return <div ref={tut1}></div>;
}

export default Animation