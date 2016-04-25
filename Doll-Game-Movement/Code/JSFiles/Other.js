function Cenimatic (prevTime) {
	
	var time = performance.now();
	var delta = ( time - prevTime ) / 1000;
	
	var count = 0;
	if (count < 180) {
		cameraCenama.position.x = x;
		cameraCenama.position.y = 20;
		cameraCenama.position.z = 200 + Math.sqrt(160000 - ((x-200)*(x-200)));
	} else if (count => 180 && count < 360) {
		cameraCenama.position.x = x;
		cameraCenama.position.y = 20;
		cameraCenama.position.z = 200 - Math.sqrt(160000 - ((x-200)*(x-200)));
	} else {
		clearInterval(interval);
		cenamatic = false;
		animate();
	}
	cameraCenama.rotation.y = -(delta * count);
	x += 1;
	count += 1;
	renderer.render( scene, cameraCenama );
	prevTime = time;
}

function breakScene() {
	scene.children.splice(1,scene.children.length);
	wallCount = 0;
}
 
function goToMainMenu() {
	breakScene();
	currentLevel = false;
	pauseScreen.style.display = "none";
	gameOver.style.display = "none";
	blocker.style.display = "block";
}

function rejoinGame() {
	pauseScreen.style.display = "none";
	animate();
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
	gEBI.width = window.innerWidth;
	gEBI.height = window.innerHeight;
}

function type (words) {
	if (q < words.length && interaction === 2) {
		var letter = words.substring(q, q + 1);
		sentenceDraw += letter;
		textBox.innerHTML = sentenceDraw;
		q += 1;
	} else if (q < words.length && interaction === 3) {
		textBox.innerHTML = words;
	} else if (q >= words.length && interaction === 3) {
		clearInterval(interval);
		textBox.style.display = "none";
		interaction = 0;
		sentenceDraw = "";
		textBox.innerHTML = sentenceDraw;
	} else if (interaction === 4) {
		clearInterval(interval);
		textBox.style.display = "none";
		interaction = 0;
		sentenceDraw = "";
		textBox.innerHTML = sentenceDraw;
	}
}

function getMapSector(v) {
	var x = Math.floor((v.x + (20 / 2)) / 20);
	var y = Math.floor((v.y + (20 / 2)) / 20);
	var z = Math.floor((v.z + (20 / 2)) / 20);
	return {x: x, y: y, z: z};
}

function checkWallCollision(v) {
	var c = getMapSector(v);
	return {actual: currentLevel.Map[c.x][c.z][c.y], below: currentLevel.Map[c.x][c.z][c.y - 1]};
}