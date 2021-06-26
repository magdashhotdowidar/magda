package com.all.Projectforall.configuration;

import com.all.Projectforall.entitys.vehicle_hiring.Vehicle;
import com.all.Projectforall.entitys.vehicle_hiring.vehicles.Car;
import com.all.Projectforall.entitys.vehicle_hiring.vehicles.Truck;
import com.all.Projectforall.entitys.vehicle_hiring.vehicles.cars.SUV;
import com.all.Projectforall.entitys.vehicle_hiring.vehicles.cars.SW;
import com.all.Projectforall.entitys.vehicle_hiring.vehicles.cars.Sports;
import com.all.Projectforall.entitys.vehicle_hiring.vehicles.trucks.SmallTruck;
import com.all.Projectforall.entitys.vehicle_hiring.vehicles.trucks.TransportTruck;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class TestClass {

    private static final  SimpleDateFormat obj = new SimpleDateFormat("dd-MM-yyyy");

    public static Map<String,Integer> calcDAte(String date,String date2) {
        String[] firstDateInArray =date.split("-");
        String[] secondDateInArray ;
        if (date2.equals("cur"))
         secondDateInArray = obj.format(new Date()).split("-");
        else secondDateInArray=date2.split("-");

        int fDMToDays = Integer.parseInt(firstDateInArray[1]) * 30;
        int sDMToDays = Integer.parseInt(secondDateInArray[1]) * 30;

        int fDYToDays = Integer.parseInt(firstDateInArray[2]) * 12 * 30;
        int sDYToDays = Integer.parseInt(secondDateInArray[2]) * 12 * 30;

        int fDInDays = fDMToDays + fDYToDays + Integer.parseInt(firstDateInArray[0]);
        int sDInDays = sDMToDays + sDYToDays + Integer.parseInt(secondDateInArray[0]);

        int defBetWeenToDates = sDInDays - fDInDays;
        int defBetWeenToDatesInMs = (defBetWeenToDates % 365) / 30;
        int defBetWeenToDatesInDs = defBetWeenToDates % 30;
        int defBetWeenToDatesInYs = defBetWeenToDates / 365;

        Map<String,Integer> response = new HashMap<>();
        response.put("days",defBetWeenToDatesInDs);
        response.put("defInDays",defBetWeenToDates);
        response.put("months",defBetWeenToDatesInMs);
        response.put("years",defBetWeenToDatesInYs);

        int available;
        if(defBetWeenToDates>0)available=1;
        else available=0;
        response.put("available",available);
        return response;

    }
    public static Vehicle getVehicle(String vehicle){
        if (vehicle==null||vehicle.equals(""))return null;
        else if (vehicle.equalsIgnoreCase("car"))return new Car();
        else if (vehicle.equalsIgnoreCase("truck"))return new Truck();
        else if (vehicle.equalsIgnoreCase("sport"))return new Sports();
        else if (vehicle.equalsIgnoreCase("transport"))return new TransportTruck();
        else if (vehicle.equalsIgnoreCase("suv"))return new SUV();
        else if (vehicle.equalsIgnoreCase("sw"))return new SW();
        else if (vehicle.equalsIgnoreCase("small"))return new SmallTruck();
        return new Vehicle();
    }
    private static void print(Object message) {
        System.out.println(message);
    }

    public static void main(String[] arg) {
        System.out.println(calcDAte("2-6-2021","22-6-2021"));

    }
}