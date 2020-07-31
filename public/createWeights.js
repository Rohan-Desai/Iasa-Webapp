//create weighted graph class
//initialize and increment graph in main js file
export class WeightedGraph {
	constructor(memberArray, dances) {
		this.memberArray = memberArray;
		this.dances = dances;
		return this.calculateEdgeWeights();
	}

	create2dArray() {
		let array = Array(this.dances.length+1).fill(0).map(x => Array(this.dances.length+1).fill(0));

		return array;
	}

	convertDanceToNumber(dance) {
		return 1 + this.dances.findIndex(function(danceItem){
			return dance === danceItem;
		});
	}

	calculateEdgeWeights() {

		this.weightedGraph = this.create2dArray();
		this.memberArray.forEach(member => {
			if (member.dances.length > 1) {
				this.incrementEdgeWeights(member, this.weightedGraph);
			}
		})

		return this.weightedGraph;
	}

	incrementEdgeWeights(member) {
		for (let j = 0; j < member.dances.length; j++) {
			this.firstDance = this.convertDanceToNumber(member.dances[j]) ;
			for (let l = j + 1; l < member.dances.length; l++) {
				this.secondDance = this.convertDanceToNumber(member.dances[l]);
				this.weightedGraph[this.firstDance][this.secondDance]++;
				this.weightedGraph[this.secondDance][this.firstDance]++;
			}
		}
	}
}