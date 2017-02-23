(function (AFRAME) {

  /**
   * Draw multi line text. Note that overflow in horizontal axis is not handled automatically.
   * Font size must be specified in px unit.
   */
  function drawMultiLineText(context, text) {

    let matchRes = context.font.match(/(\d+)px/);

    // extract font size
    let fontSize = matchRes ? Number(matchRes[1]) : 10;

    let x = getDrawTextX(context);
    let y = fontSize;

    text.split(/\n/).forEach(line => {
      context.fillText(line, x, y);
      y += fontSize;
    });
  }

  function getDrawTextX(context) {

    switch (context.textAlign) {
      case 'start': return 0;
      case 'center': return context.canvas.width * 0.5;
      case 'right': return context.canvas.width;
    }

    throw new Error('Unknown textAlign: ' + context.textAlign);
  }

  AFRAME.registerComponent('canvas-text', {
    dependencies: ['canvas-material'],
    schema: {
      text: {
        type: 'string'
      },
      font: {
        type: 'string'
      },
      strokeStyle: {
        type: 'string'
      },
      fillStyle: {
        type: 'string'
      },
      textAlign: {
        type: 'string'
      },
      textBaseline: {
        type: 'string'
      },
      direction: {
        type: 'string'
      },
      shadowBlur: {
        type: 'number'
      },
      shadowColor: {
        type: 'string'
      },
      shadowOffsetX: {
        type: 'number'
      },
      shadowOffsetY: {
        type: 'number'
      }
    },
    update: function () {
      let canvasMaterial = this.el.components['canvas-material'];
      let w = canvasMaterial.data.width;
      let h = canvasMaterial.data.height;

      this.ctx = canvasMaterial.getContext();
      this.ctx.clearRect(0, 0, w, h);

      // Apply data
      this.ctx.font = this.data.font;
      this.ctx.strokeStyle = this.data.strokeStyle;
      this.ctx.fillStyle = this.data.fillStyle;
      this.ctx.textAlign = this.data.textAlign;
      this.ctx.textBaseline = this.data.textBaseline;
      this.ctx.direction = this.data.direction;
      this.ctx.shadowBlur = this.data.shadowBlur;
      this.ctx.shadowColor = this.data.shadowColor;
      this.ctx.shadowOffsetX = this.data.shadowOffsetX;
      this.ctx.shadowOffsetY = this.data.shadowOffsetY;

      drawMultiLineText(this.ctx, this.data.text);

      canvasMaterial.updateTexture();
    }
  });

})(AFRAME);