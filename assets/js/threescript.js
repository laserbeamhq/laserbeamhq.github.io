var renderer = new THREE.WebGLRenderer({canvas: document.getElementById('myCanvas'),antialias: true});
      renderer.setClearColor(0x000000);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);

      $(window).resize(function() {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
          renderer.setPixelRatio(window.devicePixelRatio);
      });

    var camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 0.1, 3000);
    camera.position.set(0, 0, 0);

    var scene = new THREE.Scene();

    var light = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(light);

    // var light1 = new THREE.PointLight(0xffffff, 0.3);
    // scene.add(light1);

    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(100,100,100);
    spotLight.castShadow = true; //If set to true light will cast dynamic shadows. Warning: This is expensive and requires tweaking to get shadows looking right.
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    spotLight.shadow.camera.near = 500;
    spotLight.shadow.camera.far = 4000;
    spotLight.shadow.camera.fov = 300;
    scene.add(spotLight);

    var geometry = new THREE.IcosahedronBufferGeometry (12, 0);
    var ring = new THREE.TorusBufferGeometry     (25, 5, 3, 5);
    var inner = new THREE.IcosahedronBufferGeometry     (7, 1);
    var innerEdges = new THREE.EdgesGeometry           (inner);

    var material = new THREE.MeshPhongMaterial({
      color: 0x1F8C96,
      wireframe: true
    });

    var mesh = new THREE.Mesh              (geometry, material);
    var ringMesh = new THREE.Mesh              (ring, material);
    var innerMesh = new THREE.Mesh  (inner, material);

    if(window.innerWidth <= 800) {
      alert('MOBILE!');
      mesh.position.set          (0, 0, -100);

    } else {
      mesh.position.set            (0, 0, -100);
      ringMesh.position.set        (0, 0, -100);
      ringMesh.rotation.set         (200, 0, 0);
      innerMesh.position.set        (0, 0, -100);
    }



    scene.add (mesh);
    scene.add (ringMesh);
    scene.add (innerMesh);


    function spin(thing, xSpeed,ySpeed,zSpeed) {
      thing.rotation.x += xSpeed;
      thing.rotation.y += ySpeed;
      thing.rotation.z += zSpeed;
    }

    requestAnimationFrame(render);

    var pi = Math.PI;

    function render () {
      spin(mesh,                  0.005,0.005,0.005);
      spin(ringMesh,                    0, 0, -0.01);
      spin(innerMesh,        0.001, -0.001, 0.001);

      renderer.render(scene, camera);
      requestAnimationFrame(render);
    }

    renderer.render(scene, camera);
