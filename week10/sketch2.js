
   var text = "my text",

            height = 20,
            size = 70,
            hover = 30,

            curveSegments = 4,

            bevelThickness = 2,
            bevelSize = 1.5,
            bevelSegments = 3,
            bevelEnabled = true,

            font = "optimer", // helvetiker, optimer, gentilis, droid sans, droid serif
            weight = "bold", // normal bold
            style = "normal"; // normal italic
   var scene = new THREE.Scene();
   var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
   var renderer = new THREE.WebGLRenderer(); 
   renderer.setSize(window.innerWidth, window.innerHeight);
   document.body.appendChild(renderer.domElement);
   var textGeo = new THREE.TextGeometry( text, {

                size: size,
                height: height,
                curveSegments: curveSegments,

                font: font,
                weight: weight,
                style: style,

                bevelThickness: bevelThickness,
                bevelSize: bevelSize,
                bevelEnabled: bevelEnabled,


            });


//  var geometry = new THREE.CubeGeometry(10,10,1);
  var material = new THREE.MeshBasicMaterial({color: 0x11ff00});
  var textGeo = new THREE.Mesh(textGeo, material); 
  scene.add(textGeo);
  camera.position.z = 10;
  function render() { 
      requestAnimationFrame(render);
      textGeo.rotation.x += 0.01;
      textGeo.rotation.y += 0.01;
      renderer.render(scene, camera); 
 } 


 render();