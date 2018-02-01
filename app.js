var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var SUITS;
(function (SUITS) {
    SUITS[SUITS["BLAME"] = 0] = "BLAME";
    SUITS[SUITS["HEART"] = 1] = "HEART";
    SUITS[SUITS["DIAMONDS"] = 2] = "DIAMONDS";
    SUITS[SUITS["BAPTIZE"] = 3] = "BAPTIZE";
})(SUITS || (SUITS = {}));
var SUITS_NAME = (_a = {},
    _a[SUITS.BLAME] = 'BLAME',
    _a[SUITS.HEART] = 'HEART',
    _a[SUITS.DIAMONDS] = 'DIAMONDS',
    _a[SUITS.BAPTIZE] = 'BAPTIZE',
    _a);
var SUITS_RU_NAME = (_b = {},
    _b[SUITS.BLAME] = 'вини',
    _b[SUITS.HEART] = 'черви',
    _b[SUITS.DIAMONDS] = 'буби',
    _b[SUITS.BAPTIZE] = 'крести',
    _b);
//достоинство
var DIGNITY;
(function (DIGNITY) {
    DIGNITY[DIGNITY["SIX"] = 0] = "SIX";
    DIGNITY[DIGNITY["SEVEN"] = 1] = "SEVEN";
    DIGNITY[DIGNITY["EIGHT"] = 2] = "EIGHT";
    DIGNITY[DIGNITY["NINE"] = 3] = "NINE";
    DIGNITY[DIGNITY["TEN"] = 4] = "TEN";
    DIGNITY[DIGNITY["JACK"] = 5] = "JACK";
    DIGNITY[DIGNITY["DAME"] = 6] = "DAME";
    DIGNITY[DIGNITY["KING"] = 7] = "KING";
    DIGNITY[DIGNITY["ACE"] = 8] = "ACE";
})(DIGNITY || (DIGNITY = {}));
var DIGNITY_NAME = (_c = {},
    _c[DIGNITY.SIX] = 'SIX',
    _c[DIGNITY.SEVEN] = 'SEVEN',
    _c[DIGNITY.EIGHT] = 'EIGHT',
    _c[DIGNITY.NINE] = 'NINE',
    _c[DIGNITY.TEN] = 'TEN',
    _c[DIGNITY.JACK] = 'JACK',
    _c[DIGNITY.DAME] = 'DAME',
    _c[DIGNITY.KING] = 'KING',
    _c[DIGNITY.ACE] = 'ACE',
    _c);
