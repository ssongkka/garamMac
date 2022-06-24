package com.garam.calendar.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.garam.calendar.domain.CalendarDTO;
import com.garam.calendar.mapper.CalendarMapper;

@Service
public class CalendarServiceImpl implements CalendarService {

	@Autowired
	CalendarMapper calendarMapper;

	@Override
	public List<CalendarDTO> selectCalendarEvent(CalendarDTO calendarDTO) throws Exception {

		if (calendarDTO.getEndD() == null) {
			String[] tmpArr = calendarDTO.getStD().split("-");
			String tmp = LocalDate
					.of(Integer.parseInt(tmpArr[0]), Integer.parseInt(tmpArr[1]), Integer.parseInt(tmpArr[2]))
					.plusDays(6).toString();
			calendarDTO.setEndD(tmp);
		}

		List<CalendarDTO> list = calendarMapper.selectCalendarEvent(calendarDTO);

		return list;
	}
}