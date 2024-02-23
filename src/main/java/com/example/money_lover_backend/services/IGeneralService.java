package com.example.money_lover_backend.services;

import java.util.Optional;

public interface IGeneralService <E>{
    Iterable<E> findAll();
    Optional<E> findById(Long id);
    public E save(E e);
    void remove(Long id);
}
