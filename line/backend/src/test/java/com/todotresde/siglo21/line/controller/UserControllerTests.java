package com.todotresde.siglo21.line.controller;

import com.todotresde.siglo21.line.model.User;
import com.todotresde.siglo21.line.service.UserService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;

import static org.mockito.BDDMockito.given;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment=WebEnvironment.RANDOM_PORT)
public class UserControllerTests {
    @Autowired
    private TestRestTemplate restTemplate;
    @MockBean
    private UserService userService;

    @Before
    public void setup() {
        //given(this.userService.byId(new Long(1))).willReturn(new User(new Long(1), "User 1"));
    }

    @Test
    public void test() {
        this.restTemplate.getForEntity("/user/5",String.class);
    }

}
