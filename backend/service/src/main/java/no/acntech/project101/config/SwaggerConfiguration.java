package no.acntech.project101.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.paths.RelativePathProvider;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import javax.servlet.ServletContext;

@Configuration
@EnableSwagger2
public class SwaggerConfiguration {

    private static final String BASEPACKAGEPATH = "no.acntech.project101";

    private final ServletContext servletContext;

    @Autowired
    public SwaggerConfiguration(ServletContext servletContext) {
        this.servletContext = servletContext;
    }

    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
                .pathProvider(new RelativePathProvider(servletContext) {

                    @Override
                    public String getOperationPath(String operationPath) {
                        String result = super.getOperationPath(operationPath);
                        return result;
                    }
                })
                .select()
                .apis(RequestHandlerSelectors.basePackage(BASEPACKAGEPATH))
                .build();
    }
}