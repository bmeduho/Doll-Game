function setupScene(level) {
	//breakScene();
	blocker.style.display = "none";
	pauseScreen.style.display = "none";
	gameOver.style.display = "none";
	currentLevel = level;
	//blockPositionsL3.splice(0,blockPositionsL3.length);
	var unitsL = level.Map.length, unitsW = level.Map[0].length, unitsH = level.Map[0][0].length;
	health = 3;
	
	//Create: Light
	var light = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 0.75 );
	light.position.set( 200, 100, 200 );
	scene.add( light );
	
	// Geometry: Player
	geometry = new THREE.SphereGeometry(10,16,16);
	for ( var i = 0, l = geometry.faces.length; i < l; i ++ ) {
		var face = geometry.faces[ i ];
		face.vertexColors[ 0 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
		face.vertexColors[ 1 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
		face.vertexColors[ 2 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
	}
	material = new THREE.MeshBasicMaterial( { vertexColors: THREE.VertexColors } );
	player = new THREE.Mesh( geometry, material );
	player.name = "Player";
	scene.add( player );
	player.position.set(level.PlayerPosition.x,level.PlayerPosition.y,level.PlayerPosition.z);
	
	// Geometry: Walls/Floor
	var cube = new THREE.CubeGeometry(20, 20, 20);
	var materials;/*[
		new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load("../../Visuals/1-block-texture-practice.png")}),
		new THREE.MeshLambertMaterial({color: 0xFF0000}),
		new THREE.MeshLambertMaterial({color: 0x00FF00}),
		new THREE.MeshLambertMaterial({color: 0x0000FF}),
		new THREE.MeshLambertMaterial({color: 0xFFFFFF}),
		new THREE.MeshLambertMaterial({color: 0xFFFF00}),
		new THREE.MeshLambertMaterial({color: 0x00FFFF}),
		new THREE.MeshLambertMaterial({color: 0xFF00FF}),
		new THREE.MeshLambertMaterial({color: 0xF0F0F0})
	];*/
	/*var texture = [
		new THREE.TextureLoader().load("../../Visuals/1-block-texture-practice.png")
	];*/
	var WallGroup = new THREE.Object3D();
	var ButtonGroup = new THREE.Object3D();
	for (var i = 0; i < level.Map.length; i++) {
		for (var j = 0; j < level.Map[i].length; j++) {
			for (var k = 0; k < level.Map[i][j].length; k++) {
				switch (level.Map[i][j][k].name) {
					case "wall":
						materials = new THREE.MeshLambertMaterial({color: 0x000000});
						wall = new THREE.Mesh(cube, materials);
						wall.name = "wall " + i + "," + k + "," + j;
						wall.position.x = i * 20;
						wall.position.y = k * 20;
						wall.position.z = j * 20;
						WallGroup.add(wall);
						wallCount += 1;
						break;
					case "up top ramp":
						materials = new THREE.MeshLambertMaterial({color: 0xFF0000});
						wall = new THREE.Mesh(cube, materials);
						wall.name = "wall " + i + "," + k + "," + j;
						wall.position.x = i * 20;
						wall.position.y = k * 20;
						wall.position.z = j * 20;
						WallGroup.add(wall);
						wallCount += 1;
						break;
					case "right top ramp":
						materials = new THREE.MeshLambertMaterial({color: 0x00FF00});
						wall = new THREE.Mesh(cube, materials);
						wall.name = "wall " + i + "," + k + "," + j;
						wall.position.x = i * 20;
						wall.position.y = k * 20;
						wall.position.z = j * 20;
						WallGroup.add(wall);
						wallCount += 1;
						break;
					case "down top ramp":
						materials = new THREE.MeshLambertMaterial({color: 0x0000FF});
						wall = new THREE.Mesh(cube, materials);
						wall.name = "wall " + i + "," + k + "," + j;
						wall.position.x = i * 20;
						wall.position.y = k * 20;
						wall.position.z = j * 20;
						WallGroup.add(wall);
						wallCount += 1;
						break;
					case "left top ramp":
						materials = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
						wall = new THREE.Mesh(cube, materials);
						wall.name = "wall " + i + "," + k + "," + j;
						wall.position.x = i * 20;
						wall.position.y = k * 20;
						wall.position.z = j * 20;
						WallGroup.add(wall);
						wallCount += 1;
						break;
					case "up bottom ramp":
						materials = new THREE.MeshLambertMaterial({color: 0xD9A6A6});
						wall = new THREE.Mesh(cube, materials);
						wall.name = "wall " + i + "," + k + "," + j;
						wall.position.x = i * 20;
						wall.position.y = k * 20;
						wall.position.z = j * 20;
						WallGroup.add(wall);
						wallCount += 1;
						break;
					case "right bottom ramp":
						materials = new THREE.MeshLambertMaterial({color: 0xA6D9A6});
						wall = new THREE.Mesh(cube, materials);
						wall.name = "wall " + i + "," + k + "," + j;
						wall.position.x = i * 20;
						wall.position.y = k * 20;
						wall.position.z = j * 20;
						WallGroup.add(wall);
						wallCount += 1;
						break;
					case "down bottom ramp":
						materials = new THREE.MeshLambertMaterial({color: 0xA6A6D9});
						wall = new THREE.Mesh(cube, materials);
						wall.name = "wall " + i + "," + k + "," + j;
						wall.position.x = i * 20;
						wall.position.y = k * 20;
						wall.position.z = j * 20;
						WallGroup.add(wall);
						wallCount += 1;
						break;
					case "left bottom ramp":
						materials = new THREE.MeshLambertMaterial({color: 0xBFBFBF});
						wall = new THREE.Mesh(cube, materials);
						wall.name = "wall " + i + "," + k + "," + j;
						wall.position.x = i * 20;
						wall.position.y = k * 20;
						wall.position.z = j * 20;
						WallGroup.add(wall);
						wallCount += 1;
						break;
					case "yellow coin":
						materials = new THREE.MeshLambertMaterial({color: 0xFFFF00});
						button = new THREE.Mesh(new THREE.CylinderGeometry( 5, 5, 1, 16, 1, false, 0, Math.PI * 2 ), materials);
						button.name = "button " + i + "," + k + "," + j;
						button.position.x = i * 20;
						button.position.y = k * 20;
						button.position.z = j * 20;
						button.rotation.x = Math.PI / 2;
						ButtonGroup.add(button);
						break;
					case "Blank":
						
						break;
					default:
						
						break;
				}
			}
		}
	}
	scene.add(WallGroup);
	scene.add(ButtonGroup);
	
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
	
	
	
	
	
	animate();
}