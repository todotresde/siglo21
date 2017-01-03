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
    public Integer id;

    @NotNull
    public String name;

    @NotNull
    public String ip;

    public WorkStation(){

    }

    public WorkStation(Integer id, String name, String ip) {
        this.id = id;
        this.name = name;
        this.ip = ip;
    }

    public String getName() {
        return this.name;
    }

    public Integer getId() {
        return this.id;
    }

    public String getIp() {
        return this.ip;
    }
}
