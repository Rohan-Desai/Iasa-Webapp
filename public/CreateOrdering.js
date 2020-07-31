import {
	TravelingSalesman
} from "/TravelingSalesman.js";
import {
	WeightedGraph
} from "/CreateWeights.js";

export class Ordering{
	constructor(dances, memberArray) {
		this.dances = dances;
		this.memberArray = memberArray;
		this.weightedGraph = new WeightedGraph(memberArray, dances);
	}


	createShowOrder() {
		let travelingSalesmanObject = new TravelingSalesman(this.weightedGraph, 0, false, true);
		let showOrder = travelingSalesmanObject.travelingSalesman();
		let ordering = showOrder[1];
		let weight = showOrder[0];
		return [ordering, weight]
	}

	createPracticeOrder() {
		let travelingSalesmanObject = new TravelingSalesman(this.weightedGraph, 0, true, false);
		let practiceOrder = travelingSalesmanObject.travelingSalesman();
		let ordering = practiceOrder[1];
		let weight = practiceOrder[0];
		return [ordering, weight]
	}

	createDanceOrderingForShow() {
		let showOrdering = this.createShowOrder();
		let danceOrder = this.convertOrderingToDances(showOrdering[0], this.dances);
		return danceOrder;
	}

	createDanceOrderingForPractice() {
		let practiceOrdering = this.createPracticeOrder();
		let danceOrder = this.convertOrderingToDances(practiceOrdering[0], this.dances);
		return danceOrder;
	}

	convertOrderingToDances(ordering, dances) {
		let arr = new Array(dances.length);

		for (let i = 0; i < dances.length; i++) {
			arr[i] = dances[ordering[i + 1] - 1];
		}

		return arr;
	}

	allPracticeOutputs() {
		let practiceOrderDances = this.createDanceOrderingForPractice();
		let practiceData = this.createPracticeOrder();
		return [practiceOrderDances, practiceData[0], practiceData[1]];
	}

	allShowOutputs() {
		let showData = this.createShowOrder();
		let showOrderDances = this.createDanceOrderingForShow();
		return [showOrderDances, showData[0], showData[1]];
	}
}