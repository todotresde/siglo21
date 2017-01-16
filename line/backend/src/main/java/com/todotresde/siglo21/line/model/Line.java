package com.todotresde.siglo21.line.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
@Entity
@Table(name = "line")
public class Line {
    @Id
    @NotNull
    private Long id;
    @NotNull
    private String name;
    @OneToMany(cascade = { CascadeType.ALL })
    private List<WorkStationConfiguration> workStationConfigurations;

    public Line(){

    }

    public Line(Long id, String name, List<WorkStationConfiguration> workStationConfigurations) {
        this.id = id;
        this.name = name;
        this.workStationConfigurations = workStationConfigurations;
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

    public List<WorkStationConfiguration> getWorkStationConfigurations() {
        return workStationConfigurations;
    }

    public void setWorkStationConfigurations(List<WorkStationConfiguration> workStationConfigurations) {
        this.workStationConfigurations = workStationConfigurations;
    }

}
