import Player from './player.js'

export default class Graphic {
  constructor(id = "graphic") {
    this.graphicElm = document.getElementById(id)
    this.ctx = this.graphicElm.getContext("2d")
    this.data = [
      /*{ name: "nombre1", rank: [1, 2, 3, 2, 1, 4] } ,
      { name: "nombre2", rank: [2, 1, 2, 3, 4, 5] },
      { name: "nombre3", rank: [3, 3, 1, 1, 2, 3] },
      { name: "nombre4", rank: [4, 5, 4, 5, 3, 2] },
      { name: "nombre5", rank: [5, 5, 5, 5, 4, 5] } */
      { name: "nombre1", rank: [1, 2, 1, 2, 1, 2], image: "./img/uno.jpg" },
      { name: "nombre2", rank: [2, 3, 3, 4, 5, 5] },
      { name: "nombre3", rank: [3, 1, 2, 1, 4, 3] },
      { name: "nombre4", rank: [4, 5, 4, 5, 3, 4] },
      { name: "nombre5", rank: [5, 4, 5, 3, 2, 1] },
      { name: "nombre6", rank: [6, 6, 6, 6, 6, 6] }
    ]
    this.ticks = 0

    this.matchDay = 0
    this.rows = this.data.length
    this.collumns = this.data[0].rank.length
    this.players = this.createPlayers()
    this.height = this.rows * 30 + 5
    this.width = this.collumns * 30 + 5
    this.graphicElm.width = this.width
    this.graphicElm.height = this.height

    this.intervalID = setInterval(function () {
      this.drawBackground(this.ctx)
      this.movePlayers(this.ctx)
      this.is_finish()
    }.bind(this), 1000 / 60)
  }

  createPlayers() {
    return this.data.map((e, i) => new Player(e.name, e.rank, e.image, i))
  }

  movePlayers(ctx) {
    this.players.forEach(p => p.movePlayer(ctx, this.ticks))
  }

  drawBackground(ctx) {
    ctx.fillStyle = "#50c"
    ctx.fillRect(0, 0, this.width, this.height)
  }

  is_finish() {
    if (Math.trunc(Math.trunc(this.ticks) / 30) >= this.data[0].rank.length - 1) {
      clearInterval(this.intervalID)
    } else {
      this.ticks += 0.3

      if (this.ticks > 150) {
        this.ticks = 150
      }
    }
  }

}
//1 2 3 ... 30 31 32 33 ... 60
//0          1               2
//https://docs.w3cub.com/dom/mediastream_recording_api/recording_a_media_element

