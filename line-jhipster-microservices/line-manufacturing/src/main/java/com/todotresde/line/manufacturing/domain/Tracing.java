package com.todotresde.line.manufacturing.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Tracing.
 */
@Entity
@Table(name = "tracing")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Tracing implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "code", nullable = false)
    private String code;

    @Column(name = "in_time")
    private LocalDate inTime;

    @Column(name = "start_time")
    private LocalDate startTime;

    @Column(name = "jhi_time")
    private Long time;

    @Column(name = "status")
    private Integer status;

    @OneToOne
    @JoinColumn(unique = true)
    private MO mO;

    @OneToOne
    @JoinColumn(unique = true)
    private Line line;

    @OneToOne
    @JoinColumn(unique = true)
    private WS wS;

    @OneToOne
    @JoinColumn(unique = true)
    private WS nextWS;

    @OneToOne
    @JoinColumn(unique = true)
    private WS prevWS;

    @OneToOne
    @JoinColumn(unique = true)
    private MOProduct mOProduct;

    @OneToOne
    @JoinColumn(unique = true)
    private MOCustomProduct mOCustomProduct;

    @OneToOne
    @JoinColumn(unique = true)
    private Tracing nextTracing;

    @OneToOne
    @JoinColumn(unique = true)
    private Tracing prevTracing;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "tracing_delay",
               joinColumns = @JoinColumn(name="tracings_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="delays_id", referencedColumnName="id"))
    private Set<Delay> delays = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public Tracing code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public LocalDate getInTime() {
        return inTime;
    }

    public Tracing inTime(LocalDate inTime) {
        this.inTime = inTime;
        return this;
    }

    public void setInTime(LocalDate inTime) {
        this.inTime = inTime;
    }

    public LocalDate getStartTime() {
        return startTime;
    }

    public Tracing startTime(LocalDate startTime) {
        this.startTime = startTime;
        return this;
    }

    public void setStartTime(LocalDate startTime) {
        this.startTime = startTime;
    }

    public Long getTime() {
        return time;
    }

    public Tracing time(Long time) {
        this.time = time;
        return this;
    }

    public void setTime(Long time) {
        this.time = time;
    }

    public Integer getStatus() {
        return status;
    }

    public Tracing status(Integer status) {
        this.status = status;
        return this;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public MO getMO() {
        return mO;
    }

    public Tracing mO(MO mO) {
        this.mO = mO;
        return this;
    }

    public void setMO(MO mO) {
        this.mO = mO;
    }

    public Line getLine() {
        return line;
    }

    public Tracing line(Line line) {
        this.line = line;
        return this;
    }

    public void setLine(Line line) {
        this.line = line;
    }

    public WS getWS() {
        return wS;
    }

    public Tracing wS(WS wS) {
        this.wS = wS;
        return this;
    }

    public void setWS(WS wS) {
        this.wS = wS;
    }

    public WS getNextWS() {
        return nextWS;
    }

    public Tracing nextWS(WS wS) {
        this.nextWS = wS;
        return this;
    }

    public void setNextWS(WS wS) {
        this.nextWS = wS;
    }

    public WS getPrevWS() {
        return prevWS;
    }

    public Tracing prevWS(WS wS) {
        this.prevWS = wS;
        return this;
    }

    public void setPrevWS(WS wS) {
        this.prevWS = wS;
    }

    public MOProduct getMOProduct() {
        return mOProduct;
    }

    public Tracing mOProduct(MOProduct mOProduct) {
        this.mOProduct = mOProduct;
        return this;
    }

    public void setMOProduct(MOProduct mOProduct) {
        this.mOProduct = mOProduct;
    }

    public MOCustomProduct getMOCustomProduct() {
        return mOCustomProduct;
    }

    public Tracing mOCustomProduct(MOCustomProduct mOCustomProduct) {
        this.mOCustomProduct = mOCustomProduct;
        return this;
    }

    public void setMOCustomProduct(MOCustomProduct mOCustomProduct) {
        this.mOCustomProduct = mOCustomProduct;
    }

    public Tracing getNextTracing() {
        return nextTracing;
    }

    public Tracing nextTracing(Tracing tracing) {
        this.nextTracing = tracing;
        return this;
    }

    public void setNextTracing(Tracing tracing) {
        this.nextTracing = tracing;
    }

    public Tracing getPrevTracing() {
        return prevTracing;
    }

    public Tracing prevTracing(Tracing tracing) {
        this.prevTracing = tracing;
        return this;
    }

    public void setPrevTracing(Tracing tracing) {
        this.prevTracing = tracing;
    }

    public Set<Delay> getDelays() {
        return delays;
    }

    public Tracing delays(Set<Delay> delays) {
        this.delays = delays;
        return this;
    }

    public Tracing addDelay(Delay delay) {
        this.delays.add(delay);
        return this;
    }

    public Tracing removeDelay(Delay delay) {
        this.delays.remove(delay);
        return this;
    }

    public void setDelays(Set<Delay> delays) {
        this.delays = delays;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Tracing tracing = (Tracing) o;
        if (tracing.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, tracing.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Tracing{" +
            "id=" + id +
            ", code='" + code + "'" +
            ", inTime='" + inTime + "'" +
            ", startTime='" + startTime + "'" +
            ", time='" + time + "'" +
            ", status='" + status + "'" +
            '}';
    }
}
