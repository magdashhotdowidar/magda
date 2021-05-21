package com.all.Projectforall.controllers.tutorial;

import com.all.Projectforall.models.tutorial.MyLinkModel;
import com.all.Projectforall.models.tutorial.ParagraphModel;
import com.all.Projectforall.services.tutorial.MyLinkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.concurrent.CompletableFuture;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/tutorial/link")
public class MyLinkController {

    @Autowired
    private MyLinkService service;

    @GetMapping("/{tab}/{link}")
    public CompletableFuture<ResponseEntity<List<ParagraphModel>>>getAllLinkParagraphs(@PathVariable(value = "tab") String tab,
                                                                                       @PathVariable(value = "link") String link) {
        return service.getAllLinkParagraphs(tab,link).thenApply(ResponseEntity::ok);
    }

    @PostMapping()
    public CompletableFuture<String> createLink(@Valid @RequestBody MyLinkModel link) {
        return service.save(link);
    }

    @DeleteMapping("/{tab}/{link}")
    public CompletableFuture<String> deleteLink(@PathVariable(value = "tab") String tab,
                                                @PathVariable(value = "link") String link) {
        return service.deleteLink(tab,link);
    }

      /* @RequestMapping("/")
    public String aa() {
        return "allah";
    }*/

}