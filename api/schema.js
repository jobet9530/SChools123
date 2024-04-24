const sqlite3 = require("sqlite3").verbose();

let db = new sqlite3.Database(
  "./db/school.db",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Connected to the database.");
  },
);

db.serialize(() => {
  db.run(`CREATE TABLE School (
    school_id INTEGER,
    schooltype TEXT,
    location TEXT
  );`);

  db.run(`CREATE TABLE Subject (
    subjectId INTEGER,
    subjectName TEXT
  );`);

  db.run(`CREATE TABLE Classroom (
    classroomId INTEGER,
    facilityType TEXT,
    location TEXT
  );`);

  db.run(`CREATE TABLE Student (
    studentId INTEGER,
    name TEXT,
    dateOfBirth DATE,
    schoolId INTEGER,
    FOREIGN KEY (schoolId) REFERENCES School (school_id)
  );`);

  db.run(`CREATE TABLE Parent (
    guardianId INTEGER,
    name TEXT,
    contactInfo TEXT,
    email TEXT,
    address TEXT
  );`);

  db.run(`CREATE TABLE Student_Parent (
    studentId INTEGER,
    parentId INTEGER,
    FOREIGN KEY (studentId) REFERENCES Student (studentId),
    FOREIGN KEY (parentId) REFERENCES Parent (guardianId)
  );`);

  db.run(`CREATE TABLE Class (
    classId INTEGER,
    subjectId INTEGER,
    classroomId INTEGER,
    TeacherName TEXT,
    Term TEXT,
    Year INTEGER,
    FOREIGN KEY (subjectId) REFERENCES Subject (subjectId),
    FOREIGN KEY (classroomId) REFERENCES Classroom (classroomId)
  );`);

  db.run(`CREATE TABLE Attendance (
    attendanceId INTEGER,
    studentId INTEGER,
    ClassId INTEGER,
    Date DATE,
    TimeArrive TIME,
    TimeLeave TIME,
    FOREIGN KEY (studentId) REFERENCES Student (studentId),
    FOREIGN KEY (ClassId) REFERENCES Class (classId)
  );`);

  db.run(`CREATE TABLE Marks (
    MarkId INTEGER,
    studentId INTEGER,
    subjectId INTEGER,
    Mark NUMERIC,
    FOREIGN KEY (studentId) REFERENCES Student (studentId),
    FOREIGN KEY (subjectId) REFERENCES Subject (subjectId)
  );`);

  db.run(`CREATE TABLE Term (
    TermId INTEGER,
    schoolId INTEGER,
    TermName TEXT,
    startDate DATE,
    endDate DATE,
    FOREIGN KEY (schoolId) REFERENCES School (school_id)
  );`);

  db.run(`CREATE TABLE Enrollment (
    EnrollmentId INTEGER,
    studentId INTEGER,
    courseId INTEGER,
    enrollmentDate DATE,
    cancellation DATE,
    FOREIGN KEY (studentId) REFERENCES Student (studentId),
    FOREIGN KEY (courseId) REFERENCES Course (courseId)
  );`);

  db.run(`CREATE TABLE Course (
    courseId INTEGER,
    courseName TEXT,
    subjectId INTEGER,
    Level TEXT,
    FOREIGN KEY (subjectId) REFERENCES Subject (subjectId)
  );`);

  db.run(`CREATE TABLE Teachers (
    teacherId INTEGER,
    name TEXT,
    email TEXT,
    phone TEXT
  );`);

  db.run(`CREATE TABLE TeacherPerCourse (
    TeacherId INTEGER,
    courseId INTEGER,
    TermId INTEGER,
    FOREIGN KEY (TeacherId) REFERENCES Teachers (teacherId),
    FOREIGN KEY (courseId) REFERENCES Course (courseId),
    FOREIGN KEY (TermId) REFERENCES Term (TermId)
  );`);
});

db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Close the database connection.");
});
