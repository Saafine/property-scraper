const { promisify } = require('util');
const { writeFile } = require('fs');
const writeFile$ = promisify(writeFile);

const outputDir = './src/outputs/';


export class SaveEstateService {
  public async saveToFile(fileName: string, content: any): Promise<void> {
    let contentFormatted: string = typeof content !== 'string' ? this.parseNonStrings(content) : content;
    if (!contentFormatted) throw new Error('SaveEstateService | No content to save');
    writeFile$(`${outputDir}/${fileName}`, contentFormatted).catch(console.error);
  }

  private parseNonStrings(content: any): string {
    try {
      return JSON.stringify(content);
    } catch (err) {
      console.error('SaveEstateService | JSON handler failed');
      return '';
    }
  }
}