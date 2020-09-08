import { Enterprise } from "../entities/Enterprise";
import { EnterpriseSettings } from "../entities/EnterpriseSettings";
import { EnterpriseCatalog } from "../entities/EnterpriseCatalog";

export interface IEnterpriseRepository {
    updateCatalog(id: number, catalog: EnterpriseCatalog, code: string): Promise<boolean>

    save(name: string, document_type: number, document: string, address: string, logo_url: string, enterprise_id: number, category_id: number): Promise<Enterprise>

    read(id: number): Promise<Enterprise>

    update(id: number, name: string, address: string, logo_url: string, category_id: number): Promise<Enterprise>

    updateSettings(id: number, settings: EnterpriseSettings): Promise<boolean>

    delete(id: number): Promise<boolean>

    readByCode(code: string): Promise<Enterprise>
} 