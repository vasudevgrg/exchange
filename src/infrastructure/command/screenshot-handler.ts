import { Command, CommandRunner } from "nest-commander";
import { StorageHandler } from "../in-memory-storage/storage.handler";
import { Logger } from "@nestjs/common";
import { promises as fs } from "fs";
import path from "path";

@Command({ name: "take-screenshot" })
export class TaskScreenshotHandler extends CommandRunner {
  private readonly logger = new Logger(TaskScreenshotHandler.name);

  constructor(private readonly storageManager: StorageHandler) {
    super();
  }

  async run(): Promise<void> {
    const outputPath = path.resolve(__dirname, "../in-memory-storage/screenshot.json");
    await fs.mkdir(path.dirname(outputPath), { recursive: true });

    this.logger.log("Writing a screenshot every 5 seconds");
    while (true) {
      await new Promise<void>((resolve) => setTimeout(resolve, 5000));
      const data = this.storageManager.getScreenshot();
      await fs.writeFile(outputPath, JSON.stringify(data, null, 2));
      this.logger.log(`Screenshot written to ${outputPath}`);
    }
  }
}