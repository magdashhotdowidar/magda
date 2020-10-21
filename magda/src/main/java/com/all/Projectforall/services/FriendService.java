package com.all.Projectforall.services;


import com.all.Projectforall.auth.model.Authusermodel;
import com.all.Projectforall.auth.repos.Usersandauthoritiesrepos;
import com.all.Projectforall.entitys.Cart;
import com.all.Projectforall.entitys.Friend;
import com.all.Projectforall.models.CartModel;
import com.all.Projectforall.models.FriendModel;
import com.all.Projectforall.repos.CartRepository;
import com.all.Projectforall.repos.FriendRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@Service
public class FriendService {

    @Autowired
    private FriendRepository f_repo;
    @Autowired
    private Usersandauthoritiesrepos user_repo;

    public CompletableFuture< List<Authusermodel>>allUserFriends(String userName) {
        //it was possible to create one method findByUserNameOrFriendName(String userOrEmail) but I did 2 method to make swap
        List<Friend> list1 = f_repo.findByUserName(userName);
        List<Friend> list2 = f_repo.findByFriendName(userName);
        list2.forEach(friend -> {
            String tem="";
            tem=friend.getUserName();
            friend.setUserName(friend.getFriendName());
            friend.setFriendName(tem); });
        list1.addAll(list2);
       List<Authusermodel> friendsDetails= list1.stream().map(friend -> {
           return  user_repo.findByUsername( friend.getFriendName()).get();
        }).map(Authusermodel::new).collect(Collectors.toList());
        return CompletableFuture.completedFuture(friendsDetails);
    }

    public  List<String>allUserFriendsNames(String userName) {
        //it was possible to create one method findByUserNameOrFriendName(String userOrEmail) but I did 2 method to make swap
        List<Friend> list1 = f_repo.findByUserName(userName);
        List<Friend> list2 = f_repo.findByFriendName(userName);
        list2.forEach(friend -> {
            String tem="";
            tem=friend.getUserName();
            friend.setUserName(friend.getFriendName());
            friend.setFriendName(tem); });
        list1.addAll(list2);
        List<String> friendsDetails= list1.stream().map(friend ->friend.getFriendName()).collect(Collectors.toList());
        return friendsDetails;
    }

    public CompletableFuture< FriendModel> getFriendByUserNameAndFriendName(String userName, String friendName) {
        return CompletableFuture.completedFuture( new FriendModel(f_repo.findByUserNameAndFriendName(userName, friendName).get()));
    }


    public CompletableFuture< Map<String, Boolean>> deleteFriend(String userName, String friendName) {
        Friend friend = f_repo.findByUserNameAndFriendName(userName, friendName).get();
        f_repo.delete(friend);
        Map<String, Boolean> response = new HashMap<String, Boolean>();
        response.put("deleted", Boolean.TRUE);
        return CompletableFuture.completedFuture( response);
    }

    public CompletableFuture< Map<String, Boolean>> deleteAllUserFriends(String user) {
        List<Friend> friends = f_repo.findByUserName(user);
        f_repo.deleteAll(friends);
        Map<String, Boolean> response = new HashMap<String, Boolean>();
        response.put("deleted", Boolean.TRUE);
        return CompletableFuture.completedFuture( response);
    }

    public CompletableFuture< FriendModel> save(FriendModel friendModel) {
        return CompletableFuture.completedFuture( new FriendModel(f_repo.save(new Friend(friendModel))));

    }

}
