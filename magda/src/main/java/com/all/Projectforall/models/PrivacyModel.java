package com.all.Projectforall.models;

import com.all.Projectforall.entitys.MyPrivacy;

public class PrivacyModel {

    private String user;
    private String property;
    private Boolean propertyState;

    public PrivacyModel(){}

    public PrivacyModel(MyPrivacy privacy){
        this.property=privacy.getProperty();
        this.propertyState=privacy.getPropertyState();
        this.user=privacy.getUser();
    }

    public PrivacyModel(String user,String property,Boolean propertyState){
        this.user=user;
        this.property=property;
        this.propertyState=propertyState;
    }

    public String getProperty() {
        return property;
    }

    public void setProperty(String property) {
        this.property = property;
    }

    public Boolean getPropertyState() {
        return propertyState;
    }

    public void setPropertyState(Boolean propertyState) {
        this.propertyState = propertyState;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "PrivacyModel{" +
                "user='" + user + '\'' +
                ", property='" + property + '\'' +
                ", propertyState=" + propertyState +
                '}';
    }
}
