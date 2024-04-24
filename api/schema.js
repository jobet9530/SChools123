const sqlite3 = require("sqlite3").verbose();

// open the database
let db = new sqlite3.Database(
  "./db/admissions.db",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Connected to the school database.");
  },
);

db.serialize(() => {
  db.run(`CREATE TABLE School (
    school_id INTEGER,
    schooltype TEXT,
    location TEXT
  );`);

  // Create the rest of the tables in the same way
  db.run(`CREATE TABLE Subject (
    subjectId INTEGER,
    subjectName TEXT
  );`);
  //...

  // Create the references
  db.run(`CREATE TABLE Student (
    studentId INTEGER,
    name TEXT,
    dateOfBirth DATE,
    schoolId INTEGER,
    FOREIGN KEY (schoolId) REFERENCES School (school_id)
  );`);

  // Students and Parents in many to many relation
  db.run(`CREATE TABLE Student_Parent (
    studentId INTEGER,
    parentId INTEGER,
    FOREIGN KEY (studentId) REFERENCES Student (studentId),
    FOREIGN KEY (parentId) REFERENCES Parent (guardianId)
  );`);
  // ...
});

// close the database connection
db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Close the database connection.");
});
