package com.all.Projectforall.jasperReports.services;

import com.all.Projectforall.models.ProductModel;
import com.all.Projectforall.repos.ProductRepository;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ProductReportService {
    @Autowired
    private ProductRepository productRepository;

    public String exprotReport(String reportFormat) throws FileNotFoundException, JRException {
        String path = "E:\\auth&web_method&microservice\\jasper\\various_jasper\\reports\\";
        List<ProductModel> products = productRepository.findAllById_TheAdmin("ahmed")
                .stream().map(product -> new ProductModel(product)).collect(Collectors.toList());
        File file = ResourceUtils.getFile("classpath:p.jrxml");
        JasperReport jasperReport = JasperCompileManager.compileReport(file.getAbsolutePath());
        JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(products);
        Map<String, Object> parameters = new HashMap<>();
        System.out.println("aa");
        parameters.put("P_admin", "ahmed saber");
        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);
        if (reportFormat.equalsIgnoreCase("html")) {
            JasperExportManager.exportReportToHtmlFile(jasperPrint, path + "invoice.html");
            System.out.println("bbb");

        }
        if (reportFormat.equalsIgnoreCase("pdf")) {
            JasperExportManager.exportReportToPdfFile(jasperPrint, path + "invoice.pdf");
        }
        return "بسم الله " + "Report Generated IN path" + path;
    }

}
