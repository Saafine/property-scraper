const { promisify } = require('util');
const { writeFile, readFile } = require('fs');
const writeFile$ = promisify(writeFile);
const readFile$ = promisify(readFile);

const outputDir = './src/outputs/';


export class DataTransferService {
  public async saveToFile(fileName: string, content: any): Promise<void> {
    const contentFormatted: string = typeof content !== 'string' ? this.parseNonStrings(content) : content;
    if (!contentFormatted) throw new Error('DataTransferService | No content to save');
    writeFile$(`${ outputDir }/${ fileName }`, contentFormatted).catch(console.error);
  }

  public async readFromFile(filePath: string): Promise<string> {
    return await readFile$(filePath, 'utf8').catch(console.error);
  }

  private parseNonStrings(content: any): string {
    try {
      return JSON.stringify(content);
    } catch (err) {
      console.error('DataTransferService | JSON handler failed');
      return '';
    }
  }
}