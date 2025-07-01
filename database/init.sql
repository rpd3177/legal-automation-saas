-- Database initialization for legal automation SaaS
-- This will run automatically when database is created

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Customers table
CREATE TABLE IF NOT EXISTS customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    phone VARCHAR(50),
    plan VARCHAR(50) NOT NULL DEFAULT 'starter',
    status VARCHAR(50) NOT NULL DEFAULT 'active',
    
    -- Billing information
    stripe_customer_id VARCHAR(255) UNIQUE,
    stripe_subscription_id VARCHAR(255),
    
    -- Integration settings
    webhook_token VARCHAR(255) UNIQUE DEFAULT encode(gen_random_bytes(32), 'hex'),
    filevine_api_key TEXT,
    filevine_org_id VARCHAR(255),
    
    -- Usage limits
    monthly_limit INTEGER DEFAULT 50,
    current_month_usage INTEGER DEFAULT 0,
    usage_reset_date DATE DEFAULT (CURRENT_DATE + INTERVAL '1 month'),
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login_at TIMESTAMP WITH TIME ZONE
);

-- Usage tracking table
CREATE TABLE IF NOT EXISTS usage_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    
    -- Execution details
    workflow_name VARCHAR(255) NOT NULL,
    execution_id VARCHAR(255),
    execution_status VARCHAR(50) NOT NULL, -- 'success', 'error', 'timeout'
    
    -- Performance metrics
    execution_time_ms INTEGER,
    tokens_used INTEGER DEFAULT 0,
    
    -- Document details
    case_number VARCHAR(255),
    client_name VARCHAR(255),
    document_generated BOOLEAN DEFAULT false,
    
    -- Error handling
    error_message TEXT,
    error_code VARCHAR(50),
    
    -- Timestamps
    executed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);
CREATE INDEX IF NOT EXISTS idx_customers_status ON customers(status);
CREATE INDEX IF NOT EXISTS idx_usage_logs_customer_id ON usage_logs(customer_id);
CREATE INDEX IF NOT EXISTS idx_usage_logs_executed_at ON usage_logs(executed_at);