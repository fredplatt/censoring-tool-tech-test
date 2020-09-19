import fs from "fs";

/**
 * Filtering tool for prohibited words
 *
 * Imports and watches blocklist.txt and items.txt in ./test directory
 * Checks items for lines containing words from blocklist by using Regex to avoid Scunthorpe Problem
 * Creates new filteredList array which outputs as filteredList.txt to ./test directory upon completion.
 *
 * This function runs on initial spin-up and on any detected changes in items or blocklist.
 *
 */

export const prohibitedWordFilter = () => {
    const prohibitedWords = fs.readFileSync("./test/blocklist.txt", "utf8").split("\n");
    const filter = new RegExp("\\b(" + prohibitedWords.join("|") + ")\\b")

    const phraseList = fs.readFileSync("./test/items.txt", "utf8").split("\n");

    const filteredList: string[] = [];

    phraseList.forEach((phrase) => {
        !filter.test(phrase) ? filteredList.push(phrase) : null;
    });

    fs.writeFileSync("./test/filteredList.txt", filteredList.join("\n"));
    console.log("Filtering operation complete");
};

fs.watch("./test/blocklist.txt", undefined, prohibitedWordFilter);
fs.watch("./test/items.txt", undefined, prohibitedWordFilter);
