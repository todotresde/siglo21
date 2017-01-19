package com.todotresde.siglo21.line.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.util.Date;

/**
 * Created by Leonardo on 26/12/2016.
 */
@Entity
@Table(name = "delay")
public class Delay {
    @Id
    @NotNull
    private Long id;
    @NotNull
    private Date startTime;
    private Date endTime;
    private Long time;
    @NotNull
    private String description;
    @OneToOne
    private DelayType delayType;

    public Delay(){

    }

    public Delay(Long id, Date startTime, Date endTime, String description) {
        this.id = id;
        this.startTime = startTime;
        this.endTime = endTime;
        this.time = this.endTime.getTime() - this.startTime.getTime();
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public DelayType getDelayType() {
        return delayType;
    }

    public void setDelayType(DelayType delayType) {
        this.delayType = delayType;
    }

}
