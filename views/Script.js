$(document).ready(function() {
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
		$("button[name ='dance']").each(function() {
			if ($(this).hasClass('clicked')) {
				dances.push($(this).attr('class'));
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
		const url = 'http://localhost:3000/';

		$.post(url, extractMemberInfo(), function(data, status) {
			location.reload();
		});
	}

	function createShowOrder(){


	}

	function createPracticeOrder(){

		
	}
});