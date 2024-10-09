const { test } = require("@playwright/test");
const ExcelJS = require("exceljs");

async function printExcel(searchText, replaceText, change, filepath) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filepath);
  const worksheet = workbook.getWorksheet("Sheet1");
  const outputReturned = await readExcel(worksheet, searchText);

  const cell = await worksheet.getCell(
    outputReturned.row,
    outputReturned.col + change.colChange
  );
  cell.value = replaceText;

  await workbook.xlsx.writeFile(filepath);
}

async function readExcel(worksheet, searchText) {
  let output = { row: -1, col: -1 };
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      if (cell.value === searchText) {
        output.row = rowNumber;
        output.col = colNumber;
      }
    });
  });
  return output;
}


test("Upload and download", async ({page}) => {

    await page.pause();
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    await page.pause();

    const downLoadPromise = page.waitForEvent("download");
    await page.locator("#downloadButton").click();
    await downLoadPromise;

    printExcel("Mango", "1200 ", {rowChange: 0, colChange: 2}, "C:/Users/266392/Downloads/download.xlsx");

    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles("C:/Users/266392/Downloads/download.xlsx");


});
