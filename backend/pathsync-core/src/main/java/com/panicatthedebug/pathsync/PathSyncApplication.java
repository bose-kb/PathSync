package com.panicatthedebug.pathsync;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

@SpringBootApplication
public class PathSyncApplication {
    public static void main(String[] args) {
        ConfigurableApplicationContext context = SpringApplication.run(PathSyncApplication.class, args);
    }
}
