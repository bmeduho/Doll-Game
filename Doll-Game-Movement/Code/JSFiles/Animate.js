function animate() {
	if (!exit) {
		clearInterval(interval);
		levelName.innerHTML = currentLevel.Name;
		pauseScreen.style.display = "block";
		return;
	}
	if (health === 0) {
		clearInterval(interval);
		death.style.display = "block";
		return;
	}
	var time = performance.now();
	var delta = ( time - prevTime ) / 1000;
	if (cenamatic) {
		clearInterval(interval);
		interval = setInterval(Cenimatic, 100, time);
		return;
	}
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
	
	if (interaction === 1) {
		q = 0;
		var sentenceDraw = "";
		textBox.style.display = "block";
		interval = setInterval(type, 100, "Testing... 1... 2... 3...");
		interaction += 1;
	}
	
	gCtx.clearRect(0, 0, gEBI.width, gEBI.height);
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
	gCtx.fillText(coinCount + " xCoins", gEBI.width * 7/8, gEBI.height * 7/8);

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