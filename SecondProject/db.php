<?php
    $server='localhost';
    $username='root';
    $password='';
    $con = mysqli_connect($server,$username,$password);	
    if(!$con)					
        die("can not connect to the server $server");
    $q = $con->query('CREATE DATABASE IF NOT EXISTS LocalStorage');
    if(!$q)
        die("failed to create the database");	
    mysqli_select_db($con, 'LocalStorage');
    $sql = "CREATE TABLE IF NOT EXISTS dataset (
        events VARCHAR(20) DEFAULT NULL,
        eventtarget VARCHAR(200) DEFAULT NULL,
        eventtime VARCHAR(50) DEFAULT NULL
        )";
    $q = $con->query($sql);
    if(!$q)
        die("failed to create the database");
?>