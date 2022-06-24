package com.garam.calendar.service;

import java.util.List;

import com.garam.calendar.domain.CalendarDTO;

public interface CalendarService {
	public List<CalendarDTO> selectCalendarEvent(CalendarDTO calendarDTO) throws Exception;
}
