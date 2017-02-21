package com.todotresde.siglo21.line.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
@Entity
@Table(name = "workStationConfiguration")
public class WorkStationConfiguration implements Cloneable{
    @Id
    @NotNull
    private Long id;
    @OneToOne
    @NotNull
    private WorkStation workStation;
    @OneToOne
    private WorkStation prevWorkStation;
    @OneToOne
    private WorkStation nextWorkStation;
    @ElementCollection
    @NotNull
    private List<Long> productTypes;
    @ElementCollection
    @NotNull
    private List<Long> users;
    @NotNull
    private Boolean first = false;
    @NotNull
    private Boolean last = false;
    @OneToMany
    private List<Delay> delays;

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

    public List<Long> getProductTypes() {
        return productTypes;
    }

    public void setProductTypes(List<Long> productTypes) {
        this.productTypes = productTypes;
    }

    public List<Long> getUsers() {
        return users;
    }

    public void setUsers(List<Long> users) {
        this.users = users;
    }

    public Boolean getFirst() {
        return first;
    }

    public void setFirst(Boolean first) {
        this.first = first;
    }

    public Boolean getLast() {
        return last;
    }

    public void setLast(Boolean last) {
        this.last = last;
    }

    public List<Delay> getDelays() {
        return delays;
    }

    public void setDelays(List<Delay> delays) {
        this.delays = delays;
    }

    @Override
    protected Object clone() throws CloneNotSupportedException {
        return super.clone();
    }
}
