package com.all.Projectforall.jasperReports.controllers;

import com.all.Projectforall.jasperReports.services.ProductReportService;
import net.sf.jasperreports.engine.JRException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.FileNotFoundException;
import java.io.IOException;

@CrossOrigin
@RestController
@RequestMapping("/api/")
public class ProductReportController {

    @Autowired
    private ProductReportService service;

    @GetMapping("report/{format}/{user}")
    public String exportReport(@PathVariable String format,
                               @PathVariable String user,
                               HttpServletRequest request) throws IOException, JRException {

        return service.exprotReport(format, user,request.getHeader("theAdmin"));
    }
}
