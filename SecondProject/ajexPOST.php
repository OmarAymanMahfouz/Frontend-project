<?php 
    if(isset($_POST['dataset'])){
        $dataset = json_decode($_POST['dataset'], true);
        $conn = new mysqli("localhost", "root", "", "LocalStorage");
        if($conn->connect_error){
            die($conn->connect_error);
        }
        $event = $dataset['eventType'];
        $eventTarget = $dataset['eventTarget'];
        $eventTime = $dataset['eventTime'];
        $sql = "INSERT INTO dataset VALUES('$event', '$eventTarget', '$eventTime')";
        $conn->query($sql);
        if($conn->affected_rows > 0)
            echo "Inserted Successfully";
        else
            echo "A problem Occured";
    }

?>