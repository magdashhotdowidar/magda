package com.all.Projectforall.entitys.tutorial;

import com.all.Projectforall.models.tutorial.ParagraphModel;

import javax.persistence.*;

@Entity
@Table(name = "paragraphs")
public class Paragraph {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String header;
    private String paragraph;
    @Column(name = "tutorial_file")
    private String file;

    @ManyToOne
    @JoinColumn(name = "link_id")
    private MyLink link;

    public Paragraph() { }

    public Paragraph(ParagraphModel paragraph){
     this.header=paragraph.getHeader();
     this.paragraph=paragraph.getParagraph();
     this.file=paragraph.getFile();
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getHeader() {
        return header;
    }

    public void setHeader(String header) {
        this.header = header;
    }

    public String getParagraph() {
        return paragraph;
    }

    public void setParagraph(String paragraph) {
        this.paragraph = paragraph;
    }

    public String getFile() {
        return file;
    }

    public void setFile(String file) {
        this.file = file;
    }

    public MyLink getLink() {
        return link;
    }

    public void setLink(MyLink link) {
        this.link = link;
    }

    @Override
    public String toString() {
        return "Paragraph{" +
                "id=" + id +
                ", header='" + header + '\'' +
                ", paragraph='" + paragraph + '\'' +
                ", file='" + file + '\'' +
                ", link=" + link +
                '}';
    }
}
