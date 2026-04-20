INSERT INTO users (name, email, role)
VALUES (
'Ram Krishna',
'ramkrishn@gmail.com',
'admin'
)
ON CONFLICT DO NOTHING;