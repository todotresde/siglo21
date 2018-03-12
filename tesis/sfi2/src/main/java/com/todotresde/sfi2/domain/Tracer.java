package com.todotresde.sfi2.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A Tracer.
 */
@Entity
@Table(name = "tracer")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Tracer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "code", nullable = false)
    private String code;

    @NotNull
    @Column(name = "in_time", nullable = false)
    private Instant inTime;

    @Column(name = "start_time")
    private Instant startTime;

    @Column(name = "end_time")
    private Instant endTime;

    @Column(name = "jhi_time")
    private Integer time;

    @NotNull
    @Column(name = "status", nullable = false)
    private Integer status;

    @ManyToOne(optional = false)
    @NotNull
    private WSConfiguration wsConfiguration;

    @ManyToOne(optional = false)
    @NotNull
    private ManufacturingOrder manufacturingOrder;

    @ManyToOne(optional = false)
    @NotNull
    private MOProduct moProduct;

    @ManyToOne(optional = false)
    @NotNull
    private Line line;

    @ManyToOne(optional = false)
    @NotNull
    private WorkStation workStation;

    @ManyToOne
    private WorkStation prevWorkStation;

    @ManyToOne
    private WorkStation nextWorkStation;

    @ManyToOne
    private Tracer nextTracer;

    @ManyToOne
    private Tracer prevTracer;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public Tracer code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Instant getInTime() {
        return inTime;
    }

    public Tracer inTime(Instant inTime) {
        this.inTime = inTime;
        return this;
    }

    public void setInTime(Instant inTime) {
        this.inTime = inTime;
    }

    public Instant getStartTime() {
        return startTime;
    }

    public Tracer startTime(Instant startTime) {
        this.startTime = startTime;
        return this;
    }

    public void setStartTime(Instant startTime) {
        this.startTime = startTime;
    }

    public Instant getEndTime() {
        return endTime;
    }

    public Tracer endTime(Instant endTime) {
        this.endTime = endTime;
        return this;
    }

    public void setEndTime(Instant endTime) {
        this.endTime = endTime;
    }

    public Integer getTime() {
        return time;
    }

    public Tracer time(Integer time) {
        this.time = time;
        return this;
    }

    public void setTime(Integer time) {
        this.time = time;
    }

    public Integer getStatus() {
        return status;
    }

    public Tracer status(Integer status) {
        this.status = status;
        return this;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public WSConfiguration getWsConfiguration() {
        return wsConfiguration;
    }

    public Tracer wsConfiguration(WSConfiguration wSConfiguration) {
        this.wsConfiguration = wSConfiguration;
        return this;
    }

    public void setWsConfiguration(WSConfiguration wSConfiguration) {
        this.wsConfiguration = wSConfiguration;
    }

    public ManufacturingOrder getManufacturingOrder() {
        return manufacturingOrder;
    }

    public Tracer manufacturingOrder(ManufacturingOrder manufacturingOrder) {
        this.manufacturingOrder = manufacturingOrder;
        return this;
    }

    public void setManufacturingOrder(ManufacturingOrder manufacturingOrder) {
        this.manufacturingOrder = manufacturingOrder;
    }

    public MOProduct getMoProduct() {
        return moProduct;
    }

    public Tracer moProduct(MOProduct mOProduct) {
        this.moProduct = mOProduct;
        return this;
    }

    public void setMoProduct(MOProduct mOProduct) {
        this.moProduct = mOProduct;
    }

    public Line getLine() {
        return line;
    }

    public Tracer line(Line line) {
        this.line = line;
        return this;
    }

    public void setLine(Line line) {
        this.line = line;
    }

    public WorkStation getWorkStation() {
        return workStation;
    }

    public Tracer workStation(WorkStation workStation) {
        this.workStation = workStation;
        return this;
    }

    public void setWorkStation(WorkStation workStation) {
        this.workStation = workStation;
    }

    public WorkStation getPrevWorkStation() {
        return prevWorkStation;
    }

    public Tracer prevWorkStation(WorkStation workStation) {
        this.prevWorkStation = workStation;
        return this;
    }

    public void setPrevWorkStation(WorkStation workStation) {
        this.prevWorkStation = workStation;
    }

    public WorkStation getNextWorkStation() {
        return nextWorkStation;
    }

    public Tracer nextWorkStation(WorkStation workStation) {
        this.nextWorkStation = workStation;
        return this;
    }

    public void setNextWorkStation(WorkStation workStation) {
        this.nextWorkStation = workStation;
    }

    public Tracer getNextTracer() {
        return nextTracer;
    }

    public Tracer nextTracer(Tracer tracer) {
        this.nextTracer = tracer;
        return this;
    }

    public void setNextTracer(Tracer tracer) {
        this.nextTracer = tracer;
    }

    public Tracer getPrevTracer() {
        return prevTracer;
    }

    public Tracer prevTracer(Tracer tracer) {
        this.prevTracer = tracer;
        return this;
    }

    public void setPrevTracer(Tracer tracer) {
        this.prevTracer = tracer;
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
        Tracer tracer = (Tracer) o;
        if (tracer.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tracer.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Tracer{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", inTime='" + getInTime() + "'" +
            ", startTime='" + getStartTime() + "'" +
            ", endTime='" + getEndTime() + "'" +
            ", time=" + getTime() +
            ", status=" + getStatus() +
            "}";
    }
}
