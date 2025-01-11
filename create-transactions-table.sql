DROP TABLE IF EXISTS transactions;
CREATE TABLE transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL,
    description VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    type ENUM('income', 'expense') NOT NULL,
    category VARCHAR(100) NOT NULL,
    reference_number VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_date (date),
    INDEX idx_type (type)
);

-- Add some example transactions
INSERT INTO transactions (date, description, amount, type, category, reference_number) VALUES
    (CURDATE(), 'Försäljning av verktyg', 1499.90, 'income', 'Försäljning', 'INV-2024-001'),
    (CURDATE(), 'Kontorsmaterial', -299.50, 'expense', 'Kontor', 'EXP-2024-001'),
    (CURDATE(), 'Konsulttjänster', 5000.00, 'income', 'Tjänster', 'INV-2024-002'),
    (CURDATE(), 'Hyra', -8500.00, 'expense', 'Lokalkostnader', 'EXP-2024-002');

