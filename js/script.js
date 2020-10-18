var db = openDatabase("userdb", "1.0", "userdb", "65535");
(function(){

    //create table
    document.querySelector("#create").addEventListener("click", function(){
        db.transaction(function(transaction){
            var sql = "CREATE TABLE user " + "(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," + 
            "username VARCHAR(50) NOT NULL," + 
            "gender VARCHAR(10) NOT NULL," + 
            "email VARCHAR(50) NOT NULL," + 
            "contact VARCHAR(10) NOT NULL);"
            transaction.executeSql(sql, undefined, 
                function(){
                    alert("Table is created successfully!");
                }, function(){
                    alert("Table is already created");
                });
        });
    });

    //remove table
    document.querySelector("#remove").addEventListener("click", function(){
        if(!confirm("Are you sure to delete the table?", "")) return;
        db.transaction(function(transaction){
            var sql = "DROP TABLE user";
            transaction.executeSql(sql, undefined,
                function(){
                    alert("Table successfully deleted!");
                }, function(){
                    alert("Table does not already exist, create one first");
                });
        });
    });

    //make hidden div visible
    document.querySelector("#deleteRow").addEventListener("click", function(){
        var del = document.querySelector("#delete");
        if(del.style.display === 'none') del.style.display = 'block';
        else del.style.display = 'none';
    })

    //remove table row
    document.querySelector("#del").addEventListener("click", function(){
        if(!confirm("Are you sure to delete this row?", "")) return;
        db.transaction(function(transaction){
            var sql = "DELETE FROM user WHERE id = " + document.querySelector("#delid").value;
            transaction.executeSql(sql, undefined,
                function(){
                    alert("Row deleted successfully");
                }, function(transaction, error){
                    alert(error.message)
                });
        });
    });

    //insert data
    document.querySelector("#insert").addEventListener("click", function(){
        var name = document.querySelector("#username").value;
        var gender = document.querySelector("#gender").value;
        var email = document.querySelector("#email").value;
        var contact = document.querySelector("#contact").value;

        db.transaction(function(transaction){
            var sql = "INSERT INTO user(username,gender,email,contact) VALUES(?,?,?,?)";
            transaction.executeSql(sql, [name,gender,email,contact],
                function(){
                    alert("Data inserted successfully")
                }, function(transaction, error){
                    alert(error.message)
                });
        });
    });

    function removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    //fetch table data
    document.querySelector("#list").addEventListener("click", function(){
        removeAllChildNodes(document.querySelector("#userList"));
        db.transaction(function(transaction){
            var sql = "SELECT * FROM user ORDER BY id DESC";
            transaction.executeSql(sql, undefined,
                function(transaction, result){
                    if(result.rows.length){
                        for(var i = 0; i < result.rows.length; i++){
                            var row = result.rows.item(i);
                            var username = row.username;
                            var id = row.id;
                            var gender = row.gender;
                            var email = row.email;
                            var contact = row.contact;
                            document.querySelector("#userList").innerHTML += '<tr><td>' + id + '</td><td>' + username + 
                            '</td><td>' + gender + '</td><td>' + email + '</td><td>' + contact + '</td></tr>';
                        }
                    } else{
                        document.querySelector("#userList").innerHTML = "<tr><td colspan='5' align='center'>No User found</td></tr>";
                    }
                }, function(transaction, error){
                    alert(error.message);
                });
        });
    });
})();