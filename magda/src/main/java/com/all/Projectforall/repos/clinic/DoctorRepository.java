package com.all.Projectforall.repos.clinic;

import com.all.Projectforall.entitys.clinic.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DoctorRepository extends JpaRepository<Doctor,Long> {
    Optional<Doctor> findByFirstNameLike(String Name);
    List<Doctor>findByFirstNameLikeOrLastNameLike(String first,String last);
}
