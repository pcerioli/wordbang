var connect = require('connect'),
sys = require("sys");

connect.createServer(
    connect.static(__dirname)
).listen(8080);

sys.puts("Server Running on 8080");  