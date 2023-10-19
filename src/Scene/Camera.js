export class Camera {
  constructor(context, frames = 0, radius = 60, size = 150) {
    this.x = 0;
    this.y = 0;
    this.radius = radius;
    this.size = size;
    this.offsetX = 0;
    this.offsetY = 0;

    this.context = context
    this.frames = frames;
  }

  rectangleIntersection (r1, r2) {
    return ! (r1.x + r1.width < r2.x
        || r1.y + r1.height < r2.y
        || r1.x > r2.x + r2.width
        || r1.y > r2.y + r2.height
      );
  }

  update (player, entities) {
    this.frames++;
    if (this.frames >= 15) {
      this.frames = 0;

      const screen = {
        x: player.x - this.offsetX - this.context.canvas.width / 2 - this.size,
        y: player.y - this.offsetY - this.context.canvas.height / 2 - this.size,
        width: this.context.canvas.width + this.size * 2,
        height: this.context.canvas.height + this.size * 2
      };

      for (let i = 0; i < entities.length; i++) {
        const entity = entities[i];
        const bounds = {};

        if (entity.boundingType === 'arc') {
          bounds.x = entity.x - this.radius;
          bounds.y = entity.y - this.radius;
          bounds.width = this.radius * 2;
          bounds.height = this.radius * 2;
        } else if (entity.boundingType === 'box') {
          bounds.x = entity.x;
          bounds.y = entity.y;
          bounds.width = this.size;
          bounds.height = this.size;
        }
        entity.sleep = !this.rectangleIntersection(bounds, screen);
      }
    }
  }

  resize() {}

  preRender (player) {
    const targetX = -player.x + this.context.canvas.width / 2;
    const targetY = -player.y + this.context.canvas.height / 2;

    const vectorX = targetX - this.x;
    const vectorY = targetY - this.y;

    this.offsetX = this.x - targetX;
    this.offsetY = this.y - targetY;

    this.x += vectorX / 10;
    this.y += vectorY / 10;

    this.context.save();
    this.context.translate(this.x, this.y);
  }

  postRender () {
    this.context.restore();
  }
};