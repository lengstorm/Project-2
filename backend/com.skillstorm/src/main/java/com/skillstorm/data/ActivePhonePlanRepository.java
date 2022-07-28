package com.skillstorm.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.skillstorm.model.ActivePhonePlan;

import java.util.List;

@Repository
public interface ActivePhonePlanRepository extends JpaRepository<ActivePhonePlan, Integer> {

    @Query(value = "from ActivePhonePlan app inner join app.account a where a.id = :accountId")
    public List<ActivePhonePlan> findPlansByAccount(@Param(value = "accountId") int accountId);

    @Modifying
    @Query(value = "DELETE FROM activephoneplans WHERE phoneplantype = :phoneplan and accountid = :accountId", nativeQuery = true)
    public void deletePlan(@Param(value = "phoneplan") int phoneplan, @Param(value = "accountId") int accountId);

    @Modifying
    @Query(value = "INSERT INTO activephoneplans VALUES (:id, :phonePlanType, :accountId)", nativeQuery = true)
    public void addPhonePlan(@Param(value = "id") int id,
                                        @Param(value = "phonePlanType") int phonePlanType,
                                        @Param(value = "accountId") int accountId);



}
