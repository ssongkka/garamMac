package com.garam.calendar.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.garam.calendar.domain.CalendarDTO;

@Mapper
public interface CalendarMapper {
	public List<CalendarDTO> selectCalendarEvent(CalendarDTO calendarDTO) throws Exception;
}
