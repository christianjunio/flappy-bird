// Aqui teremos a programação do Flappy Bird :D
const sprites = new Image()
sprites.src = './sprites.png'

const canvas = document.querySelector("#game-canvas")
const contexto = canvas.getContext('2d')
const som_punch = new Audio()
som_punch.src = './som/punch.wav'

const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 35,
    altura: 25,
    x: 10,
    y: 50,
    desenha() {
        contexto.drawImage(
            sprites,
            this.spriteX, this.spriteY,
            this.largura, this.altura,
            this.x, this.y,
            this.largura, this.altura
        )
    },
    velocidade: 0,
    gravidade: 0.25,
    atualiza() {
        if(fazColisao()) {
            som_punch.play()
            telaAtiva = TelaInicio
            return
        }
        this.velocidade += this.gravidade
        this.y = this.y + this.velocidade
    },
    pulo: 4.6,
    pula() {
        this.velocidade = -this.pulo
    }
}



const planoDeFundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 276,
    altura: 204,
    x: 0,
    y: 280,
    desenha() {
        contexto.fillStyle = "#70c5ce"
        contexto.fillRect(0,0, canvas.width, canvas.height)
        contexto.drawImage(
            sprites,
            this.spriteX, this.spriteY,
            this.largura, this.altura,
            this.x, this.y,
            this.largura, this.altura
        )

        contexto.drawImage(
            sprites,
            this.spriteX, this.spriteY,
            this.largura, this.altura,
            this.x + this.largura, this.y,
            this.largura, this.altura
        )
    }
}

const chao = {
    spriteX: 0,
    spriteY: 600,
    largura: 224,
    altura: 112,
    x: 0,
    y: 368,
    desenha() {
        contexto.drawImage(
            sprites,
            this.spriteX, this.spriteY,
            this.largura, this.altura,
            this.x, this.y,
            this.largura, this.altura
        )

        contexto.drawImage(
            sprites,
            this.spriteX, this.spriteY,
            this.largura, this.altura,
            this.x + this.largura, this.y,
            this.largura, this.altura
        )
    }
}

const inicio = {
    spriteX: 130,
    spriteY: 0,
    largura: 180,
    altura: 152,
    x: 70,
    y: 70,
    desenha() {
        contexto.drawImage(
            sprites,
            this.spriteX, this.spriteY,
            this.largura, this.altura,
            this.x, this.y,
            this.largura, this.altura
        )
    }
}

function fazColisao() {
    if (flappyBird.y >= 350) {
        return true
    } else {
        return false
    }
}

function mudaTelaAtiva() {
    telaAtiva.click()
}

window.addEventListener("click", mudaTelaAtiva)

const TelaInicio = {
    desenha() {
        planoDeFundo.desenha()
        chao.desenha()
        flappyBird.desenha()
        inicio.desenha()
    },
    click() {
        telaAtiva = TelaJogo
    }
}

const TelaJogo = {
    desenha() {
        planoDeFundo.desenha()
        chao.desenha()
        flappyBird.desenha()
        flappyBird.atualiza()
    },
    click() {
        flappyBird.pula()
    }
}

var telaAtiva = TelaInicio

function loop() {
    telaAtiva.desenha()

    requestAnimationFrame(loop)
}

loop()