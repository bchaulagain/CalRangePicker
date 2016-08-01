// Custom scripts 

function maximise_calendar() /* function to minimize/maximize the calendar */
{
	if($(".maximise").html() == '+')
	{
		$(".maximise").html("-");
		$(".expanded_span").css("min-height","500px");
		$("#datepicker").datepicker("option", "numberOfMonths", [2,4]);
		$("#datepicker").datepicker("option", "stepMonths", 8);
	}
	else
	{
		$(".maximise").html("+");
		$(".expanded_span").css("min-height","200px");
		$("#datepicker").datepicker("option", "numberOfMonths", 4);
		$("#datepicker").datepicker("option", "stepMonths", 4);
	}
}
$(function() {
	
	$( ".expanded_span" ).hide();
	$( ".cross-sign" ).click(function() {
		$( ".expanded_span" ).hide();
		$( ".sub-box" ).removeClass("box_active");
	});
	$( ".sub-box" ).click(function() {
		$( ".expanded_span" ).show();
		$( ".sub-box" ).addClass("box_active");
	});
	
	/*Datepicker*/
	$("#datepicker").datepicker({
        numberOfMonths: 4,
		showOtherMonths: true,
		minDate: 1,
		maxDate: 365,
		stepMonths: 4,
		showMonthAfterYear: true,
       
        
        
        beforeShowDay: function(date) {
            var date1 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#from").val());
            var date2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#to").val());
            return [true, date1 && ((date.getTime() == date1.getTime()) || (date2 && date >= date1 && date <= date2)) ? "date-range-selected" : ""];
        },
        onSelect: function(dateText, inst) {
			var date1 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#from").val());
            var date2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#to").val());
			var selectedDate = $(this).datepicker('getDate');
			/* this code is to change the date format
			/*var date = selectedDate.getDate();
			var suffix = "";
			
			switch(inst.selectedDay) {
				case '1': case '21': case '31': suffix = 'st'; break;
				case '2': case '22': suffix = 'nd'; break;
				case '3': case '23': suffix = 'rd'; break;
				default: suffix = 'th';
			}
			var format = 'M d'+suffix+' yy';
			var new_date = new Date(dateText);
			var dateFormat = '';
			
			//var dateFormat = $.datepicker.parseDate(format, dateText);
            var dateFormat = $.datepicker.formatDate(format , new_date);
			*/
            if (!date1 || date2) {
                $("#from").val(dateText+' '+$("#from_time").val());
                $("#to").val("");
				$("#from-date").val(dateText);
                $("#to-date").val("");
				$(".box-button").removeClass("box-button-active");
            } else {
                $("#to").val(dateText+' '+$("#to_time").val());
				$("#to-date").val(dateText);
				$(".box-button").addClass("box-button-active");
            }
        }
    });
	
        

	/*Timepicker JS*/
	$('.timepicker').timepicker(); // Load timepicker
    
    $('#from_time').timepicker({ 'step': 60 });
    $('#to_time').timepicker({ 'step': 60 });
    
	/*update "from" timepicker values to top*/
	$('#from_time').on('changeTime', function() {
		if($('#from').val() != '')
		{
			var str = $('#from').val().split(" ");
			$('#from').val(str[0]+ ' ' + $(this).val()) ;
		}
	});
	/*update "to" timepicker values to top*/
	$('#to_time').on('changeTime', function() {
		if($('#to').val() != '')
		{
			var str = $('#to').val().split(" ");
			$('#to').val(str[0]+ ' ' + $(this).val()) ;
		}
	});


});
