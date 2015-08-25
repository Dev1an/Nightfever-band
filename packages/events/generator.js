function dayOfTheWeekOfTheMonthFunction(dayOfTheWeek, weekOfTheMonth) {
	var weekDayOffset = 6 - dayOfTheWeek
	var dayOffset = 7 + 7*weekOfTheMonth
	return function(month) {
		month.setDate(1)
		month.setDate(dayOffset - (month.getDay()+weekDayOffset) % 7 )
		return month
	}
}