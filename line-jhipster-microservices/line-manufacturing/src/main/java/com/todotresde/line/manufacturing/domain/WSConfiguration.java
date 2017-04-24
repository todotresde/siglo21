package com.todotresde.line.manufacturing.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
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

    @OneToOne
    @JoinColumn(unique = true)
    private WS wS;

    @OneToOne
    @JoinColumn(unique = true)
    private WS prevWS;

    @OneToOne
    @JoinColumn(unique = true)
    private WS nextWS;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "wsconfiguration_productstype",
            joinColumns = @JoinColumn(name="wsconfigurations_id", referencedColumnName="id"),
            inverseJoinColumns = @JoinColumn(name="productstype_id", referencedColumnName="id"))
    private Set<Long> productTypes = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "wsconfiguration_delay",
               joinColumns = @JoinColumn(name="wsconfigurations_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="delays_id", referencedColumnName="id"))
    private Set<Delay> delays = new HashSet<>();

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

    public WS getWS() {
        return wS;
    }

    public WSConfiguration wS(WS wS) {
        this.wS = wS;
        return this;
    }

    public void setWS(WS wS) {
        this.wS = wS;
    }

    public WS getPrevWS() {
        return prevWS;
    }

    public WSConfiguration prevWS(WS wS) {
        this.prevWS = wS;
        return this;
    }

    public void setPrevWS(WS wS) {
        this.prevWS = wS;
    }

    public WS getNextWS() {
        return nextWS;
    }

    public WSConfiguration nextWS(WS wS) {
        this.nextWS = wS;
        return this;
    }

    public void setNextWS(WS wS) {
        this.nextWS = wS;
    }

    public Set<Delay> getDelays() {
        return delays;
    }

    public WSConfiguration delays(Set<Delay> delays) {
        this.delays = delays;
        return this;
    }

    public WSConfiguration addDelay(Delay delay) {
        this.delays.add(delay);
        return this;
    }

    public WSConfiguration removeDelay(Delay delay) {
        this.delays.remove(delay);
        return this;
    }

    public void setDelays(Set<Delay> delays) {
        this.delays = delays;
    }

    public Set<Long> getProductTypes() {
        return productTypes;
    }

    public WSConfiguration productTypes(Set<Long> productTypes) {
        this.productTypes = productTypes;
        return this;
    }

    public WSConfiguration addProductType(Long productType) {
        this.productTypes.add(productType);
        return this;
    }

    public WSConfiguration removeProductType(Long productType) {
        this.productTypes.remove(productType);
        return this;
    }

    public void setProductType(Set<Long> productTypes) {
        this.productTypes = productTypes;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        WSConfiguration wSConfiguration = (WSConfiguration) o;
        if (wSConfiguration.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, wSConfiguration.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "WSConfiguration{" +
            "id=" + id +
            ", first='" + first + "'" +
            ", last='" + last + "'" +
            '}';
    }
}
