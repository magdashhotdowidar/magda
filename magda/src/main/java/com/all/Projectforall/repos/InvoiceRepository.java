package com.all.Projectforall.repos;

import com.all.Projectforall.entitys.InvoiceA;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface InvoiceRepository extends JpaRepository<InvoiceA, Long> {
public Optional<List<InvoiceA>>findByCustomerNameAndDate(String customer, String date);
}
