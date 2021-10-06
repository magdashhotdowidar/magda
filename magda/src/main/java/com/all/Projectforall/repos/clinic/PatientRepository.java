package com.all.Projectforall.repos.clinic;

import com.all.Projectforall.entitys.clinic.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PatientRepository extends JpaRepository<Patient,Long> {
Optional<Patient>findByFirstNameLike(String Name);
    List<Patient> findByFirstNameLikeOrLastNameLike(String first, String last);
}
