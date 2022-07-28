package com.skillstorm.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name = "activephoneplans")
public class ActivePhonePlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "phoneplantype")
    @NotBlank
    private int phonePlanType;

    @ManyToOne
    @JoinColumn(name = "accountid")
    private Account account;

    public ActivePhonePlan() {  }

    public ActivePhonePlan(int id, int phonePlanType) {
        this.id = id;
        this.phonePlanType = phonePlanType;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getPhonePlanType() {
        return phonePlanType;
    }

    public void setPhonePlanType(int phonePlanType) {
        this.phonePlanType = phonePlanType;
    }

    @Override
    public String toString() {
        return "ActivePhonePlan {" +
                "id = " + id +
                ", phonePlanType = " + phonePlanType +
                '}';
    }
}
