namespace DriveSheets {
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
    const filesIterator = DriveApp.getFilesByName(name);
    if (!filesIterator.hasNext()) {
      throw new Error(`No file found for name ${name}.`);
    }
    const file = filesIterator.next();
    if (filesIterator.hasNext()) {
      throw new Error(`Multiple files found for name ${name}.`);
    }
    return file;
  };

  export const save = (fileName: string, values: string[][], range: string) => {
    const file = getFileByName(fileName);
    getSpreadsheetsValues().append({ values }, file.getId(), range, {
      valueInputOption: "USER_ENTERED",
    });
  }

  export const load = (fileName: string, range: string) => {
    const file = getFileByName(fileName);
    return getSpreadsheetsValues().get(file.getId(), range, {
      valueRenderOption: "UNFORMATTED_VALUE",
    }).values as string[][];
  }
}
