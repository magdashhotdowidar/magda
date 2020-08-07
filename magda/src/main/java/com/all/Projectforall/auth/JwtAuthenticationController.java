package com.all.Projectforall.auth;

import java.util.*;
import java.util.stream.Collectors;

import com.all.Projectforall.auth.entitys.MyAuthority;
import com.all.Projectforall.auth.entitys.MyUser;
import com.all.Projectforall.auth.model.Authusermodel;
import com.all.Projectforall.auth.repos.Usersandauthoritiesrepos;
import com.all.Projectforall.configuration.FileUpload;
import com.all.Projectforall.entitys.Friend;
import com.all.Projectforall.exceptions.ResourceNotFoundException;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@CrossOrigin()
@RestController
//@RequestMapping("/auth") It must not be a @RequesMapping annotated with the auth class
public class JwtAuthenticationController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @Autowired
    private JwtUserDetailsService userDetailsService;
    @Autowired
    Usersandauthoritiesrepos userRepo;

    @RequestMapping({"/hello"})
    public String firstPage() {
        return "بسم الله الرحمن الرحيم";
    }


    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {
        authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());
        final UserDetails userDetails = userDetailsService
                .loadUserByUsername(authenticationRequest.getUsername());

        final String token = jwtTokenUtil.generateToken(userDetails);
        final String userName = jwtTokenUtil.getUsernameFromToken(token);
        final MyUser user =userRepo.findByUsername(userName).get();
        final String role = user.getAuthorities().get(0).getAuthority();
        final String userAdmin=user.getTheUserAdmin();
        System.out.println("authenticate token: " + token);
        return ResponseEntity.ok(new JwtResponse(token, userName, role,userAdmin));
    }

    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }

    @PostMapping("/adduser")
    public Map<String, Boolean> createUser(@Valid @RequestBody Authusermodel model) {
        Map<String, Boolean> response = new HashMap<>();
        MyUser user = new MyUser(model);
        model.getRoles().forEach(role -> user.add_authority(new MyAuthority(role)));
        //System.out.println("the user controll");
        if ((new Authusermodel(userRepo.save(user))) != null) {
            response.put("Succeeded", Boolean.TRUE);
        } else {
            response.put("Succeeded", Boolean.FALSE);
        }
        return response;
    }

    @GetMapping("allUsers")
    public ResponseEntity<List<Authusermodel>> allUser() {
        return ResponseEntity.ok().body(userRepo.findAll().stream().map(
                myUser -> new Authusermodel(myUser)).collect(Collectors.toList()));
    }

    @GetMapping("user/{u}")
    public ResponseEntity<Authusermodel> getUserByName(@PathVariable("u") String user) {
        return ResponseEntity.ok(new Authusermodel(userRepo.findByUsername(user).get()));
    }

    @GetMapping("userNameOrEmail/{userNameOrEmail}")
    public ResponseEntity<List<Authusermodel>> getUserByNameOrEmail(@PathVariable("userNameOrEmail") String user) {
        return ResponseEntity.ok().body(userRepo.findByUsernameLikeOrEmailLike(user, user).stream().map(
                myUser -> new Authusermodel(myUser)).collect(Collectors.toList()));
    }

    @PutMapping("user")
    public ResponseEntity<Authusermodel> updateProduct(@RequestParam(value = "file", required = false) MultipartFile file,
                                                       @RequestParam(value = "updatedUser", required = false) String StrUser,
                                                       HttpServletRequest request)
            throws ResourceNotFoundException {

        if (!file.getOriginalFilename().equals(""))
            FileUpload.UPloadImage(request, file, file.getOriginalFilename(),"user");

        Authusermodel userDetails = new Gson().fromJson(StrUser, Authusermodel.class);

        MyUser user = userRepo.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("user not found  "));

        user.setUsername(userDetails.getUsername());
        user.setPassword(userDetails.getPassword());
        user.setEmail(userDetails.getEmail());
        user.setGender(userDetails.getGender());
        user.setPersonalImage(userDetails.getPersonalImage());
        user.setBackgroundImage(userDetails.getBackgroundImage());
        user.setPhoneNumber(userDetails.getPhoneNumber());
        user.setEnabled(userDetails.isEnabled());
        user.setBirthDate(userDetails.getBirthDate());
        user.setTheUserAdmin(userDetails.getTheUserAdmin());

        if(!userDetails.getRoles().isEmpty())
        userDetails.getRoles().forEach(role -> user.add_authority(new MyAuthority(role)));

        final MyUser updatedUser = userRepo.save(user);
        return ResponseEntity.ok(new Authusermodel(updatedUser));
    }

    @GetMapping("/users/admins")
    public List<String> selectnames() {
        return userRepo.selectAllUsersAdmin();
    }
}