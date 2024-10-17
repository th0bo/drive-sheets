type FileParams = { fileName: string } | { fileId: string };

type CellValue = string | boolean | number;

type SaveParams = FileParams & { values: CellValue[][], range: string };
type Save = (params: SaveParams) => void

type LoadParams = FileParams & { range: string };
type Load = (params: LoadParams) => CellValue[][];

type DriveSheetsLibrary = {
  save: Save;
  load: Load;
}