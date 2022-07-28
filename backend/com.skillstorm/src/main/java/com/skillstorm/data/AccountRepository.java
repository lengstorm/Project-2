package com.skillstorm.data;

import com.skillstorm.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {

    public Account findById(int accountId);

    public Account findByUsernameAndPassword(String username, String password);

    public Account findByUsername(String username);

    @Modifying
    @Query(value = "update Account set username = :username, password = :password, name = :name, email = :email, address = :address where id = :accountId")
    public void updateById(@Param(value = "accountId") int accountId,
                           @Param(value = "username") String username,
                           @Param(value = "password") String password,
                           @Param(value = "name") String name,
                           @Param(value = "email") String email,
                           @Param(value = "address") String address);


}
