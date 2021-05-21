package com.all.Projectforall.services.tutorial;


import com.all.Projectforall.entitys.tutorial.MyLink;
import com.all.Projectforall.entitys.tutorial.MyTap;
import com.all.Projectforall.models.tutorial.MyLinkModel;
import com.all.Projectforall.models.tutorial.MyTapModel;
import com.all.Projectforall.repos.tutorial.MyTapRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@Service
public class MyTapService {

    @Autowired
    private MyTapRepository repo;

    public CompletableFuture<List<MyTapModel>> getAllTaps() {
        List<MyTapModel> tabs = repo.findAll()
                .stream().map(MyTapModel::new).collect(Collectors.toList());
        return CompletableFuture.completedFuture(tabs);

    }

    public CompletableFuture<List<MyLinkModel>> getAllTapLinks(String tap) {
        List<MyLinkModel> links = repo.findByTitle(tap).get().getLinks()
                .stream().map(MyLinkModel::new).collect(Collectors.toList());
        return CompletableFuture.completedFuture(links);

    }

    public CompletableFuture<String> save(MyTapModel tapModel) {
        String message = "";
        MyTap tap = new MyTap(tapModel);
        tapModel.getLinks().forEach(MyLinkModel -> {
            tap.add_link(new MyLink(MyLinkModel));
        });
        MyTap obj = repo.save(tap);
        if (obj != null) message = "success";
        else message = "fail";

        return CompletableFuture.completedFuture(message);

    }

    public CompletableFuture<String>deleteTap(String tap){
        String message = "";
        MyTap obj=repo.findByTitle(tap).get();

        if (obj != null) {
            repo.delete(obj);
            message = "success";
        } else message = "fail";
        return CompletableFuture.completedFuture(message);
    }

}
