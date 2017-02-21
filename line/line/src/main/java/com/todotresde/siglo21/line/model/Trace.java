package com.todotresde.siglo21.line.model;

import com.todotresde.siglo21.security.model.User;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

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
    private String code;
    @NotNull
    @OneToOne
    private ManufacturingOrder manufacturingOrder;
    @NotNull
    @OneToOne
    private Line line;
    @NotNull
    @OneToOne
    private WorkStation workStation;
    @OneToOne
    @JsonIdentityInfo(generator=ObjectIdGenerators.IntSequenceGenerator.class, property="@id")
    private WorkStation nextWorkStation;
    @OneToOne
    @JsonIdentityInfo(generator=ObjectIdGenerators.IntSequenceGenerator.class, property="@id")
    private WorkStation previousWorkStation;
    @NotNull
    @OneToOne
    private ManufacturingOrderCustomProduct manufacturingOrderCustomProduct;
    @OneToOne
    private ManufacturingOrderProduct manufacturingOrderProduct;
    private Date inTime;
    private Date startTime;
    private Date endTime;
    private Long time;
    @NotNull
    private Integer status;
    @OneToMany
    private List<Delay> delays;
    @NotNull
    @OneToOne
    private User user;
    @OneToOne
    @JsonIdentityInfo(generator=ObjectIdGenerators.IntSequenceGenerator.class, property="@id")
    private Trace nextTrace;
    @OneToOne
    @JsonIdentityInfo(generator=ObjectIdGenerators.IntSequenceGenerator.class, property="@id")
    private Trace previousTrace;

    public Trace(){

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode() {
        this.code = this.manufacturingOrder.getCode()
                .concat("-")
                .concat(String.valueOf(this.getManufacturingOrderCustomProduct().getId()));
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

    public WorkStation getNextWorkStation() {
        return nextWorkStation;
    }

    public void setNextWorkStation(WorkStation nextWorkStation) {
        this.nextWorkStation = nextWorkStation;
    }

    public WorkStation getPreviousWorkStation() {
        return previousWorkStation;
    }

    public void setPreviousWorkStation(WorkStation previousWorkStation) {
        this.previousWorkStation = previousWorkStation;
    }

    public ManufacturingOrderProduct getManufacturingOrderProduct() {
        return manufacturingOrderProduct;
    }

    public void setManufacturingOrderProduct(ManufacturingOrderProduct manufacturingOrderProduct) {
        this.manufacturingOrderProduct = manufacturingOrderProduct;
    }

    public ManufacturingOrderCustomProduct getManufacturingOrderCustomProduct() {
        return manufacturingOrderCustomProduct;
    }

    public void setManufacturingOrderCustomProduct(ManufacturingOrderCustomProduct manufacturingOrderCustomProduct) {
        this.manufacturingOrderCustomProduct = manufacturingOrderCustomProduct;
    }

    public Date getInTime() {
        return inTime;
    }

    public void setInTime(Date inTime) {
        this.inTime = inTime;
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

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
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

    public Trace getNextTrace() {
        return nextTrace;
    }

    public void setNextTrace(Trace nextTrace) {
        this.nextTrace = nextTrace;
    }

    public Trace getPreviousTrace() {
        return previousTrace;
    }

    public void setPreviousTrace(Trace previousTrace) {
        this.previousTrace = previousTrace;
    }
}
