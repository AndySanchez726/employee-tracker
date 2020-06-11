INSERT INTO department (department)
VALUES ('Development'), ('Design');

INSERT INTO role (title, salary, department_id)
VALUES ('Designer', 50000.00, '2'),
        ('Web Developer', 60000.00, '1');

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Andy', 'Sanchez', 2, 2),
        ('Kayla', 'Roebuck', 1, 1);

INSERT INTO manager (first_name, last_name, department_id)
VALUES ('Jane', 'Doe', 1),
        ('John', 'Smith', 2);