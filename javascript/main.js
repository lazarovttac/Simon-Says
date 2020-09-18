

const btn_lightBlue = document.getElementById('celeste')
const btn_purple = document.getElementById('violeta')
const btn_oranje = document.getElementById('naranja')
const btn_green = document.getElementById('verde')
const btn_start = document.getElementById('btnEmpezar')

const MAX_LEVEL = 10;

class Game {
    constructor() {
        this.initialize = this.initialize.bind(this)
        this.initialize();
        this.generateSequence();
        this.colors = [
            btn_lightBlue,
            btn_purple,
            btn_oranje,
            btn_green
        ]

        setTimeout(this.nextLevel, 500)
    }

    initialize() {
        this.nextLevel = this.nextLevel.bind(this)
        this.chooseColor = this.chooseColor.bind(this)
        this.level = 1;
        this.toggleStartButton();
        
    }

    nextLevel() {
        this.subLevel = 0
        this.showSequence();
        this.turnButtonsOn();
    }

    generateSequence() {
        //Creamos un array --- new Array()
        //Establecemos todos sus valores en 0 --- .fill(0)
        //Reemplazamos cada volor con un decimal entre 0 y 3 --- Math.random() * 4
        //Redondeamos ese número decimal para abajo --- Math.floor()
        this.sequence = new Array(MAX_LEVEL).fill(0).map(n => Math.floor(Math.random() * 4));
        console.log(`The sequence is: ${this.sequence}`);
    }

    showSequence() {
        for (let index = 0; index < this.level; index++) {
            setTimeout(() => this.showColor(this.sequence[index]), index * 1000);
        }
    }


    showColor(color) {
        this.colors[color].classList.add('light');
        setTimeout(() => this.hideColor(color), 350);
    }

    hideColor(color){
        this.colors[color].classList.remove('light');
    }

    chooseColor(event) {
        const clickedColor = event.target.dataset.color;
        this.showColor(clickedColor);

        if(clickedColor == this.sequence[this.subLevel]) {
            this.subLevel++;

            if(this.subLevel == this.level) {
                this.turnButtonsOff();
                this.level++;

                if(this.level == (MAX_LEVEL + 1)) {
                    this.win();
                }else {
                   this.winLevel();
                }
            }
        }else {
            this.lose();
        }
    }

    winLevel() {
        setTimeout(this.nextLevel, 800);
    }

    win() {
        swal("Platzi", "You Win!", "success")
        .then(() => {
            this.initialize();
        })
    }
    lose() {
        swal("Platzi", "You Lose!", "error")
        .then(() => {
            this.turnButtonsOff();
            this.initialize();
        })
    }

    turnButtonsOn() {
        this.colors.forEach(item => item.addEventListener('click', this.chooseColor))
    }
    turnButtonsOff() {
        this.colors.forEach(item => item.removeEventListener('click', this.chooseColor))

    }

    toggleStartButton() {
        if(btn_start.classList.contains("hide")) {
            btnEmpezar.classList.remove('hide');
        }else {
            btnEmpezar.classList.add('hide');
        }
    }
}

function startGame() {
    const game = new Game();
}