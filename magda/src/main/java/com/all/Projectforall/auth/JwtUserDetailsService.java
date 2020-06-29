package com.all.Projectforall.auth;

import com.all.Projectforall.auth.entitys.MyUser;
import com.all.Projectforall.auth.model.Authusermodel;
import com.all.Projectforall.auth.model.MyUserDetails;
import com.all.Projectforall.auth.repos.Usersandauthoritiesrepos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class JwtUserDetailsService implements UserDetailsService {
    @Autowired
    private Usersandauthoritiesrepos repos;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<MyUser> myUser = repos.findByUsername(username);
        myUser.orElseThrow(() -> new UsernameNotFoundException("Not Found"+username));
      return   myUser.map(Authusermodel::new).map(MyUserDetails::new).get();
    }
}
