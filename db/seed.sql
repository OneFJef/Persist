INSERT INTO
    `user` (id, email, auth_token)
VALUES
    (1, 'persist-alex@mailinator.com', '6cfef3de-239c-11ec-9621-0242ac130002'),
    (2, 'persist-kelley@mailinator.com', '6cfef5dc-239c-11ec-9621-0242ac130002'),
    (3, 'persist-jef@mailinator.com', '6cfef6c2-239c-11ec-9621-0242ac130002'),
    (4, 'persist-josef@mailinator.com', '6cfef7a8-239c-11ec-9621-0242ac130002'),
    (5, 'persist-tyler@mailinator.com', '6cfef87a-239c-11ec-9621-0242ac130002');

INSERT INTO
    `task` (id, color, category, category_sub, `day`, `hours`, `user_id`)
VALUES
    (1, 'black', 'fitness', '', 0, 4, 1),
    (2, 'black', 'fitness', '', 1, 4, 1),
    (3, 'black', 'fitness', '', 2, 4, 1),
    (4, 'black', 'fitness', '', 3, 4, 1),
    (5, 'black', 'fitness', '', 4, 4, 1),
    (6, 'black', 'fitness', '', 5, 4, 1),
    (7, 'black', 'fitness', '', 6, 4, 1),
    (8, 'white', 'sleep', '', 0, 4, 1),
    (9, 'white', 'sleep', '', 1, 4, 1),
    (10, 'white', 'sleep', '', 2, 4, 1),
    (11, 'white', 'sleep', '', 3, 4, 1),
    (12, 'white', 'sleep', '', 4, 4, 1),
    (13, 'white', 'sleep', '', 5, 4, 1),
    (14, 'white', 'sleep', '', 6, 4, 1),
    (15, 'red', 'work', '', 0, 8, 1),
    (16, 'red', 'work', '', 1, 8, 1),
    (17, 'red', 'work', '', 2, 8, 1),
    (18, 'red', 'work', '', 3, 8, 1),
    (19, 'red', 'work', '', 4, 8, 1),
    (20, 'red', 'work', '', 5, 8, 1),
    (21, 'red', 'work', '', 6, 8, 1);