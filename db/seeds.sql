INSERT INTO department (department)
VALUES ('Development'), ('Design');

INSERT INTO role (title, salary, department_name)
VALUES ('Designer', 50000.00, 'Design'),
        ('Web Developer', 60000.00, 'Development');

INSERT INTO manager (manager_name, department_name)
VALUES ('Jane Doe', 'Development'),
        ('John Smith', 'Design');

INSERT INTO employee (first_name, last_name, role_name, manager_name)
VALUES ('Andy', 'Sanchez', 'Web Developer', 'John Smith'),
        ('Kayla', 'Roebuck', 'Designer', 'Jane Doe');

