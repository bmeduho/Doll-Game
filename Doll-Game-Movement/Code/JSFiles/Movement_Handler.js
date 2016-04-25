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
	} else if (checkWallCollision(player.position).below.name === "wall" && checkWallCollision(player.position).actual === 0 && Math.round(player.position.y / 20 - Math.floor(player.position.y / 20)) === 1) {
		player.translateY( actualMoveSpeed );
	} else if (checkWallCollision(player.position).below.name === "wall" && checkWallCollision(player.position).actual === 0 && Math.round(player.position.y / 20 - Math.floor(player.position.y / 20)) === 0) {
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
		if (checkWallCollision(player.position).actual.name === "wall") {
			player.translateZ( actualMoveSpeed );
		} else if (checkWallCollision(player.position).actual.name === "up top ramp") {
			player.translateY( actualMoveSpeed );
		} else if (checkWallCollision(player.position).below.name === "up top ramp") {
			if (Math.round(player.position.x / 20 - Math.floor(player.position.x / 20)) === 0 && Math.round(player.position.y / 20 - Math.floor(player.position.y / 20)) > 0) {
				player.translateY( actualMoveSpeed );
			}
			if (Math.round(player.position.x / 20 - Math.floor(player.position.x / 20)) === 1 && Math.round(player.position.y / 20 - Math.floor(player.position.y / 20)) < 1) {
				player.translateY( - actualMoveSpeed );
			}
		} else if (checkWallCollision(player.position).actual.name === "right top ramp") {
			player.translateY( actualMoveSpeed );
		} else if (checkWallCollision(player.position).below.name === "right top ramp") {
			if (Math.round(player.position.z / 20 - Math.floor(player.position.z / 20)) === 1 && Math.round(player.position.y / 20 - Math.floor(player.position.y / 20)) > 0) {
				player.translateY( actualMoveSpeed );
			}
			if (Math.round(player.position.z / 20 - Math.floor(player.position.z / 20)) === 0 && Math.round(player.position.y / 20 - Math.floor(player.position.y / 20)) < 1) {
				player.translateY( - actualMoveSpeed );
			}
		} else if (checkWallCollision(player.position).actual.name === "down top ramp") {
			player.translateY( actualMoveSpeed );
		} else if (checkWallCollision(player.position).below.name === "down top ramp") {
			if (Math.round(player.position.x / 20 - Math.floor(player.position.x / 20)) === 1 && Math.round(player.position.y / 20 - Math.floor(player.position.y / 20)) > 0) {
				player.translateY( actualMoveSpeed );
			}
			if (Math.round(player.position.x / 20 - Math.floor(player.position.x / 20)) === 0 && Math.round(player.position.y / 20 - Math.floor(player.position.y / 20)) < 1) {
				player.translateY( - actualMoveSpeed );
			}
		} else if (checkWallCollision(player.position).actual.name === "left top ramp") {
			player.translateY( actualMoveSpeed );
		} else if (checkWallCollision(player.position).below.name === "left top ramp") {
			if (Math.round(player.position.z / 20 - Math.floor(player.position.z / 20)) === 0 && Math.round(player.position.y / 20 - Math.floor(player.position.y / 20)) > 0) {
				player.translateY( actualMoveSpeed );
			}
			if (Math.round(player.position.z / 20 - Math.floor(player.position.z / 20)) === 1 && Math.round(player.position.y / 20 - Math.floor(player.position.y / 20)) < 1) {
				player.translateY( - actualMoveSpeed );
			}
		} else if (checkWallCollision(player.position).actual.name === "up bottom ramp") {
			if (Math.round(player.position.x / 20 - Math.floor(player.position.x / 20)) === 1 && Math.round(player.position.y / 20 - Math.floor(player.position.y / 20)) <= 1) {
				player.translateY( actualMoveSpeed );
			}
			if (Math.round(player.position.x / 20 - Math.floor(player.position.x / 20)) === 0 && Math.round(player.position.y / 20 - Math.floor(player.position.y / 20)) < 1) {
				player.translateY( - actualMoveSpeed );
			}
		} else if (checkWallCollision(player.position).below.name === "up bottom ramp") {
			player.translateY( - actualMoveSpeed );
		} else if (checkWallCollision(player.position).actual.name === "right bottom ramp") {
			if (Math.round(player.position.z / 20 - Math.floor(player.position.z / 20)) === 0 && Math.round(player.position.y / 20 - Math.floor(player.position.y / 20)) <= 1) {
				player.translateY( actualMoveSpeed );
			}
			if (Math.round(player.position.z / 20 - Math.floor(player.position.z / 20)) === 1 && Math.round(player.position.y / 20 - Math.floor(player.position.y / 20)) < 1) {
				player.translateY( - actualMoveSpeed );
			}
		} else if (checkWallCollision(player.position).below.name === "right bottom ramp") {
			player.translateY( - actualMoveSpeed );
		} else if (checkWallCollision(player.position).actual.name === "down bottom ramp") {
			if (Math.round(player.position.x / 20 - Math.floor(player.position.x / 20)) === 0 && Math.round(player.position.y / 20 - Math.floor(player.position.y / 20)) <= 1) {
				player.translateY( actualMoveSpeed );
			}
			if (Math.round(player.position.x / 20 - Math.floor(player.position.x / 20)) === 1 && Math.round(player.position.y / 20 - Math.floor(player.position.y / 20)) < 1) {
				player.translateY( - actualMoveSpeed );
			}
		} else if (checkWallCollision(player.position).below.name === "down bottom ramp") {
			player.translateY( - actualMoveSpeed );
		} else if (checkWallCollision(player.position).actual.name === "left bottom ramp") {
			if (Math.round(player.position.z / 20 - Math.floor(player.position.z / 20)) === 1 && Math.round(player.position.y / 20 - Math.floor(player.position.y / 20)) <= 1) {
				player.translateY( actualMoveSpeed );
			}
			if (Math.round(player.position.z / 20 - Math.floor(player.position.z / 20)) === 0 && Math.round(player.position.y / 20 - Math.floor(player.position.y / 20)) < 1) {
				player.translateY( - actualMoveSpeed );
			}
		} else if (checkWallCollision(player.position).below.name === "left bottom ramp") {
			player.translateY( - actualMoveSpeed );
		}
	}
	if (moveBackward) {
		player.translateZ( actualMoveSpeed);
		if (checkWallCollision(player.position).actual.name === "wall") {
			player.translateZ( - actualMoveSpeed );
		} else if (checkWallCollision(player.position).actual.name === "up top ramp") {
			player.translateY( actualMoveSpeed );
		} else if (checkWallCollision(player.position).below.name === "up top ramp") {
			if (Math.round(player.position.x / 20 - Math.floor(player.position.x / 20)) === 0 && Math.round(player.position.y / 20 - Math.floor(player.position.y / 20)) > 0) {
				player.translateY( actualMoveSpeed );
			}
			if (Math.round(player.position.x / 20 - Math.floor(player.position.x / 20)) === 1 && Math.round(player.position.y / 20 - Math.floor(player.position.y / 20)) < 1) {
				player.translateY( - actualMoveSpeed );
			}
		} else if (checkWallCollision(player.position).actual.name === "right top ramp") {
			player.translateY( actualMoveSpeed );
		} else if (checkWallCollision(player.position).below.name === "right top ramp") {
			if (Math.round(player.position.z / 20 - Math.floor(player.position.z / 20)) === 1 && Math.round(player.position.y / 20 - Math.floor(player.position.y / 20)) > 0) {
				player.translateY( actualMoveSpeed );
			}
			if (Math.round(player.position.z / 20 - Math.floor(player.position.z / 20)) === 0 && Math.round(player.position.y / 20 - Math.floor(player.position.y / 20)) < 1) {
				player.translateY( - actualMoveSpeed );
			}
		} else if (checkWallCollision(player.position).actual.name === "down top ramp") {
			player.translateY( actualMoveSpeed );
		} else if (checkWallCollision(player.position).below.name === "down top ramp") {
			if (Math.round(player.position.x / 20 - Math.floor(player.position.x / 20)) === 1 && Math.round(player.position.y / 20 - Math.floor(player.position.y / 20)) > 0) {
				player.translateY( actualMoveSpeed );
			}
			if (Math.round(player.position.x / 20 - Math.floor(player.position.x / 20)) === 0 && Math.round(player.position.y / 20 - Math.floor(player.position.y / 20)) < 1) {
				player.translateY( - actualMoveSpeed );
			}
		} else if (checkWallCollision(player.position).actual.name === "left top ramp") {
			player.translateY( actualMoveSpeed );
		} else if (checkWallCollision(player.position).below.name === "left top ramp") {
			if (Math.round(player.position.z / 20 - Math.floor(player.position.z / 20)) === 0 && Math.round(player.position.y / 20 - Math.floor(player.position.y / 20)) > 0) {
				player.translateY( actualMoveSpeed );
			}
			if (Math.round(player.position.z / 20 - Math.floor(player.position.z / 20)) === 1 && Math.round(player.position.y / 20 - Math.floor(player.position.y / 20)) < 1) {
				player.translateY( - actualMoveSpeed );
			}
		} else if (checkWallCollision(player.position).actual.name === "up bottom ramp") {
			if (Math.round(player.position.x / 20 - Math.floor(player.position.x / 20)) === 1 && Math.round(player.position.y / 20 - Math.floor(player.position.y / 20)) <= 1) {
				player.translateY( actualMoveSpeed );
			}
			if (Math.round(player.position.x / 20 - Math.floor(player.position.x / 20)) === 0 && Math.round(player.position.y / 20 - Math.floor(player.position.y / 20)) < 1) {
				player.translateY( - actualMoveSpeed );
			}
		} else if (checkWallCollision(player.position).below.name === "up bottom ramp") {
			player.translateY( - actualMoveSpeed );
		} else if (checkWallCollision(player.position).actual.name === "right bottom ramp") {
			if (Math.round(player.position.z / 20 - Math.floor(player.position.z / 20)) === 0 && Math.round(player.position.y / 20 - Math.floor(player.position.y / 20)) <= 1) {
				player.translateY( actualMoveSpeed );
			}
			if (Math.round(player.position.z / 20 - Math.floor(player.position.z / 20)) === 1 && Math.round(player.position.y / 20 - Math.floor(player.position.y / 20)) < 1) {
				player.translateY( - actualMoveSpeed );
			}
		} else if (checkWallCollision(player.position).below.name === "right bottom ramp") {
			player.translateY( - actualMoveSpeed );
		} else if (checkWallCollision(player.position).actual.name === "down bottom ramp") {
			if (Math.round(player.position.x / 20 - Math.floor(player.position.x / 20)) === 0 && Math.round(player.position.y / 20 - Math.floor(player.position.y / 20)) <= 1) {
				player.translateY( actualMoveSpeed );
			}
			if (Math.round(player.position.x / 20 - Math.floor(player.position.x / 20)) === 1 && Math.round(player.position.y / 20 - Math.floor(player.position.y / 20)) < 1) {
				player.translateY( - actualMoveSpeed );
			}
		} else if (checkWallCollision(player.position).below.name === "down bottom ramp") {
			player.translateY( - actualMoveSpeed );
		} else if (checkWallCollision(player.position).actual.name === "left bottom ramp") {
			if (Math.round(player.position.z / 20 - Math.floor(player.position.z / 20)) === 1 && Math.round(player.position.y / 20 - Math.floor(player.position.y / 20)) <= 1) {
				player.translateY( actualMoveSpeed );
			}
			if (Math.round(player.position.z / 20 - Math.floor(player.position.z / 20)) === 0 && Math.round(player.position.y / 20 - Math.floor(player.position.y / 20)) < 1) {
				player.translateY( - actualMoveSpeed );
			}
		} else if (checkWallCollision(player.position).below.name === "left bottom ramp") {
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
	for (var i = 0; i < scene.children[4].children.length; i++) {
		scene.children[4].children[i].rotation.z += (Math.PI / 2) * delta;
		if(checkWallCollision(player.position).actual === "Button") {
			if ((scene.children[4].children[i].position.x < player.position.x + 10 && scene.children[4].children[i].position.x > player.position.x - 10) && (scene.children[4].children[i].position.y < player.position.y + 10 && scene.children[4].children[i].position.y > player.position.y - 10) && (scene.children[4].children[i].position.z < player.position.z + 10 && scene.children[4].children[i].position.z > player.position.z - 10) && scene.children[4].children[i].visible === true) {
				scene.children[4].children[i].visible = false;
				coinCount += 1;
			}
		}
	}
	
}