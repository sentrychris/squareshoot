export class Bullet
{
  constructor(context, player, i) {
    this.vectorX = Math.cos(player.angle + 90 * Math.PI / 180 + i * 5 * Math.PI / 180);
    this.vectorY = Math.sin(player.angle + 90 * Math.PI / 180 + i * 5 * Math.PI / 180);
    this.x = player.x + this.vectorX * 60 * 1.5;
    this.y = player.y + this.vectorY * 60 * 1.5;
    this.radius = 5;
    this.bounds = {
      x: this.x - this.radius,
      y: this.y - this.radius,
      width: this.radius * 2,
      height: this.radius * 2
    };
  
    this.context = context
    this.frames = 0;
    this.markToDelete = false;
  }

  rectangleIntersection (r1, r2) {
    return !(r1.x + r1.width < r2.x || r1.y + r1.height < r2.y || r1.x > r2.x + r2.width || r1.y > r2.y + r2.height);
  }

  update (walls) {
    this.x += this.vectorX * 25;
    this.y += this.vectorY * 25;

    this.bounds.x = this.x - this.radius;
    this.bounds.y = this.y - this.radius;

    this.frames++;

    if (this.frames > 15) {
      this.markToDelete = true;
    }

    for (var i = 0; i < walls.length; i++) {
      var wall = walls[i];

      if (this.rectangleIntersection(wall.bounds, this.bounds)) {
        this.markToDelete = true;
      }
    }

  };

  render () {
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.context.fillStyle = '#F8CA00';
    this.context.fill();
  };
};