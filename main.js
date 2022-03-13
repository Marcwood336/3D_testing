import { color } from 'dat.gui';
import * as THREE from 'three';
import { Float32BufferAttribute } from 'three';
// import * as dat from 'dat.gui';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';




const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,innerWidth/innerHeight,0.1,1000);
const renderer = new THREE.WebGLRenderer()

const raycaster = new THREE.Raycaster()

new OrbitControls(camera,renderer.domElement)

camera.position.z=5

renderer.setSize(innerWidth,innerHeight)
document.body.appendChild(renderer.domElement);


const planeGeo = new THREE.PlaneGeometry(5,5,5,5);
const planeMat = new THREE.MeshPhongMaterial({

  side:THREE.DoubleSide,
  flatShading:THREE.FlatShading,
  vertexColors:true
  
})

const plane = new THREE.Mesh(planeGeo,planeMat);
scene.add(plane);



const light = new THREE.DirectionalLight(0xffffff,1);
light.position.set(0,0,1)
scene.add(light)

const backLight = new THREE.DirectionalLight(0xffffff,0.5);
backLight.position.set(0,0,-1);
scene.add(backLight)





const arrayP = plane.geometry.attributes.position.array;

for(let i = 0; i<=arrayP.length;i+=3){

  const x = i;
  const y =i+1;
  const z = i+2;


  arrayP[z] = Math.random()

}

const mouse ={
  x:undefined,
  y:undefined
}


function animate(){

  requestAnimationFrame(animate)
  renderer.render(scene,camera)
  
  //check if the raycaster is intercepting with our plane:


raycaster.setFromCamera(mouse,camera)               //takes 2 arguments(mouse-coordinates, camera)
const intersect =raycaster.intersectObject(plane)        //will check if we are touching our plane object

if(intersect.length > 0){
  //here we write the code responsible to change the color
  // of the section of the plane when the mouse hoovers on it
  //but first we need to add a new attribute to our geometry: color



const {color} = intersect[0].object.geometry.attributes
  color.setX(intersect[0].face.a,0);
  color.setY(intersect[0].face.a,0);
  color.setZ(intersect[0].face.a,1);

  color.setX(intersect[0].face.b,0);
  color.setY(intersect[0].face.b,0);
  color.setZ(intersect[0].face.b,1);

  color.setX(intersect[0].face.c,0);
  color.setY(intersect[0].face.c,0);
  color.setZ(intersect[0].face.c,1);


   intersect[0].object.geometry.attributes.color.needsUpdate =true
}

}


//BELOW SHOWS HOW WE CREATE A NEW ATTRIBUTE AND ASSIGN A NEW COLOR TO onli ONE VERTIX
// (MATERIAL NEED TO HAVE vertexColor set tu true for it to work)

// plane.geometry.setAttribute('color',new THREE.BufferAttribute(
//   new Float32Array([0,0,1]),3)
//   )

//lets exten the array to all the other vertexes:

const colors =[];

for(let i =0; i< plane.geometry.attributes.position.count; i++){
colors.push(1,1,0.4)
}

console.log(colors);

plane.geometry.setAttribute('color',new THREE.BufferAttribute(
  new Float32Array(colors),3)
  )

animate()


addEventListener('mousemove',(event)=>{

mouse.x = (event.clientX /innerWidth) *2-1
mouse.y = -(event.clientY/innerHeight) *2+1

})