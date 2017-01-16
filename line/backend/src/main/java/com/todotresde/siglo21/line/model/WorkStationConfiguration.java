package com.todotresde.siglo21.line.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
@Entity
@Table(name = "workStationConfiguration")
public class WorkStationConfiguration {
    @Id
    @NotNull
    private Long id;
    @OneToOne
    @NotNull
    private WorkStation workStation;
    @OneToOne
    @NotNull
    private WorkStation prevWorkStation;
    @OneToOne
    @NotNull
    private WorkStation nextWorkStation;
    @ManyToMany
    @NotNull
    private List<ProductType> productTypes;
    @ManyToMany
    @NotNull
    private List<User> users;

    public WorkStationConfiguration(){

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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
