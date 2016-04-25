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
			if ( canJump === true ) jumping = true;
			canJump = false;
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
		case 17: // ctrl
			interaction += 1;
			break;
		case 27: // Esc
			exit = true;
			break;
		case 81: // q
			cenamatic = true;
			break;
	}
};