package com.all.Projectforall.services.tutorial;


import com.all.Projectforall.entitys.tutorial.MyLink;
import com.all.Projectforall.entitys.tutorial.MyTap;
import com.all.Projectforall.entitys.tutorial.Paragraph;
import com.all.Projectforall.models.tutorial.ParagraphModel;
import com.all.Projectforall.repos.tutorial.MyTapRepository;
import com.all.Projectforall.repos.tutorial.ParagraphRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@Service
public class ParagraphService {

    @Autowired
    private ParagraphRepository repo;
    @Autowired
    private MyTapRepository tapRepository;

    public CompletableFuture<List<ParagraphModel>> getParagraphByHeaderLikeAnkParagraphLike(String header) {
        List<ParagraphModel> paragraphs = repo.findByHeaderLike("%" + header + "%")
                                                           .stream().map(ParagraphModel::new).collect(Collectors.toList());

        return CompletableFuture.completedFuture(paragraphs);

    }

    public CompletableFuture<String> save(ParagraphModel paragraphModel) {
        String message = "";
        MyTap tabObj = tapRepository.findByTitle(paragraphModel.getTab()).get();
        MyLink linkObj[] = {null};
     // List<MyLink>links= tabObj.getLinks().stream().filter(link -> link.getLabel().equals(paragraphModel.getLink())).collect(Collectors.toList());
        tabObj.getLinks().forEach(link -> {
            if (link.getLabel().equals(paragraphModel.getLink()))linkObj[0]=link;
        });
        Paragraph paragraph = new Paragraph(paragraphModel);
        if (linkObj[0]!=null) {
            paragraph.setLink(linkObj[0]);
            Paragraph obj = repo.save(paragraph);

            if (obj != null) message = "success";
            else message = "fail";
        }
        return CompletableFuture.completedFuture(message);

    }

    public CompletableFuture<String> deleteParagraph(String header, String paragraph) {
        String message = "";
        Paragraph obj = repo.findByHeaderLike("%" + header + "%").get(0);

        if (obj != null) {
            repo.delete(obj);
            message = "success";
        } else message = "fail";
        return CompletableFuture.completedFuture(message);
    }

}
