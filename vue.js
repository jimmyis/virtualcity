Vue.component('game-board', {
    data() {
        return {
            centerpanel: {
                mode: 'home',
                payload: 1,
            }
        }
    },
    props: ['gameModes', 'blocks', 'players', 'changePlayerState'],
    template: `
    <div
        :style="{width: boardSize + 'px', height: boardSize + 'px'}"
    >
        <block 
            v-for="(block, index) in blocks" 
            :key="block.name"
            v-bind="{ gameModes, block, players }"
            @viewblockinfo="viewBlockInfo"
            @mouseoff="mouseOff"
            class="tile"
            :class="'tile-' + block.pos"
            :style="{
                top: ((block.posY - 1) * tileSize) + 'px', 
                left: ((block.posX - 1) * tileSize)  + 'px',
                width: tileSize + 'px',
                height: tileSize + 'px',
            }"
        >
        </block>
        <center-panel
            :mode="centerpanel.mode"
            :payload="centerpanel.payload"
            v-bind="{ gameModes, players, changePlayerState }"
        ></center-panel>
    </div>
    `,
    methods: {
        viewBlockInfo(blockpos) {
            this.centerpanel.mode = 'viewblockinfo';
            this.centerpanel.payload = blockpos;
        },
        mouseOff() {
            this.centerpanel.mode = 'home';
            this.centerpanel.payload = null;
        }
    },
});

Vue.component('actions', {

});

Vue.component('dice', {
    data() {
        return {
            diceside: 6,
        }
    },
    props: ['changePlayerState'],
    template: `<div>
        <div>Dice {{ diceside }}</div>
        <button @click="dicing">Dicing</div>
    </div>`,
    methods: {
        dicing() {
            var move = dice.roll();
            this.diceside = move;
            this.changePlayerState('diceRolled', move);
        },
    }
})

Vue.component('info', {

});

Vue.component('center-panel', {
    props: ['gameModes', 'mode', 'payload', 'changePlayerState'],
    template: `
    <div
        id="center-panel"
        :style="{ 
            width: (boardSize - (tileSize * 2)) + 'px', 
            margin: tileSize + 'px',
        }"
    >
        <div v-if="mode == 'home'">
            Center Panel {{ payload }}
            <dice
                v-if="gameModes.playable === true "
                v-bind="{ changePlayerState }"
            ></dice>
        </div>
        <div v-else-if="mode == 'viewblockinfo'">
            Viewing block {{ payload }}
        </div>
    </div>
    `,
    methods: {
        diceRolled(move) {
            this.$emit('changePlayerState', 'diceRolled', move)
        }
    }
});

Vue.component('player', {
    props: ['player'],
    template: `<p>{{ player.alias }}</p>`
});

Vue.component('block', {
    props: ['block', 'index', 'players'],
    template: `<div
        @click="mouseOver"
        @mouseleave="mouseLeave"
    >
        {{ index }} {{ block.name }}
        <player
            v-for="(player, index) in players"
            v-if="player.pos == block.pos"
            :player="player"
        ></player>
    </div>
    `,
    methods: {
        mouseOver() {
            this.$emit('viewblockinfo', this.block.pos)
        },
        mouseLeave() {
            this.$emit('mouseoff');
        },
    }
});

var vm = new Vue({
    el: '#app',
    template: `
    <div>
        <game-board
            id="game-board"
            v-bind="{ gameModes, blocks, players, changePlayerState }"
        ></game-board>
        <div id="side-panel">
            <h1>Virtual City</h1>
            <h2 v-cloak id="playerAlias">{{ playerAlias }}</h2>
            <h3 v-if="timerCount > 0">{{ timerCount }}</h3>
            <input v-model="newAlias" placeholder="Set new alias"></input>
            <button @click="setAlias">Set New Alias</button>
        </div>
    </div>
    `,
    data() {
        return {
            gameModes: { 
                playable: false,
            },
            timerCount: 10,
            isTimerActive: true,
            playerAlias: 'Anonymous',
            newAlias: '',
            players: {
                player1: {
                    alias: 'player1',
                    pos: 1,
                },
                player2: {
                    alias: 'player2',
                    pos: 2,
                }
            },
            blocks: { 
                block1: {
                    name: 'Home',
                    pos: 1,
                    posX: 1,
                    posY: 1,
                },
                block2: {
                    name: '2',
                    pos: 2,
                    posX: 2,
                    posY: 1,
                },
                block3: {
                    name: '3',
                    pos: 3,
                    posX: 3,
                    posY: 1,
                },
                block4: {
                    name: '4',
                    pos: 4,
                    posX: 4,
                    posY: 1,
                },
                block5: {
                    name: '5',
                    pos: 5,
                    posX: 5,
                    posY: 1,
                },
                block6: {
                    name: '6',
                    pos: 6,
                    posX: 5,
                    posY: 2,
                },
                block7: {
                    name: '7',
                    pos: 7,
                    posX: 5,
                    posY: 3,
                },
                block8: {
                    name: '8',
                    pos: 8,
                    posX: 5,
                    posY: 4,
                },
                block9 : {
                    name: '9',
                    pos: 9,
                    posX: 5,
                    posY: 5,
                },
                block10: {
                    name: '10',
                    pos: 10,
                    posX: 4,
                    posY: 5,
                },
                block11: {
                    name: '11',
                    pos: 11,
                    posX: 3,
                    posY: 5,
                },
                block12: {
                    name: '12',
                    pos: 12,
                    posX: 2,
                    posY: 5,
                },
                block13: {
                    name: '13',
                    pos: 13,
                    posX: 1,
                    posY: 5,
                },
                block14: {
                    name: '14',
                    pos: 14,
                    posX: 1,
                    posY: 4,
                },
                block15: {
                    name: '15',
                    pos: 15,
                    posX: 1,
                    posY: 3,
                },
                block16: {
                    name: '16',
                    pos: 16,
                    posX: 1,
                    posY: 2,
                },
            },
        }
    },
    methods: {
        changePlayerState(type, val) {
            if (type === 'diceRolled') {
                var current = 'player1'; // TEMP
                var posUpdate = this.players[current].pos + val;
                var newPos;
                if (posUpdate > totalBlocks) {
                    newPos = posUpdate - totalBlocks;
                } else {
                    newPos = posUpdate;
                }
                this.players[current].pos = newPos;
            }
            // Trigger event on new position

            // Reset timer
            this.timerCount = 10;
        },
        timer() {
            var self = this;
            var counter;
            function countDown() {
                if (self.timerCount == 0) {
                    self.gameModes.playable = true;
                } else {
                    self.timerCount--;
                }
            }

            // toggle timer
            self.isTimerActive ? counter = setInterval(countDown, 1000) : clearInterval(counter);
            self.isTimerActive = !self.isTimerActive;
        },
        setAlias() {
            if (this.newAlias !== '' && this.newAlias !== this.playerAlias) {
                VirtualCityContract.setAlias(this.newAlias, function(e, r) {
                    if (e) {
                        alert(e);
                        return;
                    }
                    this.status("TxHash = <a href='https://kovan.etherscan.io/tx/" + r + "' target='_blank'>" + r + "</a>");
                })
            }
        },
    },
    mounted() {
        this.timer();
        VirtualCityContract.getAlias(function(e, r) {
            vm.playerAlias = web3.toAscii(r);
        });
    }
});