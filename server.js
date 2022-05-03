var express = require("express");
var app = express();

//Especificamos a nuestra app que su template engine será ejs
app.set("view engine", "ejs");
var port = process.env.PORT || 3000;
//Con esto creamos el directorio virtual para el contenido estatico que estara en la carpeta de public
app.use("/assets", express.static(__dirname + "/public"));

app.use("/", function (req, res, next) {
  console.log("Request Url:" + req.url);
  next();
});
//ruta raiz que tendra de respuesta un Hello world
app.get("/", function (req, res) {
  res.send(
    `<html><head><link href=assets/style.css type=text/css rel=stylesheet /></head>
        <body><h1>Hello world</h1></body></html>` // agregamos la referencia al directorio virtual donde esta nuestro archivo de style.css
  );
});

// Esta ruta recibira el parametro del id y la querystring
app.get("/person/:id", function (req, res) {
  // El parametro usando req.params y la querystring con req.query para que express parsee el valor de este
  res.render("person", {
    ID: req.params.id,
    Message: req.query.message,
    Times: req.query.times,
  }); // Especificamos que se va a mandar el parametro y la querystring
  // Con esto mandamos lo que se ponga despues de los ":" y lo que haya despues de "?" al archivo ejs
});

app.listen(port); // Ponemos al server a esuchar en el puerto que seleccionamos
