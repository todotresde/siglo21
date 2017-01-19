package com.todotresde.siglo21.line.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;

/**
 * Created by Leonardo on 26/12/2016.
 */
@Entity
@Table(name = "trace")
public class Trace {
    @Id
    @NotNull
    private Long id;
    @NotNull
    @OneToOne
    private ManufacturingOrder manufacturingOrder;
    @NotNull
    @OneToOne
    private Line line;
    @NotNull
    @OneToOne
    private WorkStation workStation;
    @NotNull
    @OneToOne
    private ManufacturingOrderProduct manufacturingOrderProduct;
    @NotNull
    private Date startTime;
    private Date endTime;
    private Long time;
    @NotNull
    private Integer state;
    @OneToMany
    private List<Delay> delays;
    @NotNull
    @OneToOne
    private User user;

    public Trace(){

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ManufacturingOrder getManufacturingOrder() {
        return manufacturingOrder;
    }

    public void setManufacturingOrder(ManufacturingOrder manufacturingOrder) {
        this.manufacturingOrder = manufacturingOrder;
    }

    public Line getLine() {
        return line;
    }

    public void setLine(Line line) {
        this.line = line;
    }

    public WorkStation getWorkStation() {
        return workStation;
    }

    public void setWorkStation(WorkStation workStation) {
        this.workStation = workStation;
    }

    public ManufacturingOrderProduct getManufacturingOrderProduct() {
        return manufacturingOrderProduct;
    }

    public void setManufacturingOrderProduct(ManufacturingOrderProduct manufacturingOrderProduct) {
        this.manufacturingOrderProduct = manufacturingOrderProduct;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public Long getTime() {
        return time;
    }

    public void setTime(Long time) {
        this.time = time;
    }

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }

    public List<Delay> getDelays() {
        return delays;
    }

    public void setDelays(List<Delay> delays) {
        this.delays = delays;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
