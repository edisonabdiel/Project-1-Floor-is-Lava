window.onload = () => {
    let score = document.querySelector("span")
    let canvas = document.getElementById("canvas")
    let ctx = canvas.getContext("2d")
    let lava = new Image()
    lava.src = "src/lava.png"
    let monkey = []
    let rock = new Image()
    rock.src = "src/rock.png"
    let spiky = new Image()
    let soundTrack = new Audio("src/sounds/floorislava.wav")
    let jump = new Audio("src/sounds/jumpSound.wav")
    spiky.src = "src/spiky.png"
    for (i = 0; i < 7; i++) {
        monkey.push(new Image())
    }
    monkey[0].src = "src/tile000.png"
    monkey[1].src = "src/tile001.png"
    monkey[2].src = "src/tile002.png"
    monkey[3].src = "src/tile003.png"
    monkey[4].src = "src/tile004.png"
    monkey[5].src = "src/tile005.png"
    monkey[6].src = "src/tile006.png"
    document.getElementById('start-btn').onclick = () => {
        playMusic()
        startGame();
    };
    document.getElementById('reset-btn').onclick = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        onload()
    }
    let rectCharacter = {
        x: 130,
        y: 400,
        width: 50,
        height: 100,
        speed: 0,
        gravity: 0.6,
        update: function () {
            this.speed += this.gravity
            this.y += this.speed
            ctx.drawImage(monkey[index], this.x, this.y, this.width, this.height)
        },
        bottom: function () {
            return this.y + this.height
        },
        backSpaceUp: function () {
            this.speed = -13    // setTimeout(() => { jump.pause()}, 200)
        },
        top: function () {
            return this.y
        },
        left: function () {
            return this.x
        },
        bottom: function () {
            return this.y + this.height
        },
        right: function () {
            return this.x + this.width
        },
        crashWith: function (obstacle) {
            return this.speed >= 0 && (this.bottom() < obstacle.top() + 20) && !(
                this.bottom() < obstacle.top() ||
                this.top() > obstacle.bottom() ||
                this.right() < obstacle.left() ||
                this.left() > obstacle.right()
            );
        },
        hitBottom: function () {
            if (this.bottom() >= 670) {
                gamerunnig = false
            }
        },
        clear: function () {
            ctx.clearRect(this.x, this.y, this.width, this.height)
        }
    }
    class Obstacle {
        constructor(x, y, width, height, speed) {
            this.x = x
            this.y = y
            this.width = width
            this.height = height
            this.speed = speed
        }
        update() {
            ctx.drawImage(rock, this.x, this.y, this.width, this.height)
            this.x -= this.speed
        }
        top() {
            return this.y
        }
        left() {
            return this.x
        }
        bottom() {
            return this.y + this.height
        }
        right() {
            return this.x + this.width
        }
    }
    class spikyObstacle extends Obstacle {
        constructor(x, y, width, height, speed) {
            super(x, y, width, height, speed)
        }
        update() {
            ctx.drawImage(spiky, this.x, this.y, this.width, this.height)
            this.x -= this.speed
        }
    }
    let lives = 3
    let obstacleArr = []
    let frameCounter = 0
    let spikyObstacArr = []
    let index = 0 //To print the different pictures for the monkey 
    let gamerunnig = true
    currentCrashSpiky = false
    let draw = () => {
        if (!gamerunnig) {
            soundTrack.pause()
            return
        }
        score.innerText = frameCounter
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(lava, -5, canvas.height - 93, canvas.width + 10, 100)
        index = frameCounter % monkey.length
        //rectCharacter.update
        rectCharacter.hitBottom()
        frameCounter++
        let currentCrashObstacle = false
        obstacleArr.forEach((o) => {
            if (rectCharacter.crashWith(o)) {
                currentCrashObstacle = true
            }
            o.update()
        })
        spikyObstacArr.forEach((o) => {
            if (rectCharacter.crashWith(o)) {
                currentCrashSpiky = true
            }
            o.update()
        })
        if (currentCrashObstacle) {
            rectCharacter.speed = 0;
            rectCharacter.gravity = 0;
            countjump = 0
        } else {
            rectCharacter.gravity = 0.6;
        }
        if (currentCrashSpiky) {
            soundTrack.pause()
            return
        }
        rectCharacter.update()
        if ((frameCounter % 25) === 0) {
            obstacleArr.push(new Obstacle(900, Math.floor(Math.random() * (560 - 200 + 1) + 200), Math.floor(Math.random() * (200 - 70 + 1) + 70), 30, 6))
        }
        if ((frameCounter % 60) === 0) {
            spikyObstacArr.push(new spikyObstacle(900, Math.floor(Math.random() * (560 - 200 + 1) + 200), Math.floor(Math.random() * (200 - 70 + 1) + 70), 30, 11))
        }
        window.requestAnimationFrame(draw)
    }
    function startGame() {
        rectCharacter.update()
        obstacleArr.push(new Obstacle(rectCharacter.x, rectCharacter.bottom(), 700, 30, 6))
        draw()
    }
    function playMusic() {
        soundTrack.addEventListener('ended', function () {
            this.currentTime = 0;
            this.play();
        }, false);
        soundTrack.play()
    }
    let countjump = 0
    document.onkeydown = function (e) {
        switch (e.keyCode) {
            case 38:
                countjump++
                console.log("corona")
                jump.pause()
                jump.play()
                if (countjump <= 2) {
                    rectCharacter.backSpaceUp();
                }
                break;
        }
    }
};