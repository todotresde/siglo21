package com.todotresde.line.manufacturing.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A WS.
 */
@Entity
@Table(name = "ws")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class WS implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "short_name", nullable = false)
    private String shortName;

    @NotNull
    @Column(name = "ip", nullable = false)
    private String ip;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public WS name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getShortName() {
        return shortName;
    }

    public WS shortName(String shortName) {
        this.shortName = shortName;
        return this;
    }

    public void setShortName(String shortName) {
        this.shortName = shortName;
    }

    public String getIp() {
        return ip;
    }

    public WS ip(String ip) {
        this.ip = ip;
        return this;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        WS wS = (WS) o;
        if (wS.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, wS.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "WS{" +
            "id=" + id +
            ", name='" + name + "'" +
            ", shortName='" + shortName + "'" +
            ", ip='" + ip + "'" +
            '}';
    }
}
