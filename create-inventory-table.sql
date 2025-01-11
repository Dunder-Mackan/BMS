DROP TABLE IF EXISTS inventory;
CREATE TABLE inventory (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL DEFAULT 0,
    price DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_name (name)
);

-- Add some example data
INSERT INTO inventory (name, quantity, price) VALUES
    ('Skruvmejsel Phillips PH2', 50, 49.90),
    ('Hammare 300g', 25, 149.00),
    ('Måttband 5m', 30, 79.90),
    ('Vattenpass 400mm', 15, 199.00),
    ('Arbetshandskar Stl L', 100, 39.90);

