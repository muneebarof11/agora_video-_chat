

    $(document).on('click', '.toggle-sound', function(e) {
        $(this).toggleClass('sound-mute');
    });

    $(".mobile-menu-btn").on('click', function() {
        $("body").addClass('fix');
        $(".off-canvas-wrapper").addClass('open');
    });
    $(".btn-close-off-canvas,.off-canvas-overlay").on('click', function() {
        $("body").removeClass('fix');
        $(".off-canvas-wrapper").removeClass('open');
    });


    
    const nextYear = new Date().getFullYear() + 1;
    const myCalender = new CalendarPicker('#myCalendarWrapper', {
        min: new Date(),
        max: new Date(nextYear, 10)
    });
    const currentDateElement = document.getElementById('current-date');
    currentDateElement.textContent = myCalender.value;
    const currentDayElement = document.getElementById('current-day');
    currentDayElement.textContent = myCalender.value.getDay();
    const currentToDateString = document.getElementById('current-datestring');
    currentToDateString.textContent = myCalender.value.toDateString();
    myCalender.onValueChange((currentValue) => {
        currentDateElement.textContent = currentValue;
        currentDayElement.textContent = currentValue.getDay();
        currentToDateString.textContent = currentValue.toDateString();
        console.log(`The current value of the calendar is: ${currentValue}`);
    })

  
    
