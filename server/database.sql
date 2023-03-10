--create table
CREATE TABLE "tasks" (
    "id" SERIAL PRIMARY KEY,
    "date" DATE,
    "task" VARCHAR(500) NOT NULL,
    "complete" VARCHAR(1),
    "date_completed" DATE);

--input test data
INSERT INTO "tasks" 
    ("date", "task", "complete", "date_completed")
    VALUES
    ('12-17-2022', 'feed dog AM', 'Y', '12-17-2022'),
    ('12-17-2022', 'walk dog', 'N', NULL),
    ('12-18-2022', 'trim dogs nails', 'N', NULL),
    ('12-17-2022', 'feed dog PM', 'N', NULL);

--select all to render (GET)
SELECT * FROM "tasks"
    ORDER BY "complete" ASC, "date" ASC;

--input user data (POST)
INSERT INTO "tasks"
    ("date", "freq", "task", "complete")
    VALUES
    ($1, $2, $3, $4); 

--update by id (PUT)
UPDATE "tasks"
    SET "complete" = 'Y'
    WHERE "id" = $1;

--delete by id (DELETE)
DELETE FROM "tasks"
    WHERE "id" = $1;