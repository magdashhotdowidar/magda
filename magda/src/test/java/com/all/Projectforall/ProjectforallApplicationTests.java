package com.all.Projectforall;

import com.all.Projectforall.auth.entitys.MyAuthority;
import com.all.Projectforall.auth.entitys.MyUser;
import com.all.Projectforall.auth.model.Authusermodel;
import com.all.Projectforall.auth.repos.Usersandauthoritiesrepos;
import com.all.Projectforall.entitys.vehicle_hiring.Vehicle;
import com.all.Projectforall.entitys.vehicle_hiring.vehicles.Truck;
import com.all.Projectforall.entitys.vehicle_hiring.vehicles.trucks.TransportTruck;
import com.all.Projectforall.exceptions.custExcep.ResourceNotFoundException;
import com.all.Projectforall.models.InvoiceModel;
import com.all.Projectforall.repos.vehicle_hiring.VehicleRepository;
import com.all.Projectforall.services.InvoiceService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.transaction.annotation.Transactional;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

@SpringBootTest
class ProjectforallApplicationTests {

    @Autowired
    Usersandauthoritiesrepos repo;

    @Autowired
    InvoiceService invserv;
    @Autowired
    VehicleRepository vehicleRepository;

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
    public void get() {
        repo.selectAllUsersAdmin().forEach(a->System.out.println(a));
    }

    @Test
    public void creatInvoice() throws ParseException {

        Truck truck=new Truck();
       truck.setPlateNumber("ffr4");
       truck.setDailyFee(342225);
       truck.setNumberOfTires(52);
       truck.setLoadingCap(445);
       truck.setPrice(8000000);
        Truck transportTruck=new TransportTruck(truck,false);


       vehicleRepository.save(transportTruck);

    }

    @Test
    @Transactional
    public void getallInvoices() throws ExecutionException, InterruptedException {

        List<Vehicle> all = vehicleRepository.findAll();
        System.out.println("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
        System.out.println(all);
     /*   all.forEach(vehicle ->
        {
            System.out.println(vehicle);
        });*/

    }

    @Test
    @Transactional
    public void findById() {

        Optional<Vehicle> obj = vehicleRepository.findById(2);
        System.out.println("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
            System.out.println(obj.get());
        System.out.println("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");

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

        Optional<Vehicle> user = vehicleRepository.findByPlateNumber("ffr4");
        user.orElseThrow(() -> new UsernameNotFoundException("Not Found"));

        System.out.println("the vehicle is  :" + user.get());
        System.out.println("the vehicle is  :" + user.get().getClass());
String v="TransportTruck";
        System.out.println("the is goes  :" +((TransportTruck) user.get()).isGoesAbroad());



    }


}
