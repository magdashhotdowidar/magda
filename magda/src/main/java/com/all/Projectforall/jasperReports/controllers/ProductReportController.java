package com.all.Projectforall.jasperReports.controllers;

import com.all.Projectforall.jasperReports.services.ProductReportService;
import net.sf.jasperreports.engine.JRException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@CrossOrigin
@RestController
@RequestMapping("/api/")
public class ProductReportController {

    @Autowired
    private ProductReportService service;

    @GetMapping("product/report/{format}/{user}")
    public String exportProductsReport(@PathVariable String format,
                                       @PathVariable String user,
                                       HttpServletRequest request) throws IOException, JRException {

        return service.exportProductsReport(format, user, request.getHeader("theAdmin"));
    }

    @GetMapping("vehicle/report/{format}/{user}/{typeOfData}")
    public String exportVehicleReport(@PathVariable String format, @PathVariable String user, @PathVariable String typeOfData) throws Exception {

        return service.exportAllVehicleReport(format, user,typeOfData);
    }
}
