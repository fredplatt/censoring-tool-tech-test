import express from "express";
import { prohibitedWordFilter } from "./tools/prohibitedWordFilter";

const app = express();
const port = 8080;

app.get("/", (req, res) => {
    res.send("Filtering tool is running");
});

prohibitedWordFilter();

app.listen(port, () => {
    return console.log(`Server is listening on ${port}`);
});
