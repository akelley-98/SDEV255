class SuperHuman {

	constructor(name, powerLevel) {
	  this.name = name;
	  this.powerLevel = powerLevel;
	}
  }
  
  // Define SuperHero and SuperVillain classes here
  class SuperHero extends SuperHuman {
    constructor(name, alias, powerLevel) {
        super(name, powerLevel);
        this.alias = alias;
    }
    // battle funtion
    battle (villian) {
        return this.powerLevel >= villian.powerLevel ? true : false;
    }
}
class SuperVillain extends SuperHuman {
    constructor(name, alias, powerLevel) {
        super(name, powerLevel);
        this.alias = alias;
    }
    getEvilChuckle () {
        return "Ha ha ha!";
    }
}
  const heroes = {
	"Super Bacon": new SuperHero("Jack Oinker", "Super Bacon", 2),
	"Flat-Man": new SuperHero("Peter Pranker", "Flat-Man", 5),
	"Mighty Woman": new SuperHero("Diana Dense", "Mighty Woman", 8),
	"Captain Marvelous": new SuperHero("Carol Hangers", "Captain Marvelous", 9)
  }
  
  
  const villains = {
	"The Jokester": new SuperVillain("Jack Nastier", "The Jokester", 3),
	"Magnet Man": new SuperVillain("Max Eisenhardt", "Magnet Man", 6),
	"Lex Loner": new SuperVillain("Lex Loner", "Lex Loner", 2),
	"Thankos": new SuperVillain("Thankos", "Thankos", 9),
	"Corg": new SuperVillain("Corg", "Corg", 3)
  }
  
  window.addEventListener("DOMContentLoaded", domLoaded);
  
  function domLoaded() {
	// Detect selection of hero and villain
	document.querySelector("#heroSelect").addEventListener("change", selectionChanged);
	document.querySelector("#villainSelect").addEventListener("change", selectionChanged);
  
	selectionChanged();
  }
  
  function selectionChanged() {
	let selectedHeroValue = document.querySelector("#heroSelect").value;
	let selectedVillainValue = document.querySelector("#villainSelect").value;
  
	// Get hero and villain selected
	let selectedHero = heroes[selectedHeroValue];
	let selectedVillain = villains[selectedVillainValue];
  
	// Your code goes here
	let winner = document.querySelector("#winner");
    if (selectedHero.battle(selectedVillain)) {
        winner.innerHTML = `Winner: ${selectedHero.alias}!`;
    }
    else {
        winner.innerHTML = `Winner: ${selectedVillain.alias}!`;

    }

}