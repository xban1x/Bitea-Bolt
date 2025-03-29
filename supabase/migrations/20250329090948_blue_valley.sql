/*
  # Initial Schema Setup for Product Dashboard

  1. New Tables
    - `product_types`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `created_at` (timestamp)
    
    - `manufacturers`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `contact_info` (text)
      - `created_at` (timestamp)
    
    - `products`
      - `id` (uuid, primary key)
      - `name` (text)
      - `sku` (text, unique)
      - `description` (text)
      - `type_id` (uuid, foreign key)
      - `manufacturer_id` (uuid, foreign key)
      - `parent_product_id` (uuid, self-referential foreign key)
      - `created_at` (timestamp)
    
    - `customers`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text, unique)
      - `created_at` (timestamp)
    
    - `price_lists`
      - `id` (uuid, primary key)
      - `product_id` (uuid, foreign key)
      - `customer_id` (uuid, foreign key, nullable)
      - `price` (decimal)
      - `valid_from` (timestamp)
      - `valid_to` (timestamp, nullable)
      - `created_at` (timestamp)
    
    - `delivery_notes`
      - `id` (uuid, primary key)
      - `note_number` (text, unique)
      - `date` (timestamp)
      - `created_at` (timestamp)
    
    - `delivery_note_items`
      - `id` (uuid, primary key)
      - `delivery_note_id` (uuid, foreign key)
      - `product_id` (uuid, foreign key)
      - `quantity` (integer)
      - `created_at` (timestamp)
    
    - `recipient_notes`
      - `id` (uuid, primary key)
      - `note_number` (text, unique)
      - `date` (timestamp)
      - `created_at` (timestamp)
    
    - `recipient_note_items`
      - `id` (uuid, primary key)
      - `recipient_note_id` (uuid, foreign key)
      - `product_id` (uuid, foreign key)
      - `quantity` (integer)
      - `created_at` (timestamp)

  2. Views
    - `product_stock_levels`
      - Calculates current stock levels based on delivery and recipient notes

  3. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Product Types
CREATE TABLE product_types (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE product_types ENABLE ROW LEVEL SECURITY;

-- Manufacturers
CREATE TABLE manufacturers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  contact_info text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE manufacturers ENABLE ROW LEVEL SECURITY;

-- Products
CREATE TABLE products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  sku text UNIQUE NOT NULL,
  description text,
  type_id uuid REFERENCES product_types(id),
  manufacturer_id uuid REFERENCES manufacturers(id),
  parent_product_id uuid REFERENCES products(id),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Customers
CREATE TABLE customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

-- Price Lists
CREATE TABLE price_lists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) NOT NULL,
  customer_id uuid REFERENCES customers(id),
  price decimal NOT NULL,
  valid_from timestamptz NOT NULL,
  valid_to timestamptz,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_date_range CHECK (valid_to IS NULL OR valid_to > valid_from)
);

ALTER TABLE price_lists ENABLE ROW LEVEL SECURITY;

-- Delivery Notes
CREATE TABLE delivery_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  note_number text UNIQUE NOT NULL,
  date timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE delivery_notes ENABLE ROW LEVEL SECURITY;

-- Delivery Note Items
CREATE TABLE delivery_note_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  delivery_note_id uuid REFERENCES delivery_notes(id) NOT NULL,
  product_id uuid REFERENCES products(id) NOT NULL,
  quantity integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE delivery_note_items ENABLE ROW LEVEL SECURITY;

-- Recipient Notes
CREATE TABLE recipient_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  note_number text UNIQUE NOT NULL,
  date timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE recipient_notes ENABLE ROW LEVEL SECURITY;

-- Recipient Note Items
CREATE TABLE recipient_note_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_note_id uuid REFERENCES recipient_notes(id) NOT NULL,
  product_id uuid REFERENCES products(id) NOT NULL,
  quantity integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE recipient_note_items ENABLE ROW LEVEL SECURITY;

-- Stock Levels View
CREATE OR REPLACE VIEW product_stock_levels AS
SELECT 
  p.id as product_id,
  p.name as product_name,
  p.sku,
  COALESCE(SUM(dni.quantity), 0) - COALESCE(SUM(rni.quantity), 0) as current_stock
FROM products p
LEFT JOIN delivery_note_items dni ON dni.product_id = p.id
LEFT JOIN recipient_note_items rni ON rni.product_id = p.id
GROUP BY p.id, p.name, p.sku;

-- RLS Policies
CREATE POLICY "Enable read access for authenticated users"
ON product_types FOR SELECT TO authenticated USING (true);

CREATE POLICY "Enable read access for authenticated users"
ON manufacturers FOR SELECT TO authenticated USING (true);

CREATE POLICY "Enable read access for authenticated users"
ON products FOR SELECT TO authenticated USING (true);

CREATE POLICY "Enable read access for authenticated users"
ON customers FOR SELECT TO authenticated USING (true);

CREATE POLICY "Enable read access for authenticated users"
ON price_lists FOR SELECT TO authenticated USING (true);

CREATE POLICY "Enable read access for authenticated users"
ON delivery_notes FOR SELECT TO authenticated USING (true);

CREATE POLICY "Enable read access for authenticated users"
ON delivery_note_items FOR SELECT TO authenticated USING (true);

CREATE POLICY "Enable read access for authenticated users"
ON recipient_notes FOR SELECT TO authenticated USING (true);

CREATE POLICY "Enable read access for authenticated users"
ON recipient_note_items FOR SELECT TO authenticated USING (true);