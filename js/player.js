export default class Player {
  constructor(name, rank, image, i, size = 25, padding = 5) {
    this.name = name
    this.rank = rank
    this.x = 0
    this.y = 0
    this.size = size
    this.padding = padding
    this.w = this.h = this.size + this.padding
    this.distance = this.size + this.padding
    this.i = i
    if (image == "" || image == undefined) {

      this.imageSrc = `https://via.placeholder.com/${this.size}`
    } else {
      this.imageSrc = image
    }
  }

  movePlayer(ctx, ticks) {
    let image = document.createElement("img")
    image.src = this.imageSrc
    this.j = Math.trunc(Math.trunc(ticks) / this.distance)
    let currPos = this.rank[this.j]
    let nextPos = this.rank.length - 1 <= this.j ? this.rank[this.j] : this.rank[this.j + 1]
    this.y = currPos * this.distance + (ticks - this.j * this.distance) * (nextPos - currPos) - 25
    let incY = currPos * this.distance + (ticks - this.j * this.distance) * (nextPos - currPos) - 25
    let incX = ticks + Math.abs(Math.sin((ticks * 6 * Math.PI / 180)) / 2) * 10

    this.drawLine(ctx, incX, incY, this.j, this.i)
    ctx.drawImage(image, 0, 0, this.size, this.size, incX, incY, this.size, this.size)

    incY += Math.abs(Math.sin((ticks * 6 * Math.PI / 180)) / 2) * 10 * (nextPos - currPos)
    incX += this.padding
    if (incX > 180) {
      incX = 180
    }
  }

  drawLine(ctx, velocity, y, j, i) {
    ctx.beginPath()
    ctx.lineWidth = 5
    ctx.strokeStyle = `rgb(${25 * i}, ${35 * i}, ${25 * i})`
    ctx.moveTo(this.size / 2 - ctx.lineWidth / 2, this.rank[0] * (this.size + this.padding) - this.center() + ctx.lineWidth / 2)

    for (let i = 1; i <= j; i++) {
      ctx.lineTo(i * 30 + this.center() - ctx.lineWidth / 2, this.rank[i] * 30 - this.center() + ctx.lineWidth / 2)
    }

    if (j < this.rank.length - 1) {
      ctx.lineTo(velocity + this.center() - ctx.lineWidth / 2, y + this.center() - ctx.lineWidth / 2)
    }

    ctx.stroke()
  }

  center() { return (this.size + this.padding) / 2 }
}

export { Player }

