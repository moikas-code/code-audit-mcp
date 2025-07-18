/**
 * Ollama utility functions for CLI commands
 */
interface OllamaModel {
    name: string;
    size: string;
    modified: string;
}
interface OllamaInfo {
    models: string[];
    version?: string;
}
/**
 * Check Ollama health status
 */
export declare function checkOllamaHealth(host?: string): Promise<OllamaInfo>;
/**
 * Get list of installed models
 */
export declare function getInstalledModels(): Promise<OllamaModel[]>;
/**
 * Check health status of individual models
 */
export declare function getModelHealth(): Promise<Record<string, boolean>>;
/**
 * Pull a model from Ollama
 */
export declare function pullModel(modelName: string, onProgress?: (progress: Record<string, unknown>) => void): Promise<void>;
/**
 * Remove a model from Ollama
 */
export declare function removeModel(modelName: string): Promise<void>;
/**
 * Ensure required models are installed
 */
export declare function ensureRequiredModels(): Promise<void>;
export declare function pullModelWithRetry(modelName: string, onProgress?: (progress: Record<string, unknown>) => void, maxRetries?: number): Promise<void>;
export declare function estimateModelSize(modelName: string): number;
export declare function getAvailableDiskSpace(): number;
export {};
//# sourceMappingURL=ollama.d.ts.map