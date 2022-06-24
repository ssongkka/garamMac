package com.garam02;

import java.io.IOException;
import java.net.URLEncoder;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;

import com.garam.Garam02Application;

@SpringBootTest
@ContextConfiguration(classes = Garam02Application.class)
public class asdsadwad {
	@Test
	void veInsertRegPdf() throws IOException {
		String aaa = "전세버스";

		String encodeData = URLEncoder.encode(aaa, "EUC-KR");
		System.out.println("URL 인코딩 : " + encodeData);

		String upSepa = "";

		String a = "https://www.g2b.go.kr:8101/ep/tbid/tbidList.do?";
		String b = "area=";
		String c = "&bidNm=" + encodeData;
		String d = "&bidSearchType=1";
		String e = "&fromBidDt=2022%2F04%2F13";
		String f = "&fromOpenBidDt=";
		String g = "&instNm=";
		String h = "&maxPageViewNoByWshan=2";
		String i = "&radOrgan=1";
		String j = "&regYn=Y";
		String k = "&searchDtType=1";
		String l = "&searchType=1";
		String m = "&taskClCds=" + upSepa;
		String n = "&toBidDt=2022%2F05%2F13";
		String o = "&toOpenBidDt=";
		String p = "&currentPageNo=1";

		String URL = a + b + c + d + e + f + g + h + i + j + k + l + m + n + o + p;

		System.out.println(URL);

		Connection conn = Jsoup.connect(URL);

		Document document = conn.get();

		Elements parsingDivs = document.getElementsByTag("tr"); // class가 parsingDiv인 element 찾기

		Elements parsingDivs1 = parsingDivs.get(3).getElementsByTag("td"); // class가 parsingDiv인 element 찾기

		System.out.println("parsingDivs1  " + parsingDivs1.size());
		System.out.println(parsingDivs1);

	}
}
