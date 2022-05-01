var heroImg = document.getElementById('hrdina');
var hero2Img = document.getElementById('hrdina2');
var hero3Img = document.getElementById('hrdina3');
hero2Img.style.display = 'none';
hero3Img.style.display = 'none';
var enemyImg = document.getElementById('enemy');
var enemy2Img = document.getElementById('enemy2');
var enemy3Img = document.getElementById('enemy3');
enemy2Img.style.display= 'none';
enemy3Img.style.display= 'none';
var heroHealthBar = document.getElementById('heroHealthBar');
var enemyHealthBar = document.getElementById('enemyHealthBar');
var menu = document.getElementById('menu');

let enemyHealth;
let stillEnemyHealth;
let heroHealth;
let stillHeroHealth;
let chance = 60; // 50%
let successBlock = false;

function showhrdina2(){
    heroImg.style.display = 'none';
    hero2Img.style.display = '';
}

function showhrdina3(){
    hero2Img.style.display = 'none';
    hero3Img.style.display = '';
}

function showhrdina(){
    hero3Img.style.display = 'none';
    heroImg.style.display = '';
}

function hrdinazpet(){
    heroImg.style.left ='20px';
    enemyImg.style.opacity = 1;
}

function enemyzpet(){
    enemyImg.style.left = '80%'
}

function enemydostalhit(){
    enemyImg.style.left ='82%';
    enemyImg.style.opacity = .5;
    setTimeout(enemyzpet, 200)
}

function hrdinadostalhit(){
    heroImg.style.opacity = .7;
    setTimeout(() => {
        heroImg.style.opacity = 1;
    }, 400);
}

function hrdinaAttack(){
    heroImg.style.left = '80%';
    setTimeout(showhrdina2, 120);
    setTimeout(showhrdina3,200);
    if(randomChance(chance)) {
        let attackHp = randomNumber(10,50);
        enemyHealth = enemyHealth - attackHp;
        setTimeout(enemydostalhit,250);
        console.log('Hero Attack: Enemy -' + attackHp + '(' + enemyHealth + ')');
        let percentageNow = percentage(enemyHealth, stillEnemyHealth);
        if(percentageNow > 0) {
            enemyHealthBar.style.width = "" + percentageNow + "%";
        } else {
            enemyHealthBar.style.width = "0%";
            heroWin();
        }
    } else {
        console.log('Hero Attack: Missed');
    }
    setTimeout(showhrdina,300);
    setTimeout(hrdinazpet, 400);
}

function hrdinaBlock() {
    if(randomChance(chance)) {
        console.log('Hero Block: Successful');
        successBlock = true;
    } else {
        console.log('Hero Block: Failed');
        successBlock = false;
    }
}

function enemyUwU2(){
    enemyImg.style.display = 'none' ;
    enemy2Img.style.display = '';
};

function enemyUwU3(){
    enemy2Img.style.display = 'none' ;
    enemy3Img.style.display = '';
};

function enemyUwU(){
    enemy3Img.style.display = 'none' ;
    enemyImg.style.display = '';
};

function enemyReturn(){
    enemyImg.style.left = '80%'
}

function enemyAttack(){
    if (enemyHealth > 0) {
        enemyImg.style.left = '100px'
        if(successBlock) {
            console.log('Enemy Attack: Blocked');
            successBlock = false;
        } else if(randomChance(chance * .9)) {
            let attackHp = randomNumber(10,450);
            heroHealth = heroHealth - attackHp;
            setTimeout(hrdinadostalhit(),250);
            console.log('Enemy Attack: Hero -' + attackHp + '(' + heroHealth + ')');
            let percentageNow = percentage(heroHealth, stillHeroHealth);
            if(percentageNow > 0) {
                heroHealthBar.style.width = "" + percentageNow + "%";
            } else {
                heroHealthBar.style.width = "0%";
                enemyWin();
            }
        } else {
            console.log('Enemy Attack: Missed');
        }
        setTimeout(enemyUwU2, 220);
        setTimeout(enemyUwU3, 300);
        setTimeout(enemyUwU, 400);
        setTimeout(enemyReturn, 900)
    }
}

function boj(){
    switchOffMenu();
    hrdinaAttack();
    setTimeout(enemyAttack, 1000);
    setTimeout(switchOnMenu, 2000);
}

function block() {
    switchOffMenu();
    hrdinaBlock();
    setTimeout(enemyAttack, 1000);
    setTimeout(switchOnMenu, 2000);
}

function switchOffMenu() {
    menu.style.pointerEvents = 'none';
    menu.style.opacity = .8;
}

function switchOnMenu() {
    menu.style.pointerEvents = 'auto';
    menu.style.opacity = 1;
}

function setEnemyHealth(hp) {
    enemyHealth = hp;
    stillEnemyHealth = hp;
}

function setHeroHealth(hp) {
    heroHealth = hp;
    stillHeroHealth = hp;
}

function heroWin() {
    console.log('Hero Won!');
    document.getElementById('heroWonScreen').style.display = "block";
}

function enemyWin() {
    console.log('Enemy Won!');
    document.getElementById('enemyWonScreen').style.display = "block";
}

const randomNumber = (min, max) => {
    return (Math.floor(Math.random() * max) + min);
}

const randomChance = (percentage) => {
    let chance = (Math.floor(Math.random() * 100));
    if (chance <= percentage) {
        return true;
    } else {
        return false;
    }
}

const percentage = (part, total) => {
    return (100 * part) / total;
}
