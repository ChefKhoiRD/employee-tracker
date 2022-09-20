INSERT INTO department (name)
VALUES 
    ("Sales"),
    ("Management");

INSERT INTO roles (title, salary, department_id)
VALUES
    ("Store Manager", 60000, 1),
    ("Store Assistant Manager", 40000, 2),
    ("Sales Lead", 25000, 3),
    ("Sales Associate", 20000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ("Daren", "Johnson", 1, 1),
    ("Brandon", "James", 2, 2),
    ("Ian", "Wilde", 3, NULL),
    ("Josh", "Lemon", 4, NULL),
    ("Dan", "Kim", 4, NULL);