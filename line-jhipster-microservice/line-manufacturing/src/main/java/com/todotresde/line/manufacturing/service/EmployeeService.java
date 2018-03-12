package com.todotresde.line.manufacturing.service;

import com.todotresde.line.manufacturing.domain.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

/**
 * Service Interface for managing Employee.
 */
public interface EmployeeService {

    /**
     * Save a employee.
     *
     * @param employee the entity to save
     * @return the persisted entity
     */
    Employee save(Employee employee);

    /**
     *  Get all the employees.
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<Employee> findAll(Pageable pageable);

    /**
     *  Get the "id" employee.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    Employee findOne(Long id);

    /**
     *  Delete the "id" employee.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
