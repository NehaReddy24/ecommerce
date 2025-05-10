package com.products;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "http://localhost:3000")  
public class ProductsController {

    @Autowired
    private ProductsService productsService;

    @GetMapping
    public List<Products> getAllProducts() {
        return productsService.getAllProducts();
    }

    @GetMapping("/{id}")
    public Optional<Products> getProductById(@PathVariable Long id) {
        return productsService.getProductById(id);
    }

    @PostMapping
    public Products addProduct(@RequestBody Products product) {
        return productsService.addProduct(product);
    }

    @PutMapping("/{id}")
    public Products updateProduct(@PathVariable Long id, @RequestBody Products updatedProduct) {
        return productsService.updateProduct(id, updatedProduct);
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productsService.deleteProduct(id);
    }
}
