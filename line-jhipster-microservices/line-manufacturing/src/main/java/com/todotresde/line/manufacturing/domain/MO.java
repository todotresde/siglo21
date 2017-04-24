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
 * A MO.
 */
@Entity
@Table(name = "mo")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class MO implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "code", nullable = false)
    private String code;

    @NotNull
    @Column(name = "jhi_date", nullable = false)
    private LocalDate date;

    @NotNull
    @Column(name = "status", nullable = false)
    private Integer status;

    @NotNull
    @Column(name = "description", nullable = false)
    private String description;

    @OneToOne
    @JoinColumn(unique = true)
    private Line line;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "mo_mocustom_product",
               joinColumns = @JoinColumn(name="mos_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="mocustom_products_id", referencedColumnName="id"))
    private Set<MOCustomProduct> mOCustomProducts = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public MO code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public LocalDate getDate() {
        return date;
    }

    public MO date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Integer getStatus() {
        return status;
    }

    public MO status(Integer status) {
        this.status = status;
        return this;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getDescription() {
        return description;
    }

    public MO description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Line getLine() {
        return line;
    }

    public MO line(Line line) {
        this.line = line;
        return this;
    }

    public void setLine(Line line) {
        this.line = line;
    }

    public Set<MOCustomProduct> getMOCustomProducts() {
        return mOCustomProducts;
    }

    public MO mOCustomProducts(Set<MOCustomProduct> mOCustomProducts) {
        this.mOCustomProducts = mOCustomProducts;
        return this;
    }

    public MO addMOCustomProduct(MOCustomProduct mOCustomProduct) {
        this.mOCustomProducts.add(mOCustomProduct);
        return this;
    }

    public MO removeMOCustomProduct(MOCustomProduct mOCustomProduct) {
        this.mOCustomProducts.remove(mOCustomProduct);
        return this;
    }

    public void setMOCustomProducts(Set<MOCustomProduct> mOCustomProducts) {
        this.mOCustomProducts = mOCustomProducts;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        MO mO = (MO) o;
        if (mO.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, mO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "MO{" +
            "id=" + id +
            ", code='" + code + "'" +
            ", date='" + date + "'" +
            ", status='" + status + "'" +
            ", description='" + description + "'" +
            '}';
    }
}
