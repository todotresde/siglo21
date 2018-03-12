package com.todotresde.sfi2.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A WSConfiguration.
 */
@Entity
@Table(name = "ws_configuration")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class WSConfiguration implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first")
    private Boolean first;

    @Column(name = "last")
    private Boolean last;

    @ManyToOne(optional = false)
    @NotNull
    private WorkStation workStation;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "wsconfiguration_supply_type",
               joinColumns = @JoinColumn(name="wsconfigurations_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="supply_types_id", referencedColumnName="id"))
    private Set<SupplyType> supplyTypes = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "wsconfiguration_employee",
               joinColumns = @JoinColumn(name="wsconfigurations_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="employees_id", referencedColumnName="id"))
    private Set<Employee> employees = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "wsconfiguration_prev_work_station",
               joinColumns = @JoinColumn(name="wsconfigurations_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="prev_work_stations_id", referencedColumnName="id"))
    private Set<WorkStation> prevWorkStations = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "wsconfiguration_next_work_station",
               joinColumns = @JoinColumn(name="wsconfigurations_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="next_work_stations_id", referencedColumnName="id"))
    private Set<WorkStation> nextWorkStations = new HashSet<>();

    @ManyToOne(optional = false)
    @NotNull
    private Line line;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isFirst() {
        return first;
    }

    public WSConfiguration first(Boolean first) {
        this.first = first;
        return this;
    }

    public void setFirst(Boolean first) {
        this.first = first;
    }

    public Boolean isLast() {
        return last;
    }

    public WSConfiguration last(Boolean last) {
        this.last = last;
        return this;
    }

    public void setLast(Boolean last) {
        this.last = last;
    }

    public WorkStation getWorkStation() {
        return workStation;
    }

    public WSConfiguration workStation(WorkStation workStation) {
        this.workStation = workStation;
        return this;
    }

    public void setWorkStation(WorkStation workStation) {
        this.workStation = workStation;
    }

    public Set<SupplyType> getSupplyTypes() {
        return supplyTypes;
    }

    public WSConfiguration supplyTypes(Set<SupplyType> supplyTypes) {
        this.supplyTypes = supplyTypes;
        return this;
    }

    public WSConfiguration addSupplyType(SupplyType supplyType) {
        this.supplyTypes.add(supplyType);
        supplyType.getWsConfigurations().add(this);
        return this;
    }

    public WSConfiguration removeSupplyType(SupplyType supplyType) {
        this.supplyTypes.remove(supplyType);
        supplyType.getWsConfigurations().remove(this);
        return this;
    }

    public void setSupplyTypes(Set<SupplyType> supplyTypes) {
        this.supplyTypes = supplyTypes;
    }

    public Set<Employee> getEmployees() {
        return employees;
    }

    public WSConfiguration employees(Set<Employee> employees) {
        this.employees = employees;
        return this;
    }

    public WSConfiguration addEmployee(Employee employee) {
        this.employees.add(employee);
        employee.getWsConfigurations().add(this);
        return this;
    }

    public WSConfiguration removeEmployee(Employee employee) {
        this.employees.remove(employee);
        employee.getWsConfigurations().remove(this);
        return this;
    }

    public void setEmployees(Set<Employee> employees) {
        this.employees = employees;
    }

    public Set<WorkStation> getPrevWorkStations() {
        return prevWorkStations;
    }

    public WSConfiguration prevWorkStations(Set<WorkStation> workStations) {
        this.prevWorkStations = workStations;
        return this;
    }

    public WSConfiguration addPrevWorkStation(WorkStation workStation) {
        this.prevWorkStations.add(workStation);
        workStation.getPrevWSConfigurations().add(this);
        return this;
    }

    public WSConfiguration removePrevWorkStation(WorkStation workStation) {
        this.prevWorkStations.remove(workStation);
        workStation.getPrevWSConfigurations().remove(this);
        return this;
    }

    public void setPrevWorkStations(Set<WorkStation> workStations) {
        this.prevWorkStations = workStations;
    }

    public Set<WorkStation> getNextWorkStations() {
        return nextWorkStations;
    }

    public WSConfiguration nextWorkStations(Set<WorkStation> workStations) {
        this.nextWorkStations = workStations;
        return this;
    }

    public WSConfiguration addNextWorkStation(WorkStation workStation) {
        this.nextWorkStations.add(workStation);
        workStation.getNextWSConfigurations().add(this);
        return this;
    }

    public WSConfiguration removeNextWorkStation(WorkStation workStation) {
        this.nextWorkStations.remove(workStation);
        workStation.getNextWSConfigurations().remove(this);
        return this;
    }

    public void setNextWorkStations(Set<WorkStation> workStations) {
        this.nextWorkStations = workStations;
    }

    public Line getLine() {
        return line;
    }

    public WSConfiguration line(Line line) {
        this.line = line;
        return this;
    }

    public void setLine(Line line) {
        this.line = line;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        WSConfiguration wSConfiguration = (WSConfiguration) o;
        if (wSConfiguration.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), wSConfiguration.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "WSConfiguration{" +
            "id=" + getId() +
            ", first='" + isFirst() + "'" +
            ", last='" + isLast() + "'" +
            "}";
    }
}
