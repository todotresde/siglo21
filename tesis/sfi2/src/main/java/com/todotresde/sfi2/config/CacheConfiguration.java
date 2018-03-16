package com.todotresde.sfi2.config;

import io.github.jhipster.config.JHipsterProperties;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.expiry.Duration;
import org.ehcache.expiry.Expirations;
import org.ehcache.jsr107.Eh107Configuration;

import java.util.concurrent.TimeUnit;

import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.cloud.client.serviceregistry.Registration;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
@AutoConfigureAfter(value = { MetricsConfiguration.class })
@AutoConfigureBefore(value = { WebConfigurer.class, DatabaseConfiguration.class })
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(Expirations.timeToLiveExpiration(Duration.of(ehcache.getTimeToLiveSeconds(), TimeUnit.SECONDS)))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(com.todotresde.sfi2.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(com.todotresde.sfi2.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(com.todotresde.sfi2.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(com.todotresde.sfi2.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(com.todotresde.sfi2.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(com.todotresde.sfi2.domain.Employee.class.getName(), jcacheConfiguration);
            cm.createCache(com.todotresde.sfi2.domain.Employee.class.getName() + ".wsConfigurations", jcacheConfiguration);
            cm.createCache(com.todotresde.sfi2.domain.Line.class.getName(), jcacheConfiguration);
            cm.createCache(com.todotresde.sfi2.domain.Line.class.getName() + ".wsConfigurations", jcacheConfiguration);
            cm.createCache(com.todotresde.sfi2.domain.WSConfiguration.class.getName(), jcacheConfiguration);
            cm.createCache(com.todotresde.sfi2.domain.WSConfiguration.class.getName() + ".supplyTypes", jcacheConfiguration);
            cm.createCache(com.todotresde.sfi2.domain.WSConfiguration.class.getName() + ".employees", jcacheConfiguration);
            cm.createCache(com.todotresde.sfi2.domain.WorkStation.class.getName(), jcacheConfiguration);
            cm.createCache(com.todotresde.sfi2.domain.ManufacturingOrder.class.getName(), jcacheConfiguration);
            cm.createCache(com.todotresde.sfi2.domain.MOProduct.class.getName(), jcacheConfiguration);
            cm.createCache(com.todotresde.sfi2.domain.Supply.class.getName(), jcacheConfiguration);
            cm.createCache(com.todotresde.sfi2.domain.Supply.class.getName() + ".products", jcacheConfiguration);
            cm.createCache(com.todotresde.sfi2.domain.SupplyType.class.getName(), jcacheConfiguration);
            cm.createCache(com.todotresde.sfi2.domain.SupplyType.class.getName() + ".supplies", jcacheConfiguration);
            cm.createCache(com.todotresde.sfi2.domain.SupplyType.class.getName() + ".stAttributes", jcacheConfiguration);
            cm.createCache(com.todotresde.sfi2.domain.SupplyType.class.getName() + ".wsConfigurations", jcacheConfiguration);
            cm.createCache(com.todotresde.sfi2.domain.STAttribute.class.getName(), jcacheConfiguration);
            cm.createCache(com.todotresde.sfi2.domain.STAttribute.class.getName() + ".supplyTypes", jcacheConfiguration);
            cm.createCache(com.todotresde.sfi2.domain.Product.class.getName(), jcacheConfiguration);
            cm.createCache(com.todotresde.sfi2.domain.Product.class.getName() + ".moProducts", jcacheConfiguration);
            cm.createCache(com.todotresde.sfi2.domain.Product.class.getName() + ".supplies", jcacheConfiguration);
            cm.createCache(com.todotresde.sfi2.domain.ProductType.class.getName(), jcacheConfiguration);
            cm.createCache(com.todotresde.sfi2.domain.ProductType.class.getName() + ".products", jcacheConfiguration);
            cm.createCache(com.todotresde.sfi2.domain.ProductType.class.getName() + ".ptAttributes", jcacheConfiguration);
            cm.createCache(com.todotresde.sfi2.domain.PTAttribute.class.getName(), jcacheConfiguration);
            cm.createCache(com.todotresde.sfi2.domain.PTAttribute.class.getName() + ".productTypes", jcacheConfiguration);
            cm.createCache(com.todotresde.sfi2.domain.Tracer.class.getName(), jcacheConfiguration);
            cm.createCache(com.todotresde.sfi2.domain.WSConfiguration.class.getName() + ".prevWorkStations", jcacheConfiguration);
            cm.createCache(com.todotresde.sfi2.domain.WSConfiguration.class.getName() + ".nextWorkStations", jcacheConfiguration);
            cm.createCache(com.todotresde.sfi2.domain.WorkStation.class.getName() + ".wsConfigurations", jcacheConfiguration);
            cm.createCache(com.todotresde.sfi2.domain.WorkStation.class.getName() + ".prevWSConfigurations", jcacheConfiguration);
            cm.createCache(com.todotresde.sfi2.domain.WorkStation.class.getName() + ".nextWSConfigurations", jcacheConfiguration);
            cm.createCache(com.todotresde.sfi2.domain.STAttributeValue.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
