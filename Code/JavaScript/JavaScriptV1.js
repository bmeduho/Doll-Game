/* START GLOBAL VARIABLES */

var camera, scene, renderer;
var geometry, material, mesh;
var objects = [];
var collision = false;
var level = Prototype;
var controlsEnabled = true;
var moveForward = false, moveBackward = false, moveLeft = false, moveRight = false;
var prevTime = performance.now();
var velocity = new THREE.Vector3();

/* END GLOBAL VARIABLES */





/* START KEYPRESS FUNCTIONS */

var onKeyDown = function ( event ) {
	switch ( event.keyCode ) {
		case 38: // up
		case 87: // w
			moveForward = true;
			break;
		case 37: // left
		case 65: // a
			moveLeft = true;
			break;
		case 40: // down
		case 83: // s
			moveBackward = true;
			break;
		case 39: // right
		case 68: // d
			moveRight = true;
			break;
		case 32: // space
			if ( canJump === true ) velocity.y += 350;
			canJump = false;
			break;
	}
};

var onKeyUp = function ( event ) {
	switch( event.keyCode ) {
		case 38: // up
		case 87: // w
			moveForward = false;
			break;
		case 37: // left
		case 65: // a
			moveLeft = false;
			break;
		case 40: // down
		case 83: // s
			moveBackward = false;
			break;
		case 39: // right
		case 68: // d
			moveRight = false;
			break;
	}
};

/* END KEYPRESS FUNCTIONS */





/*  */

