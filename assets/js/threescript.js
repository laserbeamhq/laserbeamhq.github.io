var renderer = new THREE.WebGLRenderer
({canvas: document.getElementById('myCanvas'),antialias: true});
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

    var geometry = new THREE.IcosahedronBufferGeometry         (10, 0);
    var geo1 = new THREE.BoxBufferGeometry                (10, 10, 10);
    var geo2 = new THREE.OctahedronBufferGeometry                  (5);
    var geo3 = new THREE.ConeBufferGeometry                    (5, 10);
    var geo4 = new THREE.CylinderBufferGeometry              (3, 3, 7);
    var geo5 = new THREE.TetrahedronBufferGeometry                 (7);

    var material = new THREE.MeshPhongMaterial({
      color: 0x1F8C96,
      wireframe: true
    });

    var mesh = new THREE.Mesh(geometry, material);
    var geo1Mesh = new THREE.Mesh(geo1, material);
    var geo2Mesh = new THREE.Mesh(geo2, material);
    var geo3Mesh = new THREE.Mesh(geo3, material);
    var geo4Mesh = new THREE.Mesh(geo4, material);
    var geo5Mesh = new THREE.Mesh(geo5, material)

    mesh.position.set          (0, 0, -100);
    geo1Mesh.position.set    (20, 15, -100);
    geo2Mesh.position.set    (-15, 10, -50);
    geo3Mesh.position.set   (10, -10, -100);
    geo4Mesh.position.set    (-10, -4, -50);
    geo5Mesh.position.set     (20, -5, -50);

    scene.add      (mesh);
    scene.add  (geo1Mesh);
    scene.add  (geo2Mesh);
    scene.add  (geo3Mesh);
    scene.add  (geo4Mesh);
    scene.add  (geo5Mesh);

    function spin(thing, xSpeed,ySpeed,zSpeed) {
      thing.rotation.x += xSpeed;
      thing.rotation.y += ySpeed;
      thing.rotation.z += zSpeed;
    }

    requestAnimationFrame(render);

    function render () {
      spin(mesh,         0.005,0.005,0.005);
      spin(geo1Mesh,   -0.0030,0.005,0.006);
      spin(geo2Mesh,    -0.003,0.005,0.006);
      spin(geo3Mesh,    0.001,0.005,-0.004);
      spin(geo4Mesh,  0.003, -0.005, 0.001);
      spin(geo5Mesh,    0.003,0.003,-0.003);

      // console.log('MESH ROTATION XYZ:', mesh.rotation.x, mesh.rotation.y, mesh.rotation.z)
      // console.log('POSITION Y:', mesh.position.y);
      renderer.render(scene, camera);
      requestAnimationFrame(render);
    }

    renderer.render(scene, camera);
