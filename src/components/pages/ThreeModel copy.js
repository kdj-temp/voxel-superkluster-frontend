import React, { useEffect, TextureLoader, useState, Suspense } from 'react';
import { useGLTF } from "@react-three/drei";
import { useLoader } from 'react-three-fiber';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from 'three';

const Model = ({ modelType, modelUrl, mtlUrl }) => {

  const [scale, setScale] = useState(1);

  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);
  const [positionZ, setPositionZ] = useState(0);
  const [max_Y ,setmaxYY] = useState(2);
  const [min_Y ,setminYY] = useState(2);
  var loader = null;

  const material = useLoader(MTLLoader, mtlUrl);

  switch (modelType) {
    case 'obj':
      loader = OBJLoader;
      break;
    case 'fbx':
      loader = FBXLoader;
      break;
    default:
      loader = GLTFLoader;
      break;
  };

  // const object = useLoader(loader, modelUrl, (loader) => {
  //   material.preload()
  //   if (modelType === 'obj') {
  //     loader.setMaterials(material);
  //   }
  // });

  const object = useLoader(loader, modelUrl, (loader) => {
    material.preload()
    if (modelType === 'obj') {
      loader.setMaterials(material);
    }
  });


  var minX, maxX, minXScale, maxXScale, minY, maxY, minYScale, maxYScale, minZ, maxZ, minZScale, maxZScale;

  useEffect(()=>{
    // console.log(min_Y , max_Y) ;
  },[min_Y , max_Y]) ;

  const setPivot = (item, index, length, scale) => {

    if (index === length) {
      if (minX >= 0) setPositionX(-1 * (minX + (maxX - minX) * maxXScale / (maxXScale + minXScale)) * scale);
      else setPositionX(-1 * ((maxX + minX) * maxXScale / (minXScale + maxXScale)) * scale);
      if (minY >= 0) setPositionY(-1 * (minY + (maxY - minY) * maxYScale / (maxYScale + minYScale)) * scale);
      else setPositionY(-1 * ((maxY + minY) * maxYScale / (minYScale + maxYScale)) * scale);
      // setPositionY(-100);
      if (minZ >= 0) setPositionZ(-1 * (minZ + (maxZ - minZ) * maxZScale / (maxZScale + minZScale)) * scale);
      else setPositionZ(-1 * ((maxZ + minZ) * maxZScale / (minZScale + maxZScale)) * scale);
      setminYY(minY);
      setmaxYY(maxY);
    }

    if (index === 0) {
      minX = item.center.x;
      maxX = item.center.x;
      minY = item.center.y;
      maxY = item.center.y;
      minZ = item.center.z;
      maxZ = item.center.z;
      minXScale = item.radius;
      maxXScale = item.radius;
      minYScale = item.radius;
      maxYScale = item.radius;
      minZScale = item.radius;
      minZScale = item.radius;
    }
    else {
      if (item.center.x < minX) { minX = item.center.x; minXScale = item.radius }
      if (item.center.x > maxX) { maxX = item.center.x; maxXScale = item.radius }
      if (item.center.y < minY) { minY = item.center.y; minYScale = item.radius }
      if (item.center.y > maxY) { maxY = item.center.y; maxYScale = item.radius }
      if (item.center.z < minZ) { minZ = item.center.z; minZScale = item.radius }
      if (item.center.z > maxZ) { maxZ = item.center.z; maxZScale = item.radius }
    }
  };

  const getModelScale = (item) => {

    var modelScale = 0;

    for (let index = 0; index < item.length; index++) {
      if (item[index].type === 'Mesh') {
        item[index].geometry.computeBoundingSphere();
        if (item[index].geometry.boundingSphere.radius > modelScale) modelScale = item[index].geometry.boundingSphere.radius;
        setPivot(item[index].geometry.boundingSphere, index, item.length, 80 / modelScale);
      }
      else if (item[index].type === 'Group') getModelScale(item[index]);
    }

    // console.log(modelScale);
    setScale(80 / modelScale);
  };

  useEffect(() => {
    if (object !== null) {
      // console.log(object);
      var tempObject;
      if (modelType === 'glb' || modelType === 'gltf') tempObject = object.scene.children[0].children;
      else tempObject = object.children;

      // console.log('object--->', tempObject);

      // getModelScale(tempObject) ;

      //-------------

      var  desiredScale = 150;
      var scaleV3 = new THREE.Vector3().setScalar(desiredScale);    

      var box = new THREE.Box3();
      box.setFromObject(object);

      var size = new THREE.Vector3();
      box.getSize(size);

      var center = new THREE.Vector3();
      box.getCenter(center);
    
      var scaleTemp = new THREE.Vector3().copy(scaleV3).divide(size);
      var scale = Math.min(scaleTemp.x, Math.min(scaleTemp.y, scaleTemp.z));
      object.scale.setScalar(scale);

      object.position.sub(center.multiplyScalar(scale));
      // console.log(center.multiplyScalar(scale),'center size' ,scale);
    }
  }, []);

  return (
    <Suspense>
      <primitive
        object={modelType === 'glb' || modelType === 'gltf' ? object.scene : object}
        // position={[0, 0, 0]}
        // scale={[scale, scale, scale]}
      />
    </Suspense>
  );
}

export default Model;