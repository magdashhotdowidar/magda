package com.all.Projectforall.controllers.tutorial;

import com.all.Projectforall.configuration.FileUpload;
import com.all.Projectforall.exceptions.custExcep.ResourceNotFoundException;
import com.all.Projectforall.models.tutorial.ParagraphModel;
import com.all.Projectforall.services.tutorial.ParagraphService;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/tutorial/paragraph")
public class ParagraphController {

    @Autowired
    private ParagraphService service;

    @GetMapping("/{header}")
    public CompletableFuture<ResponseEntity<List<ParagraphModel>>> getParagraph(@PathVariable(value = "header") String header) {
        return service.getParagraphByHeaderLikeAnkParagraphLike( header).thenApply(ResponseEntity::ok);
    }

    @PostMapping()
    public CompletableFuture<String> createParagraph(@RequestParam(value = "file", required = false) MultipartFile file,
                                                     @RequestParam(value = "paragraph", required = false) String SParagraph,
                                                     HttpServletRequest request)throws ResourceNotFoundException, ExecutionException, InterruptedException  {

        if (file != null || !file.getOriginalFilename().equals(""))
            FileUpload.UPloadImage(request, file, file.getOriginalFilename(), "paragraph");

        ParagraphModel paragraph = new Gson().fromJson(SParagraph, ParagraphModel.class);
        return service.save(paragraph);
    }

    @DeleteMapping("/{header}/{paragraph}")
    public CompletableFuture<String> deleteLink(@PathVariable(value = "header") String header,
                                                @PathVariable(value = "paragraph") String paragraph) {
        return service.deleteParagraph(header, paragraph);
    }

      /* @RequestMapping("/")
    public String aa() {
        return "allah";
    }*/

}