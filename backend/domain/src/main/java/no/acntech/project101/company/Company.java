package no.acntech.project101.company;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "COMPANY_NAME")
    private String companyName;

    @Column(name = "ORG_NR")
    private String orgNr;


    //TODO add mapping for list of employees if you have time

    public Company() {
    }

    public Company(final String companyName, final String orgNr) {
        this.companyName = companyName;
        this.orgNr = orgNr;
    }


    public Long getId() {
        return id;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(final String companyName) {
        this.companyName = companyName;
    }

    public String getOrgNr() {
        return orgNr;
    }

    public void setOrgNr(final String orgNr) {
        this.orgNr = orgNr;
    }

}
