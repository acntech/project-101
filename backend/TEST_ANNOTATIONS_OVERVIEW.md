
# Unit and Integration Test Annotations 

## Common unit and integration test annotations
### JUnit
Example usage:

```Java
@ExtendWith(SpringExtension.class)
class CompanyTest {
    @BeforeEach
    public void init() {
    }
    
    @AfterEach
    public void finalize(){
    }
    
    @BeforeAll
    public static void setUp(){
    }
    
    @AfterAll
    public static void tearDown(){
    }
    
    @Test
    public void testIsValidOrgNr() {
    }
}
```

#### @Test  
Is used to mark a method as a JUnit test

```Java
@Test
public void testIsValidOrgNr() {
}
```

#### @BeforeEach 
The method marked with this annotation, will run before each individual unit test. Typical usage would be to organize test data.

```Java
@BeforeEach
public void init() {
}
```
#### @AfterEach
The method marked with this annotation, will run after each individual unit test. Typical usage would be to clear test data.

```Java
@AfterEach
public void finalize(){
}
```
#### @BeforeAll
A method marked with the @BeforeAll annotation will run once for a test class, before any unit test is run. Typical usage would be to initialize common resources used by all unit tests.

```Java
@BeforeAll
public static void setUp(){
}
```
#### @AfterAll
A method marked with the @AfterAll annotation will run once for a test class, after all unit tests have run. Typical usage would be to close / shut down common resources used by all unit tests.

```Java
@AfterAll
public static void tearDown(){
}
```

#### @ExtendWith
A repeatable annotation that is used to register extensions for the annotated test class or test method.

```Java
@ExtendWith(SpringExtension.class)
class CompanyTest {
}
```

### Mockito
Example usage:

```Java
@ExtendWith(MockitoExtension.class)
class CompanyServiceTest {
    @Mock
    CompanyRepository companyRepository
    
    @InjectMocks
    CompanyService companyService
}
```

#### @Mock
This annotation is used to create mock objects on dependencies that the class you are testing is dependent on, and that you wish to control the behaviour of.

```Java
@Mock
CompanyRepository companyRepository
```
#### @Spy
This annotation is used to create mock objects on dependencies that the class you are testing is dependent on, and that you wish to control the behaviour of. The difference from @Mock, is that with @Spy you can mock the behaviour of specific methods.

```Java
@Spy
CompanyRepository companyRepository
```

#### @InjectMocks
This annotation is used to mark the object which you would like to inject mock/spy objects.

```Java
@InjectMocks
CompanyService companyService
```

#### @ExtendWith(MockitoExtension.class)
The @ExtendWith annotation is a repeatable annotation that is used to register extensions for the annotated test class or test method, and MockitoExtension class is needed in a test class where other Mockito annotations are used.

```Java
@ExtendWith(MockitoExtension.class)
class CompanyServiceTest {
}
```

### Spring
Example usage:
```Java
@ExtendWith(SpringExtension.class)
class CompanyResourceTest {
    @MockBean
    CompanyService companyService
}
```

#### @ExtendWith(SpringExtension.class)
The @ExtendWith annotation is a repeatable annotation that is used to register extensions for the annotated test class or test method, and the SpringExtension class is provided by Spring 5 and integrates the Spring TestContext Framework into JUnit 5

```Java
@ExtendWith(SpringExtension.class)
class CompanyResourceTest {
}
```

#### @MockBean
This annotation is a Spring annotation for mocks. Used in the same way as the @Mock annotation. But you don't need to inject the mockbeans anywhere, as they become part of the spring context when running the test

```Java
@MockBean
CompanyService companyService
```

#### @SpyBean
This annotation is a Spring annotation for spy's. Used in the same way as the @Spy annotation. But you don't need to inject the spy's anywhere, as they become part of the spring context when running the test

```Java
@SpyBean
CompanyService companyService
```

## Unit Test - Spring / Spring Boot
FYI. As of Spring Boot 2.1, there is no longer any need to use the @ExendWith annotation to load the SpringExtension class, because it is already included as a meta annotation in test annotations like @DataJpaTest, @WebMvcTest and @SpringBootTest

#### @DataJpaTest
This annotation is used on repository test classes, and will instantiate an empty in-memory H2 database when the test i run. To be able to configure the database correctly, you also need to import db configuration classes using the @Import annotation, and also specify the context, using the @ContextConfiguration annotation.

```Java
@DataJpaTest
@Import({CompanyDatabaseConfig.class, EmployeeDatabaseConfig.class})
@ContextConfiguration(classes = CompanyRepository.class)
class CompanyRepositoryTest {
}
```

#### @WebMvcTest
This annotation is used when testing controllers (resources), and fires up an application context that contains only the beans needed for testing a web controller. Using this annotation will disable full auto-configuration and instead apply only configuration relevant to MVC tests (i.e. @Controller, @ControllerAdvice, @JsonComponent, Converter/GenericConverter, Filter, WebMvcConfigurer and HandlerMethodArgumentResolver beans but not @Component, @Service or @Repository beans).


```Java
@WebMvcTest(controllers = CompanyResource.class)
class CompanyResourceTest {
}
```

## Integration Test - Spring / Spring Boot
Example usage:

```Java
@SpringBootTest(classes = Project101Application.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class CompanyResourceIT {

    @LocalServerPort
    private int port;

    @MockBean
    private BrregRestClient brregRestClient;
}
```    

#### @SpringBootTest
This annotation is used on integration tests, and will start the application on a random port number.

```Java
@SpringBootTest(classes = Project101Application.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class CompanyResourceIT {
}
```

#### @LocalServerPort
This annotation can be used to inject the HTTP port that got allocated at runtime, and then used in the tests when performing HTTP calls towards the application.

```Java
@LocalServerPort
private int port;
```