import express from "express";

const app = express();

app.get("/api/products", (req, res) => {
    const products = [
        { id: 1, name: "Product 1", price: 10, image: "https://example.com/product1.jpg" },
        { id: 2, name: "Product 2", price: 19, image: "https://example.com/product2.jpg" },
        { id: 3, name: "Product 3", price: 5, image: "https://example.com/product3.jpg" },
        { id: 4, name: "Product 4", price: 20, image: "https://example.com/product4.jpg" },
    ];

    //https://www.youtube.com/watch?v=6sQ1d8Xzj0g&ab_channel=CodeWithHarry

    if (req.query.search) {
        const searchTerm = req.query.search.toLowerCase();
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm)
        );
        res.send(filteredProducts);
        return;

    }
    setTimeout(() => {
        res.send(products);
    }, 3000);
});



const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});