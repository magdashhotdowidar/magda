package com.all.Projectforall.services;


import com.all.Projectforall.entitys.FriendRequest;
import com.all.Projectforall.exceptions.ResourceNotFoundException;
import com.all.Projectforall.repos.FriendRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FriendRequestService {

    @Autowired
    private FriendRequestRepository c_repo;

    public List<FriendRequest> allFriendRequests() {
        return c_repo.findAll().stream().collect(Collectors.toList());

    }

    public List<FriendRequest> getRequestByTo(String to) {
        return c_repo.findByTo(to);
    }

    public List<FriendRequest> getRequestByFrom(String from) {
        return c_repo.findByFrom(from);
    }

    public List<FriendRequest> getRequestByFromAndTo(String from, String to) {
       return   c_repo.findByFromAndTo(from, to);
    }


    public Map<String, Boolean> deleteFriendRequest(String from, String to) {
        List<FriendRequest> request = c_repo.findByFromAndTo(from, to);
        c_repo.delete(request.get(0));
        Map<String, Boolean> response = new HashMap<String, Boolean>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }

    public FriendRequest save(FriendRequest friendRequest) {
        return c_repo.save(friendRequest);

    }

}
