import swaggerUi, { JsonObject } from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { PathString } from './typings';
import { ConfigMetadataStorage } from './storage/ConfigMetadataStorage';

/**
 * Implicit Express Server.
 */
class App {
    private app: Express.Application;

    /**
     * Initialize and Setup the server.
     * @param config ConfigMetadataStorage
     */
    public init(config: ConfigMetadataStorage): void {
        this.app = config.expressApplication;
        this.run(config.swaggerDefinitionFilePath, config.swaggerEndPointUrl);
    }

    /**
     * Serves swagger file in specified file and endpoint
     * @param swaggerEndPoint  swaggerEndPointUrl
     * @param swaggerDefinitionFile swaggerDefinitionFilePath
     */
    public serveSwagger(swaggerDefinitionFile: string, swaggerEndPoint: PathString): void {
        const basePath: string = process.cwd();
        import(swaggerDefinitionFile).then((file) => {
            const specs: JsonObject = swaggerJsdoc(file);
            this.app.use(swaggerEndPoint, swaggerUi.serve, swaggerUi.setup(specs));
        });
    }

    /**
     * Runs and executes swaggify
     * @param swaggerEndPoint  swaggerEndPointUrl
     * @param swaggerDefinitionFile swaggerDefinitionFilePath
     */
    private async run(swaggerDefinitionFile: string, swaggerEndPoint: PathString) {
        // Runner.execute();
        this.serveSwagger(swaggerDefinitionFile, swaggerEndPoint);
    }
}

export default App;
