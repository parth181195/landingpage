var Canvas = document.getElementById('canvas');
var ctx = Canvas.getContext('2d');

var resize = function() {
  Canvas.width = Canvas.clientWidth;
  Canvas.height = Canvas.clientHeight;
};
window.addEventListener('resize', resize);
resize();

var elements = [];
var presets = {};

presets.o = function(x, y, s, dx, dy) {
  return {
    x: x,
    y: y,
    r: 12 * s,
    w: 1,
    dx: dx,
    dy: dy,
    draw: function(ctx, t) {
      this.x += this.dx;
      this.y += this.dy;
      ctx.beginPath();
      ctx.arc(this.x + +Math.sin((50 + x + (t / 10)) / 100) * 3, this.y + +Math.sin((45 + x + (t / 10)) / 100) * 4, this.r, 0, 2 * Math.PI, false);
      ctx.lineWidth = this.w;
      ctx.strokeStyle = '#dddddd';
      ctx.stroke();
    }
  }
};

presets.x = function(x, y, s, dx, dy, dr, r) {
  r = r || 0;
  return {
    x: x,
    y: y,
    s: 20 * s,
    w: 1,
    r: r,
    dx: dx,
    dy: dy,
    dr: dr,
    draw: function(ctx, t) {
      this.x += this.dx;
      this.y += this.dy;
      this.r += this.dr;

      var _this = this;
      var squre = function(x, y, tx, ty, c, r) {
        ctx.beginPath();
        ctx.rotate(r * Math.PI / 180);
        ctx.rect(x, y, s * 25, s * 25)
        ctx.lineWidth = _this.w;
        ctx.strokeStyle = c;
        ctx.stroke();
      };
      ctx.save();
      ctx.translate(this.x + Math.sin((x + (t / 10)) / 100) * 5, this.y + Math.sin((10 + x + (t / 10)) / 100) * 2);
      squre(1, -1, -1, 1, '#dddddd', this.r);
      ctx.restore();
    }
  }
};
for (var x = 0; x < Canvas.width; x++) {
  for (var y = 0; y < Canvas.height; y++) {
    if (Math.round(Math.random() * 35000) == 1) {
      var s = ((Math.random() * 4) + 4) / 10;
      if (Math.round(Math.random()) == 1) {
        elements.push(presets.o(x, y, s, 0, 0));
      } else {
        elements.push(presets.x(x, y, s, 0, 0, ((Math.random() * 3) - 1) / 10, (Math.random() * 360)));
      }
    }
  }
}



$(document).ready(function() {
  $('.scrollspy').scrollSpy({ scrollOffset: 100 });
  console.log($('.scrollspy'))
  setInterval(function() {
    ctx.clearRect(0, 0, Canvas.width, Canvas.height);
    var time = new Date().getTime();
    for (var e in elements)
      elements[e].draw(ctx, time);
  }, 10);
});