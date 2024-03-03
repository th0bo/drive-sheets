type FileParams = { fileName: string } | { fileId: string };

type SaveParams = FileParams & { values: string[][], range: string };
type Save = (params: SaveParams) => void

type LoadParams = FileParams & { range: string };
type Load = (params: LoadParams) => string[][];

type DriveSheetsLibrary = {
  save: Save;
  load: Load;
}