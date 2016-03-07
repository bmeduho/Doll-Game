
	for (var i = 0; i < level.Map.length; i++) {
		for (var j = 0; j < level.Map[i].length; j++) {
			for (var k = 0; k < level.Map[i][j].length; k++) {
				switch (level.Map[i][j][k]) {
					case 10:
						button.rotation.y += Math.PI / 2;
					default:
						
						break;
				}
			}
		}
	}