var Card = (function () {
    function Card(config) {
        this.applyConfig(config);
    }
    Card.prototype.applyConfig = function (config) {
        Object.assign(this, config);
    };
    return Card;
}());
//helpers
function randomInteger(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
}
//helpers
function eachEnum(en) {
    return function (cb) {
        Object
            .keys(en)
            .filter(function (key) { return !isNaN(Number(en[key])); })
            .forEach(function (item) { return cb(item); });
    };
}
var Deck = (function () {
    function Deck() {
        this.deck = [];
        this.create();
    }
    Deck.prototype.create = function () {
        var _this = this;
        eachEnum(SUITS)(function (suit) {
            eachEnum(DIGNITY)(function (dignity) {
                _this.deck.push(new Card({ suit: SUITS[suit], dignity: DIGNITY[dignity] }));
            });
        });
    };
    Deck.prototype.mix = function () {
        var newDeck = [];
        var length = this.deck.length;
        for (var i = 1; i <= length; i++) {
            var index = randomInteger(0, length - i);
            var card = this.deck.splice(index, 1)[0];
            newDeck.push(card);
        }
        this.deck = newDeck;
    };
    return Deck;
}());
var Gamer = (function () {
    function Gamer(name) {
        this.winnings = 0;
        this.name = name;
    }
    Gamer.prototype.setCards = function (carts) {
        this.carts = carts;
    };
    Gamer.prototype.getCard = function () {
        return this.carts.splice(this.carts.length - 1, 1)[0];
    };
    Gamer.prototype.winn = function () {
        this.winnings++;
    };
    Gamer.prototype.getTemplate = function () {
        var container = document.createElement('div');
        container.classList.add('gamer');
        var name = document.createElement('div');
        name.classList.add('name');
        name.innerText = "\u0418\u0433\u0440\u043E\u043A : " + this.name;
        var count = document.createElement('div');
        count.classList.add('count');
        count.innerText = "\u0427\u0438\u0441\u043B\u043E \u043F\u043E\u0431\u0435\u0434 : " + this.winnings;
        var description = document.createElement('div');
        description.classList.add('description');
        description.innerHTML = "\u043A\u0430\u0440\u0442 \u043E\u0441\u0442\u0430\u043B\u043E\u0441\u044C : " + this.carts.length;
        container.appendChild(name);
        container.appendChild(count);
        container.appendChild(description);
        var lastCart = this.carts[this.carts.length - 1];
        if (lastCart) {
            var card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = "<img src=\"cards/" + SUITS_NAME[lastCart.suit] + "/" + DIGNITY_NAME[lastCart.dignity] + ".jpg\">";
            container.appendChild(card);
        }
        return container;
    };
    return Gamer;
}());
var Game = (function () {
    function Game() {
        this._gamers = [];
    }
    Game.prototype.run = function () {
        var _this = this;
        this.deck = new Deck();
        this.deck.mix();
        this.cardInOneGamer = Math.floor(this.deck.deck.length / this._gamers.length);
        this._gamers.forEach(function (gamer) {
            var deck = _this.deck.deck.splice(0, _this.cardInOneGamer);
            gamer.setCards(deck);
        });
        var trump = document.querySelector('#trump');
        trump.innerHTML = "\u041A\u043E\u0437\u044B\u0440\u044C " + SUITS_RU_NAME[this.trump];
        this.updateTable();
        return this;
    };
    Game.prototype.setTrump = function (trump) {
        this.trump = trump;
        return this;
    };
    Game.prototype.putGamers = function () {
        var gamers = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            gamers[_i] = arguments[_i];
        }
        this._gamers = gamers;
        return this;
    };
    Game.prototype.round = function () {
        if (!this._round) {
            this.cardInOneGamer--;
            this._round = function () {
                var table;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.cardInOneGamer) return [3 /*break*/, 2];
                            this.cardInOneGamer--;
                            table = [].concat(this._gamers.map(function (gamer) {
                                return { cart: gamer.getCard(), gamer: gamer };
                            }));
                            return [4 /*yield*/, table];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 0];
                        case 2: return [2 /*return*/];
                    }
                });
            };
        }
        return this._round();
    };
    Game.prototype.next = function () {
        var _this = this;
        var table = this.round().next();
        if (table.done) {
            this.checkWinner();
            return;
        }
        table.value.sort(function (a, b) {
            if (_this.isTrump(a.cart) && !_this.isTrump(b.cart)) {
                return 1;
            }
            else if (_this.isTrump(b.cart) && !_this.isTrump(a.cart)) {
                return -1;
            }
            else if (a.cart.dignity === b.cart.dignity)
                return 0;
            return a.cart.dignity > b.cart.dignity ? 1 : -1;
        });
        var winner = table.value.pop();
        winner.gamer.winn();
        alert("\u0431\u043E\u043B\u044C\u0448\u0430\u044F \u043A\u0430\u0440\u0442\u0430 \u0443 " + winner.gamer.name);
        this.updateTable();
    };
    Game.prototype.isTrump = function (cart) {
        return cart.suit === this.trump;
    };
    Game.prototype.checkWinner = function () {
        var winner = this._gamers.sort(function (a, b) { return a.winnings > b.winnings ? 1 : -1; }).pop();
        congratulateWinner(winner);
    };
    Game.prototype.updateTable = function () {
        var gamersTemplate = this._gamers.map(function (gamer) { return gamer.getTemplate(); });
        var container = document.querySelector('#gamers');
        container.innerHTML = '';
        gamersTemplate.forEach(function (template) {
            container.appendChild(template);
        });
    };
    return Game;
}());
function congratulateWinner(winner) {
    alert("\u043F\u043E\u0431\u0435\u0434\u0438\u043B \u0438\u0433\u0440\u043E\u043A " + winner.name + " \u0441 " + winner.winnings + " \u043F\u043E\u0431\u0435\u0434\u0430\u043C\u0438");
}
function randomSuits(array) {
    return array[randomInteger(0, array.length - 1)];
}
var game = new Game()
    .putGamers(new Gamer('Петя'), new Gamer('Андрей'), new Gamer('Дима'))
    .setTrump(randomSuits([SUITS.DIAMONDS, SUITS.BLAME, SUITS.HEART, SUITS.BAPTIZE]))
    .run();
var button = document.querySelector('#events');
button.addEventListener('click', function () {
    game.next();
});
var _a, _b, _c;
