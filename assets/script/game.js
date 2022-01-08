let game = {

    cards : null,
    first: null,
    second: null,
    lock: false,

    crypto : [
        "ada",
        "avax",
        "bnb",
        "btc",
        "doge",
        "dot",
        "eth",
        "link",
        "shiba",
        "sol"
        ],

    setCard: function(id){
        
        let card = this.cards.filter(card => card.id===id)[0];
        
        if(card.flipped || this.lock){
            return false;
        }

        if(!this.first){
            this.first = card;
            this.first.flipped = true;
            return true;
        }
        else{
            this.second = card;
            this.second.flipped = true;
            this.lock = true;
            return true;
        }
    },
    check: function(){
        if(!this.first || !this.second){
            return false;
        }
            return this.first.icon === this.second.icon;
    },

    clear: function(){
        this.first = null;
        this.second = null;
        this.lock = false;
    },
    unflip: function(){
        this.first.flipped = false;
        this.second.flipped = false;
        this.clear();
    },
    
    createCard: function(){

        this.cards = []; 

        for(let index of this.crypto){ 

            this.cards.push(this.createPair(index)); 
        }
            this.cards = this.cards.flatMap(xd => xd);
            this.shuffle();
    },

    createPair: function(crypto){

        return [
            {
                id: this.createID(crypto),
                icon: crypto,
                flipped: false
            },
            {
                id: this.createID(crypto),
                icon: crypto,
                flipped: false
            }
        ];
    },

    createID: function(crypto){

        return crypto + parseInt(Math.random() * 1000);
    },

    shuffle: function(cards){

        let random = 0;
        let i = this.cards.length;

        while(i !== 0){

            random = Math.floor(Math.random() * i);
            i--;
            [this.cards[random], this.cards[i]] = [this.cards[i], this.cards[random]];
        }
    },
    checkGameOver: function(){

        return this.cards.filter(card => !card.flipped).length == 0;

    }
}
    