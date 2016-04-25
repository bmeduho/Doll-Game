function movementHandler(delta) {
	var actualMoveSpeed = delta * 50.0;
	if (moveForward) {
		player.translateZ( - actualMoveSpeed);
		
	}
	if (moveBackward) {
		player.translateZ( actualMoveSpeed);
		
	}
	if (moveLeft) {
		player.rotation.y += 2.0 * delta;
	}
	if (moveRight) {
		player.rotation.y -= 2.0 * delta;
	}
}