package com.all.Projectforall.services;


import com.all.Projectforall.entitys.MyPrivacy;
import com.all.Projectforall.models.PrivacyModel;
import com.all.Projectforall.repos.PrivacyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
public class PrivacyService {

    @Autowired
    private PrivacyRepository repo;

    public CompletableFuture<String> createPrivacy(PrivacyModel privacy) {
        String message = "";
        MyPrivacy obj = repo.save(new MyPrivacy(privacy));
        if (obj != null) message = "success";
        else message = "fail";

        return CompletableFuture.completedFuture(message);
    }

    public CompletableFuture<PrivacyModel> getPrivacyByProperty(String user,String property) {
        List<MyPrivacy> list=repo.findByUserAndProperty(user,property);
        if (!list.isEmpty())
        return CompletableFuture.completedFuture(new PrivacyModel(list.get(0)));
        return CompletableFuture.completedFuture(new PrivacyModel(user,property,false));
    }

    public CompletableFuture<String> updateProperty(PrivacyModel privacy) {
        String message = "";
        List<MyPrivacy> privacies = repo.findByUserAndProperty(privacy.getUser(),privacy.getProperty());

        if (!privacies.isEmpty()) {
            privacies.get(0).setPropertyState(privacy.getPropertyState());
             repo.save(privacies.get(0));
            message = "success";
        } else{
            repo.save(new MyPrivacy(privacy));
            message = "success";
        }
        return CompletableFuture.completedFuture(message);
    }
    public CompletableFuture<String>deletePrivacy(String user,String property){
        String message = "";
        MyPrivacy obj=repo.findByUserAndProperty(user,property).get(0);

        if (obj != null) {
            repo.delete(obj);
            message = "success";
        } else message = "fail";
        return CompletableFuture.completedFuture(message);
    }


}
