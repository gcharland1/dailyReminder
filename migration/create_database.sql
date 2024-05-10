CREATE TABLE IF NOT EXISTS activities (
    id INTEGER NOT NULL PRIMARY KEY,
    name TEXT,
    days_in_a_row INTEGER
);

DELETE FROM activities WHERE id IS NOT NULL;

INSERT INTO activities ('id', 'name', 'days_in_a_row') VALUES
    (1, "Cube Rubik's", 0),
    (2, "Course à pieds", 0),
    (3, "Yoga", 0);
