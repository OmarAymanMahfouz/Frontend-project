<html>
    <head>
        <style>
            .buttonstyle{
                margin-top: 1em;
                margin-bottom: 1em;
                margin-left: 0.5em;
                margin-right: 0.5em;
            }
            .ImageContainer{
                margin: 20px;
                padding: 5px;
            }
            .ButtonContainer{
                margin: 10px;
            }
            .imagestyle{
                height: 10cm;
                width: 10cm;
            }
        </style>
    </head>
    <body>
        <div class="Header">
            <h1>Learn the English Letters</h1>
            <span>Number of Letters</span>
            <input type="text"/>
            <input type="button" value="Generate"/>
            <span style="color: red;">Please write a number between 1 and 26</span>
        </div>
        <div class="ButtonContainer"></div>
        <div class="ImageContainer"></div>
        <div><input type="button" value="Get Stored Data"></div>
        <script src="jquery-3.4.1.min.js"></script>
        <script src="source.js"></script>
    </body>
</html>