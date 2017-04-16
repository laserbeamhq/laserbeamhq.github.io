var renderer = new THREE.WebGLRenderer
({canvas: document.getElementById('myCanvas'),antialias: true});
      renderer.setClearColor(0x00ff00);
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

    var light1 = new THREE.PointLight(0xffffff, 0.5);
    scene.add(light1);

    var geometry = new THREE.CubeGeometry(1, 1, 1);
    var material = new THREE.MeshLambertMaterial({color: 0xF3FFE2});
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, -10);

    scene.add(mesh);

    requestAnimationFrame(render);

    function render () {
      mesh.rotation.x += 0.01;
      mesh.rotation.y += 0.02;
      renderer.render(scene, camera);
      requestAnimationFrame(render);
    }

    renderer.render(scene, camera);