function init() {
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 2000 );
	scene = new THREE.Scene();
	//scene.fog = new THREE.Fog( 0xffffff, 0, 750 );
	var light = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 0.75 );
	light.position.set( 0.5, 1, 0.75 );
	scene.add( light );
	scene.add( camera );
	
	document.addEventListener( 'keydown', onKeyDown, false );
	document.addEventListener( 'keyup', onKeyUp, false );
	
	setupScene();
	
	//
	renderer = new THREE.WebGLRenderer();
	renderer.setClearColor( 0xffffff );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
	//
	window.addEventListener( 'resize', onWindowResize, false );
}
function setupScene() {
	var unitsL = Levels.Practice.Map.length;
	var unitsW = Levels.Practice.Map[0].length;
	var unitsH = Levels.Practice.Map[0][0].length;
	
	// Geometry: floor
	var floor = new THREE.Mesh(
			new THREE.CubeGeometry(unitsL * 20, 10, unitsW * 20),
			new t.MeshLambertMaterial({color: 0xEDCBA0})
	);
	scene.add(floor);
	
	// Geometry: walls
	var cube = new THREE.CubeGeometry(20, 20, 20);
	var materials = [
	                 new THREE.MeshLambertMaterial({color: 0x000000}),
	                 new THREE.MeshLambertMaterial({color: 0xFF0000}),
	                 new THREE.MeshLambertMaterial({color: 0x00FF00}),
	                 new THREE.MeshLambertMaterial({color: 0x0000FF}),
	                 new THREE.MeshLambertMaterial({color: 0xFFFFFF}),
	                 new THREE.MeshLambertMaterial({color: 0xF00000}),
	                 new THREE.MeshLambertMaterial({color: 0x00F000}),
	                 new THREE.MeshLambertMaterial({color: 0x0000F0}),
	                 new THREE.MeshLambertMaterial({color: 0xF0F0F0})
	                 ];
	for (var i = 0; i < mapW; i++) {
		for (var j = 0; j < map[i].length; j++) {
			for (var k = 0; k < map[i][j].length; k++) {
				switch (map[i][j][k]) {
					case 1:
						var wall = new THREE.Mesh(cube, materials[map[i][j][k]-1]);
						wall.position.x = (i - unitsL/2) * UNITSIZE;
						wall.position.y = (k - unitsH/2) * UNITSIZE;
						wall.position.z = (j - unitsW/2) * UNITSIZE;
						scene.add(wall);
						break;
					case 2:
						var wall = new THREE.Mesh(cube, materials[map[i][j][k]-1]);
						wall.position.x = (i - unitsL/2) * UNITSIZE;
						wall.position.y = (k - unitsH/2) * UNITSIZE;
						wall.position.z = (j - unitsW/2) * UNITSIZE;
						scene.add(wall);
						break;
					case 3:
						var wall = new THREE.Mesh(cube, materials[map[i][j][k]-1]);
						wall.position.x = (i - unitsL/2) * UNITSIZE;
						wall.position.y = (k - unitsH/2) * UNITSIZE;
						wall.position.z = (j - unitsW/2) * UNITSIZE;
						scene.add(wall);
						break;
					case 6:
						var wall = new THREE.Mesh(cube, materials[map[i][j][k]-1]);
						wall.position.x = (i - unitsL/2) * UNITSIZE;
						wall.position.y = (k - unitsH/2) * UNITSIZE;
						wall.position.z = (j - unitsW/2) * UNITSIZE;
						scene.add(wall);
						break;
					case 7:
						var wall = new THREE.Mesh(cube, materials[map[i][j][k]-1]);
						wall.position.x = (i - unitsL/2) * UNITSIZE;
						wall.position.y = (k - unitsH/2) * UNITSIZE;
						wall.position.z = (j - unitsW/2) * UNITSIZE;
						scene.add(wall);
						break;
					case 0:
						
						break;
					default:
						
						break;
				}
			}
		}
	}
	
	
/*	// floor
	geometry = new THREE.PlaneGeometry( 2000, 2000, 100, 100 );
	/*for ( var i = 0, l = geometry.vertices.length; i < l; i ++ ) {
		var vertex = geometry.vertices[ i ];
		vertex.x += Math.random() * 20 - 10;
		vertex.y += Math.random() * 2;
		vertex.z += Math.random() * 20 - 10;
	s}*
	for ( var i = 0, l = geometry.faces.length; i < l; i ++ ) {
		var face = geometry.faces[ i ];
		face.vertexColors[ 0 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
		face.vertexColors[ 1 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
		face.vertexColors[ 2 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
	}
	material = new THREE.MeshBasicMaterial( { vertexColors: THREE.VertexColors } );
	mesh = new THREE.Mesh( geometry, material );
	mesh.rotation.x = -Math.PI / 2;
	scene.add( mesh );
	// objects.buttons
	for (var i = 0; i < level.buttons.length; i++) {
		geometry = new THREE.PlaneGeometry(5,5);
		material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide});
		mesh = new THREE.Mesh(geometry,material);
		mesh.position.x = level.buttons[i].PosX;
		mesh.position.y = level.buttons[i].PosY;
		mesh.position.z = level.buttons[i].PosZ;
		scene.add(mesh);
		mesh.objectType = "Button";
		objects.push(mesh);
	}
	for (var i = 0; i < level.obstacles.length; i++) {
		geometry = new THREE.BoxGeometry(level.obstacles[i].width,level.obstacles[i].height,level.obstacles[i].length);
		material = new THREE.MeshBasicMaterial( {color: 0xff00ff, side: THREE.FrontSide});
		mesh = new THREE.Mesh(geometry,material);
		mesh.position.x = level.obstacles[i].PosX;
		mesh.position.y = level.obstacles[i].PosY;
		mesh.position.z = level.obstacles[i].PosZ;
		scene.add(mesh);
		mesh.objectType = "Cube";
		objects.push(mesh);
	}
	for (var i = 0; i < level.enemies.length; i++) {
		if (level.enemies[i].type === 'Thumb') {
			geometry = new THREE.SphereGeometry(5,16,16);
			material = new THREE.MeshBasicMaterial( {color: 0x00ffff, side: THREE.FrontSide});
			mesh = new THREE.Mesh(geometry,material);
			mesh.position.x = level.enemies[i].PosX;
			mesh.position.y = level.enemies[i].PosY;
			mesh.position.z = level.enemies[i].PosZ;
			scene.add(mesh);
			mesh.objectType = "Thumb";
			objects.push(mesh);
		}
	}


                 

	/*geometry = new THREE.BoxGeometry( 20, 20, 20 );
	for ( var i = 0, l = geometry.faces.length; i < l; i ++ ) {
		var face = geometry.faces[ i ];
		face.vertexColors[ 0 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
		face.vertexColors[ 1 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
		face.vertexColors[ 2 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
	}
	for ( var i = 0; i < 500; i ++ ) {
		material = new THREE.MeshPhongMaterial( { specular: 0xffffff, shading: THREE.FlatShading, vertexColors: THREE.VertexColors } );
		var mesh = new THREE.Mesh( geometry, material );
		mesh.position.x = Math.floor( Math.random() * 20 - 10 ) * 20;
		mesh.position.y = Math.floor( Math.random() * 20 ) * 20 + 10;
		mesh.position.z = Math.floor( Math.random() * 20 - 10 ) * 20;
		scene.add( mesh );
		material.color.setHSL( Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
		objects.push( mesh );
	}*
	// SkySphere
	geometry = new THREE.SphereGeometry(400,16,16);
	for ( var i = 0, l = geometry.faces.length; i < l; i ++ ) {
		var face = geometry.faces[ i ];
		face.vertexColors[ 0 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
		face.vertexColors[ 1 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
		face.vertexColors[ 2 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
	}
	material = new THREE.MeshBasicMaterial( { vertexColors: THREE.VertexColors } );
	material.side = THREE.BackSide
	mesh = new THREE.Mesh( geometry, material );
	mesh.rotation.y = -Math.PI / 2;
	scene.add( mesh );
	// Player
	geometry = new THREE.SphereGeometry(10,16,16);
	for ( var i = 0, l = geometry.faces.length; i < l; i ++ ) {
		var face = geometry.faces[ i ];
		face.vertexColors[ 0 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
		face.vertexColors[ 1 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
		face.vertexColors[ 2 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
	}
	material = new THREE.MeshBasicMaterial( { vertexColors: THREE.VertexColors } );
	player = new THREE.Mesh( geometry, material );
	scene.add( player );
	// Hit Boxes
	geometry = new THREE.BoxGeometry(20,20,5);
	material = new THREE.MeshBasicMaterial( {color: 0xff0000, side: THREE.FrontSide});
	hitBox1 = new THREE.Mesh(geometry,material);
	hitBox1.position = player.position;
	scene.add(hitBox1);
	hitBox2 = new THREE.Mesh(geometry,material);
	hitBox2.position = player.position;
	scene.add(hitBox2);
*/
}
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}
/*function intersect(sphere, box) {
	// get box closest point to sphere center by clamping
	var x = Math.max(box.minX, Math.min(sphere.x, box.maxX));
	var y = Math.max(box.minY, Math.min(sphere.y, box.maxY));
	var z = Math.max(box.minZ, Math.min(sphere.z, box.maxZ));

	// this is the same as isPointInsideSphere
	var distance = Math.sqrt((x - sphere.x) * (x - sphere.x) +
						   (y - sphere.y) * (y - sphere.y) +
						   (z - sphere.z) * (z - sphere.z));

	console.log(distance < sphere.radius);
	return distance < sphere.radius;
}*/





