package com.all.Projectforall.entitys;

import com.all.Projectforall.models.PrivacyModel;

import javax.persistence.*;

@Entity
@Table(name = "myprivacy")
public class MyPrivacy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "privacy_state")
    private Boolean propertyState;
    @Column(name = "privacy_for",unique = true,nullable = false)
    private String property;
    @Column(name = "privacy_user",unique = true,nullable = false)
    private String user;
    public MyPrivacy() { }

    public MyPrivacy(PrivacyModel privacy){
        this.property=privacy.getProperty();
        this.propertyState=privacy.getPropertyState();
        this.user=privacy.getUser();
    }

    public MyPrivacy( String property,Boolean propertyState) {
        this.propertyState = propertyState;
        this.property = property;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Boolean getPropertyState() {
        return propertyState;
    }

    public void setPropertyState(Boolean propertyState) {
        this.propertyState = propertyState;
    }

    public String getProperty() {
        return property;
    }

    public void setProperty(String property) {
        this.property = property;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "MyPrivacy{" +
                "id=" + id +
                ", propertyState=" + propertyState +
                ", property='" + property + '\'' +
                ", user='" + user + '\'' +
                '}';
    }
}
