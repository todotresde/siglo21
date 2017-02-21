package com.todotresde.siglo21.line.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

/**
 * Created by Leonardo on 26/12/2016.
 */
@Entity
@Table(name = "workStation")
public class WorkStation {
    @Id
    @NotNull
    private Long id;
    @NotNull
    private String name;
    @NotNull
    private String shortName;
    @NotNull
    private String ip;

    public WorkStation(){

    }

    public WorkStation(Long id, String name, String ip) {
        this.id = id;
        this.name = name;
        this.ip = ip;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getShortName() {
        return shortName;
    }

    public void setShortName(String shortName) {
        this.shortName = shortName;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }
}
