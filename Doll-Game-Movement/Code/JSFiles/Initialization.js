function init() {
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 2000 );
	cameraCenama = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 2000 );
	scene = new THREE.Scene();
	scene.fog = new THREE.Fog( 0xffffff, 0, 600 );
	scene.add( camera );
	
	
	
	//setupScene();
	
	//
	renderer = new THREE.WebGLRenderer();
	renderer.setClearColor( 0xa3c5dc );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
	//
	window.addEventListener( 'resize', onWindowResize, false );
	
	
	document.addEventListener( 'keydown', onKeyDown, false );
	document.addEventListener( 'keyup', onKeyUp, false );
	//practiceLvl.addEventListener( 'click', setupScene(Levels.Practice), false);
}