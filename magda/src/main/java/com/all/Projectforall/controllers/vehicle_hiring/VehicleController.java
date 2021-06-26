package com.all.Projectforall.controllers.vehicle_hiring;

import com.all.Projectforall.configuration.FileUpload;
import com.all.Projectforall.configuration.TestClass;
import com.all.Projectforall.entitys.vehicle_hiring.Vehicle;
import com.all.Projectforall.entitys.vehicle_hiring.VehicleTransaction;
import com.all.Projectforall.entitys.vehicle_hiring.vehicles.Truck;
import com.all.Projectforall.exceptions.custExcep.NoCancellationYouMustPayException;
import com.all.Projectforall.exceptions.custExcep.OverWeightException;
import com.all.Projectforall.exceptions.custExcep.SorryWeDontHaveThatOneException;
import com.all.Projectforall.models.vehicle_hiring.ResponseWithDateModel;
import com.all.Projectforall.repos.vehicle_hiring.VehicleRepository;
import com.all.Projectforall.responses.VehicleResponse;
import com.all.Projectforall.services.vehicle_hiring.VehicleService;
import com.all.Projectforall.services.vehicle_hiring.VehicleTransactionService;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/vehicle")
public class VehicleController {
    @Autowired
    private VehicleTransactionService transactionService;

    @Autowired
    private VehicleService vehicleService;
    @Autowired
    private VehicleRepository vehicleRepository;

    @PostMapping()
    public CompletableFuture<String> save(@RequestParam(value = "file", required = false) MultipartFile file,
                                          @RequestParam(value = "vehicle", required = false) String SVehicle,
                                          @RequestParam(value = "type", required = false) String type,
                                          HttpServletRequest request) {

        if (file != null || !file.getOriginalFilename().equals(""))
            FileUpload.UPloadImage(request, file, file.getOriginalFilename(), "vehicles");

        Vehicle vehicle = new Gson().fromJson(SVehicle, TestClass.getVehicle(type).getClass());
        return vehicleService.save(vehicle);
    }

    @DeleteMapping("/{num}")
    public CompletableFuture<String> delete(@PathVariable(value = "num") String plateNumber) {
        return vehicleService.delete(plateNumber);
    }

    @DeleteMapping("/deleteAll")
    public CompletableFuture<String> deleteAll() {
         vehicleService.deleteAllVehicles();
         return CompletableFuture.completedFuture("successfully deletion");
    }
    @DeleteMapping("/isNull")
    public CompletableFuture<String> deleteAllNull() {
        vehicleService.deleteByPlateNumISNull();
        return CompletableFuture.completedFuture("successfully deletion");
    }

    @GetMapping()
    public CompletableFuture<ResponseEntity<VehicleResponse>> getAllVehicles() throws Exception {
        return vehicleService.getAllVehiclesSorted().thenApply(ResponseEntity::ok);
    }

    @GetMapping("searchByTypeOrPlateNum/{value}")
    public ResponseEntity<List<Vehicle>> getVehicleByTypeOrPlateNumber(@PathVariable("value") String user) {
        return ResponseEntity.ok().body(vehicleRepository.findByPlateNumberLikeOrVehicleTypeLike("%"+user+"%", "%"+user+"%"));
    }
    @GetMapping("searchByType/{value}")
    public ResponseEntity<List<Vehicle>> getVehicleByType(@PathVariable("value") String user) {
        return ResponseEntity.ok().body(vehicleRepository.findByVehicleTypeLike("%"+user+"%"));
    }

    @GetMapping("/getVehicle/{plateNum}")
    public CompletableFuture<ResponseEntity<Vehicle>> getVehicle(@PathVariable(value = "plateNum") String plateNum
    ) {
        return vehicleService.getVehicle(plateNum).thenApply(ResponseEntity::ok);
    }

    @PutMapping("/book/{num}")
    public CompletableFuture<ResponseEntity<String>> bookMe(@Valid @RequestBody ResponseWithDateModel response,
                                                            @PathVariable(value = "num") String num) throws SorryWeDontHaveThatOneException {
        return transactionService.bookMe(response.getStartDate(), response.getEndDate(), num).thenApply(ResponseEntity::ok);
    }

    @GetMapping("/cancel/{plateNum}")
    public CompletableFuture<ResponseEntity<String>> cancelMe(@PathVariable(value = "plateNum") String plateNum
    ) throws NoCancellationYouMustPayException {
        return transactionService.cancelMe(plateNum).thenApply(ResponseEntity::ok);
    }

    @GetMapping("/rent/{start}/{end}/{num}")
    public CompletableFuture<ResponseEntity<String>> rentMe(@PathVariable(value = "start") String start, @PathVariable(value = "end") String end,
                                                            @PathVariable(value = "num") String num) throws SorryWeDontHaveThatOneException {
        return transactionService.rentMe(start, end, num).thenApply(ResponseEntity::ok);
    }

    @GetMapping("/rent/location/{start}/{end}/{num}/{location}")
    public CompletableFuture<ResponseEntity<String>> rentMe(@PathVariable(value = "start") String start, @PathVariable(value = "end") String end,
                                                            @PathVariable(value = "num") String num, @PathVariable(value = "location") String location) throws SorryWeDontHaveThatOneException {
        return transactionService.rentMe(start, end, num, location).thenApply(ResponseEntity::ok);
    }

    @GetMapping("/drop/{plateNum}")
    public CompletableFuture<ResponseEntity<Integer>> dropMe(@PathVariable(value = "plateNum") String plateNum
    ) {
        return transactionService.dropMe(plateNum).thenApply(ResponseEntity::ok);
    }

    @GetMapping("/load/{amount}")
    public CompletableFuture<ResponseEntity<List<Truck>>> loadMe(@PathVariable(value = "amount") int amount
    ) throws OverWeightException {
        return transactionService.loadMe(amount).thenApply(ResponseEntity::ok);
    }

}
