<?php
    if(isset($_GET['dataset'])){
        $sql = "SELECT * FROM dataset";
        $conn = new mysqli("localhost", "root", "", "LocalStorage");
        if($conn->connect_error){
            die($conn->connect_error);
        }
    }
    if($result = $conn->query($sql)){
        $rows = array();
        if($result->num_rows > 0){
            while($row = $result->fetch_assoc()){
                array_push($rows, $row);
            }
            echo json_encode($rows);
        }
    }
    else{
        echo "No Data To Retrieve !";
    }

?>