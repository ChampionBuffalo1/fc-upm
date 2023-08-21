type JsonValue =
  | number
  | string
  | boolean
  | unknown[]
  | Record<string, JsonValue>;
type Json = Record<string, Record<string, JsonValue>>;

interface DateTime {
  created_at: Date;
  updated_at: Date;
}

export interface PageConfig extends DateTime {
  id: number;
  name: string;
}

export interface PageSection extends DateTime {
  id: number;
  active: number;
  priority: number;
  page_config_id?: number;
}

export interface ServiceConfig extends DateTime {
  id: number;
  name: string;
  active: number;
  base_activity_name: string;
  priority: number;
  base_action: Json;
  static_info: Json;
  app_version: Json;
  fallback_info: Json;
  content_type: string;
  content_structure: Json;
}

export interface PageSectionServiceMapping {
  id: number;
  page_section_id: number;
  service_id: number;
}
