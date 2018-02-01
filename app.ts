enum SUITS {
    BLAME, //вини
    HEART, //черви
    DIAMONDS, //буби
    BAPTIZE, //крести
}

let SUITS_NAME = {
    [SUITS.BLAME] : 'BLAME',
    [SUITS.HEART] : 'HEART',
    [SUITS.DIAMONDS] : 'DIAMONDS',
    [SUITS.BAPTIZE] : 'BAPTIZE',
};

let SUITS_RU_NAME = {
    [SUITS.BLAME] : 'вини',
    [SUITS.HEART] : 'черви',
    [SUITS.DIAMONDS] : 'буби',
    [SUITS.BAPTIZE] : 'крести',
};

//достоинство
enum DIGNITY {
    SIX, //шесть
    SEVEN, //семь
    EIGHT, //восемь
    NINE, //девять
    TEN, //десять
    JACK, //валет
    DAME, //дама
    KING, //король
    ACE, //туз
}

let DIGNITY_NAME = {
    [DIGNITY.SIX] : 'SIX',
    [DIGNITY.SEVEN] : 'SEVEN',
    [DIGNITY.EIGHT] : 'EIGHT',
    [DIGNITY.NINE] : 'NINE',
    [DIGNITY.TEN] : 'TEN',
    [DIGNITY.JACK] : 'JACK',
    [DIGNITY.DAME] : 'DAME',
    [DIGNITY.KING] : 'KING',
    [DIGNITY.ACE] : 'ACE',
};

interface CartInterface {
    suit : any;
    dignity : any;
}

class Card implements CartInterface {
    suit : any;
    dignity : any;

    constructor(config : CartInterface) {
        this.applyConfig(config);
    }

    applyConfig(config : CartInterface) {
        Object.assign(this, config)
    }
}


//helpers
function randomInteger(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
}

//helpers
function eachEnum(en) : (cb) => any {
    return function (cb : (item) => any) {
        Object
            .keys(en)
            .filter(key => !isNaN(Number(en[key])))
            .forEach((item) => cb(item));
    }
}

class Deck {
    deck : Array<CartInterface> = [];

    constructor() {
        this.create();
    }

    create() {
        eachEnum(SUITS)((suit : any) => {
            eachEnum(DIGNITY)((dignity) => {
                this.deck.push(new Card({suit : SUITS[suit], dignity : DIGNITY[dignity]}));
            })
        });
    }

    mix() {
        let newDeck = [];
        let length = this.deck.length;
        for (let i = 1; i <= length; i++) {
            let index = randomInteger(0, length - i);
            let card = this.deck.splice(index, 1)[0];
            newDeck.push(card);
        }
        this.deck = newDeck as Array<CartInterface>;
    }

}

interface GamerInterface {
    winnings : number;
    name : string;

    getTemplate();

    setCards(carts : Array<CartInterface>);

    getCard() : CartInterface;

    winn() : void;
}

interface TableItemInterface {
    cart : CartInterface,
    gamer : GamerInterface,
}

class Gamer {
    carts;
    winnings = 0;
    name : string;

    constructor(name : string) {
        this.name = name;
    }

    setCards(carts) {
        this.carts = carts;
    }

    getCard() : CartInterface {
        return this.carts.splice(this.carts.length - 1, 1)[0];
    }

    winn() {
        this.winnings++;
    }

    getTemplate() {
        let container = document.createElement('div');
        container.classList.add('gamer');

        let name = document.createElement('div');
        name.classList.add('name');
        name.innerText = `Игрок : ${this.name}`;

        let count = document.createElement('div');
        count.classList.add('count');
        count.innerText = `Число побед : ${this.winnings}`;

        let description = document.createElement('div');
        description.classList.add('description');
        description.innerHTML = `карт осталось : ${this.carts.length}`;

        container.appendChild(name);
        container.appendChild(count);
        container.appendChild(description);

        let lastCart = this.carts[this.carts.length - 1];

        if (lastCart) {
            let card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `<img src="cards/${SUITS_NAME[lastCart.suit]}/${DIGNITY_NAME[lastCart.dignity]}.jpg">`;
            container.appendChild(card);
        }

        return container;
    }
}

class Game {
    private _gamers : Array<GamerInterface> = [];
    private deck;
    _round;

    //козырь
    protected trump;

    cardInOneGamer;

    run() {
        this.deck = new Deck();
        this.deck.mix();

        this.cardInOneGamer = Math.floor(this.deck.deck.length / this._gamers.length);

        this._gamers.forEach((gamer) => {
            let deck = this.deck.deck.splice(0, this.cardInOneGamer);
            gamer.setCards(deck);
        });

        let trump = document.querySelector('#trump');
        trump.innerHTML = `Козырь ${SUITS_RU_NAME[this.trump]}`;

        this.updateTable();
        return this;
    }

    setTrump(trump) {
        this.trump = trump;
        return this;
    }

    putGamers(...gamers) {
        this._gamers = gamers;
        return this;
    }

    round() : any {
        if (!this._round) {
            this.cardInOneGamer--;
            this._round = function* () {
                while (this.cardInOneGamer) {
                    this.cardInOneGamer--;
                    let table = [].concat(
                        this._gamers.map(gamer => {
                            return {cart : gamer.getCard(), gamer : gamer}
                        })
                    );
                    yield table;
                }
            };
        }

        return this._round();
    }

    next() {
        let table : { value : Array<TableItemInterface>, done : boolean } = this.round().next();

        if (table.done) {
            this.checkWinner();
            return;
        }

        table.value.sort((a, b) => {
            if (this.isTrump(a.cart) && !this.isTrump(b.cart)) {
                return 1;
            } else if (this.isTrump(b.cart) && !this.isTrump(a.cart)) {
                return -1
            } else if (a.cart.dignity === b.cart.dignity) return 0;

            return a.cart.dignity > b.cart.dignity ? 1 : -1;
        });

        let winner = table.value.pop();

        winner.gamer.winn();

        alert(`большая карта у ${winner.gamer.name}`);

        this.updateTable();
    }

    isTrump(cart : CartInterface) {
        return cart.suit === this.trump;
    }

    checkWinner() {
        let winner = this._gamers.sort((a, b) => a.winnings > b.winnings ? 1 : -1).pop();
        congratulateWinner(winner);
    }

    updateTable() {
        let gamersTemplate = this._gamers.map((gamer) => gamer.getTemplate());
        let container = document.querySelector('#gamers');

        container.innerHTML = '';
        gamersTemplate.forEach((template) => {
            container.appendChild(template);
        })
    }
}

function congratulateWinner(winner : GamerInterface) {
    alert(`победил игрок ${winner.name} с ${winner.winnings} победами`)
}

function randomSuits(array) {
    return array[randomInteger(0, array.length - 1)];
}

let game = new Game()
    .putGamers(new Gamer('Петя'), new Gamer('Андрей'), new Gamer('Дима'))
    .setTrump(randomSuits([SUITS.DIAMONDS, SUITS.BLAME, SUITS.HEART, SUITS.BAPTIZE]))
    .run();

let button = document.querySelector('#events');

button.addEventListener('click', function () {
    game.next();
});
