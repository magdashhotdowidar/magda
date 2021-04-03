package com.all.Projectforall.entitys.tutorial;

import com.all.Projectforall.models.tutorial.MyLinkModel;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "links")
public class MyLink {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String label;

    @OneToMany(mappedBy = "link", cascade = CascadeType.REMOVE, fetch = FetchType.EAGER)
    List<Paragraph> paragraphs;

    @ManyToOne
    @JoinColumn(name = "tab_id")
    private MyTap tap;

    public void add_paragraph(Paragraph paragraph) {
        if (paragraph != null) {
            if (paragraphs == null) paragraphs = new ArrayList<>();
            paragraph.setLink(this);//set the foreign key
            paragraphs.add(paragraph);
        }
    }

    public MyLink() {
    }

    public MyLink(MyLinkModel link){
        this.label=link.getLabel();

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public List<Paragraph> getParagraphs() {
        if(paragraphs==null)paragraphs=new ArrayList<>();
        return paragraphs;
    }

    public void setParagraphs(List<Paragraph> paragraphs) {
        this.paragraphs = paragraphs;
    }

    public MyTap getTap() {
        return tap;
    }

    public void setTap(MyTap tap) {
        this.tap = tap;
    }

    @Override
    public String toString() {
        return "MyLink{" +
                "id=" + id +
                ", label='" + label + '\'' +
                '}';
    }
}
