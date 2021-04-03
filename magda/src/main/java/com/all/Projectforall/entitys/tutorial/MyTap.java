package com.all.Projectforall.entitys.tutorial;

import com.all.Projectforall.models.tutorial.MyTapModel;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "taps")
public class MyTap {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(unique = true,nullable = false)
    private String title;
    @OneToMany(mappedBy = "tap", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    List<MyLink> links;

    public void add_link(MyLink link) {
        if (link != null) {
            if (links == null) links = new ArrayList<>();
            link.setTap(this);//set the foreign key
            links.add(link);
        }
    }

    public MyTap() {
    }

    public MyTap(MyTapModel tap){
        this.title=tap.getTitle();

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

    public List<MyLink> getLinks() {
        if(links==null)return links=new ArrayList<>();
        return links;
    }

    public void setLinks(List<MyLink> links) {
        this.links = links;
    }

    @Override
    public String toString() {
        return "MyTap{" +
                "id=" + id +
                ", title='" + title + '\'' +
                '}';
    }
}
