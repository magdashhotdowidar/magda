package com.all.Projectforall.models.tutorial;

import com.all.Projectforall.entitys.tutorial.MyTap;

import java.util.List;
import java.util.stream.Collectors;

public class MyTapModel {
  private int id;
  private String title;
  private List<MyLinkModel>links;

    public MyTapModel() {
    }

    public MyTapModel(MyTap tap){
        this.id=tap.getId();
        this.title=tap.getTitle();

        if (!tap.getLinks().isEmpty()) {
            this.links = tap.getLinks().
                    stream().map(link ->
                    new MyLinkModel(link)
            ).collect(Collectors.toList());
        }
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<MyLinkModel> getLinks() {
        return links;
    }

    public void setLinks(List<MyLinkModel> links) {
        this.links = links;
    }

    @Override
    public String toString() {
        return "MyTapModel{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", links=" + links +
                '}';
    }
}
