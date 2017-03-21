(function ($) {

	$.widget("flynndev.calendar", {

		/** Options */
		options: {
			button_style: 'btn btn-primary btn-xs',
			previous_html: $('<i />').addClass('fa fa-chevron-left'),
			next_html: $('<i />').addClass('fa fa-chevron-right'),
			title_element: 'h1',
			title_class: 'ttl',
			days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
			months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
			month: new Date().getMonth(),
			year: new Date().getFullYear(),
			shades: [],
			callbacks: {},
			square: true,
			day_class: 'col-xs-1',
			day_header_class: 'col-xs-1',
			week_class: 'row',
			week_header_class: 'row',
		},

		/** Element */
		$e: null,

		/** Title */
		$t: null,

		_create: function () {
			this.$t = $(`<${this.options.title_element} />`).addClass(this.options.title_class);

			let $prv = $("<button />").addClass(this.options.button_style).addClass('prv').append(this.options.previous_html).click(() => {
				this.previousMonth();
			});
			let $nxt = $("<button />").addClass(this.options.button_style).addClass('nxt').append(this.options.next_html).click(() => {
				this.nextMonth();
			});
			let $nav = $("<nav />").append($prv).append($nxt);

			this.$e = $("<div />").addClass('jquery-calendar');

			this.element.html("");
			this.element.append(this.$t).append($nav).append(this.$e);

			this.element.addClass('jquery-calendar-container');

			this._showCurrent();

		},

		/**
		 * Set Option
		 * @param {string} key
		 * @param {*} value
		 * @private
		 */
		_setOption: function (key, value) {
			this.options[key] = value;
		},

		/**
		 * Get Option
		 * @param {string} key
		 * @returns {*}
		 * @private
		 */
		_getOption: function (key) {
			return this.options[key];
		},

		/**
		 * Destroy
		 *
		 * Cleanup after yourself
		 *
		 * @private
		 */
		_destroy: function () {
			this.element.html("");
		},

		/**
		 * Add Event
		 *
		 * @param {(string|Date)} day
		 * @param {function} callback
		 * @return {void}
		 */
		addEvent: function (day, callback) {

			let daystring;

			if (day instanceof Date) daystring = this._getDayString(day.getMonth(), day.getDate(), day.getFullYear());
			else daystring = day;

			if (this.options.shades.indexOf(daystring) == -1) {
				this.options.shades.push(daystring);
				this.options.callbacks[daystring] = callback;
			}
			this._applyShade();

		},

		/**
		 * Remove Event
		 *
		 * @param {(string|Date)} day
		 * @return {void}
		 */
		removeEvent: function (day) {
			let daystring;

			if (day instanceof Date) daystring = this._getDayString(day.getMonth(), day.getDate(), day.getFullYear());
			else daystring = day;

			let index = this.options.shades.indexOf(daystring);

			this.options.shades.splice(index, 1);
			this.options.callbacks[daystring] = undefined;

			$('.events', this.$e).removeClass('events').unbind();

			this._applyShade();
		},

		/**
		 * Next Month
		 */
		nextMonth: function () {
			if (this.options.month == 11) this.setMonth(0, this.options.year + 1);
			else this.setMonth(this.options.month + 1);
		},


		/**
		 * Previous Month
		 */
		previousMonth: function () {
			if (this.options.month == 0) this.setMonth(11, this.options.year - 1);
			else this.setMonth(this.options.month - 1);
		},

		/**
		 * Set Month
		 * @param {int} month
		 * @param {int=} year
		 */
		setMonth: function (month, year) {
			if (!Number.isInteger(month) || month > 11 || month < 0) console.error("Invalid Month");
			else this._setOption('month', month);

			if (year) {
				if (!Number.isInteger(year) || year > 2100 || year < 1980) console.error("Invalid Year");
				else this._setOption('year', year);
			}

			this._showCurrent();

		},

		/**
		 * Show Current Month
		 *
		 * @private
		 */
		_showCurrent: function () {
			this._showMonth(this.options.month, this.options.year);
		},

		/**
		 * Get Day String
		 *
		 * @param {int} month
		 * @param {int} day
		 * @param {int} year
		 * @returns {string}
		 * @private
		 */
		_getDayString: function (month, day, year) {
			return `${this.options.months[month]}-${day}-${year}`;
		},

		/**
		 * Apply Shade
		 *
		 * @private
		 */
		_applyShade: function () {

			for (let day of this.options.shades) {

				let $day = $(`.${day}`, this.$e);

				$day.addClass('events');
				$day.unbind();

				$day.click(() => {
					this.options.callbacks[day]();
				});

			}

			let d = new Date();

			let today = this._getDayString(d.getMonth(), d.getDate(), d.getFullYear());
			$(`.${today}`, this.$e).addClass('today');
		},

		/**
		 * Make Square
		 *
		 * @private
		 */
		_makeSquare: function () {
			if (!this.options.square) return;
			let width = $('.grid-cell', this.$e).first().width();
			$('.row', this.$e).not('.calendar-week-header').height(width);
		},

		/**
		 * Show Month
		 *
		 * @param {int} month
		 * @param {int} year
		 * @private
		 */
		_showMonth: function (month, year) {

			let
				firstDayOfMonth = new Date(year, month, 1).getDay(),
				lastDateOfMonth = new Date(year, month + 1, 0).getDate(),
				lastDayOfLastMonth = month == 0 ? new Date(year - 1, 11, 0).getDate() : new Date(year, month, 0).getDate();

			this.$e.html("");

			this.$t.html(this.options.months[month] + ' <span class="year">' + year + '</span>');

			let $header = $('<div />').addClass(this.options.week_header_class).addClass('calendar-week-header');

			let $rowtemplate = $('<div />').addClass(this.options.week_class).addClass('calendar-week');

			for (let day of this.options.days) $header.append($('<div />').addClass(this.options.day_header_class).addClass('grid-cell').append($('<span />').text(day)));

			this.$e.append($header);

			let $row = $rowtemplate.clone(true, true);

			let i = 1;

			do {
				let dow = new Date(year, month, i).getDay();

				if (dow == 0) $row = $rowtemplate.clone(true, true);
				else if (i == 1) {
					$row = $rowtemplate.clone(true, true);

					let k = lastDayOfLastMonth - firstDayOfMonth + 1;
					for (let j = 0; j < firstDayOfMonth; j++) {
						$row.append($('<div />').addClass(this.options.day_class).addClass('grid-cell').addClass('previous-month').append($('<div />').addClass('number').text(k)));
						k++;
					}
				}

				let dayclass = this._getDayString(month, i, year);

				$row.append($('<div />').addClass(this.options.day_class).addClass(dayclass).addClass('grid-cell').append($('<div />').addClass('number').text(i)));

				if (dow == 6) this.$e.append($row);
				else if (i == lastDateOfMonth) {
					let k = 1;
					for (dow; dow < 6; dow++) {
						$row.append($('<div />').addClass(this.options.day_class).addClass('grid-cell').addClass('next-month').append($('<div />').addClass('number').text(k)));
						k++;
					}
					this.$e.append($row);
				}

				i++;
			} while (i <= lastDateOfMonth);

			this._applyShade();

			this._makeSquare();
		}

	});

	/**
	 * Add Event
	 *
	 * Add event to the calendar
	 *
	 * @param {(string|Date)} day
	 * @param {function} callback
	 * @returns {jQuery}
	 */
	$.fn.addEvent = function (day, callback) {
		if (!$(this).hasClass('jquery-calendar-container')) return this;
		$(this).calendar("addEvent", day, callback);
		return this;
	};

	/**
	 * Remove Event
	 *
	 * Remove an event from the calendar
	 *
	 * @param {(string|Date)}day
	 * @returns {jQuery}
	 */
	$.fn.removeEvent = function (day) {
		if (!$(this).hasClass('jquery-calendar-container')) return this;
		$(this).calendar("removeEvent", day);
		return this;
	};

	/**
	 * Set Month
	 *
	 * @param {int} month
	 * @param {int=} year
	 */
	$.fn.setMonth = function (month, year) {
		if (!$(this).hasClass('jquery-calendar-container')) return this;
		$(this).calendar("setMonth", month, year);
		return this;
	};

})(jQuery);