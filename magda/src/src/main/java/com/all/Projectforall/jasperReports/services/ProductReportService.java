package com.all.Projectforall.jasperReports.services;

import com.all.Projectforall.models.InvoiceModel;
import com.all.Projectforall.models.ProductModel;
import com.all.Projectforall.repos.ProductRepository;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

import java.awt.*;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ProductReportService {
    @Autowired
    private ProductRepository productRepository;
    private String pdfFileName = "";
    private final static String reportPath = "src\\main\\resources\\jasper\\reports\\";
    private final static String imagePath = "src\\main\\resources\\jasper\\images\\";
    private final static String jrxmlFilePath = "classpath:jasper/templates/";

    public String exprotReport(String reportFormat, String user,String admin) throws IOException, JRException {

        List<ProductModel> products = productRepository.findAllById_TheAdmin(admin)
                .stream().map(product -> new ProductModel(product)).collect(Collectors.toList());

        File file = ResourceUtils.getFile(jrxmlFilePath + "products.jrxml");
        JasperReport jasperReport = JasperCompileManager.compileReport(file.getAbsolutePath());
        JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(products);

        Map<String, Object> parameters = new HashMap<>();
        parameters.put("title", "products");
        parameters.put("user", user);
        parameters.put("count", Integer.toString(products.size()));
        parameters.put("imagePath", imagePath + "ahmed.jpg");

        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);

        if (reportFormat.equalsIgnoreCase("html")) {
            JasperExportManager.exportReportToHtmlFile(jasperPrint, reportPath + "products.html");
        }
        if (reportFormat.equalsIgnoreCase("pdf")) {
            pdfFileName = "products.pdf";
            JasperExportManager.exportReportToPdfFile(jasperPrint, reportPath + pdfFileName);
            Desktop.getDesktop().open(new File(reportPath + pdfFileName));
        }
        return "بسم الله الرحمن الرحيم" + "Report Generated IN path" + reportPath;
    }

    public void printInvoice(InvoiceModel invoice) throws IOException, JRException {

        File file = ResourceUtils.getFile(jrxmlFilePath + "invoice.jrxml");
        pdfFileName = "invoice.pdf";
        List<ProductModel> products = invoice.getProductModels()
                .stream().map(p -> {
                    p.setSubTotal(p.getPrice() * p.getAmount());
                    return p;
                }).collect(Collectors.toList());
        JasperReport jasperReport = JasperCompileManager.compileReport(file.getAbsolutePath());
        JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(products);

        Double total = invoice.getProductModels().stream().map(p -> p.getAmount() * p.getPrice()).reduce((double) 0, Double::sum);
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("title", "invoice");
        parameters.put("date",invoice.getDate());
        parameters.put("time",invoice.getTime());
        parameters.put("user", invoice.getUserName());
        parameters.put("invoiceNo",Integer.toString( invoice.getInvoiceNo()));
        parameters.put("total", total.toString());
        parameters.put("count", Integer.toString(invoice.getProductModels().size()));
        parameters.put("imagePath", imagePath);

        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);

        JasperExportManager.exportReportToPdfFile(jasperPrint, reportPath + pdfFileName);
        Desktop.getDesktop().open(new File(reportPath + pdfFileName));
    }

/* *****arithametic operation in jasper reports
    $F{field_1}.divide($F{field_2})

    $F{field_1}.multiply($F{field_2})

    $F{field_1}.add($F{field_2})

    $V{v_constant} != (new BigDecimal(0)) ? $F{freight}.divide($V{v_constant}) : (new BigDecimal(0))

            ($F{field_1}.subtract($F{field_2})).abs()

BigDecimal.valueOf(StrictMath.sqrt($F{field_1}.doubleValue()))*/

}
