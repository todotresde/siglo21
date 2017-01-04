package com.todotresde.siglo21.line.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
@Entity
@Table(name = "workStation")
public class WorkStationConfiguration {
    @Id
    @NotNull
    public Integer id;
    @OneToOne
    public WorkStation workStation;
    @OneToOne
    public WorkStation prevWorkStation;
    @OneToOne
    public WorkStation nextWorkStation;
    @OneToMany
    public List<ProductType> productTypes;
    @OneToMany
    public List<User> users;

    public WorkStationConfiguration(){

    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public WorkStation getWorkStation() {
        return workStation;
    }

    public void setWorkStation(WorkStation workStation) {
        this.workStation = workStation;
    }

    public WorkStation getPrevWorkStation() {
        return prevWorkStation;
    }

    public void setPrevWorkStation(WorkStation prevWorkStation) {
        this.prevWorkStation = prevWorkStation;
    }

    public WorkStation getNextWorkStation() {
        return nextWorkStation;
    }

    public void setNextWorkStation(WorkStation nextWorkStation) {
        this.nextWorkStation = nextWorkStation;
    }

    public List<ProductType> getProductTypes() {
        return productTypes;
    }

    public void setProductTypes(List<ProductType> productTypes) {
        this.productTypes = productTypes;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }


}
