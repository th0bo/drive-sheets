/// <reference types="./main.d.ts" />

const fileNameToFileId = new Map<string, string>();

const getSpreadsheets = () => {
  if (Sheets.Spreadsheets === undefined) {
    throw new Error("Spreadsheets API is not available.");
  }
  return Sheets.Spreadsheets;
};

const getSpreadsheetsValues = () => {
  const Spreadsheets = getSpreadsheets();
  if (Spreadsheets.Values === undefined) {
    throw new Error("Spreadsheets Values API is not available.");
  }
  return Spreadsheets.Values;
};

const getFileByName = (name: string) => {
  if (fileNameToFileId.has(name)) {
    return DriveApp.getFileById(fileNameToFileId.get(name) as string);
  }
  const filesIterator = DriveApp.getFilesByName(name);
  if (!filesIterator.hasNext()) {
    throw new Error(`No file found for name ${name}.`);
  }
  const file = filesIterator.next();
  if (filesIterator.hasNext()) {
    throw new Error(`Multiple files found for name ${name}.`);
  }
  fileNameToFileId.set(name, file.getId());
  return file;
};

const getFile = (fileParams: FileParams) =>
  "fileId" in fileParams
    ? DriveApp.getFileById(fileParams.fileId)
    : getFileByName(fileParams.fileName);

var save: Save = ({ values, range, ...fileParams }) => {
  const file = getFile(fileParams);
  getSpreadsheetsValues().append({ values }, file.getId(), range, {
    valueInputOption: "USER_ENTERED",
  });
};

var load: Load = ({ range, ...fileParams }) => {
  const file = getFile(fileParams);
  return getSpreadsheetsValues().get(file.getId(), range, {
    valueRenderOption: "UNFORMATTED_VALUE",
  }).values as string[][];
};
