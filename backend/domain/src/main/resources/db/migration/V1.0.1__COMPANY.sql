CREATE TABLE COMPANY
(
  ID                NUMBER(19) GENERATED BY DEFAULT AS IDENTITY,
  COMPANY_NAME      VARCHAR2(100) NOT NULL,
  ORG_NR            VARCHAR2(9)   NOT NULL,
  CONSTRAINT COMPANY_PK PRIMARY KEY (ID)
);