package com.all.Projectforall;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
@SpringBootApplication
@EnableJpaRepositories()
public class ProjectforallApplication {


    public static void main(String[] args) {

        //SpringApplication.run(ProjectforallApplication.class, args);

        new SpringApplicationBuilder(ProjectforallApplication.class).headless(false).run(args); //this for opening desktop file

    }

}
