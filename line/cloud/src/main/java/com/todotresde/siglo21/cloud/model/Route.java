package com.todotresde.siglo21.cloud.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

/**
 * Created by Leonardo on 26/12/2016.
 */
@Entity
@Table(name = "route")
public class Route {
    @Id
    @NotNull
    private Long id;
    @NotNull
    @Column(unique=true)
    private String route;
    @NotNull
    private String description;

    public Route(){

    }

    public Route(Long id, String name, String description) {
        this.id = id;
        this.route = name;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRoute() {
        return route;
    }

    public void setRoute(String route) {
        this.route = route;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

}
