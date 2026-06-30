const mysql = require("mysql2");

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "info123"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("connected!");

    // Create Database
    con.query("CREATE DATABASE IF NOT EXISTS appon", function (err, result) {
        if (err) throw err;
        console.log("database created");

        // Use Database
        con.query("USE appon", function (err, result) {
            if (err) throw err;

            // Drop table if it already exists
            con.query("DROP TABLE IF EXISTS alia", function (err, result) {
                if (err) throw err;

                // Create Table
                var sql = `
                CREATE TABLE alia(
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(20),
                    address VARCHAR(20)
                )`;

                con.query(sql, function (err, result) {
                    if (err) throw err;
                    console.log("table created");

                    // Insert Records
                    var sql = `
                    INSERT INTO alia(name,address)
                    VALUES
                    ('sanjay','new delhi'),
                    ('maya','mysore'),
                    ('sanju','bangalore'),
                    ('manju','mangalore')`;

                    con.query(sql, function (err, result) {
                        if (err) throw err;
                        console.log("record inserted");

                        // Select All Records
                        con.query("SELECT * FROM alia", function (err, result) {
                            if (err) throw err;
                            console.log(result);

                            // Select One Record
                            con.query("SELECT * FROM alia WHERE id=1", function (err, result) {
                                if (err) throw err;
                                console.log(result);

                                // Delete Record
                                con.query("DELETE FROM alia WHERE id=2", function (err, result) {
                                    if (err) throw err;
                                    console.log("record deleted", result);

                                    // Add Column
                                    con.query("ALTER TABLE alia ADD COLUMN phone_number INT", function (err, result) {
                                        if (err) throw err;
                                        console.log("new column added");

                                        // Drop Column
                                        con.query("ALTER TABLE alia DROP COLUMN phone_number", function (err, result) {
                                            if (err) throw err;
                                            console.log("column dropped");

                                            // Update Record
                                            con.query("UPDATE alia SET name='mamtha' WHERE id=3", function (err, result) {
                                                if (err) throw err;
                                                console.log("record updated");

                                                // Display Final Table
                                                con.query("SELECT * FROM alia", function (err, result) {
                                                    if (err) throw err;
                                                    console.log(result);

                                                    // Drop Table
                                                    con.query("DROP TABLE alia", function (err, result) {
                                                        if (err) throw err;
                                                        console.log("table dropped");

                                                        con.end();
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});
