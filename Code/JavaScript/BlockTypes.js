function Platform (type) {
	this.name = type;
}

function Ramp (position, direction) {
	this.position = position;
	this.direction = direction;
	this.name = position + " " + direction + " ramp"
}

function Coin (color) {
	this.name = color + " coin";
	this.color = color;
}