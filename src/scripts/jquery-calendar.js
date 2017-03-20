(function ( $ ) {

	$.widget( "spikeon.calendar", {
		options: {
			button_style:   'btn btn-primary btn-xs',
			previous_html:  $('<i />').addClass('fa fa-chevron-left'),
			next_html:      $('<i />').addClass('fa fa-chevron-right'),
			title_element:  'h1',
			title_class:    'ttl',
			days:           ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
			months:         ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
			month:          new Date().getMonth(),
			year:           new Date().getFullYear(),
			shades:         [],
			callbacks:      {}
		},

		$e : null,
		$t : null,

		_create: function() {

			this.$t = $(`<${this.options.title_element} />`).addClass(this.options.title_class);

			let $prv = $("<button />").addClass(this.options.button_style).addClass('prv').append(this.options.previous_html).click(this.previousMonth.bind(this));
			let $nxt = $("<button />").addClass(this.options.button_style).addClass('nxt').append(this.options.next_html).click(this.nextMonth.bind(this));
			let $nav = $("<nav />").append($prv).append($nxt);

			this.$e = $("<div />").addClass('jquery-calendar');

			this.element.html("");
			this.element.append(this.$t).append($nav).append(this.$e);

			this.element.addClass('jquery-calendar-container');

			this._showCurrent();

		},

		_setOption: function( key, value ) {
			this.options[ key ] = value;
		},

		_destroy: function() {
			this.element.html( "" );
		},

		addEvent : function(day, callback){

			let daystring;

			if(day instanceof Date){
				daystring = this._getDayString(day.getMonth(), day.getDate(), day.getFullYear());
			}
			else daystring = day;

			if(this.options.shades.indexOf(daystring) == -1) {
				this.options.shades.push(daystring);
				this.options.callbacks[daystring] = callback;
			}
			this._applyShade();
		},

		nextMonth : function() {
			if ( this.options.month == 11 ) {
				this.options.month = 0;
				this.options.year = this.options.year + 1;
			}
			else this.options.month = this.options.month + 1;

			this._showCurrent();
		},

		previousMonth : function() {
			if ( this.options.month == 0 ) {
				this.options.month = 11;
				this.options.year = this.options.year - 1;
			}
			else this.options.month = this.options.month - 1;

			this._showCurrent();
		},

		_showCurrent : function(){
			this._showMonth(this.options.year, this.options.month);
		},

		_getDayString : function(m,d,y){
			return `${this.options.months[m]}-${d}-${y}`;
		},

		_applyShade : function(){

			let that = this;

			this.options.shades.forEach(function(dayclass){

				let $day = $(`.${dayclass}`, that.$e);

				$day.data('date', dayclass);
				$day.addClass('events');
				$day.unbind();

				$day.click({ 'c' : that},function(e){
					e.data.c.options.callbacks[$(this).data('date')]();
				});

			});

			let d = new Date();

			let today = this._getDayString(d.getMonth(), d.getDate(), d.getFullYear());
			$(`.${today}`, this.$e).addClass('today');
		},

		_showMonth : function(y, m){
			
			let
				firstDayOfMonth = new Date(y, m, 1).getDay(),
				lastDateOfMonth =  new Date(y, m+1, 0).getDate(),
				lastDayOfLastMonth = m == 0 ? new Date(y-1, 11, 0).getDate() : new Date(y, m, 0).getDate();

			this.$e.html("");

			this.$t.html(this.options.months[m] + ' <span class="year">' + y + '</span>');

			let $header = $('<div class="row calendar-week-header"></div>');
			let $rowtemplate = $('<div class="row calendar-week"></div>');

			// Write the header of the days of the week
			for(let i=0; i < this.options.days.length;i++) $header.append('<div class="col-xs-1 grid-cell"><span>' + this.options.days[i] + '</span></div>');

			this.$e.append($header);

			let $row = $rowtemplate.clone(true, true);

			// Write the days
			let i = 1;
			do {

				let dow = new Date(y, m, i).getDay();

				// If Sunday, start new row
				if ( dow == 0 ) $row = $rowtemplate.clone(true, true);

				// If not Sunday but first day of the month
				// it will write the last days from the previous month
				else if ( i == 1 ) {
					$row = $rowtemplate.clone(true, true);

					let k = lastDayOfLastMonth - firstDayOfMonth+1;
					for(let j=0; j < firstDayOfMonth; j++) {
						$row.append('<div class="col-xs-1 grid-cell previous-month"><div class="number">' + k + '</div></div>');
						k++;
					}
				}

				let dayclass = this.options.months[m] + '-' + i + '-' + y;

				// Write the current day in the loop
				$row.append('<div class="col-xs-1 grid-cell ' + dayclass + '"><div class="number">' + i + '</div></div>');

				// If Saturday, closes the row
				if ( dow == 6 ) this.$e.append($row);

				// If not Saturday, but last day of the selected month
				// it will write the next few days from the next month
				else if ( i == lastDateOfMonth ) {
					let k=1;
					for(dow; dow < 6; dow++) {
						$row.append('<div class="col-xs-1 grid-cell next-month"><div class="number">' + k + '</div></div>');
						k++;
					}
					this.$e.append($row);
				}

				i++;
			} while(i <= lastDateOfMonth);

			this._applyShade();

		}

	});

	$.fn.addEvent = function(day, callback){
		if(!$(this).hasClass('jquery-calendar-container')) return this;
		$(this).calendar("addEvent", day, callback);
		return this;
	};


})(jQuery);
