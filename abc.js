const express = require("express");

const app = express();

// Express has one core philosophy which is basically that every incoming request is funneled through a bunch of middleware functions, normal functions in the end which are able to get data out of the request or manipulate the request even and also manipulate the response and eventually send it back.

// next function which you call if you don't want to send the response in this middleware but instead you want to forward the request to the next middleware in line.
// If you're not calling next, then any middleware after this middleware, if we had more than one, will not be reached by this request.

app.use((req, res, next) => {
  let body = "";
  req.on("end", () => {
    const userName = body.split("=")[1];
    if (userName) {
      req.body = { name: userName };
    }
    next();
  });
  req.on("data", (chunk) => {
    body += chunk;
  });
});

app.use((req, res, next) => {
  if (req.body) {
    return res.send("<h1>User:" + req.body.name + "</h1>");
  }
  res.send(
    '<form method="POST"><input type="text" name="username"><button type="submit">Create User</button></form>'
  );
});

app.listen(5000);
