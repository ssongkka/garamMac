package com.garam.Utils;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestParam;

import com.garam.web.constant.Method;

@Controller
public class UiUtils {

	public String ShowMgsRdrt(@RequestParam(value = "message", required = false) String message,
			@RequestParam(value = "redirectUri", required = false) String redirectUri,
			@RequestParam(value = "method", required = false) Method method, Model model) {

		model.addAttribute("message", message);
		model.addAttribute("redirectUri", redirectUri);
		model.addAttribute("method", method);

		return "utils/MsgRdrt";
	}
}
