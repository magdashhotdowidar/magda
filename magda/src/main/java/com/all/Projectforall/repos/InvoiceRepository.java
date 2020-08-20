package com.all.Projectforall.repos;

import com.all.Projectforall.entitys.InvoiceA;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface InvoiceRepository extends JpaRepository<InvoiceA, Long> {
    public Optional<List<InvoiceA>> findByInvoiceNoAndDateAndTheAdmin(int invoiceNo, String date, String admin);

   // public Optional<List<InvoiceA>> findByInvoiceNoAndDateAndTimeLikeAndTheAdmin(int invoiceNO, String date, String time, String admin);

    public List<InvoiceA> findAllByTheAdmin(String admin);

    public void deleteAllByTheAdmin(String admin);

    public Long countInvoiceAByInvoiceNoIsNotNull();


}