/*function checkX (pPosX, iPosX, length) {
	if (pPosX >= iPosX - (length + 10) && pPosX <= iPosX + (length + 10)) {
		return true;
	} else {
		return false;
	}
}
function checkY (pPosY, iPosY, height) {
	if (pPosY <= iPosY + (height + 5)) {
		return true;
	} else {
		return false;
	}
}
function checkZ (pPosZ, iPosZ, width) {
	if (pPosZ >= iPosZ - (width + 10) && pPosZ <= iPosZ + (width + 10)) {
		return true;
	} else {
		return false;
	}
}*/
function animate() {
	requestAnimationFrame( animate );
	
/*	for (var i = 0; i < objects.length; i++) {
		if(objects[i].objectType = "Cube") {
			collision = intersect(player,objects[i]);
		} 
	}*/
var Pmodel = (player.position.x || player.position.x + 10|| player.position.x - 10);	
var PmodelXmin = (player.position.x - 10);	
var PmodelXmax = (player.position.x + 10);	
var PmodelZmin = (player.position.z - 10);	
var PmodelZmax = (player.position.z + 10);	
var PmodelYmin = (player.position.y - 10);	
var PmodelYmax = (player.position.y + 10);	

	if( PmodelXmax > (objects[2].position.x - 10)){PXMaxCollision = 1;} else {PXMaxCollision = 0}
	if( PmodelXmin < (objects[2].position.x + 10)){PXMinCollision = 1;} else {PXMinCollision = 0}
	

/*	
	if( PmodelXmax > (objects[2].position.x - 10) && PmodelXmin < (objects[2].position.x + 10)){PXCollision = 1;} else {PXCollision = 0}
	if( PmodelZmax > (objects[2].position.z - 10) && PmodelZmin < (objects[2].position.z + 10)){PZCollision = 1;} else {PZCollision = 0}
	if( PmodelYmax > (objects[2].position.y - 10) && PmodelYmin < (objects[2].position.y + 10)){PYCollision = 1;} else {PYCollision = 0}
	if( PmodelYmin > (objects[2].position.y + 5)){PYCollision2 = 1;} else {PYCollision2 = 0}
	

	if(PZCollision === 1 && PXCollision === 1 && PYCollision === 1){PCollision = 1;} else {PCollision = 0;}
	if(PZCollision === 1 && PXCollision === 1){PGroundCollision = 1;} else {PGroundCollision = 0;}

	if(PYCollision2 === 1 || PGroundCollision === 0){PYCollision3 = 1;} else {PYCollision3 = 0}
		
	
	if(PCollision === 1){velocity.y = Math.max( 0, velocity.y );
		canJump = true;}
*/	
	var time = performance.now();
	var delta = ( time - prevTime ) / 1000;
	velocity.x -= velocity.x * 10.0 * delta;
	velocity.z -= velocity.z * 10.0 * delta;
	if(PCollision === 0){velocity.y -= 9.8 * 100.0 * delta;}; // 100.0 = mass
	if (moveForward) velocity.z -= 400.0 * delta;
	if ( moveBackward ) velocity.z += 900.0 * delta;
	if ( moveLeft ) player.rotation.y += 2.0 * delta;
	if ( moveRight ) player.rotation.y -= 2.0 * delta;
	/*if ( isOnObject === true ) {
		velocity.y = Math.max( 0, velocity.y );
		canJump = true;
	}*/
	for (var i = 0; i < objects.length; i++) {
		if (objects[i].objectType === "Button") {
			/*if (((player.position.x + 10 || player.position.x || player.position.x - 10) <= buttonMesh[i].position.x + 2.5 && (player.position.x + 10 || player.position.x - 10) >= buttonMesh[i].position.x- 2.5) && ((player.position.y + 10 ||player.position.y ||  player.position.y - 10) <= buttonMesh[i].position.y + 2.5 && (player.position.y + 10 || player.position.y - 10) >= buttonMesh[i].position.y- 2.5) && ((player.position.z + 10 ||player.position.z ||  player.position.z - 10) <= buttonMesh[i].position.z + 2.5 && (player.position.z + 10 || player.position.z - 10) >= buttonMesh[i].position.z - 2.5) && buttonMesh[i].visible === true) {
				console.log("Working");
				buttonMesh[i].visible = false;
			}*/
			objects[i].rotation.y += 5.0 * delta;
		}
	}
	
	
	
	
	
		
	player.translateX( velocity.x * delta );
	player.translateY( velocity.y * delta );
	player.translateZ( velocity.z * delta );
	if ( player.position.y < 10 ) {
		velocity.y = 0;
		player.position.y = 10;
		canJump = true;
	}

	var relativeCameraOffset = new THREE.Vector3(0,0,40);
	var cameraOffset = relativeCameraOffset.applyMatrix4( player.matrixWorld );
	camera.position.x = cameraOffset.x;
	camera.position.y = player.position.y + 20;
	camera.position.z = cameraOffset.z;
	camera.lookAt( player.position );
	
	
	var relativeHitBox1Offset = new THREE.Vector3(0,0,10);
	var HitBox1Offset = relativeHitBox1Offset.applyMatrix4( player.matrixWorld );
	hitBox1.position.x = HitBox1Offset.x;
	hitBox1.position.y = player.position.y;
	hitBox1.position.z = HitBox1Offset.z;
	hitBox1.lookAt( player.position );
	
	var relativeHitBox2Offset = new THREE.Vector3(0,0,-10);
	var HitBox2Offset = relativeHitBox2Offset.applyMatrix4( player.matrixWorld );
	hitBox2.position.x = HitBox2Offset.x;
	hitBox2.position.y = player.position.y;
	hitBox2.position.z = HitBox2Offset.z;
	hitBox2.lookAt( player.position );

	prevTime = time;

	renderer.render( scene, camera );

}
	

init();
animate();
