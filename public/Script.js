import {
	WeightedGraph
} from "/CreateWeights.js";
import {
	TravelingSalesman
} from "/TravelingSalesman.js";
import {
	Ordering
} from "/CreateOrdering.js"
$(document).ready(function() {
	getMemberArray();
	registerDanceButtonClickListener();

	$('.submitButton').click(function() {
		postMemberInfo();
	})
	$('.PracticeScheduler').click(function() {
		postMemberInfo();
	})
	$('.ShowOrderScheduler').click(function() {
		postMemberInfo();
	})

	function registerDanceButtonClickListener() {
		let btn = $('button');
		btn.on('click', function() {
			let elem = $(this);
			if (elem.hasClass('clicked')) {
				elem.removeClass('clicked');
			} else {
				elem.addClass('clicked');
			}
		})
	}

	function extractMemberInfo() {
		let name = $('#fname').val();
		let grade = $("input[name='Grade']:checked").attr('id');
		let school = $("input[name='School']:checked").attr('id');
		let dances = [];
		$("button[class = 'dance clicked']").each(function() {
			if ($(this).hasClass('clicked')) {
				dances.push($(this).attr('name'));
			}
		})
		return {
			"name": name,
			"grade": grade,
			"school": school,
			"dances": dances

		};
	}

	function postMemberInfo() {
		const url = '/';

		$.post(url, extractMemberInfo(), function(data, status) {
			location.reload();
		});
	}

	function getMemberArray() {	

		const url = '/memberdata';
		$.get(url, function(data, status) {
			var memberArray = data;
			let danceArray = ["Classical", "Bollywood", "HipHop", "SouthIndian", "Bhangra", "AllGirlsFusion", "SeniorFusion", "Jazba"];
			let orderingObject = new Ordering(danceArray, memberArray);
			let practiceOrderingDance = orderingObject.allPracticeOutputs();
			let showOrderingDance = orderingObject.allShowOutputs();
			let practiceDisplayString = createScheduleString(practiceOrderingDance);
			let showDisplayString = createScheduleString(showOrderingDance);
			document.getElementById('PracticeOrder').innerHTML = practiceDisplayString;
			document.getElementById('ShowOrder').innerHTML = showDisplayString;
		});

	}

	function createScheduleString(ordering){
		var order = "";
			
		for(let i = 0; i < ordering[0].length; i++){
		    order += ordering[0][i] + " ";
		}

		for(let i = 0; i < ordering[0].length - 1; i++){
		    order = order.replace(" ", "&#10230");
		}
		return order;
	}
});