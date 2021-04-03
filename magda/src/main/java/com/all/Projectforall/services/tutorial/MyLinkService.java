package com.all.Projectforall.services.tutorial;


import com.all.Projectforall.entitys.tutorial.MyLink;
import com.all.Projectforall.entitys.tutorial.MyTap;
import com.all.Projectforall.entitys.tutorial.Paragraph;
import com.all.Projectforall.models.tutorial.MyLinkModel;
import com.all.Projectforall.models.tutorial.ParagraphModel;
import com.all.Projectforall.repos.tutorial.MyLinkRepository;
import com.all.Projectforall.repos.tutorial.MyTapRepository;
import com.all.Projectforall.repos.tutorial.ParagraphRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@Service
public class MyLinkService {

    @Autowired
    private MyLinkRepository repo;
    @Autowired
    private MyTapRepository tapRepository;
    @Autowired
    private ParagraphRepository paragraphRepository;

    public CompletableFuture<List<ParagraphModel>> getAllLinkParagraphs(String tab, String link) {
        List<MyLink> links = tapRepository.findByTitle(tab).get().getLinks().stream().filter(link1 -> link1.getLabel().equals(link)).collect(Collectors.toList());
        List<ParagraphModel> paragraphs = links.get(0).getParagraphs().stream().map(ParagraphModel::new).collect(Collectors.toList());
        return CompletableFuture.completedFuture(paragraphs);

    }

    public CompletableFuture<String> save(MyLinkModel linkModel) {
        String message = "";
        MyTap tab = tapRepository.findByTitle(linkModel.getTab()).get();
        MyLink link = new MyLink(linkModel);
        linkModel.getParagraphs().forEach(paragraphModel -> {
            link.add_paragraph(new Paragraph(paragraphModel));
        });
        link.setTap(tab);
        MyLink obj = repo.save(link);
        if (obj != null) message = "success";
        else message = "fail";

        return CompletableFuture.completedFuture(message);

    }

    @Transactional
    public CompletableFuture<String> deleteLink(String tab, String link) {
        String message = "";
        List<MyLink> links = tapRepository.findByTitle(tab).get().getLinks().stream().filter(link1 -> link1.getLabel().equals(link)).collect(Collectors.toList());

        if (links.get(0) != null) {
            //repo.delete(links.get(0));
            paragraphRepository.deleteByLinkId(links.get(0).getId());
            repo.deleteByLabel(link);
            message = "success";
        } else message = "fail";
        return CompletableFuture.completedFuture(message);
    }

}
