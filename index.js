const puppeteer = require("puppeteer");
var mongoose = require("mongoose");
var express = require("express");
var app = express();
var Model = require("./model");
var dburl = "mongodb://localhost:27017/KyanonDigital";
var data = [];

function run(pagesToScrape) {
  return new Promise(async (resolve, reject) => {
    try {
      if (!pagesToScrape) {
        pagesToScrape = 1;
      }
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(
        "https://www.tutorialsteacher.com/online-test/nodejs-test"
      );
      // Click "Start" button at the first page
      await page.click("a.btn.btn-primary");
      let currentPage = 1;
      while (currentPage <= pagesToScrape) {
        let newdata = await page.evaluate(() => {
          let results = [];
          let items = document.querySelector(".card-body pre").innerText;
          let answers = document.querySelectorAll(
            "label.form-control.test-option"
          );
          let answerHolder = [];
          answers.forEach((items) => {
            answerHolder.push(items.innerText);
          });
          results.push(items, answerHolder);
          return results;
        });
        // Save data before starting a new loop
        data.push(newdata);
        if (currentPage < pagesToScrape) {
          await Promise.all([
            await page.click("input.btn.btn-primary.pull-right.mb-3"),
            await page.waitForSelector(".card-body pre"),
          ]);
        }
        currentPage++;
      }
      browser.close();

      //MongoDB
      // Connect to database
      mongoose.connect(dburl, { useNewUrlParser: true });
      mongoose.connection.once("open", function () {
        console.log("Connected successfully");
      });
      app.listen(3000, function () {
        console.log("Server starts at port 3000");
      });
      // Create new record
      for (let i = 0; i < data.length; i++) {
        let Record = new Model({
          Question: data[i][0],
          Answers: data[i][1],
        });
        // Save to database
        Record.save(function (err, next) {
          if (err) console.log(err);
        });
      }
      let Check = await Model.find();
      //Show result on Terminal
      console.log(Check);

      // Show on localhost
      app.get("*", function (req, res) {
        res.json(Check);
      });
      return resolve(data);
    } catch (e) {
      return reject(e);
    }
  });
}
run(3);
