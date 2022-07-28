package com.skillstorm.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.skillstorm.model.User;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    @Query(value = "from User u inner join u.account a where a.id = :accountId")
    public List<User> findByAccountId(@Param(value = "accountId") int accountId);

    @Modifying
    @Query(value = "INSERT INTO appusers VALUES (:id, :name, :phonenumber, :accountId)", nativeQuery = true)
    public void insertUser(@Param(value = "id") int id,
                          @Param(value = "accountId") int accountId,
                          @Param(value = "name") String name,
                          @Param(value = "phonenumber") String phonenumber);

    @Query(value = "from User u inner join u.account a where a.id = :accountId and u.id = :userId")
    public User findById(@Param(value = "accountId") int accountId, @Param(value = "userId") int userId);

    @Modifying
    @Query(value = "UPDATE appusers SET name = :name, phonenumber = :phonenumber WHERE id = :userId AND accountId = :accountId", nativeQuery = true)
    public void updateUserById(@Param(value = "userId") int userId,
                               @Param(value = "name") String name,
                               @Param(value = "phonenumber") String phonenumber,
                               @Param(value = "accountId") int accountId);

}
