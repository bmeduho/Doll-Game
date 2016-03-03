var Levels = {

	Practice: {
		Map: // Ten types of blocks. Twenty by twenty grid. 1 = Block; 2 = UpTop; 3 = RightTop; 4 = DownTop; 5 = LeftTop; 6 = UpBottom; 7 = RightBottom; 8 = DownBottom; 9 = LeftBottom; 0 = Blank;
		// [[0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]]
		[
		[[1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0]],
		[[1,1,1,0], [1,1,1,1], [1,1,1,5], [1,1,1,9], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,7], [1,1,1,3], [1,1,1,1], [1,1,1,0]],
		[[1,1,1,0], [1,1,1,2], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,2,0], [1,1,2,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,2], [1,1,1,0]],
		[[1,1,1,0], [1,1,1,6], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,1,6,0], [1,1,6,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,6], [1,1,1,0]],
		[[1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0]],
		[[1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0]],
		[[1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,2,0,0], [1,2,0,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,1,1,0], [1,1,1,0], [1,1,1,0]],
		[[1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,6,0,0], [1,6,0,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,1,1,0], [1,1,1,0], [1,1,1,0]],
		[[1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,0,0,0], [1,0,0,0], [1,0,0,0], [1,0,0,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,1,1,0], [1,1,1,0], [1,1,1,0]],
		[[1,1,1,0], [1,1,1,0], [1,1,5,0], [1,1,9,0], [1,1,0,0], [1,1,0,0], [1,5,0,0], [1,9,0,0], [1,0,0,0], [1,0,0,0], [1,0,0,0], [1,0,0,0], [1,7,0,0], [1,3,0,0], [1,1,0,0], [1,1,0,0], [1,1,7,0], [1,1,3,0], [1,1,1,0], [1,1,1,0]],
		[[1,1,1,0], [1,1,1,0], [1,1,5,0], [1,1,9,0], [1,1,0,0], [1,1,0,0], [1,5,0,0], [1,9,0,0], [1,0,0,0], [1,0,0,0], [1,0,0,0], [1,0,0,0], [1,7,0,0], [1,3,0,0], [1,1,0,0], [1,1,0,0], [1,1,7,0], [1,1,3,0], [1,1,1,0], [1,1,1,0]],
		[[1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,0,0,0], [1,0,0,0], [1,0,0,0], [1,0,0,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,1,1,0], [1,1,1,0], [1,1,1,0]],
		[[1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,8,0,0], [1,8,0,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,1,1,0], [1,1,1,0], [1,1,1,0]],
		[[1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,4,0,0], [1,4,0,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,1,1,0], [1,1,1,0], [1,1,1,0]],
		[[1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0]],
		[[1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0]],
		[[1,1,1,0], [1,1,1,8], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,1,8,0], [1,1,8,0], [1,1,0,0], [1,1,0,0], [1,1,0,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,8], [1,1,1,0]],
		[[1,1,1,0], [1,1,1,4], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,4,0], [1,1,4,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,4], [1,1,1,0]],
		[[1,1,1,0], [1,1,1,1], [1,1,1,5], [1,1,1,9], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,7], [1,1,1,3], [1,1,1,1], [1,1,1,0]],
		[[1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0], [1,1,1,0]]
		],
		PlayerPosition: {
			x: 200,
			y: 20,
			z: 200
		}
	}
}