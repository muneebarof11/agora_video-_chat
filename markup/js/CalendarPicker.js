class CalendarPicker {
	constructor(element, options) {
		this.date = new Date();
		this._formatDateToInit(this.date);
		this.day = this.date.getDay()
		this.month = this.date.getMonth();
		this.year = this.date.getFullYear();
		this.today = this.date;
		this.value = this.date;
		this.min = options.min;
		this.max = options.max;
		this._formatDateToInit(this.min)
		this._formatDateToInit(this.max)
		this.userElement = document.querySelector(element);
		[this.dayAsText, this.monthAsText, this.dateAsText, this.yearAsText] = this.date.toString().split(' ')
		this.calendarWrapper = document.createElement('div');
		this.calendarElement = document.createElement('div')
		this.calendarHeader = document.createElement('header');
		this.calendarHeaderTitle = document.createElement('h4');
		this.navigationWrapper = document.createElement('section')
		this.previousMonthArrow = document.createElement('button');
		this.nextMonthArrow = document.createElement('button');
		this.calendarGridDays = document.createElement('section')
		this.calendarGrid = document.createElement('section');
		this.calendarDayElementType = 'time';
		this.listOfAllDaysAsText = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
		this.listOfAllMonthsAsText = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		this.calendarWrapper.id = 'calendar-wrapper';
		this.calendarElement.id = 'calendar';
		this.calendarGridDays.id = 'calendar-days';
		this.calendarGrid.id = 'calendar-grid';
		this.navigationWrapper.id = 'navigation-wrapper';
		this.previousMonthArrow.id = 'previous-month';
		this.nextMonthArrow.id = 'next-month';
		this._insertHeaderIntoCalendarWrapper();
		this._insertCalendarGridDaysHeader();
		this._insertDaysIntoGrid();
		this._insertNavigationButtons();
		this._insertCalendarIntoWrapper();
		this.userElement.appendChild(this.calendarWrapper);
	}
	_getDaysInMonth = (month, year) => {
		if ((!month && month !== 0) || (!year && year !== 0)) return;
		const date = new Date(year, month, 1);
		const days = [];
		while (date.getMonth() === month) {
			days.push(new Date(date));
			date.setDate(date.getDate() + 1);
		}
		return days;
	}
	_formatDateToInit = (date) => {
		if (!date) return;
		date.setHours(0, 0, 0);
	}
	_insertCalendarIntoWrapper = () => {
		this.calendarWrapper.appendChild(this.calendarElement);
		const handleSelectedElement = (event) => {
			if (event.target.nodeName.toLowerCase() === this.calendarDayElementType && !event.target.classList.contains('disabled')) {
				Array.from(document.querySelectorAll('.selected')).forEach(element => element.classList.remove('selected'));
				event.target.classList.add('selected');
				this.value = event.target.value;
				this.onValueChange(this.callback);
			}
		}
		this.calendarGrid.addEventListener('click', handleSelectedElement, false);
		this.calendarGrid.addEventListener('keydown', (keyEvent) => {
			if (keyEvent.key !== 'Enter') return;
			handleSelectedElement(keyEvent);
		}, false);
		this.calendarGrid.addEventListener('animationend', () => {
			this._resetCalendarAnimations();
			if (this.goingToPrevious) {
				this.calendarGrid.classList.add('swoosh-down-reverse');
				this.goingToPrevious = false;
				this._insertDaysIntoGrid();
			}
			if (this.goingToNext) {
				this.calendarGrid.classList.add('swoosh-up-reverse');
				this.goingToNext = false;
				this._insertDaysIntoGrid();
			}
		}, false);
	}
	_resetCalendarAnimations = () => {
		this.calendarGrid.classList.remove('swoosh-up');
		this.calendarGrid.classList.remove('swoosh-up-reverse');
		this.calendarGrid.classList.remove('swoosh-down');
		this.calendarGrid.classList.remove('swoosh-down-reverse');
	}
	_insertHeaderIntoCalendarWrapper = () => {
		this.calendarHeaderTitle.textContent = `${this.listOfAllMonthsAsText[this.month]} - ${this.year}`;
		this.calendarHeader.appendChild(this.calendarHeaderTitle);
		this.calendarWrapper.appendChild(this.calendarHeader);
	}
	_insertCalendarGridDaysHeader = () => {
		this.listOfAllDaysAsText.forEach(day => {
			const dayElement = document.createElement('span');
			dayElement.textContent = day;
			this.calendarGridDays.appendChild(dayElement);
		})
		this.calendarElement.appendChild(this.calendarGridDays);
	}
	_insertNavigationButtons = () => {
		const arrowSvg = `<img src="./images/calenderarrow.svg" class="normal">
		<img src="./images/rightArrow.svg" class="hover">`;
		this.previousMonthArrow.innerHTML = arrowSvg;
		this.nextMonthArrow.innerHTML = arrowSvg;
		this.previousMonthArrow.setAttribute('aria-label', 'Go to previous month');
		this.nextMonthArrow.setAttribute('aria-label', 'Go to next month');
		this.previousMonthArrow.tabIndex = 0;
		this.nextMonthArrow.tabIndex = 0;
		this.navigationWrapper.appendChild(this.previousMonthArrow);
		this.navigationWrapper.appendChild(this.nextMonthArrow);
		this.navigationWrapper.addEventListener('click', (clickEvent) => {
			this._resetCalendarAnimations();
			if (clickEvent.target.closest(`#${this.previousMonthArrow.id}`)) {
				if (this.month === 0) {
					this.month = 11;
					this.year -= 1;
				} else {
					this.month -= 1;
				}
				this._updateCalendar();
			}
			if (clickEvent.target.closest(`#${this.nextMonthArrow.id}`)) {
				if (this.month === 11) {
					this.month = 0;
					this.year += 1;
				} else {
					this.month += 1;
				}
				this._updateCalendar();
			}
		}, false)
		this.calendarElement.appendChild(this.navigationWrapper);
	}
	_insertDaysIntoGrid = () => {
		this.calendarGrid.innerHTML = '';
		let arrayOfDays = this._getDaysInMonth(this.month, this.year);
		let firstDayOfMonth = arrayOfDays[0].getDay();
		firstDayOfMonth = firstDayOfMonth === 0 ? 7 : firstDayOfMonth;
		if (1 < firstDayOfMonth) {
			arrayOfDays = Array(firstDayOfMonth - 1).fill(false, 0).concat(arrayOfDays);
		}
		arrayOfDays.forEach(date => {
			const dateElement = document.createElement(date ? this.calendarDayElementType : 'span');
			const [Day, Month, Date, Year] = date.toString().split(' ');
			const dateIsTheCurrentValue = this.value.toString() === date.toString();
			if (dateIsTheCurrentValue) this.activeDateElement = dateElement;
			const dateIsBetweenAllowedRange = (this.min || this.max) && (date.toString() !== this.today.toString() && (date < this.min || date > this.max))
			if (dateIsBetweenAllowedRange) {
				dateElement.classList.add('disabled');
			} else {
				dateElement.tabIndex = 0;
				dateElement.value = date;
			}
			dateElement.textContent = date ? `${Date}` : '';
			this.calendarGrid.appendChild(dateElement);
		})
		this.calendarElement.appendChild(this.calendarGrid);
		this.activeDateElement.classList.add('selected');
	}
	_updateCalendar = () => {
		this.previousDate = this.date;
		this.date = new Date(this.year, this.month);
		[this.dayAsText, this.monthAsText, this.dateAsText, this.yearAsText] = this.date.toString().split(' ');
		this.day = this.date.getDay();
		this.month = this.date.getMonth();
		this.year = this.date.getFullYear();
		window.requestAnimationFrame(() => {
			this.calendarHeaderTitle.textContent = `${this.listOfAllMonthsAsText[this.month]} - ${this.year}`;
			if (this.previousDate < this.date) {
				this.calendarGrid.classList.add('swoosh-up');
				this.goingToPrevious = true;
			} else {
				this.calendarGrid.classList.add('swoosh-down');
				this.goingToNext = true;
			}
		})
	}
	onValueChange = (callback) => {
		if (this.callback) return this.callback(this.value);
		this.callback = callback;
	}
}