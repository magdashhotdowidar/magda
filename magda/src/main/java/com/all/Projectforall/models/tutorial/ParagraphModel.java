package com.all.Projectforall.models.tutorial;

import com.all.Projectforall.entitys.tutorial.Paragraph;

public class ParagraphModel {
    private int id;
    private String tab;
    private String link;
    private String header;
    private String paragraph;
    private String file;

    public ParagraphModel() { }

    public ParagraphModel(Paragraph paragraph){
        this.id=paragraph.getId();
        this.header=paragraph.getHeader();
        this.paragraph=paragraph.getParagraph();
        this.file=paragraph.getFile();
        this.link=paragraph.getLink().getLabel();
        this.tab=paragraph.getLink().getTap().getTitle();
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

    public String getTab() {
        return tab;
    }

    public void setTab(String tab) {
        this.tab = tab;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    @Override
    public String toString() {
        return "ParagraphModel{" +
                "id=" + id +
                ", tab='" + tab + '\'' +
                ", link='" + link + '\'' +
                ", header='" + header + '\'' +
                ", paragraph='" + paragraph + '\'' +
                ", file='" + file + '\'' +
                '}';
    }
}
