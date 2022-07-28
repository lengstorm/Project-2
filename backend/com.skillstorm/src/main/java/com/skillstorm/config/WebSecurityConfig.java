package com.skillstorm.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter{

    @Autowired
    private UserDetailsService userDetailsService;

    //telling the authentication provider we're using BCrypt and setting the UserDetailsService to be the custom one I created
    //(this works because when you Autowire an interface it injects its child class, which is my CustomUserDetailsService)
    @Bean
    AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    //tell it to authorize the user anytime it tries to access any method that isn't the "create account" method.
    //upon logging out, clear auth data, delete cookie, and invalidate the session. Once successfully logged out, redirect to path listed
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors();
        http.csrf().disable();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.authorizeRequests()
                .antMatchers("/project2/v1/home").permitAll()
                .antMatchers( HttpMethod.POST, "/project2/v1/my-account").permitAll()
                .antMatchers("/project2/v1/my-**").authenticated()
                .and()
                .httpBasic()
                .and()
                .logout()
                .logoutUrl("/project2/v1/logout").invalidateHttpSession(true)
                .clearAuthentication(true)
                .deleteCookies("JSESSIONID").logoutSuccessUrl("/project2/v1/my-account");
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(10);
    }

}


