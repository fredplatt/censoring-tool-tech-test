# Profanity Filter

Profanity Filter by Fred Platt

## Installation

### Installing from github

Clone the repository:
```bash
git clone git@github.com:fredplatt/fplatt-censor-test.git
```
From there, build the image with the following docker command:
```bash
docker build -t fplatt-censor-test . 
```

### Installing from an archive

Extract the archive to a directory of your choice. 

From there, build the image with the following docker command:
```bash
docker build -t fplatt-censor-test . 
```

## Usage
Having built the docker image, you must now spin it up:
```bash
docker run -p 8080:8080 -d fplatt-censor-test
```

### Retrieving Filtered Items
To retrieve your filtered list after initial launch or after new files added:
```bash
docker cp fplatt-censor-test:/test/filteredList.txt <localpath>
```
Path can be replaced with '.' to copy filteredList to same location as where command is being run.

### Copying new inputs to application
To add new blocklist.txt with words to filter with:
```bash
docker cp <localpath>/blocklist.txt fplatt-censor-test:/test/
```

Or to add new items.txt containing phrases to apply filter to:
```bash
docker cp <localpath>/items.txt fplatt-censor-test:/test/
```

If running commands from same location as file, just the filename is required and not the path.

### NPM alternative
This application can be run without docker. To start, simply run:
```bash
npm install
```
followed by:
```bash
npm run build && npm run start
```
and then you can edit the txt files manually, the filtering function will still re-run on each change detected.

## Assumptions and Design Decisions
### Correctness
While simple array filtering would have fulfilled the criteria, there have been infamous examples of overly simplistic filtering such as the [Scunthorpe Problem](https://en.wikipedia.org/wiki/Scunthorpe_problem). To avoid this, I decided to use regex in spite of the potential performance loss in order to maintain consistency and scalability, lest a phrase be added about 'badminton', for example.

### Maintainability
I wanted to achieve this by keeping the solution as simple as possible. Naming was kept semantic, block comments were added above the function to explain its operation, and the application was wrapped in a node server that can be run with either docker or npm commands. Further to this, file-watching removes the need for re-running following changes to the inputs, reducing amount of interaction required with the application.

### Cost Effectiveness
One can assume that each spoken language will only have a limited number of words (and spelling variations) to filter out, and that a document will only have a limited number of phrases to check. To assess how scale affects the time taken for the code to execute, I timed the operation with the provided data set and compared that to a 451-line English profanity list being run against 1000 lines of randomly generated phrases. The time taken went from 4.605ms to 7.112ms. While one could use other solutions to ensure greater scalability, I assumed that many of these would have constituted over-engineering given the above assumptions over what scale could usually be expected.

## Contributing
Any feedback is most welcome!

[Fred Platt](mailto:devfredplatt@gmail.com)
