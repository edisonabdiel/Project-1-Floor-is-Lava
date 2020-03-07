window.onload = () => {
    let canvas = document.getElementById('canvas')
    let ctx = canvas.getContext('2d')
    let lava = new Image()
    lava.src = 'src/Lava_Flow_icon.png'
    document.getElementById('start-btn').onclick = () => {
        startGame();
    }


    let rectCharacter = {
        x: 40,
        y: 500,
        width: 20,
        height: 50,
        speed: 0,
        update: function () {
            this.y += this.speed
            ctx.fillRect(this.x, this.y, this.width, this.heigth)
        },
        button: function () {
            return this.y + this.height
        },
        backSpaceUp: function () {
            this.speed = -2
            setTimeout(() => { this.speed = 2 }, 500)
        },
    }

    class Obstacle {
        constructor() {
            this.x = 900
            this.y = Math.floor(Math.random() * (880 - 200 + 1) + 200)
            this.width = Math.floor(Math.random() * (80 - 40 + 1) + 40)
            this.heigth = 15
        }
        update = () => {
            ctx.fillRect(this.x, this.y, this.width, this.heigth)
            this.x -= 2
        }
    }

    let obstacleArr = []
    let frameCounter = 0
    let draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(lava, -5, canvas.height - 93, canvas.width + 10, 100);

        frameCounter++
        obstacleArr.forEach((o) => {
            o.update()
        })
        if ((frameCounter % 120) === 0) {
            obstacleArr.push(new Obstacle())
        }
        window.requestAnimationFrame(draw)
    }




    function startGame() {
        draw()
    }
};


