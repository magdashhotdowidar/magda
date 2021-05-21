package com.all.Projectforall.models.tutorial;

import com.all.Projectforall.entitys.tutorial.MyLink;

import java.util.List;
import java.util.stream.Collectors;

public class MyLinkModel {
  private int id;
  private String tab;
  private String label;
  private List<ParagraphModel>paragraphs;

    public MyLinkModel() {
    }

    public  MyLinkModel(MyLink link){
        this.id=link.getId();
        this.label=link.getLabel();

        if (!link.getParagraphs().isEmpty()) {
            this.paragraphs = link.getParagraphs().
                    stream().map(paragraph ->
                    new ParagraphModel(paragraph)
            ).collect(Collectors.toList());
        }
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

    public List<ParagraphModel> getParagraphs() {
        return paragraphs;
    }

    public void setParagraphs(List<ParagraphModel> paragraphs) {
        this.paragraphs = paragraphs;
    }

    public String getTab() {
        return tab;
    }

    public void setTab(String tab) {
        this.tab = tab;
    }

    @Override
    public String toString() {
        return "MyLinkModel{" +
                "id=" + id +
                ", label='" + label + '\'' +
                ", paragraphs=" + paragraphs +
                '}';
    }
}
