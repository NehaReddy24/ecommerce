package com.products;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.math.BigDecimal;

@Entity
@Table(name = "products")
public class Products {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private BigDecimal price;

    private String imageUrl;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String category;

    // Added fields for filtering
    private String color;
    private String size;
    private BigDecimal discount; // Assuming discount is a decimal value (e.g., 0.10 for 10%) or percentage as decimal
    private String availability; // e.g., "in-stock", "out-of-stock"

    public Products() {}

    // Updated constructor to include new fields
    public Products(String name, BigDecimal price, String imageUrl, String description, String category, String color, String size, BigDecimal discount, String availability) {
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
        this.description = description;
        this.category = category;
        this.color = color;
        this.size = size;
        this.discount = discount;
        this.availability = availability;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    // Getters for new fields
    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }

    public String getSize() { return size; }
    public void setSize(String size) { this.size = size; }

    public BigDecimal getDiscount() { return discount; }
    public void setDiscount(BigDecimal discount) { this.discount = discount; }

    public String getAvailability() { return availability; }
    public void setAvailability(String availability) { this.availability = availability; }


    @Override
    public String toString() {
        return "Products{" +
               "id=" + id +
               ", name='" + name + '\'' +
               ", price=" + price +
               ", imageUrl='" + imageUrl + '\'' +
               ", description='" + description + '\'' +
               ", category='" + category + '\'' +
               ", color='" + color + '\'' +
               ", size='" + size + '\'' +
               ", discount=" + discount +
               ", availability='" + availability + '\'' +
               '}';
    }
}