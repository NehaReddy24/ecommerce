package com.products;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductsService {

    @Autowired
    private ProductsRepository productsRepository;

    public List<Products> getAllProducts() {
        return productsRepository.findAll();
    }

    public Optional<Products> getProductById(Long id) {
        return productsRepository.findById(id);
    }

    public Products addProduct(Products product) {
        return productsRepository.save(product);
    }

    public Products updateProduct(Long id, Products updatedProduct) {
        return productsRepository.findById(id).map(product -> {
            product.setName(updatedProduct.getName());
            product.setPrice(updatedProduct.getPrice());
            product.setImage(updatedProduct.getImage());
            product.setCategory(updatedProduct.getCategory());
            return productsRepository.save(product);
        }).orElse(null);
    }

    public void deleteProduct(Long id) {
        productsRepository.deleteById(id);
    }
}
