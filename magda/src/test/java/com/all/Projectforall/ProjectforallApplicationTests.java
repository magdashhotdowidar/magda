package com.all.Projectforall;

import com.all.Projectforall.auth.entitys.MyAuthority;
import com.all.Projectforall.auth.entitys.MyUser;
import com.all.Projectforall.auth.model.Authusermodel;
import com.all.Projectforall.auth.repos.Usersandauthoritiesrepos;
import com.all.Projectforall.entitys.InvoProduct;
import com.all.Projectforall.exceptions.ResourceNotFoundException;
import com.all.Projectforall.models.InvoiceModel;
import com.all.Projectforall.models.ProductModel;
import com.all.Projectforall.repos.InvoiceRepository;
import com.all.Projectforall.services.InvoiceService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.transaction.annotation.Transactional;

import javax.swing.plaf.PanelUI;
import javax.xml.crypto.Data;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@SpringBootTest
class ProjectforallApplicationTests {

    @Autowired
    Usersandauthoritiesrepos repo;

    @Autowired
    InvoiceService invserv;

    @Test
    void contextLoads() {
    }

    @Test
    public void creat() {

        MyUser user = new MyUser();
        user.setUsername("hh");
        user.setPassword("aa");
        user.setEnabled(true);

        MyAuthority authority1 = new MyAuthority();
        authority1.setAuthority("ROLE_USER");

        user.add_authority(authority1);
        repo.save(user);

    }

    @Test
    public void creatInvoice() throws ParseException {

  /*      InvoiceModel invoice = new InvoiceModel();
        invoice.setCustomerName("allah");
        invoice.setUserName("akbar");
        invoice.setDate(new Date());

        ProductModel Product = new ProductModel();
        Product.setAmount(2);
        Product.setName("allah");
        Product.setPrice(2.5);

        invoice.getProductModels().add(Product);

        invserv.save(invoice);*/

    }

    @Test
    @Transactional
    public void getallInvoices() {

        List<InvoiceModel> all = invserv.allInvoices();
        all.forEach(invoiceModel ->
        {
            System.out.println(invoiceModel);
        });

    }

    @Test
    @Transactional
    public void getallusers() {

        List<MyUser> all = repo.findAll();
        all.forEach(myUser ->
        {
            System.out.println(new Authusermodel(myUser));
        });

    }

    @Test
    @Transactional
    public void getInvoice() throws ResourceNotFoundException, ParseException {

        SimpleDateFormat simpleDateFormatIn = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZZZZ");
        SimpleDateFormat simpleDateFormatOut = new SimpleDateFormat("dd/MM/yyyy");

        Date date = simpleDateFormatIn.parse("2020-05-09T22:00:00.000+0000");
        String outDate=simpleDateFormatOut.format(date);

        System.out.println("THE INPUT DATE(" + date + ")");
        System.out.println("THE OUT DATE(" + outDate + ")");

/*        InvoiceModel invoiceModel = invserv.getInvoiceBycustomerAndDate("c",date);

        System.out.println("MY INVOICE IS :" + invoiceModel);
        if (invoiceModel == null) System.out.println("NO INVOICE FOR THIS CUSTOMER IN THIS DATE");*/

    }

    @Test
    @Transactional
    public void getuser() {

        Optional<MyUser> user = repo.findByUsername("user");
        user.orElseThrow(() -> new UsernameNotFoundException("Not Found"));
        System.out.println("MY USER IS :" + user.map(Authusermodel::new).get());
        // System.out.println(user.get().getAuthorities().get(0).getAuthority());
    }


}
