package com.garam.web.approval.controller;

import java.util.List;

import org.springframework.dao.DataAccessException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.garam.web.approval.dto.ApprovalDTO;
import com.garam.web.approval.service.ApprovalService;
import com.garam.web.dashboard.dto.ScheDTO;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(value = "/apprgo")
@RequiredArgsConstructor
public class RestApprovalGoIngOutEndController {

	private final ApprovalService approvalService;

	@PostMapping(value = "/going")
	public List<ApprovalDTO> going(@RequestBody ApprovalDTO approvalDTO) throws Exception {

		List<ApprovalDTO> list = approvalService.selectApprGo(approvalDTO);

		return list;
	}

	@PostMapping(value = "/inging")
	public List<ApprovalDTO> inging(@RequestBody ApprovalDTO approvalDTO) throws Exception {

		List<ApprovalDTO> list = approvalService.selectApprIng(approvalDTO);

		return list;
	}

	@PostMapping(value = "/outing")
	public List<ApprovalDTO> outing(@RequestBody ApprovalDTO approvalDTO) throws Exception {

		List<ApprovalDTO> list = approvalService.selectApprOut(approvalDTO);

		return list;
	}

	@PostMapping(value = "/ending")
	public List<ApprovalDTO> ending(@RequestBody ApprovalDTO approvalDTO) throws Exception {

		List<ApprovalDTO> list = approvalService.selectApprEnd(approvalDTO);

		return list;
	}

	@PostMapping(value = "/selApprNo")
	public List<ApprovalDTO> selApprNo(@RequestBody ApprovalDTO approvalDTO) throws Exception {

		List<ApprovalDTO> list = approvalService.selectApprNo(approvalDTO);

		return list;
	}

	@PostMapping(value = "/selApprLine")
	public List<ApprovalDTO> selApprLine(@RequestBody ApprovalDTO approvalDTO) throws Exception {

		List<ApprovalDTO> list = approvalService.selectApprLine(approvalDTO);

		return list;
	}

	@PostMapping(value = "/selApprHelp")
	public List<ApprovalDTO> selApprHelp(@RequestBody ApprovalDTO approvalDTO) throws Exception {

		List<ApprovalDTO> list = approvalService.selectApprHelp(approvalDTO);

		return list;
	}

	@PostMapping(value = "/selApprCham")
	public List<ApprovalDTO> selApprCham(@RequestBody ApprovalDTO approvalDTO) throws Exception {

		List<ApprovalDTO> list = approvalService.selectApprCham(approvalDTO);

		return list;
	}

	@PostMapping(value = "/selApprFoot")
	public List<ApprovalDTO> selApprFoot(@RequestBody ApprovalDTO approvalDTO) throws Exception {

		List<ApprovalDTO> list = approvalService.selectApprFoot(approvalDTO);

		return list;
	}

	@PostMapping(value = "/upAppr")
	public int upAppr(@RequestBody ApprovalDTO approvalDTO) throws Exception {

		int rst = 0;
		try {
			rst = approvalService.updateAppr(approvalDTO);
		} catch (DataAccessException e) {
			rst = -1;

		} catch (Exception e) {
			rst = -2;
		}
		return rst;
	}

	@PostMapping(value = "/upApprLine")
	public int upApprLine(@RequestBody ApprovalDTO approvalDTO) throws Exception {

		int rst = 0;
		try {
			rst = approvalService.updateApprLine(approvalDTO);
		} catch (DataAccessException e) {
			rst = -1;

		} catch (Exception e) {
			rst = -2;
		}
		return rst;
	}

}