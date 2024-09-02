package no.acntech.project101.company;

import org.w3c.dom.css.Counter;

public class Company {

    private Long id;
    private String companyName;
    private String orgNr;

    private static Long counter;

    public Company() {
    }

    public Company(final String companyName, final String orgNr) {
        if(counter == null) {
            counter = 0L;
        }
        this.id = counter;
        this.companyName = companyName;
        this.orgNr = orgNr;

        counter++;
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
