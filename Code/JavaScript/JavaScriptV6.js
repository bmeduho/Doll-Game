/* START GLOBAL VARIABLES */

var camera, scene, renderer;
var geometry, material, mesh;
var health;
var moveForward = false, moveBackward = false, moveLeft = false, moveRight = false;
var prevTime = performance.now();
var velocity = new THREE.Vector3();
var block;
var blockPositions = [], blockPositionsL2 = [], blockPositionsL3 = [];
var exit = true;
var wall;
var canJump = true;
var interaction = false;
var textBox = document.getElementById('textBox');
var practiceLvl = document.getElementById('Practice');
var blocker = document.getElementById('blocker');
var currentLevel = false;

/* END GLOBAL VARIABLES */

/* START CANVAS CREATION/VARIABLES */

var canvas = document.createElement('canvas');
canvas.id = "ui";
document.body.appendChild(canvas);
var gEBI = document.getElementById('ui')
var gCtx = gEBI.getContext("2d");
gEBI.style.color = "blue";
gEBI.width = window.innerWidth;
gEBI.height = window.innerHeight;
gEBI.style.position = "absolute";
gEBI.style.zIndex = "100";

/* END CANVAS CREATION/VARIABLES */

/* START HEALTH IMAGE LOADING */
var healthReady = 0;
var healthImage = [new Image(), new Image(), new Image(), new Image()];
healthImage[0].onload = function () {
	healthReady += 1;
};
healthImage[1].onload = function () {
	healthReady += 1;
};
healthImage[2].onload = function () {
	healthReady += 1;
};
healthImage[3].onload = function () {
	healthReady += 1;
};
healthImage[0].src = "../../Visuals/2D/HealthThree.png";
healthImage[1].src = "../../Visuals/2D/HealthTwo.png";
healthImage[2].src = "../../Visuals/2D/HealthOne.png";
healthImage[3].src = "../../Visuals/2D/HealthEmpty.png";

/* END HEALTH IMAGE LOADING */


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
		case 17: // ctrl
			interaction = true;
			break;
		case 27: // Esc
			exit = false;
			return exit;
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
		case 13: // enter
			health -= 1;
			break;
		case 16: // shift
			health += 1;
			break;
	}
};

/* END KEYPRESS FUNCTIONS */





/* START INITIALIZATION FUNCTION */

function init() {
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 2000 );
	scene = new THREE.Scene();
	scene.fog = new THREE.Fog( 0xffffff, 0, 600 );
	var light = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 0.75 );
	light.position.set( 200, 100, 200 );
	scene.add( light );
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

/* END INITIALIZATION FUNCTION */



