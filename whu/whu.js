// attack - struct {count: , symbol:, friends: }
// 1,2 - supporters
// 3 - miecz, unik
// 4 - hammer, shield
// 6 - critic

var DICE = [[1],[2],[3],[4],[4],[6]] // 4 not 5!

function critics(roll) {
    return roll.filter( x => x == 6 ).length;
}

function success(dice, attackSymbol, friends) {
    if (dice == attackSymbol) return true;
    if (dice <= 2 && friends >= dice) return true;
    return false;
}

function successes(roll, action) {
    return critics(roll) + roll.filter( x => success(x, action.symbol, action.friends)).length;
}

function generateDice(count, acc = DICE) {
    var result = [];
    if (count <= 0) return [];
    if (count == 1) return acc;
    for (d of DICE) {
	for (x of acc) {
	    result.push([d].concat(x));
	}
    }
    return generateDice(count-1, result);	
}

function resolve(attackRoll, attack, defenseRoll, defense) {
    return critics(attackRoll) > critics(defenseRoll) ||
	(critics(attackRoll) == critics(defenseRoll) && successes(attackRoll, attack) > successes(defenseRoll, defense));
}		

// TEST: fight({count: 2, symbol: 3, friends: 0}, {count: 1, symbol: 4, friends: 0})
function fight(attack, defense) {
    var possibleAttacks = generateDice(attack.count);
    var possibleDefenses = generateDice(defense.count);

    var results = [];
    for (attackRoll of possibleAttacks) {
	for (defenseRoll of possibleDefenses) {
	    results.push(resolve(attackRoll, attack, defenseRoll, defense));
	}
    }
    var succ = results.filter(x => x).length;
    return succ/results.length;
}


