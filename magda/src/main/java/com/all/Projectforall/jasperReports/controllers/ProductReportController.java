package com.all.Projectforall.jasperReports.controllers;

import com.all.Projectforall.jasperReports.services.ProductReportService;
import net.sf.jasperreports.engine.JRException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.FileNotFoundException;

@CrossOrigin
@RestController
@RequestMapping("/api/")
public class ProductReportController {

    @Autowired
    private ProductReportService service;

    @GetMapping("report/{format}")
    public String exportReport(@PathVariable String format) throws FileNotFoundException, JRException {
        System.out.println("controller");
        return service.exprotReport(format);
    }
}