function setupScene(level) {
	console.log("setupScene(" + level + "); has run");
	blocker.style.display = "none";
	currentLevel = level;
	blockPositionsL3.splice(0,blockPositionsL3.length);
	var unitsL = level.Map.length, unitsW = level.Map[0].length, unitsH = level.Map[0][0].length;
	health = 3;
	// Geometry: walls
	var cube = new THREE.CubeGeometry(20, 20, 20);
	var materials = [
	                 new THREE.MeshLambertMaterial({color: 0x000000}),
	                 new THREE.MeshLambertMaterial({color: 0xFF0000}),
	                 new THREE.MeshLambertMaterial({color: 0x00FF00}),
	                 new THREE.MeshLambertMaterial({color: 0x0000FF}),
	                 new THREE.MeshLambertMaterial({color: 0xFFFFFF}),
	                 new THREE.MeshLambertMaterial({color: 0xFFFF00}),
	                 new THREE.MeshLambertMaterial({color: 0x00FFFF}),
	                 new THREE.MeshLambertMaterial({color: 0xFF00FF}),
	                 new THREE.MeshLambertMaterial({color: 0xF0F0F0})
	                 ];
	for (var i = 0; i < level.Map.length; i++) {
		for (var j = 0; j < level.Map[i].length; j++) {
			for (var k = 0; k < level.Map[i][j].length; k++) {
				switch (level.Map[i][j][k]) {
					case 1:
					case 2:
					case 3:
					case 4:
					case 5:
					case 6:
					case 7:
					case 8:
					case 9:
						wall = new THREE.Mesh(cube, materials[level.Map[i][j][k]-1]);
						wall.position.x = i * 20;
						wall.position.y = k * 20;
						wall.position.z = j * 20;
						scene.add(wall);
						break;
					case 0:
						
						break;
					default:
						
						break;
				}
				blockPositions.push(wall);
			}
			blockPositionsL2.push(blockPositions);
			blockPositions.splice(0,4);
		}
		blockPositionsL3.push(blockPositionsL2);
		blockPositionsL2.splice(0,19);
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
	scene.add( mesh );*/
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
	player.position.set(level.PlayerPosition.x,level.PlayerPosition.y,level.PlayerPosition.z);
	/*
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
	animate();
}
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
	gEBI.width = window.innerWidth;
	gEBI.height = window.innerHeight;
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
}*
function intersectSphBox(sphere, box) {
  // get box closest point to sphere center by clamping
  var x = Math.max(box.position.x - 10, Math.min(sphere.position.x - 10, box.position.x + 10));
  var y = Math.max(box.position.y - 10, Math.min(sphere.position.y - 10, box.position.y + 10));
  var z = Math.max(box.position.z - 10, Math.min(sphere.position.z - 10, box.position.z + 10));

  // this is the same as isPointInsideSphere
  var distance = Math.sqrt((x - sphere.position.x) * (x - sphere.position.x) +
                           (y - sphere.position.y) * (y - sphere.position.y) +
                           (z - sphere.position.z) * (z - sphere.position.z));
  
  return distance < sphere.radius;
}*/
function type (words) {
	textBox.innerHTML = words;
	textBox.style.display = "block";
}
function getMapSector(v) {
	var x = Math.floor((v.x + (20 / 2)) / 20);
	var y = Math.floor((v.y + (20 / 2)) / 20);
	var z = Math.floor((v.z + (20 / 2)) / 20);
	return {x: x, y: y, z: z};
}
function checkWallCollision(v) {
	var c = getMapSector(v);
	return {actual: Levels.Practice.Map[c.x][c.z][c.y], below: Levels.Practice.Map[c.x][c.z][c.y - 1]};
}
function movementHandler(delta) {
	var actualMoveSpeed = delta * 50.0;
	/*if (!moveForward && !moveBackward) {
		if (checkWallCollision(player.position).below === 0) {
			player.translateY( - actualMoveSpeed );
		} else if (checkWallCollision(player.position).below === 1 && checkWallCollision(player.position).actual === 0 && Math.round(player.position.y / 20 - Math.floor(player.position.y / 20)) > 0) {
			player.translateY( - actualMoveSpeed )
		}
	}*/
	if (checkWallCollision(player.position).below === 0) {
		player.translateY( - actualMoveSpeed );
	} else if (checkWallCollision(player.position).below === 1 && checkWallCollision(player.position).actual === 0 && Math.round(player.position.y / 20 - Math.floor(player.position.y / 20)) === 1) {
		player.translateY( actualMoveSpeed );
	} else if (checkWallCollision(player.position).below === 1 && checkWallCollision(player.position).actual === 0 && Math.round(player.position.y / 20 - Math.floor(player.position.y / 20)) === 0) {
		velocity.y = 0;
		if (player.position.y / 20 - Math.floor(player.position.y / 20) > .10) {
			player.translateY( - actualMoveSpeed );
		} else {
			player.position.y -= player.position.y / 20 - Math.floor(player.position.y / 20);
			canJump = true;
		}
	}
	if (moveForward) {
		player.translateZ( - actualMoveSpeed);
		if (checkWallCollision(player.position).actual === 1) {
			player.translateZ( actualMoveSpeed );
		} else if (checkWallCollision(player.position).actual === 2) {
			player.translateY( actualMoveSpeed );
		} else if (checkWallCollision(player.position).below === 2) {
			if (Math.round(player.position.x / 20 - Math.floor(player.position.x / 20)) === 0 && Math.round(player.position.y / 20 - Math.floor(player.position.y / 20)) > 0) {
				player.translateY( actualMoveSpeed );
			}
			if (Math.round(player.position.x / 20 - Math.floor(player.position.x / 20)) === 1 && Math.round(player.position.y / 20 - Math.floor(player.position.y / 20)) < 1) {
				player.translateY( - actualMoveSpeed );
			}
		} else if (checkWallCollision(player.position).actual === 3) {
			player.translateY( actualMoveSpeed );
		} else if (checkWallCollision(player.position).below === 3) {
			if (Math.round(player.position.z / 20 - Math.floor(player.position.z / 20)) === 1 && Math.round(player.position.y / 20 - Math.floor(player.position.y / 20)) > 0) {
				player.translateY( actualMoveSpeed );
			}
			if (Math.round(player.position.z / 20 - Math.floor(player.position.z / 20)) === 0 && Math.round(player.position.y / 20 - Math.floor(player.position.y / 20)) < 1) {
				player.translateY( - actualMoveSpeed );
			}
		} else if (checkWallCollision(player.position).actual === 4) {
			player.translateY( actualMoveSpeed );
		} else if (checkWallCollision(player.position).below === 4) {
			if (Math.round(player.position.x / 20 - Math.floor(player.position.x / 20)) === 1 && Math.round(player.position.y / 20 - Math.floor(player.position.y / 20)) > 0) {
				player.translateY( actualMoveSpeed );
			}
			if (Math.round(player.position.x / 20 - Math.floor(player.position.x / 20)) === 0 && Math.round(player.position.y / 20 - Math.floor(player.position.y / 20)) < 1) {
				player.translateY( - actualMoveSpeed );
			}
		} else if (checkWallCollision(player.position).actual === 5) {
			player.translateY( actualMoveSpeed );
		} else if (checkWallCollision(player.position).below === 5) {
			if (Math.round(player.position.z / 20 - Math.floor(player.position.z / 20)) === 0 && Math.round(player.position.y / 20 - Math.floor(player.position.y / 20)) > 0) {
				player.translateY( actualMoveSpeed );
			}
			if (Math.round(player.position.z / 20 - Math.floor(player.position.z / 20)) === 1 && Math.round(player.position.y / 20 - Math.floor(player.position.y / 20)) < 1) {
				player.translateY( - actualMoveSpeed );
			}
		} else if (checkWallCollision(player.position).actual === 6) {
			if (Math.round(player.position.x / 20 - Math.floor(player.position.x / 20)) === 1 && Math.round(player.position.y / 20 - Math.floor(player.position.y / 20)) <= 1) {
				player.translateY( actualMoveSpeed );
			}
			if (Math.round(player.position.x / 20 - Math.floor(player.position.x / 20)) === 0 && Math.round(player.position.y / 20 - Math.floor(player.position.y / 20)) < 1) {
				player.translateY( - actualMoveSpeed );
			}
		} else if (checkWallCollision(player.position).below === 6) {
			player.translateY( - actualMoveSpeed );
		} else if (checkWallCollision(player.position).actual === 7) {
			if (Math.round(player.position.z / 20 - Math.floor(player.position.z / 20)) === 0 && Math.round(player.position.y / 20 - Math.floor(player.position.y / 20)) <= 1) {
				player.translateY( actualMoveSpeed );
			}
			if (Math.round(player.position.z / 20 - Math.floor(player.position.z / 20)) === 1 && Math.round(player.position.y / 20 - Math.floor(player.position.y / 20)) < 1) {
				player.translateY( - actualMoveSpeed );
			}
		} else if (checkWallCollision(player.position).below === 7) {
			player.translateY( - actualMoveSpeed );
		} else if (checkWallCollision(player.position).actual === 8) {
			if (Math.round(player.position.x / 20 - Math.floor(player.position.x / 20)) === 0 && Math.round(player.position.y / 20 - Math.floor(player.position.y / 20)) <= 1) {
				player.translateY( actualMoveSpeed );
			}
			if (Math.round(player.position.x / 20 - Math.floor(player.position.x / 20)) === 1 && Math.round(player.position.y / 20 - Math.floor(player.position.y / 20)) < 1) {
				player.translateY( - actualMoveSpeed );
			}
		} else if (checkWallCollision(player.position).below === 8) {
			player.translateY( - actualMoveSpeed );
		} else if (checkWallCollision(player.position).actual === 9) {
			if (Math.round(player.position.z / 20 - Math.floor(player.position.z / 20)) === 1 && Math.round(player.position.y / 20 - Math.floor(player.position.y / 20)) <= 1) {
				player.translateY( actualMoveSpeed );
			}
			if (Math.round(player.position.z / 20 - Math.floor(player.position.z / 20)) === 0 && Math.round(player.position.y / 20 - Math.floor(player.position.y / 20)) < 1) {
				player.translateY( - actualMoveSpeed );
			}
		} else if (checkWallCollision(player.position).below === 9) {
			player.translateY( - actualMoveSpeed );
		}
	}
	if (moveBackward) {
		player.translateZ( actualMoveSpeed);
		if (checkWallCollision(player.position).actual === 1) {
			player.translateZ( - actualMoveSpeed );
		} else if (checkWallCollision(player.position).actual === 2) {
			player.translateY( actualMoveSpeed );
		} else if (checkWallCollision(player.position).below === 2) {
			if (Math.round(player.position.x / 20 - Math.floor(player.position.x / 20)) === 0 && Math.round(player.position.y / 20 - Math.floor(player.position.y / 20)) > 0) {
				player.translateY( actualMoveSpeed );
			}
			if (Math.round(player.position.x / 20 - Math.floor(player.position.x / 20)) === 1 && Math.round(player.position.y / 20 - Math.floor(player.position.y / 20)) < 1) {
				player.translateY( - actualMoveSpeed );
			}
		} else if (checkWallCollision(player.position).actual === 3) {
			player.translateY( actualMoveSpeed );
		} else if (checkWallCollision(player.position).below === 3) {
			if (Math.round(player.position.z / 20 - Math.floor(player.position.z / 20)) === 1 && Math.round(player.position.y / 20 - Math.floor(player.position.y / 20)) > 0) {
				player.translateY( actualMoveSpeed );
			}
			if (Math.round(player.position.z / 20 - Math.floor(player.position.z / 20)) === 0 && Math.round(player.position.y / 20 - Math.floor(player.position.y / 20)) < 1) {
				player.translateY( - actualMoveSpeed );
			}
		} else if (checkWallCollision(player.position).actual === 4) {
			player.translateY( actualMoveSpeed );
		} else if (checkWallCollision(player.position).below === 4) {
			if (Math.round(player.position.x / 20 - Math.floor(player.position.x / 20)) === 1 && Math.round(player.position.y / 20 - Math.floor(player.position.y / 20)) > 0) {
				player.translateY( actualMoveSpeed );
			}
			if (Math.round(player.position.x / 20 - Math.floor(player.position.x / 20)) === 0 && Math.round(player.position.y / 20 - Math.floor(player.position.y / 20)) < 1) {
				player.translateY( - actualMoveSpeed );
			}
		} else if (checkWallCollision(player.position).actual === 5) {
			player.translateY( actualMoveSpeed );
		} else if (checkWallCollision(player.position).below === 5) {
			if (Math.round(player.position.z / 20 - Math.floor(player.position.z / 20)) === 0 && Math.round(player.position.y / 20 - Math.floor(player.position.y / 20)) > 0) {
				player.translateY( actualMoveSpeed );
			}
			if (Math.round(player.position.z / 20 - Math.floor(player.position.z / 20)) === 1 && Math.round(player.position.y / 20 - Math.floor(player.position.y / 20)) < 1) {
				player.translateY( - actualMoveSpeed );
			}
		} else if (checkWallCollision(player.position).actual === 6) {
			if (Math.round(player.position.x / 20 - Math.floor(player.position.x / 20)) === 1 && Math.round(player.position.y / 20 - Math.floor(player.position.y / 20)) <= 1) {
				player.translateY( actualMoveSpeed );
			}
			if (Math.round(player.position.x / 20 - Math.floor(player.position.x / 20)) === 0 && Math.round(player.position.y / 20 - Math.floor(player.position.y / 20)) < 1) {
				player.translateY( - actualMoveSpeed );
			}
		} else if (checkWallCollision(player.position).below === 6) {
			player.translateY( - actualMoveSpeed );
		} else if (checkWallCollision(player.position).actual === 7) {
			if (Math.round(player.position.z / 20 - Math.floor(player.position.z / 20)) === 0 && Math.round(player.position.y / 20 - Math.floor(player.position.y / 20)) <= 1) {
				player.translateY( actualMoveSpeed );
			}
			if (Math.round(player.position.z / 20 - Math.floor(player.position.z / 20)) === 1 && Math.round(player.position.y / 20 - Math.floor(player.position.y / 20)) < 1) {
				player.translateY( - actualMoveSpeed );
			}
		} else if (checkWallCollision(player.position).below === 7) {
			player.translateY( - actualMoveSpeed );
		} else if (checkWallCollision(player.position).actual === 8) {
			if (Math.round(player.position.x / 20 - Math.floor(player.position.x / 20)) === 0 && Math.round(player.position.y / 20 - Math.floor(player.position.y / 20)) <= 1) {
				player.translateY( actualMoveSpeed );
			}
			if (Math.round(player.position.x / 20 - Math.floor(player.position.x / 20)) === 1 && Math.round(player.position.y / 20 - Math.floor(player.position.y / 20)) < 1) {
				player.translateY( - actualMoveSpeed );
			}
		} else if (checkWallCollision(player.position).below === 8) {
			player.translateY( - actualMoveSpeed );
		} else if (checkWallCollision(player.position).actual === 9) {
			if (Math.round(player.position.z / 20 - Math.floor(player.position.z / 20)) === 1 && Math.round(player.position.y / 20 - Math.floor(player.position.y / 20)) <= 1) {
				player.translateY( actualMoveSpeed );
			}
			if (Math.round(player.position.z / 20 - Math.floor(player.position.z / 20)) === 0 && Math.round(player.position.y / 20 - Math.floor(player.position.y / 20)) < 1) {
				player.translateY( - actualMoveSpeed );
			}
		} else if (checkWallCollision(player.position).below === 9) {
			player.translateY( - actualMoveSpeed );
		}
	}
	if (moveLeft) {
		player.rotation.y += 2.0 * delta;
	}
	if (moveRight) {
		player.rotation.y -= 2.0 * delta;
	}
	
	player.translateY(velocity.y * delta);
	if (!canJump) {
		velocity.y -= 50 * delta;
	}
}
function animate() {
	if (!exit) {
		return;
	}
	var time = performance.now();
	var delta = ( time - prevTime ) / 1000;
	movementHandler(delta);
	
/*	for (var i = 0; i < objects.length; i++) {
		if(objects[i].objectType = "Cube") {
			collision = intersect(player,objects[i]);
		} 
	}*
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
	*
	var time = performance.now();
	var delta = ( time - prevTime ) / 1000;
	velocity.x -= velocity.x * 10.0 * delta;
	velocity.z -= velocity.z * 10.0 * delta;
	velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass
	if (moveForward) velocity.z -= 400.0 * delta;
	if ( moveBackward ) velocity.z += 900.0 * delta;
	if ( moveLeft ) player.rotation.y += 2.0 * delta;
	if ( moveRight ) player.rotation.y -= 2.0 * delta;
	/*if ( isOnObject === true ) {
		velocity.y = Math.max( 0, velocity.y );
		canJump = true;
	}*
	for (var i = 0; i < objects.length; i++) {
		if (objects[i].objectType === "Button") {
			/*if (((player.position.x + 10 || player.position.x || player.position.x - 10) <= buttonMesh[i].position.x + 2.5 && (player.position.x + 10 || player.position.x - 10) >= buttonMesh[i].position.x- 2.5) && ((player.position.y + 10 ||player.position.y ||  player.position.y - 10) <= buttonMesh[i].position.y + 2.5 && (player.position.y + 10 || player.position.y - 10) >= buttonMesh[i].position.y- 2.5) && ((player.position.z + 10 ||player.position.z ||  player.position.z - 10) <= buttonMesh[i].position.z + 2.5 && (player.position.z + 10 || player.position.z - 10) >= buttonMesh[i].position.z - 2.5) && buttonMesh[i].visible === true) {
				console.log("Working");
				buttonMesh[i].visible = false;
			}*
			objects[i].rotation.y += 5.0 * delta;
		}
	}*
	
	for (var i = 0; i < Levels.Practice.Map.length; i++) {
		for (var j = 0; j < Levels.Practice.Map[i].length; j++) {
			for (var k = 0; k < Levels.Practice.Map[i][j].length; k++) {
				block = Levels.Practice.Map[i][j][k];
				switch (block) {
					case 1:
						if (intersectSphBox(player,blockPositionsL3[i][j][k])) {
							console.log("Yes?");
						}
						break;
					case 2:
					case 3:
					case 4:
					case 5:
					case 6:
					case 7:
					case 8:
					case 9:
						
						break;
					case 0:
						
						break;
					default:
						
						break;
				}
			}
		}
	}*
	
	
	
		
	player.translateX( velocity.x * delta );
	player.translateY( velocity.y * delta );
	player.translateZ( velocity.z * delta );
	if ( player.position.y < 0 ) {
		velocity.y = 0;
		player.position.y = 0;
		canJump = true;
	}*/
	
	if (interaction === true) {
		type("Testing... 1... 2... 3...")
	}
	
	gCtx.clearRect(0, 0, gEBI.style.width, gEBI.style.height);
	if (healthReady === 4) {
		switch(health) {
			case 0:
				gCtx.drawImage(healthImage[3], (gEBI.width / 2) - (healthImage[3].width / 2), 10);
				break;
			case 1:
				gCtx.drawImage(healthImage[2], (gEBI.width / 2) - (healthImage[2].width / 2), 10);
				break;
			case 2:
				gCtx.drawImage(healthImage[1], (gEBI.width / 2) - (healthImage[1].width / 2), 10);
				break;
			case 3:
				gCtx.drawImage(healthImage[0], (gEBI.width / 2) - (healthImage[0].width / 2), 10);
				break;
		}
	};

	var relativeCameraOffset = new THREE.Vector3(0,0,40);
	var cameraOffset = relativeCameraOffset.applyMatrix4( player.matrixWorld );
	camera.position.x = cameraOffset.x;
	camera.position.y = player.position.y + 20;
	camera.position.z = cameraOffset.z;
	camera.lookAt( player.position );
	
/*
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
*/
	prevTime = time;

	renderer.render( scene, camera );
	requestAnimationFrame( animate );
}
	

init();
//animate();
