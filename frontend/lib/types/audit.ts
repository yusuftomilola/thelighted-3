export enum AuditAction {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
  LOGIN = "login",
  LOGOUT = "logout",
  STATUS_CHANGE = "status_change",
  TOGGLE = "toggle",
}

export enum AuditEntity {
  MENU = "menu",
  CONTACT = "contact",
  USER = "user",
  ADMIN = "admin",
  SYSTEM = "system",
}

export interface AuditLog {
  id: string;
  action: string;
  entityType: AuditEntity;
  entityId?: string;
  adminId?: string;
  admin?: {
    id: string;
    username: string;
    email: string;
  };
  details?: string;
  ipAddress?: string;
  userAgent?: string;
  timestamp: string;
}
